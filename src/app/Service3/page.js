import React from 'react';
import Navbar from '../component/navbar';
import Footer from '../component/Footer';
import Baner from '../component/Baner';



export default function Electronicservices() {
  return (
    <div>
      <Navbar />
      <Baner titel="خدمات الكترونية" uptitle="الخدمات"/>
      <main className="container p-6 mx-auto text-center">
        <h2 className="text-3xl font-bold">مرحبًا بك في الصفحة النافذة الخدمات الالكترونية</h2>
      </main>
      <Footer />
    </div>
  );
}