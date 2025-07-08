"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative bg-gray-200 h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center">
      {/* Background Image with priority loading */}
      <Image
        src="/girl-wearing-earring-img.png"
        alt="Jewellery Model"
        fill
        priority
        className="object-cover opacity-50"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      <div className="relative z-10 bg-white bg-opacity-70 p-4 sm:p-6 md:p-10 rounded-lg text-center mx-4 sm:mx-8 max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">
          Resina Jewellery
        </h1>
        
        <p className="text-gray-600 text-sm sm:text-md mt-2 sm:mt-3">
          Handcrafted resin jewelry preserving nature,<br className="hidden sm:block" /> 
          memories, and meaning. Minimal, personal, timeless
        </p>

        <Link href="/products" className="inline-block mt-3 sm:mt-5">
          <button className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-[#ef67c6] text-white font-semibold rounded-lg hover:bg-[#f42ab7] transition-colors duration-300 text-sm sm:text-base">
            Shop Now
          </button>
        </Link>
      </div>
    </section>
  );
}