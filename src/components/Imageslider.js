"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import React, { useEffect, useState } from 'react';

function Imageslider() {
  const [imageSliderData, setImageSliderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/NEB%20Resource%20website/neb-resource/Backend/getResources.php');
        const data = await response.json();
        setImageSliderData(data);
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-0 bg-gray-100 w-full rounded-lg">
      <div className="w-full text-center px-0 mx-0">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          navigation
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          effect="fade"
          className="w-full h-96"
        >
          {imageSliderData.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full group">
                <img
                  src={image.src}
                  alt={`Resource ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 group-hover:opacity-80 transition-opacity duration-300 rounded-lg">
                  <p className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {image.caption}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Imageslider;
