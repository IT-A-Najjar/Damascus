"use client";



import { useState, useEffect } from "react";
import Image from "next/image";
import image1 from "../../images/image1.jpg";
import image2 from "../../images/image2.jpg";
import image3 from "../../images/image3.jpg";


// Image data array
const images = [
  {
    src: image1,
    titel: "المسجد الاموي",
  },
  {
    src: image2,
    titel: "سوق الحميدية",
  },
  {
    src: image3,
    titel: "دمشق القديمة",
  },
  {
    src: image2,
    titel: "تراث دمشق",
  },
];
function typeWriterEffect(text, speed, callback) {
  let index = 0;
  const result = [];

  const intervalId = setInterval(() => {
    result.push(text[index]);
    index += 1;

    // Call callback with the updated text
    if (callback) callback(result.join(""));

    // Stop when the text is fully typed
    if (index === text.length) {
      clearInterval(intervalId);
    }
  }, speed);
}
export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isHovered, setIsHovered] = useState(false);



  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    setTypedText(""); // Clear the text before starting the typing effect
    typeWriterEffect(images[currentIndex].titel, 100, (newText) => setTypedText(newText));
  }, [currentIndex]);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      {/* Slider Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(+${currentIndex * 100}%)`,
        }}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="min-w-full h-[100vh] relative"
          >
            <Image
              src={image.src}
              alt={`Slider Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="transition-all duration-500 ease-in-out"
            />
            <div
              className={`absolute ${currentIndex % 2 === 0 ? "right-3/4" : "left-3/4"
                } top-3/4 text-white transform -translate-y-1/2  p-4 rounded-2xl`}
            >
              <h1
                className="text-5xl m-8 font-bold text-center"
                style={{ textShadow: "-5px 5px 10px black" }}
              >
                {typedText}
              </h1>

            </div>
          </div>
        ))}
      </div>

      {/*
      <div className="absolute inset-0 flex justify-between items-center px-4">
        <button
          onClick={prevSlide}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          {"<"}
        </button>
        <button
          onClick={nextSlide}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          {">"}
        </button>
      </div> */}

      {/* Indicators */}
      <div className="flex justify-center mt-4 absolute w-full bottom-4 z-10">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-6 mx-1 ${index === currentIndex ? "bg-[#8bc27b]" : "bg-white"
              } rounded-full transition-all duration-300`}
          ></div>
        ))}
      </div>
    </div>
  );
}
