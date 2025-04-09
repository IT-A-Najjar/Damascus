"use client";


import Navbar from "../component/navbar";
import Baner from "../component/Baner";
import SidebarDashboard from "../component/SidebarDashboard";
import Footer from "../component/Footer";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

// دالة للحصول على اسم الصفحة من الـ URL
const getPageTitle = (pathname) => {
  const pageTitles = {
    "/Dashboard": "الرئيسية",
    "/Dashboard/news": "ادارة الأخبار",
    "/Dashboard/AnnouncementsTypes": "ادارة انواع الإعلانات",
    "/Dashboard/Announcements": "الإعلانات",
    "/Dashboard/Projects": "المشاريع",
    "/Dashboard/Decisions": "القرارات والمراسيم",
    "/Dashboard/CitizenServicesTypes": "نوع الخدمات",
    "/Dashboard/ServiceTypesDetails": "اصناف نوع الخدمات",
  };
  return pageTitles[pathname] || "لوحة التحكم";
};

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);
  return (
    <div>
        <Toaster position="bottom-center" />
      <Navbar />
      <Baner titel={title} uptitle="لوحة التحكم" />
      <div style={{ display: "flex" }}>
        <SidebarDashboard />
        <div style={{ flex: 1, padding: "20px" }}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
