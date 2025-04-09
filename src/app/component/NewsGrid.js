"use client";



import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/apiHelper";
import 'aos/dist/aos.css';
import AOS from 'aos';
import news1 from "../../images/news1.jpg";
import news2 from "../../images/news2.jpg";
import news3 from "../../images/news3.jpg";
import news4 from "../../images/news4.jpg";
import Image from "next/image";
import Link from "next/link";



export default function NewsGrid() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);
  const getData = async (id) => {
    try {
      const result = await fetchData(`/lastnews`);
      setData(result);
      // console.log(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center" data-aos="fade-down">أحدث الأخبار</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <Link href={"/news/"+item.id} key={index}>
            <div
              
              className="relative bg-white shadow-md rounded-tl-3xl rounded-br-3xl overflow-hidden transition-transform hover:scale-105"
              data-aos="zoom-in"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${item.Image}`}
                alt="klj"
                width={800}
                height={600}
                quality={100} // جودة عالية
                className="w-full h-[13rem] object-cover"
              />
              <div className="p-4 absolute z-10 w-full bottom-0 bg-gradient-to-t from-[#00000080] to-[#ffffff00]">
                <h3 className="text-lg font-bold mb-2 text-white">{item.Title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="w-full flex justify-center items-center my-4">
        <Link href="/news" >
          <button className="hover:bg-[#d9d9d9] bg-gradient-to-t from-[#497b3b] to-[#8bc27b] p-3 rounded-lg border-l-yellow-300 text-white m-auto">
            عرض المزيد
          </button>
        </Link>
      </div>
    </div>
  );
}
