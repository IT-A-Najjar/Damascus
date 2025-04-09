"use client";




import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";


export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const city = "Damascus";
    const apiKey = "fa960db3850b9486bf7d742a11bd569b"; // استبدل بمفتاحك الخاص
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ar`;

    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        setError("تعذر تحميل بيانات الطقس. حاول مرة أخرى لاحقًا.");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <div>جاري تحميل البيانات...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!weatherData) {
    return <div>تعذر تحميل بيانات الطقس. حاول مرة أخرى لاحقًا.</div>;
  }

  const description = weatherData.weather[0]?.description || "غير متاح";
  const temp = Math.round(weatherData.main?.temp || 0); // درجة الحرارة الحالية

  return (
    <div id="weather"
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#42790c",
        color: "#fff",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h4>حالة الطقس في دمشق</h4>
        <Image
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`}
          alt={description}
          width={50}
          height={50}
        />
        <p>{description}</p>
        <p>°C {temp}</p>
      </div>
    </div>
  );
}
