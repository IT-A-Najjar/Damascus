"use client";



import React, { useEffect } from "react";
import 'aos/dist/aos.css';
import AOS from 'aos';
import booke from "../../images/book.png";
import comment from "../../images/comment.png";
import file from "../../images/file.png";
import setting from "../../images/setting.png";
import Image from "next/image";
import Link from "next/link";


export default function QuickAccess() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center" data-aos="fade-down">الوصول السريع</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/Decisions/1">
          <div className="overflow-hidden transition-transform hover:scale-105">
            <div className="bg-[#ffffff] p-6 rounded-full m-auto w-fit" data-aos="fade-up">
              <Image
                src={file}
                alt="icon"
                className="w-[76px] h-[76px] m-auto"
              />
            </div>
            <div className="p-4" data-aos="fade-up">
              <h3 className="text-xl font-bold mb-2 text-center">قرارات ومراسيم</h3>
            </div>
          </div>
        </Link>
        <Link href="/Service2?id=2">
          <div className="overflow-hidden transition-transform hover:scale-105" >
            <div className="bg-[#ffffff] p-6 rounded-full m-auto w-fit" data-aos="fade-up">
              <Image
                src={booke}
                alt="icon"
                className="w-[76px] h-[76px] m-auto"
              />
            </div>
            <div className="p-4" data-aos="fade-up">
              <h3 className="text-xl font-bold mb-2 text-center">دليل خدمات المواطن</h3>
            </div>
          </div>
        </Link>
        <Link href="/Service3?id=3">
          <div className="overflow-hidden transition-transform hover:scale-105">
            <div className="bg-[#ffffff] p-6 rounded-full m-auto w-fit" data-aos="fade-up">
              <Image
                src={setting}
                alt="icon"
                className="w-[76px] h-[76px] m-auto"
              />
            </div>
            <div className="p-4" data-aos="fade-up">
              <h3 className="text-xl font-bold mb-2 text-center">حدمات الكترونية</h3>
            </div>
          </div>
        </Link>
        <Link href="/Announcements">
          <div className="overflow-hidden transition-transform hover:scale-105">
            <div className="bg-[#ffffff] p-6 rounded-full m-auto w-fit" data-aos="fade-up">
              <Image
                src={comment}
                alt="icon"
                className="w-[76px] h-[76px] m-auto"
              />
            </div>
            <div className="p-4" data-aos="fade-up">
              <h3 className="text-xl font-bold mb-2 text-center">الإعلانات</h3>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
