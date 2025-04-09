"use client"


import React from 'react';
import Navbar from '../component/navbar';



export default function About() {
  return (
    <div>
      <Navbar />
      <main className="container p-6 mx-auto text-center">
        <h2 className="text-3xl font-bold">مرحبًا بك في الصفحة عن المحافظة</h2>
      </main>
    </div>
  );
}
