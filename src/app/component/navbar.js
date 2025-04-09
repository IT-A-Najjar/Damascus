"use client";




import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import logo from '../../images/logo.png';
import './style.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { fetchData } from "../utils/apiHelper";
import { useRouter } from 'next/navigation';


export default function Navbar() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [services, setIServices] = useState([]);
    const [decision, setIdecision] = useState([]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const getCookie = (name) => {
            const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            return match ? match[2] : null;
        };
        const userToken = getCookie('authToken');
        setToken(userToken);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const logout = async () => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("authToken");
        }
        

        if (!token) {
            setError("لا يوجد مستخدم مسجّل دخول");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "فشل تسجيل الخروج");
            }

            localStorage.removeItem('authToken');
            document.cookie = "authToken=; path=/; max-age=0;";
            router.push("/");
        } catch (err) {
            console.error('Error:', err);
            setError('حدث خطأ أثناء تسجيل الدخول');
        }
    };
    useEffect(() => {
        AOS.init({
            duration: 500,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);
    useEffect(() => {
        // Function to handle scroll event
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true); // إضافة الكلاس عند التمرير لأسفل
            } else {
                setIsScrolled(false); // إزالة الكلاس عند العودة للأعلى
            }
        };

        // إضافة مستمع لحدث التمرير
        window.addEventListener('scroll', handleScroll);

        // تنظيف المستمع عند إلغاء تحميل المكون
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        getData();
        getDatadecision();
    }, []);
    // جلب البيانات
    const getData = async () => {
        try {
            const result = await fetchData('/citizen-services');
            setIServices(result);
            // console.log(result);

        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };
    const getDatadecision = async () => {
        try {
            const result = await fetchData('/decision-types');
            setIdecision(result);
            // console.log(result);

        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };
    return (
        <header data-aos="fade" className={`header-default ${isScrolled ? 'header-visible' : 'header-hidden'} text-white `}>
            <nav
                className={` z-50 flex items-center justify-between w-full px-8 py-4 mx-auto ${isScrolled ? 'bg-white text-black shadow-lg' : 'absolute bg-gradient-to-t from-[#f5ba4500] to-[#00000076]'}`}
            >
                <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-between'>
                        <Image className='scale-125' src={logo} alt="logo" width={100} height={100} />
                        <div className='text-right px-4'>
                            <h1 className="text-lg font-bold mx-4">الجمهورية العربية السورية</h1>
                            <h1 className="text-lg font-bold mx-4">وزارة الاٍدارة المحلية والبيئة</h1>
                            <h1 className="text-lg font-black mx-4">محافظة دمشق</h1>
                        </div>
                    </div>
                    <div className='hidden md:flex justify-center md:justify-between'>
                        <ul className="flex gap-4 font-bold">
                            <li>
                                <Link href="/" className="hover:underline">
                                    الرئيسية
                                </Link>
                            </li>
                            <li>
                                {token ?
                                    <Link href="/Dashboard" className="hover:underline">
                                        لوحة التحكم
                                    </Link>
                                    :
                                    <></>
                                }
                            </li>
                            <li className="group relative pb-2">
                                <Link href="#" className="">
                                    عن المحافظة
                                </Link>
                                {/* قائمة منسدلة */}
                                <ul className="absolute right-[-50px] w-[200px] text-center mt-2 hidden bg-white text-black p-2 rounded-lg group-hover:block">
                                    <div className='absolute top-[-9px] w-full flex justify-center'>
                                        <div className='w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px] border-l-transparent border-r-transparent border-b-white'></div>
                                    </div>
                                    <li>
                                        <Link href="/about/history" className="hover:bg-[#d9d9d9] block px-4 py-2">
                                            محافظة دمشق
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about/vision" className="hover:bg-[#d9d9d9] block px-4 py-2">
                                            المكاتب التنفيذية
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about/goals" className="hover:bg-[#d9d9d9] block px-4 py-2">
                                            عن دمشق
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about/goals" className="hover:bg-[#d9d9d9] block px-4 py-2">
                                            دمشق القديمة
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about/goals" className="hover:bg-[#d9d9d9] block px-4 py-2">
                                            معرض الصور
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about/goals" className="hover:bg-[#d9d9d9] block px-4 py-2">
                                            مفكرة المحافظة
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about/goals" className="hover:bg-[#d9d9d9] block px-4 py-2">
                                            مواقع هامة
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about/goals" className="hover:bg-[#d9d9d9] block px-4 py-2">
                                            اتصل بنا
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="group relative pb-2">
                                <Link href="#" >
                                    المركز الإعلامي
                                </Link>
                                {/* قائمة منسدلة */}
                                <ul className="absolute right-[-50px] w-[200px] text-center mt-2 hidden bg-white text-black p-2 rounded-lg group-hover:block">
                                    <div className='absolute top-[-9px] w-full flex justify-center'>
                                        <div className='w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px] border-l-transparent border-r-transparent border-b-white'></div>
                                    </div>
                                    <li>
                                        <Link href="/news" className="hover:bg-[#d9d9d9] block px-4 py-2">
                                            الاخبار
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/Announcements" className="hover:bg-[#d9d9d9] block px-4 py-2">
                                            الاعلانات
                                        </Link>
                                    </li>

                                </ul>
                            </li>

                            <li>
                                <Link href="/Projects" className="hover:underline">
                                    مشاريع المحافظة
                                </Link>
                            </li>
                            <li className="group relative pb-2">
                                <Link href="#" >
                                    الخدمات
                                </Link>
                                {/* قائمة منسدلة */}
                                <ul className="absolute right-[-80px] w-[200px] text-center mt-2 hidden bg-white text-black p-2 rounded-lg group-hover:block">
                                    <div className='absolute top-[-9px] w-full flex justify-center'>
                                        <div className='w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px] border-l-transparent border-r-transparent border-b-white'></div>
                                    </div>
                                    {services.map((item, index) => (
                                        <li key={index}>
                                            <Link href={{
                                                pathname: `/Service${item.id}`, // يرسل id كجزء من الـ URL
                                                query: { id: item.id } // إرسال id كـ Query Parameter
                                            }} className="hover:bg-[#d9d9d9] block px-4 py-2">
                                                {item.CitizenService}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Link href="/FAQ" className="hover:bg-[#d9d9d9] block px-4 py-2">
                                            اسئلة متكررة
                                        </Link>
                                    </li>

                                </ul>
                            </li>
                            <li className="group relative pb-2">
                                <Link href="#" >
                                    قرارات ومراسيم
                                </Link>
                                {/* قائمة منسدلة */}
                                <ul className="absolute right-[-50px] w-[200px] text-center mt-2 hidden bg-white text-black p-2 rounded-lg group-hover:block">
                                    <div className='absolute top-[-9px] w-full flex justify-center'>
                                        <div className='w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px] border-l-transparent border-r-transparent border-b-white'></div>
                                    </div>
                                    {decision.map((item, index) => (
                                        <li key={index}>
                                            <Link href={{
                                                pathname: `/Decisions/${item.id}`, // يرسل id كجزء من الـ URL
                                            }} className="hover:bg-[#d9d9d9] block px-4 py-2">
                                                {item.DecisionType}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="group relative pb-2">
                                <Link href="#" >
                                    تواصل معنا
                                </Link>
                                <ul className="absolute right-[-50px] w-[200px] text-center mt-2 hidden bg-white text-black p-2 rounded-lg group-hover:block">
                                    <div className='absolute top-[-9px] w-full flex justify-center'>
                                        <div className='w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px] border-l-transparent border-r-transparent border-b-white'></div>
                                    </div>
                                    <li>
                                        <Link href="/Suggestions" className="hover:bg-[#d9d9d9] block px-4 py-2">
                                            الاقتراحات
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/Complaints" className="hover:bg-[#d9d9d9] block px-4 py-2">
                                            الشكاوي
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul className='hidden md:flex justify-center md:justify-between'>
                    <li>
                        {token ?
                            <button href="#" onClick={logout} className="hover:bg-[#d9d9d9] bg-gradient-to-t from-[#497b3b] to-[#8bc27b] p-3 rounded-lg border-l-yellow-300 text-white">
                                تسجيل الخروج
                            </button>
                            :
                            <Link href="/login">
                                <button className="hover:bg-[#d9d9d9] bg-gradient-to-t from-[#497b3b] to-[#8bc27b] p-3 rounded-lg border-l-yellow-300 text-white">
                                    تسجيل الدخول
                                </button>
                            </Link>
                        }
                    </li>
                </ul>
                {/* Burger Icon (only visible on mobile) */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white text-2xl">
                        {isMenuOpen ? 'X' : '☰'}
                    </button>
                </div>
            </nav>
            {/* Mobile Menu (visible only on mobile) */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                <ul className="flex flex-col items-center gap-4 p-4 bg-gradient-to-r from-[#f5b945] to-[#497b3b]">
                    <li>
                        <Link href="/" className="hover:underline">الرئيسية</Link>
                    </li>
                    <li>
                        <Link href="/about" className="hover:underline">عن المحافظة</Link>
                    </li>
                    <li>
                        <Link href="/news" className="hover:underline">اخر الاخبار</Link>
                    </li>
                    <li>
                        <Link href="/projects" className="hover:underline">مشاريع المحافظة</Link>
                    </li>
                    <li>
                        <Link href="/services" className="hover:underline">الخدمات</Link>
                    </li>
                    <li>
                        <Link href="/decisions" className="hover:underline">القرارات</Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:underline">تواصل معنا</Link>
                    </li>
                    <li>
                        <Link href="/login" className="hover:underline">تسجيل الدخول</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
