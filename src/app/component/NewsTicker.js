"use client";

import { useState, useEffect } from "react";
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function NewsTicker({ newsItems = [], direction = "horizontal", speed = 10 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  // تحريك الأخبار كل N ثواني
  useEffect(() => {
    if (!newsItems.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [newsItems, speed]);

  // تشغيل مكتبة AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  // تحديث الوقت كل ثانية
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setCurrentTime(timeString);
    };

    updateClock(); // التحديث أول مرة
    const interval = setInterval(updateClock, 1000); // كل ثانية

    return () => clearInterval(interval); // تنظيف عند الإزالة
  }, []);

  return (
    <div className="py-10 px-4 flex items-end">
      {/* مربع الساعة والعنوان */}
      <div className="w-[7rem] mx-2" data-aos="fade-up">
        <p className="text-lg text-center my-2 h-7 bg-[#42790c] rounded-xl text-white font-bold">
          {currentTime}
        </p>
        <h1 className="text-xl text-center p-2 bg-[#42790c] rounded-xl text-white font-bold">
          الأخبار
        </h1>
      </div>

      {/* شريط الأخبار */}
      <div
        className="relative w-full overflow-hidden bg-[#42790c] text-white font-bold p-2 rounded-md flex items-center"
        data-aos="fade-left"
        style={{ height: direction === "vertical" ? "2rem" : "auto" }}
      >
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: direction === "horizontal" ? `marquee ${speed}s linear infinite` : "none",
          }}
        >
          {newsItems.map((item, index) => (
            <span key={index} className="px-4">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* تحريك الشريط */}
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
