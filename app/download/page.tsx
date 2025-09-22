"use client"

import React from "react"
import { Button } from "@/components/ui/button"

export default function DownloadPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-yellow-900/50 to-yellow-400">
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-yellow-800/60 to-yellow-500/80"></div>
      
      {/* Liquid Glass Effect Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-yellow-200/10 backdrop-blur-sm"></div>

      {/* Liquid Glass Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-full px-10 py-5 shadow-[0_8px_32px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.05),inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-12">
                <a 
                  href="/" 
                  className="text-white/80 hover:text-white transition-all duration-300 font-normal text-lg relative group"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-white/60 to-white/30 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a 
                  href="/learn" 
                  className="text-white/80 hover:text-white transition-all duration-300 font-normal text-lg relative group"
                >
                  Learn
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-white/60 to-white/30 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a 
                  href="/download" 
                  className="text-white hover:text-white/80 transition-all duration-300 font-normal text-lg relative group"
                >
                  Download
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-white/60 to-white/30"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen bg-transparent text-white">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <img 
                src="/ariselogo.png" 
                alt="ARISE Logo" 
                className="mx-auto h-20 w-auto object-contain mb-8 animate-float"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 animate-fade-in-up tracking-tight">
              Download ARISE
            </h1>
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Get started with ARISE robotics simulation platform. Build, program, and deploy robots without traditional barriers.
            </p>

            {/* Download Options */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              {/* Windows Download */}
              <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.05),inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:border-white/30 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <img 
                      src="/windows.png" 
                      alt="Windows Logo" 
                      className="w-8 h-8 text-white"
                      style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">Windows</h3>
                  <p className="text-white/70 mb-6 font-light">Complete ARISE robotics simulation platform for Windows 10/11</p>
                  <a 
                    href="/ARISE win.zip" 
                    download="ARISE-Windows.zip"
                    className="inline-block"
                  >
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-normal px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                      Download for Windows
                    </Button>
                  </a>
                  <p className="text-sm text-white/50 mt-4 font-light">Windows 10/11 • 64-bit</p>
                </div>
              </div>

              {/* macOS Download */}
              <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.05),inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:border-white/30 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <img 
                      src="/apple.png" 
                      alt="Apple Logo" 
                      className="w-8 h-8"
                      style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">macOS (Silicon)</h3>
                  <p className="text-white/70 mb-6 font-light">Optimized for Apple Silicon M1/M2/M3 processors</p>
                  <a 
                    href="/ARISE mac.zip" 
                    download="ARISE-macOS.zip"
                    className="inline-block"
                  >
                    <Button className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-400 hover:to-gray-500 text-white font-normal px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-gray-500/25">
                      Download for macOS
                    </Button>
                  </a>
                  <p className="text-sm text-white/50 mt-4 font-light">macOS 12+ • Apple Silicon</p>
                </div>
              </div>
            </div>

            {/* System Requirements */}
          
          </div>
        </section>
      </div>
    </main>
  )
}