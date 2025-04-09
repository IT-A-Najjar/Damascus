"use client";


import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { fetchData, addData, deleteData } from "../../utils/apiHelper";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ServiceTypesDetails() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([]);
  const [datatype, setDatatype] = useState([]);
  const [formData, setFormData] = useState({
    ServiceTypeDetail: '',
    PDFLink: null,
    CitizenServiceTypeID: '',
  });

  useEffect(() => {
    getData();
    getDatatype();
  }, []);
  const getDatatype = async () => {
    try {
      const result = await fetchData(`/citizen-service-types`);
      // console.log(result);

      setDatatype(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const getData = async () => {
    try {
      const result = await fetchData(`/citizen-service-type-details`);
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

    if (!file) {
      // السماح بإرسال فارغ
      setFormData({ ...formData, PDFLink: null });
      return;
    }

    if (file.type !== "application/pdf") {
      toast("يجب اختيار ملف PDF صالح.");
      return;
    }

    setFormData({ ...formData, PDFLink: file });
  };


  const handleDeleteConfirm = (item) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      await deleteData(`/citizen-service-type-details/${selectedItem.id}`);
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
    console.log(formData);

    const formDataToSend = new FormData();
    formDataToSend.append("ServiceTypeDetail", formData.ServiceTypeDetail);
    formDataToSend.append("CitizenServiceTypeID", formData.CitizenServiceTypeID);
    if (formData.PDFLink) {
      formDataToSend.append("PDFLink", formData.PDFLink);
    }

    try {
      await addData("/citizen-service-type-details", formDataToSend);
      setIsOpen(false);
      toast.success('تم اضافة نوع الخدمة');
      setLoading(false);
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
          إضافة تفصيل نوع خدمة جديد
        </button>
      </div>
      <div className="flex justify-center items-center w-full">
        <table className="bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#42790c] text-white font-bold">
            <tr>
              <th className="px-4 py-2">الرقم</th>
              <th className="px-4 py-2">نوع الخدمة</th>
              <th className="px-4 py-2">تفصيل نوع الخدمة</th>
              <th className="px-4 py-2">الملف</th>
              <th className="px-4 py-2">تاريخ النشر</th>
              <th className="px-4 py-2">الاحداث</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 transition-all">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{item.citizen_service_type.CitizenServiceType}</td>
                <td className="px-4 py-2 text-center">
                  {item.ServiceTypeDetail && item.ServiceTypeDetail.length > 40 ? item.ServiceTypeDetail.substring(0, 40) + "..." : item.ServiceTypeDetail || "—"}
                </td>
                <td className="px-4 py-2 text-center">
                  <a href={item.PDFLink} >انتقل</a>
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
            <Dialog.Title className="text-lg font-bold">إضافة تفصيل نوع الخدمة جديد</Dialog.Title>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
              <input type="text" name="ServiceTypeDetail" value={formData.ServiceTypeDetail} onChange={handleInputChange} placeholder="عنوان تفصيل نوع الخدمة" className="border p-2 rounded" required />
              <select
                name="CitizenServiceTypeID"
                value={formData.CitizenServiceTypeID}
                onChange={handleInputChange}
                className="border p-2 rounded"
                required
              >
                <option value="" disabled>اختر نوع الخدمة</option>
                {datatype.map((type) => (
                  <option key={type.id} value={type.id}>{type.citizen_service.CitizenService} - {type.CitizenServiceType}</option>
                ))}
              </select>
              <input type="file" onChange={handleFileChange} className="border p-2 rounded" />
              <div className="w-full flex justify-between">
                <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded" disabled={loading}
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
            <p className="mt-4">هل أنت متأكد من حذف تفصيل نوع الخبر هذا؟</p>
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
