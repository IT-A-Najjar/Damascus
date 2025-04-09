"use client"


import React from 'react';
import Navbar from '../../component/navbar';
import Footer from '../../component/Footer';
import Baner from '../../component/Baner';
import '../style.css';
import Image from 'next/image';
import { fetchData } from '../../utils/apiHelper';

export default async function Datils({ params }) {
  const { id } = params;
  const newsdatils = await fetchData(`/projects/${id}`);

  const latestNews = newsdatils[0];

  return (
    <div className='page'>
      <Navbar />
      <Baner titel="المشاريع" uptitle="مشاريع المحافظة" suptitle={latestNews.Name} />
      <main className="container p-6 mx-auto">
        <div className='titel-news'>
          <span></span>
          <h2 className="text-3xl font-bold pr-6"> الاخبار</h2>
        </div>
        <div className="my-4">
          <Image className='image-one-news-d' src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${latestNews.Image}`} alt='news' width={100}
            height={100}
            layout="intrinsic"
            quality={100} />
          <div className='my-6'>
            <h1 className='font-bold text-3xl'>
              {latestNews.Name}
            </h1>
            <p className='mt-4 font-medium'>
            الجهة المنفذة: 
              {latestNews.ExecutingAuthority}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}