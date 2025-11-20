import Image from "next/image";
import React from "react";
import image from "public/OIP.webp";

const Hero = () => {  
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 -z-10">
        <Image src={image} alt="image" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-900/30"></div>
      </div>
      <div className="flex items-center justify-center h-full px-6">
        <div className="text-center">
          <h1 className="font-bold text-5xl md:text-6xl text-white mb-4 drop-shadow-lg">
            Drone Vendors
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Discover premium drone solutions for all your needs
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
