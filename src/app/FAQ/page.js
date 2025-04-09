"use client"


import React from 'react';
import Navbar from '../component/navbar';
import Footer from '../component/Footer';
import Baner from '../component/Baner';


export default function FAQ() {
  return (
    <div>
      <Navbar />
      <Baner titel="اسئلة متكررة" uptitle="الخدمات"/>
      <main className="container p-6 mx-auto text-center">
        <h2 className="text-3xl font-bold">مرحبًا بك في الصفحة النافذة الاسئلة المتكررة</h2>
      </main>
      <Footer />
    </div>
  );
}