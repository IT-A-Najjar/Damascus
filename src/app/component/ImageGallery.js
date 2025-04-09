"use client";




import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Image from 'next/image';
import './style.css';
import image1 from '../../images/more/1(10).jpg';
import image2 from '../../images/more/1.jpg';
import image3 from '../../images/more/120(70).jpg';
import image4 from '../../images/more/900_800_0165.jpg';
import image5 from '../../images/more/900_800_546444444.jpg';
import image6 from '../../images/more/900_800_8801222.jpg';


const ImageGallery = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);
    const images = [
        { src: image2, alt: 'Image 2' },
        { src: image3, alt: 'Image 3' },
        { src: image1, alt: 'Image 1' },
        { src: image4, alt: 'Image 4' },
        { src: image5, alt: 'Image 5' },
        { src: image6, alt: 'Image 6' },
        { src: image5, alt: 'Image 5' },
        { src: image1, alt: 'Image 1' },
    ];
    return (
        <div className='page'>
            <h1 className="text-center text-2xl font-bold my-6">معرض الصور</h1>
            <div className="gallery-container">
                {[0, 1, 2].map((columnIndex) => (
                    <div key={columnIndex} className="gallery-column">
                        {images
                            .filter((_, index) => index % 3 === columnIndex)
                            .map((image, index) => (
                                <div key={`${columnIndex}-${index}`} className='image-container'>
                                    <Image
                                        data-aos="fade-up"
                                        src={image.src}
                                        alt={image.alt || `Image ${index}`}
                                        layout="responsive"
                                        width={500}
                                        height={300}
                                        objectFit="cover"
                                        className="gallery-image rounded-2xl"
                                    />
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
