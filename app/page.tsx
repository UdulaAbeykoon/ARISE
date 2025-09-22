"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterLandingPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      console.log("Newsletter signup:", email)
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Liquid Glass Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-full px-8 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.05),inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-center">
              {/* Navigation Links */}
              <div className="flex items-center space-x-8">
                <a 
                  href="/learn" 
                  className="text-white/80 hover:text-white transition-all duration-300 font-medium text-lg relative group"
                >
                  Learn
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-white/60 to-white/30 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a 
                  href="/download"
                  className="bg-gradient-to-r from-white/20 via-white/10 to-white/5 backdrop-blur-sm text-white border border-white/30 hover:border-white/50 rounded-full px-6 py-2 transition-all duration-300 font-medium text-lg hover:bg-gradient-to-r hover:from-white/30 hover:via-white/15 hover:to-white/10 hover:scale-105 relative overflow-hidden before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:skew-x-12 before:transition-transform before:duration-500 hover:before:translate-x-[100%]"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          ref={(video) => {
            if (video) {
              video.playbackRate = 4.0; // 2x speed
            }
          }}
        >
          <source src="/DEMO.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 shadow-none">
        <div className="w-full text-center">
          <div className="opacity-0 animate-fade-in-up mb-12">
            <img 
              src="/ariselogo.png" 
              alt="ARISE Logo" 
              className="mx-auto h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 2xl:h-72 w-auto object-contain"
            />
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="opacity-0 animate-fade-in-up animate-delay-200 mb-12 mt-8">
              <p className="text-white/85 text-lg font-light tracking-wide leading-relaxed my-0 py-0 px-4">
                The all in one robotics education platform from CAD to visual programming to simulation in a virtual environment and augmented reality.
              </p>
            </div>

            <div className="opacity-0 animate-fade-in-up animate-delay-400">
              {!isSubmitted ? (
                <div className="max-w-sm mx-auto">
                  <Button
                    onClick={() => window.open('https://iabai.itch.io/arise-sim', '_blank')}
                    className="bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl text-white border border-white/30 hover:border-white/50 rounded-full px-12 py-4 transition-all duration-500 font-medium text-lg shadow-[0_8px_32px_rgba(255,255,255,0.1),0_4px_16px_rgba(255,255,255,0.05),inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.15),0_6px_20px_rgba(255,255,255,0.1),inset_0_2px_8px_rgba(255,255,255,0.3)] hover:bg-gradient-to-br hover:from-white/30 hover:via-white/15 hover:to-white/10 relative overflow-hidden before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] before:skew-x-12 before:transition-transform before:duration-700 hover:before:translate-x-[200%] hover:scale-105 cursor-pointer"
                  >
                    Launch Now
                  </Button>
                  <p className="text-sm text-white/60 mt-6 font-light">
                    Download today, open in beta
                  </p>
                </div>
              ) : (
                <div className="max-w-sm mx-auto">
                  <div className="p-8 bg-white/12 backdrop-blur-md rounded-3xl border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.15),0_4px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.05)] relative before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:from-white/8 before:via-transparent before:to-black/5 before:pointer-events-none">
                    <h3 className="font-serif text-3xl text-white mb-4 font-light">Welcome!</h3>
                    <p className="text-white/85 leading-relaxed">
                      Thank you for joining ARISE.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
