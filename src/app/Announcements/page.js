"use client"



import React, { useEffect, useState } from 'react';
import Navbar from '../component/navbar';
import Footer from '../component/Footer';
import Baner from '../component/Baner';
import './style.css';
import Image from 'next/image';
import Link from 'next/link';
import { fetchData } from '../utils/apiHelper';
 // لمنع الـ prerender
export default function Announcements() {
  const [news, setNews] = useState([]);
  const [announcementtypes, setannouncementtypes] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [idtype, setidtype] = useState(1);
  useEffect(() => {
    const fetchNews = async () => {
      const fetchedNews = await fetchData(`/announcements/${idtype}`);
      setNews(fetchedNews);
      console.log('====================================');
      console.log(fetchedNews);
      console.log('====================================');
    };
    const fetchannouncementtypes = async () => {
      const fetchedannouncementtypes = await fetchData('/announcement-types');
      setannouncementtypes(fetchedannouncementtypes);
    };

    fetchNews();
    fetchannouncementtypes();
  }, [showAll, idtype]);

  if (!news || news.length === 0) {
    return (
      <div className="page">
        <Navbar />
        <Baner titel="الإعلانات" uptitle="المركز الإعلامي" />
        <main className="container p-6 mx-auto">
          <div className='titel-news'>
            <span></span>
            {announcementtypes.map((item, index) => (
              <Link href='#' onClick={() => setidtype(item.id)} key={index} className="text-xl font-bold pr-6 hover:pointer-events-auto"> {item.AnnoucementType}</Link>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  const latestNews = news[0];
  return (
    <div className='page'>
      <Navbar />
      <Baner titel="الإعلانات" uptitle="المركز الإعلامي" />
      <main className="container p-6 mx-auto">
        <div className='titel-news'>
          <span></span>
          {announcementtypes.map((item, index) => (
            <Link href='#' onClick={() => setidtype(item.id)} key={index} className="text-xl font-bold pr-6 hover:pointer-events-auto"> {item.AnnoucementType}</Link>
          ))}
        </div>
        <div className="flex flex-wrap my-4">
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
              <Link href={`/Announcements/${latestNews.id}`}>
                <h1 className="font-bold text-2xl">{latestNews.Title}</h1>
              </Link>
              <p className="mt-4 font-normal">{latestNews.Description}</p>
            </div>
          </div>
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
                <Link href={`/Announcements/${item.id}`}>
                  <h1 className="font-bold text-2xl">{item.Title}</h1>
                </Link>
              </div>
            ))}
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