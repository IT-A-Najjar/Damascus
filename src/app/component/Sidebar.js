"use client"


import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import arrow from "../../images/Arrow.svg";
import Image from "next/image";
import { fetchData } from "../utils/apiHelper";


const Sidebar = ({ menus, selectedMenuId, setSelectedMenuId, selectedSubMenuId, setSelectedSubMenuId }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  const handleMenuClick = (menu) => {
    if (menu.id === 4) {
      setShow((prevShow) => !prevShow); // تبديل حالة العرض
      getData(menu.id);
    } else {
      setSelectedMenuId(menu.id);
      setSelectedSubMenuId();
      setShow(false); // إخفاء القائمة إذا كانت ظاهرة
    }
  };

  const getData = async (id) => {
    try {
      const result = await fetchData(`/citizen-service-type-details-of/${id}`);
      setData(result);
      console.log(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <div className="sid-bare">
      <ul style={{ listStyle: "none", padding: 0 }}>
        {menus.map((menu) => (
          <React.Fragment key={menu.id}>
            <li
              onClick={() => handleMenuClick(menu)}
              style={{
                backgroundColor:
                  menu.id === selectedMenuId ? "#7bbf1e" : "#42790c",
              }}
              className="item-sidebar"
            >
              <div className="flex justify-between items-center">
                {menu.CitizenServiceType}
                <span
                  style={{
                    transform:
                      menu.id === selectedMenuId
                        ? "rotate(0deg)"
                        : "rotate(-90deg)",
                  }}
                >
                  <Image src={arrow} alt="arrow" width={30} height={30} />
                </span>
              </div>
            </li>
            {/* عرض المحتوى إذا كان ID = 4 والحالة show true */}
            {menu.id === 4 && show && (
              <ul className="submenu">
                {data.map((item, index) => (
                  <li key={index}
                   onClick={() => {
                    setSelectedMenuId(menu.id);
                    setSelectedSubMenuId(item.id);
                   }}
                    style={{
                      backgroundColor:
                      item.id === selectedSubMenuId ? "#7bbf1e" : "",
                    }}
                    className="item-subbar">
                    {item.ServiceTypeDetail}
                  </li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
