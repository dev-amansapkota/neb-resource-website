"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

function ImageSlider() {
  const [imageSliderData, setImageSliderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost/NEB%20Resource%20website/neb-resource/Backend/getResources.php');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setImageSliderData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching image data:', error);
        setError('Failed to load images. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Placeholder images for loading state
  const placeholders = Array(3).fill(null).map((_, i) => ({
    id: `placeholder-${i}`,
    src: 'https://via.placeholder.com/800x400?text=Loading...',
    caption: 'Loading...'
  }));

  return (
    <section className="py-4 bg-gradient-to-r from-blue-50 to-purple-50 w-full rounded-lg shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Featured Resources</h2>
        
        {error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
            {error}
          </div>
        ) : (
          <div className="w-full text-center rounded-xl overflow-hidden shadow-xl">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              loop
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              effect="fade"
              className="w-full h-96 md:h-[480px] rounded-xl"
            >
              {(isLoading ? placeholders : imageSliderData).map((image, index) => (
                <SwiperSlide key={image.id || index} className="relative">
                  <div className="relative w-full h-full overflow-hidden group">
                    {/* Image with loading state */}
                    <div className="w-full h-full bg-gray-200 animate-pulse absolute">
                      {/* Loading skeleton */}
                    </div>
                    <img
                      src={image.src}
                      alt={`Resource ${index + 1}`}
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                      onLoad={(e) => {
                        e.target.classList.remove('opacity-0');
                        e.target.classList.add('opacity-100');
                      }}
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-xl md:text-3xl font-bold text-white mb-2 opacity-90 group-hover:opacity-100">
                          {image.caption || 'Featured Resource'}
                        </p>
                        {image.description && (
                          <p className="text-sm md:text-base text-white/80 max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {image.description}
                          </p>
                        )}
                        <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transform opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 hover:scale-105">
                          View Resource
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        
        {/* Image thumbnails navigation (optional) */}
        {!isLoading && !error && imageSliderData.length > 0 && (
          <div className="hidden md:flex justify-center mt-4 space-x-2">
            {imageSliderData.slice(0, 5).map((image, index) => (
              <div 
                key={`thumb-${image.id || index}`} 
                className="w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all duration-300"
              >
                <img 
                  src={image.src} 
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ImageSlider;