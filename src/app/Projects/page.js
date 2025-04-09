"use client"


import React, { useEffect, useState } from 'react';
import Navbar from '../component/navbar';
import Footer from '../component/Footer';
import Baner from '../component/Baner';
import './style.css';
import Image from 'next/image';
import Link from 'next/link';
import { fetchData } from '../utils/apiHelper';

export default function Projects() {
  const [news, setNews] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // جلب الأخبار بناءً على حالة "عرض الكل"
  useEffect(() => {
    const fetchNews = async () => {
      const endpoint = showAll ? '/projects' : '/projects';
      const fetchedNews = await fetchData(endpoint);
      setNews(fetchedNews);
    };

    fetchNews();
  }, [showAll]);

  // تحقق إذا كانت الأخبار موجودة
  if (!news || news.length === 0) {
    return (
      <div className="page">
        <Navbar />
        <Baner titel="الاخبار" uptitle="المركز الإعلامي" />
        <main className="container p-6 mx-auto">
          <h2 className="text-center text-2xl font-bold">لا توجد مشاريع حالياً</h2>
        </main>
        <Footer />
      </div>
    );
  }

  const latestNews = news[0];

  return (
    <div className="page">
      <Navbar />
      <Baner titel="المشاريع" uptitle="مشاريع المحافظة" />
      <main className="container p-6 mx-auto">
        <div className="titel-news">
          <span></span>
          <h2 className="text-3xl font-bold pr-6">المشاريع</h2>
        </div>
        <div className="flex flex-wrap my-4">
          {/* عرض الخبر الأخير */}
          <div className="w-full md:w-1/2 p-4">
            <Image
              className="image-one-news"
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${latestNews.Image}`}
              alt="news"
              width={800}
              height={600}
              quality={100}
            />
            <div className="my-4">
              <Link href={`/Projects/${latestNews.id}`}>
                <h1 className="font-bold text-2xl">{latestNews.Name}</h1>
              </Link>
              <h6>الجهة المنفذة</h6>
              <a href={latestNews.LinkExecutingAuthority} target="_blank"
                rel="noopener noreferrer" className="mt-4 font-normal">{latestNews.ExecutingAuthority}</a>
            </div>
          </div>

          {/* عرض باقي الأخبار */}
          <div className="w-full md:w-1/2 p-4 h-[110vh] overflow-auto">
            {news.map((item, index) => (
              <div className="card-news-list" key={index}>
                <Image
                  className="image-news-list"
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${item.Image}`}
                  alt="news"
                  width={150}
                  height={150}
                  quality={100}
                />
                <Link href={`/Projects/${item.id}`}>
                  <h1 className="font-bold text-2xl">{item.Name}</h1>
                </Link>
              </div>
            ))}

            {/* زر عرض المزيد */}
            {!showAll && (
              <div className="mt-4">
                <button
                  onClick={() => setShowAll(true)}
                  className="text-blue-500 hover:underline font-bold"
                >
                  عرض المزيد
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
