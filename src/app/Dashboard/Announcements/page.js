"use client";


import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { fetchData, addData, deleteData } from "../../utils/apiHelper";

import Image from "next/image";
import toast from "react-hot-toast";

export default function Announcements() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([]);
  const [datatype, setDatatype] = useState([]);
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Image: null,
    AnnoucementTypeID: null,
  });

  useEffect(() => {
    getData();
    getDatatype();
  }, []);
  const getDatatype = async () => {
    try {
      const result = await fetchData(`/announcement-types`);
      // console.log(result);

      setDatatype(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const getData = async () => {
    try {
      const result = await fetchData(`/announcements`);
      console.log(result);
      setData(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: true };
    return new Date(dateString).toLocaleDateString("ar-EG", options);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast("يجب اختيار ملف صورة صالح.");
      return;
    }

    setFormData({ ...formData, Image: file });
  };

  const handleDeleteConfirm = (item) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      await deleteData(`/announcements/${selectedItem.id}`);
      setIsDeleteOpen(false);
      toast.error("تم حذف العنصر");
      getData();
    } catch (error) {
      toast("Error deleting item:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.Image) {
      toast("الرجاء اختيار صورة للإعلان.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("Title", formData.Title);
    formDataToSend.append("Description", formData.Description);
    formDataToSend.append("Image", formData.Image);
    formDataToSend.append("AnnoucementTypeID", formData.AnnoucementTypeID);

    try {
      await addData("/announcements", formDataToSend);
      setIsOpen(false);
      setLoading(false);
      toast.success('تم اضافة الإعلان');
      getData(); // إعادة جلب البيانات بعد الإضافة
    } catch (error) {
      toast("Error submitting the form:", error);
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col items-center justify-start min-h-[70vh]">
      <div className="w-full m-4">
        <button onClick={() => setIsOpen(true)} className="bg-[#7bbf1e] text-white px-4 py-2 rounded-xl w-full">
          إضافة إعلان جديد
        </button>
      </div>
      <div className="flex justify-center items-center w-full">
        <table className="bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#42790c] text-white font-bold">
            <tr>
              <th className="px-4 py-2">الرقم</th>
              <th className="px-4 py-2">نوع الاعلان</th>
              <th className="px-4 py-2">العنوان</th>
              <th className="px-4 py-2">الوصف</th>
              <th className="px-4 py-2">الصورة</th>
              <th className="px-4 py-2">تاريخ النشر</th>
              <th className="px-4 py-2">الاحداث</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 transition-all">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{item.type.AnnoucementType}</td>
                <td className="px-4 py-2 text-center">
                  {item.Title && item.Title.length > 20 ? item.Title.substring(0, 20) + "..." : item.Title || "—"}
                </td>
                <td className="px-4 py-2 text-center">
                  {item.Description && item.Description.length > 30 ? item.Description.substring(0, 30) + "..." : item.Description || "—"}
                </td>

                <td className="px-4 py-2 text-center">
                  <Image src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${item.Image}`} alt="news" width={800} height={600} quality={100} className="w-full h-[3rem] object-cover" />
                </td>
                <td className="px-4 py-2 text-center">{formatDate(item.created_at)}</td>
                <td className="px-4 py-2 text-center">
                  <button className="bg-red-500 text-white px-3 py-1 rounded ml-2" onClick={() => handleDeleteConfirm(item)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-96">
            <Dialog.Title className="text-lg font-bold">إضافة إعلان جديد</Dialog.Title>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
              <input type="text" name="Title" value={formData.Title} onChange={handleInputChange} placeholder="العنوان" className="border p-2 rounded" required />
              <textarea name="Description" value={formData.Description} onChange={handleInputChange} placeholder="الوصف" className="border p-2 rounded" required />
              <select
                name="AnnoucementTypeID"
                value={formData.AnnoucementTypeID}
                onChange={handleInputChange}
                className="border p-2 rounded"
                required
              >
                <option value="" disabled>اختر نوع الإعلان</option>
                {datatype.map((type) => (
                  <option key={type.id} value={type.id}>{type.AnnoucementType}</option>
                ))}
              </select>
              <input type="file" onChange={handleFileChange} className="border p-2 rounded" required />
              <div className="w-full flex justify-between">
                <button type="submit"
                 className="mt-4 bg-green-500 text-white px-4 py-2 rounded" 
                disabled={loading}
                >
                  {loading ? "جاري الاضافة..." : "اضافة"}</button>
                <button onClick={() => setIsOpen(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                  إغلاق
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* مودال تأكيد الحذف */}
      <Dialog open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-96">
            <Dialog.Title className="text-lg font-bold">تأكيد الحذف</Dialog.Title>
            <p className="mt-4">هل أنت متأكد من حذف هذا الإعلان؟</p>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setIsDeleteOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">إلغاء</button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">حذف</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
