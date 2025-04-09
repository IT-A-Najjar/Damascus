"use client"
import React, { useEffect, useState } from 'react';
import { fetchData } from "../utils/apiHelper";
import Navbar from '../component/navbar';
import Footer from '../component/Footer';
import Baner from '../component/Baner';
import Sidebar from '../component/Sidebar';
import Content from '../component/Content';




// const Sidebar = dynamic(() => import('../component/Sidebar'), { ssr: false });
// const Content = dynamic(() => import('../component/Content'), { ssr: false });

export default function CitizenServices() {
   const [data, setData] = useState([]);
   const [selectedMenuId, setSelectedMenuId] = useState(null);
   const [selectedSubMenuId, setSelectedSubMenuId] = useState(null);
  
   useEffect(() => {
     getData();
   }, []);
  
   // Fetch data
   const getData = async () => {
     try {
       const result = await fetchData('/citizen-service-types-of/2');
       setData(result);
       console.log(result);
     } catch (error) {
       console.error("Failed to fetch data:", error);
     }
   };
   
   return (
     <div>
       <Navbar />
       <Baner titel="دليل خدمات المواطن" uptitle="الخدمات"/>
       <div style={{ display: "flex" }}>
         <Sidebar
           menus={data}
           selectedMenuId={selectedMenuId}
           setSelectedMenuId={setSelectedMenuId}
           selectedSubMenuId={selectedSubMenuId}
           setSelectedSubMenuId={setSelectedSubMenuId}
         />
         <Content menuId={selectedMenuId} submenuId={selectedSubMenuId} />
       </div>
       <Footer />
     </div>
   );
}
