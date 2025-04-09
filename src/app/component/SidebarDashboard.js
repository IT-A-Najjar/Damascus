"use client"


import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import arrow from "../../images/Arrow.svg";
import Image from "next/image";
import { fetchData } from "../utils/apiHelper";
import Link from "next/link";
import { usePathname } from "next/navigation";


const SidebarDashboard = () => {
  const [show, setShow] = useState(4);

  const pathname = usePathname();

  const handleMenuClick = (id) => {
    setShow(id);
  };

  return (
    <div className="sid-bare min-h-[70vh]">
      <ul style={{ listStyle: "none", padding: 0 }}>
        <React.Fragment >
          <li
            onClick={() => handleMenuClick(4)}
            style={{
              backgroundColor: pathname === "/Dashboard" ? "#7bbf1e" : "#42790c",
            }}
            className="item-sidebar"
          >
            <Link href="/Dashboard">
              <div className="flex justify-between items-center">
                لوحةالتحكم
                <span
                  style={{
                    transform: pathname === "/Dashboard"
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                  }}
                >
                  <Image src={arrow} alt="arrow" width={30} height={30} />
                </span>
              </div>
            </Link>
          </li>
          <li
            onClick={() => handleMenuClick(1)}
            style={{
              backgroundColor: pathname === "/Dashboard/news" ? "#7bbf1e" : "#42790c",
            }}
            className="item-sidebar"
          >
            <Link href="/Dashboard/news">
              <div className="flex justify-between items-center">
                ادارة الاخبار
                              <span
                  style={{
                    transform: pathname === "/Dashboard/news"
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                  }}
                >
                  <Image src={arrow} alt="arrow" width={30} height={30} />
                </span>
              </div>
            </Link>
          </li>
        </React.Fragment>
        <React.Fragment >
          <li
            onClick={() => handleMenuClick(2)}
            style={{
              backgroundColor: pathname === "/Dashboard/AnnouncementsTypes" ? "#7bbf1e" : "#42790c",
            }}
            className="item-sidebar"
          >
            <Link href="/Dashboard/AnnouncementsTypes">
              <div className="flex justify-between items-center">
                ادارة نوع الإعلان
                <span
                  style={{
                    transform: pathname === "/Dashboard/AnnouncementsTypes"
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                  }}
                >
                  <Image src={arrow} alt="arrow" width={30} height={30} />
                </span>
              </div>
            </Link>
          </li>
        </React.Fragment>
        <React.Fragment >
          <li
            onClick={() => handleMenuClick(3)}
            style={{
              backgroundColor: pathname === "/Dashboard/Announcements" ? "#7bbf1e" : "#42790c",
            }}
            className="item-sidebar"
          >
            <Link href="/Dashboard/Announcements">
              <div className="flex justify-between items-center">
                ادارة الإعلانات
                <span
                  style={{
                    transform: pathname === "/Dashboard/Announcements"
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                  }}
                >
                  <Image src={arrow} alt="arrow" width={30} height={30} />
                </span>
              </div>
            </Link>
          </li>
        </React.Fragment>
        <React.Fragment >
          <li
            onClick={() => handleMenuClick(3)}
            style={{
              backgroundColor: pathname === "/Dashboard/Projects" ? "#7bbf1e" : "#42790c",
            }}
            className="item-sidebar"
          >
            <Link href="/Dashboard/Projects">
              <div className="flex justify-between items-center">
                ادارة المشاريع
                <span
                  style={{
                    transform: pathname === "/Dashboard/Projects"
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                  }}
                >
                  <Image src={arrow} alt="arrow" width={30} height={30} />
                </span>
              </div>
            </Link>
          </li>
        </React.Fragment>
        <React.Fragment >
          <li
            onClick={() => handleMenuClick(3)}
            style={{
              backgroundColor: pathname === "/Dashboard/Decisions" ? "#7bbf1e" : "#42790c",
            }}
            className="item-sidebar"
          >
            <Link href="/Dashboard/Decisions">
              <div className="flex justify-between items-center">
                ادارة القرارات والمراسيم
                <span
                  style={{
                    transform: pathname === "/Dashboard/Decisions"
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                  }}
                >
                  <Image src={arrow} alt="arrow" width={30} height={30} />
                </span>
              </div>
            </Link>
          </li>
        </React.Fragment>
        <React.Fragment >
          <li
            onClick={() => handleMenuClick(3)}
            style={{
              backgroundColor: pathname === "/Dashboard/CitizenServicesTypes" ? "#7bbf1e" : "#42790c",
            }}
            className="item-sidebar"
          >
            <Link href="/Dashboard/CitizenServicesTypes">
              <div className="flex justify-between items-center">
                ادارة نوع الخدمات
                <span
                  style={{
                    transform: pathname === "/Dashboard/CitizenServicesTypes"
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                  }}
                >
                  <Image src={arrow} alt="arrow" width={30} height={30} />
                </span>
              </div>
            </Link>
          </li>
        </React.Fragment>
        <React.Fragment >
          <li
            onClick={() => handleMenuClick(3)}
            style={{
              backgroundColor: pathname === "/Dashboard/ServiceTypesDetails" ? "#7bbf1e" : "#42790c",
            }}
            className="item-sidebar"
          >
            <Link href="/Dashboard/ServiceTypesDetails">
              <div className="flex justify-between items-center">
                ادارة اصناف نوع الخدمة
                <span
                  style={{
                    transform: pathname === "/Dashboard/ServiceTypesDetails"
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                  }}
                >
                  <Image src={arrow} alt="arrow" width={30} height={30} />
                </span>
              </div>
            </Link>
          </li>
        </React.Fragment>
        <React.Fragment >
          <li
            onClick={() => handleMenuClick(3)}
            style={{
              backgroundColor: pathname === "/Dashboard/ServiceDetailsSections" ? "#7bbf1e" : "#42790c",
            }}
            className="item-sidebar"
          >
            <Link href="/Dashboard/ServiceDetailsSections">
              <div className="flex justify-between items-center">
                ادارة اقسام الاصناف
                <span
                  style={{
                    transform: pathname === "/Dashboard/ServiceDetailsSections"
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                  }}
                >
                  <Image src={arrow} alt="arrow" width={30} height={30} />
                </span>
              </div>
            </Link>
          </li>
        </React.Fragment>

      </ul>
    </div>
  );
};

export default SidebarDashboard;
