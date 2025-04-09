import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const BASE_URL = "http://127.0.0.1:8000/api";

if (typeof window !== "undefined") {
  const getAuthToken = localStorage.getItem("authToken");
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// دالة لجلب البيانات
export const fetchData = async (url) => {
  try {
    const response = await apiClient.get(url, {});
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.response?.data || error.message);
    throw error;
  }
};

export const addData = async (url, data) => {
  try {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": data instanceof FormData ? "multipart/form-data" : "application/json",
    };

    const response = await apiClient.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error adding data:", error.response?.data || error.message);
    throw error;
  }
};


// دالة لتعديل بيانات موجودة
export const updateData = async (url, data) => {
  try {
    const response = await apiClient.put(url, data);
    return response.data;
  } catch (error) {
    console.error("Error updating data: ", error);
    throw error;
  }
};

// دالة لحذف بيانات
export const deleteData = async (url) => {
  try {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };

    const response = await apiClient.delete(url, { headers });
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error.response?.data || error.message);
    throw error;
  }
};


// يمكنك إضافة دالة لإعداد baseURL هنا إذا لزم الأمر
export const setBaseUrl = (url) => {
  apiClient.defaults.baseURL = url;
};
