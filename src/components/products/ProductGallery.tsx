'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>(images[0] || '');
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails list */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[550px] pb-2 md:pb-0 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`relative w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all bg-stone-100 ${
                (selectedImage || images[0]) === img
                  ? 'border-[#9E866C] ring-2 ring-[#9E866C]/20 shadow-xs'
                  : 'border-stone-200 opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${productName} - صورة ${idx + 1}`}
                fill
                className="object-cover object-center"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Big Image */}
      <div
        className="relative flex-1 aspect-[3/4] max-h-[600px] w-full rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-xs cursor-zoom-in"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <Image
          src={selectedImage || images[0]}
          alt={productName}
          fill
          priority
          className={`object-cover object-center transition-transform duration-300 ${
            isZoomed ? 'scale-125' : 'scale-100'
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <span className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full pointer-events-none">
          {isZoomed ? 'اضغط للتصغير' : 'اضغط للتكبير'}
        </span>
      </div>
    </div>
  );
}
