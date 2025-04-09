"use client";



import React, { useEffect } from "react";
import 'aos/dist/aos.css';
import AOS from 'aos';
import icon1 from "../../images/icon/facebook.png"
import icon2 from "../../images/icon/instagram.png"
import icon3 from "../../images/icon/telegram.png"
import icon4 from "../../images/icon/twitter.png"
import icon5 from "../../images/icon/whatsapp.png"
import Image from "next/image";
import Link from "next/link";

 // لمنع الـ prerender
export default function Footer() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);
    return (
        <footer className="bg-[#42790c] text-white py-8">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {/* القسم الأول: صورة */}
                <div className="flex flex-col items-start px-4" data-aos="zoom-in">
                    <h1 className="text-2xl font-black mb-2">محافظــة دمشــق</h1>
                    <h2 className="text-xl font-bold mb-6">الجمهورية العربية السورية</h2>
                    <div>
                        <p className="text-base">تابعنا على:</p>
                        <div className="flex justify-center items-start my-4">
                            <span className="icon w-[30px] h-[30px] m-2 flex justify-center items-center">
                                <Image src={icon1} alt="icon" />
                            </span>
                            <span className="icon w-[30px] h-[30px] m-2 flex justify-center items-center">
                                <Image src={icon2} alt="icon" />
                            </span>
                            <span className="icon w-[30px] h-[30px] m-2 flex justify-center items-center">
                                <Image src={icon3} alt="icon" />
                            </span>
                            <span className="icon w-[30px] h-[30px] m-2 flex justify-center items-center">
                                <Image src={icon4} alt="icon" />
                            </span>
                            <span className="icon w-[30px] h-[30px] m-2 flex justify-center items-center">
                                <Image src={icon5} alt="icon" />
                            </span>

                        </div>
                    </div>
                </div>

                {/* القسم الثاني: القائمة الأولى */}
                <div className="px-4" data-aos="zoom-in">
                    <h4 className="text-lg font-bold mb-4">خدمات المحافظة</h4>
                    <ul>
                        <li>
                            <Link href="/Service1?id=1" className="text-white hover:text-[#fcc347] hover:pr-1">
                                النافذة الواحدة
                            </Link>
                        </li>
                        <li>
                            <Link href="/Service1?id=2" className="text-white hover:text-[#fcc347] hover:pr-1">
                                دليل خدمات المواطن
                            </Link>
                        </li>
                        <li>
                            <Link href="/FAQ" className="text-white hover:text-[#fcc347] hover:pr-1">
                                اسئلة متكررة
                            </Link>
                        </li>
                        <li>
                            <Link href="Service1?id=3" className="text-white hover:text-[#fcc347] hover:pr-1">
                                خدمات حكومية
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* القسم الثالث: القائمة الثانية */}
                <div className="px-4" data-aos="zoom-in">
                    <h4 className="text-lg font-bold mb-4">المركز الإعلامي</h4>
                    <ul>
                        <li>
                            <Link href="/news" className="text-white hover:text-[#fcc347] hover:pr-1">
                                قائمة الأخبار
                            </Link>
                        </li>
                        <li>
                            <Link href="/Announcements" className="text-white hover:text-[#fcc347] hover:pr-1">
                                الإعلانات
                            </Link>
                        </li>
                        <li>
                            <Link href="#weather" className="text-white hover:text-[#fcc347] hover:pr-1">
                               الطقس
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* القسم الرابع: القائمة الثالثة */}
                <div className="px-4" data-aos="zoom-in">
                    <h4 className="text-lg font-bold mb-4">قرارات ومراسيم</h4>
                    <ul>
                        <li>
                            <Link href="/Decisions/1" className="text-white hover:text-[#fcc347] hover:pr-1">
                                 القوانين والمراسيم
                            </Link>
                        </li>
                        <li>
                            <Link href="/Decisions/2" className="text-white hover:text-[#fcc347] hover:pr-1">
                                قرارات المكتب التنفيذي
                            </Link>
                        </li>
                        <li>
                            <Link href="/Decisions/3" className="text-white hover:text-[#fcc347] hover:pr-1">
                                قرارات مجلس المحافظة
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="px-4" data-aos="zoom-in">
                    <h4 className="text-lg font-bold mb-4">تواصل معنا</h4>
                    <ul>
                        <li>
                            <Link href="/Suggestions" className="text-white hover:text-[#fcc347] hover:pr-1">
                                اقتراحات
                            </Link>
                        </li>
                        <li>
                            <Link href="/Complaints" className="text-white hover:text-[#fcc347] hover:pr-1">
                                شكاوي
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-white hover:text-[#fcc347] hover:pr-1">
                                مواقع هامة
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
                <p className="text-center text-gray-400 pt-6" data-aos="zoom-in">
                        © 2025 اسم الموقع. جميع الحقوق محفوظة.
                    </p>
        </footer>
    );
}
