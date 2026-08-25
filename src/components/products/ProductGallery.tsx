'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const validImages = images && images.length > 0 ? images : ['/placeholder.png'];
  const [selectedImage, setSelectedImage] = useState<string>(validImages[0]);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (validImages.length > 0 && !validImages.includes(selectedImage)) {
      setSelectedImage(validImages[0]);
    }
  }, [validImages, selectedImage]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails list */}
      {validImages.length > 1 && (
        <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[550px] pb-2 md:pb-0 scrollbar-none">
          {validImages.map((img, idx) => {
            const isSelected = (selectedImage || validImages[0]) === img;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                onMouseEnter={() => setSelectedImage(img)}
                className={`relative w-16 h-20 md:w-20 md:h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all bg-stone-100 cursor-pointer ${
                  isSelected
                    ? 'border-[#9E866C] ring-2 ring-[#9E866C]/30 shadow-md scale-102'
                    : 'border-stone-200 opacity-70 hover:opacity-100 hover:border-stone-300'
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} - صورة ${idx + 1}`}
                  fill
                  className="object-cover object-center"
                  sizes="80px"
                />
                <span className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.2 rounded-md">
                  {idx === 0 ? 'رئيسية' : idx === 1 ? 'هوفر' : `${idx + 1}`}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Big Image */}
      <div
        className="relative flex-1 aspect-[3/4] max-h-[600px] w-full rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-xs cursor-zoom-in"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <Image
          src={selectedImage || validImages[0]}
          alt={productName}
          fill
          priority
          className={`object-cover object-center transition-transform duration-300 ${
            isZoomed ? 'scale-125' : 'scale-100'
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-none">
          <span className="bg-black/50 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full">
            {isZoomed ? 'اضغط للتصغير' : 'اضغط للتكبير'}
          </span>
          {validImages.length > 1 && (
            <span className="bg-stone-900/60 backdrop-blur-md text-stone-200 text-[10px] px-2.5 py-1 rounded-full">
              {validImages.indexOf(selectedImage) + 1} / {validImages.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
