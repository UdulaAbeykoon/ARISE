"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [rating, setRating] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [showError, setShowError] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const carouselImages = ['/1.png', '/2.png', '/3.png'];

  // Ensure hydration consistency
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-transition carousel every 5 seconds
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length, isClient]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isClient) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isClient]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    
    // Validate form fields (only name and rating are required)
    if (!name.trim() || rating === 0) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    // If validation passes, show success toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isClient) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 4;
    const rotateY = (centerX - x) / 4;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isClient) return;
    
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div className="font-sans">
      {/* Hamburger Menu */}
      <div ref={menuRef} className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-md rounded-full p-3 border border-gray-700/50 text-white hover:text-purple-200 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Horizontal Dropdown Menu on Click */}
        <div className={`absolute top-1/2 right-full -translate-y-1/2 mr-2 transform transition-all duration-300 bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-md rounded-2xl border border-gray-700/50 overflow-hidden ${
          isClient && isMenuOpen 
            ? 'opacity-100 translate-x-0 pointer-events-auto' 
            : 'opacity-0 translate-x-[10px] pointer-events-none'
        }`}>
          <ul className="flex">
            <li>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center px-4 py-3 text-white hover:text-purple-200 hover:bg-white/10 transition-all duration-200 font-medium whitespace-nowrap"
                title="Home"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </button>
            </li>
            <li>
              <a 
                href="#about" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-white hover:text-purple-200 hover:bg-white/10 transition-all duration-200 font-medium whitespace-nowrap"
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#features" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-white hover:text-purple-200 hover:bg-white/10 transition-all duration-200 font-medium whitespace-nowrap"
              >
                Features
              </a>
            </li>
            <li>
              <a 
                href="#faq" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-white hover:text-purple-200 hover:bg-white/10 transition-all duration-200 font-medium whitespace-nowrap"
              >
                FAQ
              </a>
            </li>
            <li>
              <a 
                href="#review" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-white hover:text-purple-200 hover:bg-white/10 transition-all duration-200 font-medium whitespace-nowrap"
              >
                Leave a Review
              </a>
            </li>
            <li>
              <a 
                href="#team" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-white hover:text-purple-200 hover:bg-white/10 transition-all duration-200 font-medium whitespace-nowrap"
              >
                Team
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Purple gradient section */}
      <div className="min-h-screen bg-gradient-to-br from-[#9E72C3] via-[#7338A0] to-[#0F0529] relative">
        <main className="flex flex-col items-center justify-center min-h-screen px-8 sm:px-20">
          <div className="flex flex-col gap-8 items-center">
            <Image
              src="/ARISELOGO.png"
              alt="ARISE Logo"
              width={600}
              height={300}
              priority
              className="object-contain"
            />
            <div className="relative group">
              <button 
                onClick={() => window.open('https://iabai.itch.io/fll-sim', '_blank')}
                className="w-[600px] bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold text-xl py-4 px-8 rounded-2xl group-hover:rounded-t-2xl group-hover:rounded-b-none transition-all duration-200 transform hover:scale-105 border border-white/30 group-hover:border-b-0"
              >
                Launch Mission
              </button>
              {/* Connected dropdown on hover */}
              <div className="absolute top-full left-0 w-[600px] opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                <div className="w-full bg-white/20 backdrop-blur-sm text-white text-center py-3 px-6 rounded-b-2xl border border-white/30 border-t-0">
                  The first version of ARISE is out now! Try it out!
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Flipped wave transition at the bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg
            className="relative block w-full h-24 sm:h-32 md:h-40"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="fill-white"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="fill-white"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </div>
      
      {/* About section */}
      <div id="about" className="min-h-screen bg-white">
        <div className="px-8 sm:px-20 py-16">
          <div className="max-w-7xl mx-auto">
            {/* Centered Title */}
            <div className="text-center mb-16">
              <h2 className="text-gray-900 text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">
                Augmented Robotics Integrated<br />
                Simulation Environment
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left side - About content */}
              <div className="flex flex-col justify-center">
                <p className="text-gray-600 text-xl sm:text-2xl leading-relaxed">
                  ARISE is an educational robotics simulator designed to teach students how to build and program LEGO FLL-style robots in a virtual classroom environment. It combines hands-on learning with accessible technology, making STEM education more engaging and scalable for schools. The platform supports classroom collaboration, custom challenges, and integrates key programming concepts.
                </p>
              </div>

              {/* Right side - Image Carousel */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl bg-gray-100 aspect-video">
                  {isClient && (
                    <Image
                      src={carouselImages[currentImage]}
                      alt={`ARISE Screenshot ${currentImage + 1}`}
                      fill
                      className="object-cover transition-all duration-500"
                      priority
                    />
                  )}
                  
                  {/* Carousel Navigation */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Dots indicator */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {carouselImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          isClient && index === currentImage 
                            ? 'bg-white scale-110' 
                            : 'bg-white/60 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div id="features" className="min-h-screen bg-gradient-to-br from-[#9E72C3] via-[#7338A0] to-[#0F0529]">
        <div className="px-8 sm:px-20 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left side - Features description */}
              <div className="flex flex-col justify-center h-full min-h-[600px]">
                <h3 className="text-purple-200 text-lg font-medium mb-4">Key</h3>
                <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">Features</h2>
                <p className="text-purple-100 text-lg sm:text-xl leading-relaxed">
                  This simulation app is a game-changer, setting a new standard for creativity, innovation, and hands-on learning. It's designed to ignite imagination and bring the future of robotics to life. Get ready to build, code, and explore in ways you've never seen before.
                </p>
              </div>

              {/* Right side - Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {/* Feature 1 */}
                <div 
                  className="bg-white rounded-3xl p-6 h-80 flex flex-col border border-gray-200 relative transition-all duration-300 ease-out cursor-pointer"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex items-start mb-4">
                    <div className="mr-4">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="7" height="7"/>
                        <rect x="14" y="3" width="7" height="7"/>
                        <rect x="14" y="14" width="7" height="7"/>
                        <rect x="3" y="14" width="7" height="7"/>
                      </svg>
                    </div>
                    <span className="text-4xl font-light text-gray-300 ml-auto">01</span>
                  </div>
                  <h3 className="text-gray-900 text-xl font-bold mb-3">Block Coding Made Easy</h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    Create powerful programs using a drag-and-drop block coding UI, inspired by Scratch programming.
                  </p>
                </div>

                {/* Feature 2 */}
                <div 
                  className="bg-white rounded-3xl p-6 h-80 flex flex-col border border-gray-200 relative transition-all duration-300 ease-out cursor-pointer"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex items-start mb-4">
                    <div className="mr-4">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                      </svg>
                    </div>
                    <span className="text-4xl font-light text-gray-300 ml-auto">02</span>
                  </div>
                  <h3 className="text-gray-900 text-xl font-bold mb-3">Build Your Robot</h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    Design and build your own 3D robot using a library of LEGO parts. Customize it the way you want!
                  </p>
                </div>

                {/* Feature 3 */}
                <div 
                  className="bg-white rounded-3xl p-6 h-80 flex flex-col border border-gray-200 relative transition-all duration-300 ease-out cursor-pointer"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex items-start mb-4">
                    <div className="mr-4">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="2" y1="12" x2="22" y2="12"/>
                        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                      </svg>
                    </div>
                    <span className="text-4xl font-light text-gray-300 ml-auto">03</span>
                  </div>
                  <h3 className="text-gray-900 text-xl font-bold mb-3">Test in Virtual Worlds</h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    Watch your robot come to life in a dynamic 3D environment. See how your code works in real-time.
                  </p>
                </div>

                {/* Feature 4 */}
                <div 
                  className="bg-white rounded-3xl p-6 h-80 flex flex-col border border-gray-200 relative transition-all duration-300 ease-out cursor-pointer"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex items-start mb-4">
                    <div className="mr-4 flex items-center gap-2">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/>
                        <line x1="12" y1="22" x2="12" y2="15.5"/>
                        <polyline points="22,8.5 12,15.5 2,8.5"/>
                        <polyline points="2,15.5 12,8.5 22,15.5"/>
                        <polyline points="12,2 12,8.5"/>
                      </svg>
                      <span className="text-sm text-gray-400 font-medium">coming soon</span>
                    </div>
                    <span className="text-4xl font-light text-gray-300 ml-auto">04</span>
                  </div>
                  <h3 className="text-gray-900 text-xl font-bold mb-3">Augmented Reality Adventure</h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    Switch to AR mode and run your robot in real-world spaces through your camera. Turn your home, school, or backyard into your own robotics playground!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="min-h-screen bg-gray-50">
        <div className="px-8 sm:px-20 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-purple-600 text-lg font-medium mb-4">Questions</h3>
              <h2 className="text-gray-900 text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">FAQ</h2>
              <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                Got questions about ARISE? Here are some of the most frequently asked questions to help you get started.
              </p>
            </div>

            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(1)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-gray-900 text-xl font-bold">What age group is ARISE designed for?</h3>
                  <svg
                    className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                      isClient && openFAQ === 1 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isClient && openFAQ === 1 && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      ARISE is designed for students aged 8-18, but it's also perfect for educators, hobbyists, and anyone interested in learning robotics and programming in an engaging, visual way.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(2)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-gray-900 text-xl font-bold">Do I need any prior programming experience?</h3>
                  <svg
                    className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                      isClient && openFAQ === 2 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isClient && openFAQ === 2 && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      Not at all! ARISE uses a drag-and-drop block coding interface inspired by Scratch, making it easy for beginners to start programming immediately while still being powerful enough for advanced users.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(3)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-gray-900 text-xl font-bold">What devices does ARISE work on?</h3>
                  <svg
                    className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                      isClient && openFAQ === 3 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isClient && openFAQ === 3 && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      ARISE works on tablets, computers, and smartphones. For the best AR experience, we recommend using a device with a good camera and sufficient processing power.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(4)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-gray-900 text-xl font-bold">Can I use ARISE without AR features?</h3>
                  <svg
                    className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                      isClient && openFAQ === 4 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isClient && openFAQ === 4 && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      Absolutely! While AR adds an exciting dimension, you can build, code, and test your robots entirely in the virtual 3D environment without needing AR capabilities. Note: AR features are still under development.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 5 */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(5)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-gray-900 text-xl font-bold">Is ARISE suitable for classroom use?</h3>
                  <svg
                    className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                      isClient && openFAQ === 5 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isClient && openFAQ === 5 && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      Yes! ARISE is perfect for STEM education, offering lesson plans, progress tracking, and collaborative features that make it ideal for classroom learning and group projects.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leave a Review Section */}
      <div id="review" className="min-h-screen bg-gradient-to-br from-[#9E72C3] via-[#7338A0] to-[#0F0529]">
        <div className="px-8 sm:px-20 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-purple-200 text-lg font-medium mb-4">Feedback</h3>
              <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">Leave a Review</h2>
              <p className="text-purple-100 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                We are still in the beta version of ARISE and are constantly looking for ways to improve! Let us know what you think.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-white/20">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-white text-lg font-medium mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-200 text-white placeholder-purple-200"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-white text-lg font-medium mb-3">
                    Rating
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-3xl transition-colors duration-200 ${
                          star <= rating ? 'text-yellow-400' : 'text-white/40 hover:text-yellow-400'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review */}
                <div>
                  <label htmlFor="review" className="block text-white text-lg font-medium mb-3">
                    Your Review
                  </label>
                  <textarea
                    id="review"
                    name="review"
                    rows={6}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-200 resize-none text-white placeholder-purple-200"
                    placeholder="Tell us about your experience with ARISE..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 border border-white/30"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div id="team" className="bg-gray-50 relative py-16">
        <div className="px-8 sm:px-20 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-gray-900 text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">The Team</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto mb-16">
              {/* Team Member 1 - Udula */}
              <div 
                className="bg-white rounded-3xl p-8 border border-gray-200 text-center relative transition-all duration-300 ease-out cursor-pointer"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <button 
                  className="absolute top-4 right-4 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => window.open('https://www.linkedin.com/in/udula-abeykoon/', '_blank')}
                  title="View Udula's LinkedIn Profile"
                >
                  <svg className="w-6 h-6 text-gray-400 hover:text-blue-600 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src="/udula.png"
                      alt="Udula Abeykoon"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-gray-900 text-xl font-bold mb-2">Udula Abeykoon</h3>
                  <p className="text-gray-500 text-sm font-medium">CEO</p>
                </div>
              </div>

              {/* Team Member 2 - Enhe */}
              <div 
                className="bg-white rounded-3xl p-8 border border-gray-200 text-center relative transition-all duration-300 ease-out cursor-pointer"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <button 
                  className="absolute top-4 right-4 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => window.open('https://www.linkedin.com/in/enhe-bai-64b068313/', '_blank')}
                  title="View Enhe's LinkedIn Profile"
                >
                  <svg className="w-6 h-6 text-gray-400 hover:text-blue-600 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src="/enhe.png"
                      alt="Enhe Bai"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-gray-900 text-xl font-bold mb-2">Enhe Bai</h3>
                  <p className="text-gray-500 text-sm font-medium">CTO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4 rounded-2xl shadow-lg transform transition-all duration-300 ease-in-out">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Thanks for the feedback!</p>
              <p className="text-sm text-purple-100">We appreciate your review.</p>
            </div>
          </div>
          {/* Speech bubble tail */}
          <div className="absolute bottom-0 right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-purple-700 transform translate-y-full"></div>
        </div>
      )}

      {/* Error Notification */}
      {showError && (
        <div className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-2xl shadow-lg transform transition-all duration-300 ease-in-out">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Please fill out all fields!</p>
              <p className="text-sm text-red-100">Name, rating, and review are required.</p>
            </div>
          </div>
          {/* Speech bubble tail */}
          <div className="absolute bottom-0 right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-700 transform translate-y-full"></div>
        </div>
      )}
    </div>
  );
}
