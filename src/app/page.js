
// 

// import React, { useEffect, useState } from "react";
import Navbar from './component/navbar';
import ImageSlider from './component/ImageSlider';
import NewsTicker from './component/NewsTicker';
import NewsGrid from './component/NewsGrid';
import Footer from './component/Footer';
import QuickAccess from './component/QuickAccess';
import WeatherPage from './component/WeatherPage';
import ImageGallery from './component/ImageGallery';
import { fetchData } from "./utils/apiHelper";
import { Suspense } from 'react';

const  Home=()=> {


  const dataProm=fetchData(`/lastnews`);
  // const getData = async () => {
  //   try {
  //     // استدعاء API لجلب البيانات
  //     const result = await fetchData(`/lastnews`);

  //     // معالجة البيانات المسترجعة وتحديث حالة news
  //     const descriptions = result.map(item => item.Title);

  //     setNews(descriptions); // تحديث الحالة بالمصفوفة المعدلة
  //   } catch (error) {
  //     console.error("Failed to fetch data:", error);
  //   }
  // };

  return (
    <div>
      <Navbar />

      <ImageSlider />

      <Suspense fallback={<p > جاري التحميل</p>} >
      <NewsTickerData dataProm={dataProm}/>
      </Suspense>

      <QuickAccess />
      <NewsGrid />
      <WeatherPage />
      <ImageGallery />
      <Footer />
    </div>
  );
}
export default Home

export async function NewsTickerData({ dataProm }) {

  // await new Promise(()=>{
  //   setTimeout(()=>{},2000)
  // }) 
  let descriptions=[]
  const getData=async()=>{
    let result= await dataProm
     descriptions = result.map(item => item.Title);
  }
  await getData()
  return (
    <NewsTicker
      newsItems={descriptions}
      direction="horizontal"
      speed={30}
    />
  )

}
