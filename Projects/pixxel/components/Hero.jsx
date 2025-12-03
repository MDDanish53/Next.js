"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const HeroSection = () => {
  const [textVisible, setTextVisible] = useState(false);
  const [demoHovered, setDemoHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="text-center z-10 px-6">
        <div
          className={`transition-all duration-1000 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tight">
            <span className="bg-linear-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Create
            </span>
            <br />
            <span className="text-white">Without Limits</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Professional image editing powered by AI. Crop, resize, adjust
            colors, remove backgrounds, and enhance your images with
            cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link href="/dashboard">
            <Button variant="primary" size="xl">Start Creating</Button>
            </Link>
            <Button variant="glass" size="xl">Watch Demo</Button>
          </div>
        </div>

        {/* Demo Interface */}
         <div
          className={`relative max-w-5xl mx-auto transition-all duration-1000 ${
            textVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
          } ${demoHovered ? "transform scale-[1.02] -translate-y-2" : ""}`}
          onMouseEnter={() => setDemoHovered(true)}
          onMouseLeave={() => setDemoHovered(false)}
        >
          <div className="relative backdrop-blur-xl bg-linear-to-br from-white/10 via-white/5 to-transparent border border-white/20 rounded-3xl p-8 shadow-2xl shadow-black/20 before:absolute before:inset-0 before:rounded-3xl before:bg-linear-to-br before:from-blue-500/10 before:to-purple-500/10 before:opacity-50">
            <div className="relative bg-linear-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 rounded-2xl p-8 min-h-[28rem] border border-slate-700/50">
              <div className="flex items-center justify-between mb-8">
                <div className="flex space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
                </div>
                <div className="text-gray-300 text-sm font-medium tracking-wide">Pixxel Pro</div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: "✂️", label: "Crop" },
                  { icon: "📐", label: "Resize" },
                  { icon: "🎨", label: "Adjust" },
                  { icon: "🤖", label: "AI Tools" },
                ].map((tool, index) => (
                  <div
                    key={index}
                    className="group relative backdrop-blur-sm bg-linear-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-5 text-center hover:from-white/20 hover:to-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-1"
                    title={tool.label}
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>
                    <div className="text-xs text-gray-300 font-medium">{tool.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center">
                <div className="relative w-full h-52 bg-linear-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl shadow-2xl shadow-purple-500/30 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/10 to-transparent"></div>
                  <div className="relative text-white font-bold text-lg tracking-wide">Your Canvas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
