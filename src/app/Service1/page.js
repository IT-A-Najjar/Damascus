"use client";



import React, { useEffect, useState } from 'react';
import { fetchData, addData, updateData, deleteData, setBaseUrl } from "../utils/apiHelper";
import Navbar from '../component/navbar';
import Footer from '../component/Footer';
import Baner from '../component/Baner';
import Sidebar from '../component/Sidebar';
import Content from '../component/Content';

export default function CitizenServices() {
  const [data, setData] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  useEffect(() => {
    getData();
  }, []);
  // جلب البيانات
  const getData = async () => {
    try {
      const result = await fetchData('/citizen-service-types-of/1');
      setData(result);
      console.log(result);
      
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  return (
    <div>
      <Navbar />
      <Baner titel="النافذة الواحدة" uptitle="الخدمات" />
      <div style={{ display: "flex" }}>
        <Sidebar
          menus={data}
          selectedMenuId={selectedMenuId}
          setSelectedMenuId={setSelectedMenuId}
        />
        <Content menuId={selectedMenuId} />
      </div>
      <Footer />
    </div>
  );
}