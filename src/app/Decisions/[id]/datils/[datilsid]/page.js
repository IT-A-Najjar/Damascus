import React from 'react';
import Navbar from '../../../../component/navbar';
import Footer from '../../../../component/Footer';
import Baner from '../../../../component/Baner';
import '../../../style.css';
import Image from 'next/image';
import im1 from '../../../../../images/news1.jpg'

  export default async function Datils({ params }) {
    console.log(params);
    
  return (
    <div className='page'>
      <Navbar />
      <Baner titel="الاخبار" uptitle="المركز الإعلامي" suptitle="تفاصيل الخبر"/>
      <main className="container p-6 mx-auto">
        <div className='titel-decisions'>
          <span></span>
          <h2 className="text-3xl font-bold pr-6"> الاخبار</h2>
        </div>
        <div className="my-4">
            <Image className='image-one-decisions-d' src={im1} alt='decisions' width={100+"%"}
              height={100+'%'}
              quality={100} />
            <div className='my-6'>
              <h1 className='font-bold text-3xl'>القسام تعرض مشاهد توثق سيطرتها على مسيّرات إسرائيلية برفح</h1>
              <p className='mt-4 font-medium'>
                بثت كتائب القسام، الجناح العسكري لحركة المقاومة الإسلامية (حماس)، مشاهد قالت إنها لاستيلاء مقاتليها على عدد من الطائرات المسيّرة للاحتلال الإسرائيلي في المناطق الشرقية لمدينة رفح جنوبي قطاع غزة.
              </p>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}