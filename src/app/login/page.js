"use client"
import React, { useEffect } from 'react';
import './style.css';
import logo from '../../images/logo.png'
import Image from 'next/image';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // تعطيل الزر

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      console.log(res);
      
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('authToken', data.token);
        document.cookie = `authToken=${data.token}; path=/; max-age=86400;`;
        router.push('/Dashboard');
        toast.success("تم تسجيل الدخول بنجاح");
        toast("أهلاً بك: " + data.user.name);
      } else {
        const error = await res.json();
        setError(error.message || 'حدث خطأ');
        toast.error(error.error);
        console.log(error);
        
      }

    } catch (err) {
      console.error('Error:', err);
      setError('حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false); // إعادة تمكين الزر
    }
  };


  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);
  return (
    <div className="body-login">
      <Toaster position="bottom-center" />
      <div data-aos="fade-left" className="p-6 up-form flex justify-center items-center flex-col bg-white rounded shadow-lg w-96 h-[100vh]">
        <Image className='p-4' src={logo} alt="logo" data-aos="fade" />
        <h2 className="my-4 text-2xl font-bold text-center text-[#42790c]" data-aos="fade">تسجيل الدخول</h2>
        <form className='p-4 w-full' data-aos="fade" onSubmit={handleSubmit}>
          <div className="mb-4">
            {error && <p className="text-red-500">{error}</p>}
            <input
              type="email"
              id="email"
              className="input-form focus:outline-none focus:ring-2 focus:ring-[#42790c]"
              placeholder="أدخل بريدك الإلكتروني"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              className="input-form focus:outline-none focus:ring-2 focus:ring-[#42790c]"
              placeholder="أدخل كلمة المرور"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn-login disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "جاري التحقق..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
}
