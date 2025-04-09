"use client";



import { useState, useEffect } from "react";
import 'aos/dist/aos.css';
import AOS from 'aos';


export default function NewsTicker({ newsItems, direction = "horizontal", speed = 10 }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
        }, speed * 1000);

        return () => clearInterval(interval);
    }, [newsItems, speed]);
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-EG', {
                hour: '2-digit',
                minute: '2-digit',
                // second: '2-digit'
            });
            setCurrentTime(timeString);
        };

        updateClock(); // أول تشغيل
        const interval = setInterval(updateClock, 1000); // كل ثانية

        return () => clearInterval(interval); // تنظيف عند إلغاء التثبيت
    }, []);
    return (
        <div className="py-10 px-4 flex items-end">
            <div
                className="w-[7rem] mx-2"
                data-aos="fade-up"
            >
                <p className="text-lg text-center my-2 h-7 bg-[#42790c] rounded-xl text-white font-bold">
                    {currentTime}
                </p>
                <h1 className="text-xl text-center p-2 bg-[#42790c] rounded-xl text-white font-bold">
                    الأخبار
                </h1>
            </div>
            <div
                className={`relative w-full overflow-hidden bg-[#42790c] text-white font-bold p-2 rounded-md flex items-center`}
                data-aos="fade-left"
                style={{ height: direction === "vertical" ? "2rem" : "auto" }}
            >
                <div
                    className="flex whitespace-nowrap"
                    style={{
                        animation: `marquee ${speed}s linear infinite`,
                    }}
                >
                    {newsItems.map((item, index) => (
                        <span key={index} className={`px-4`}>
                            {item}
                        </span>
                    ))}
                </div>
            </div>
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
