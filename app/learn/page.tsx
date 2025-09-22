"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"

interface TimelineStep {
  id: number
  title: string
  level: string
  duration: string
  date: string
  description: string
  topics: string[]
  color: string
  bgGradient: string
  iconGradient: string
  status: 'completed' | 'active' | 'upcoming'
}

export default function LearnPage() {
  const [expandedStep, setExpandedStep] = useState<number | null>(5) // Start with Pilots Kickoff expanded

  const steps: TimelineStep[] = [
    {
      id: 1,
      title: "Ideate",
      level: "Foundation",
      duration: "1 month",
      date: "May 2024",
      description: "Proof of concept development, establishing viable tech stack, and setting project timeline. The foundational phase where ARISE's vision was crystallized.",
      topics: ["Proof of concept", "Viable tech stack", "Setting timeline"],
      color: "blue",
      bgGradient: "from-blue-500/20 via-cyan-500/10 to-purple-500/20",
      iconGradient: "from-blue-400 to-cyan-400",
      status: "completed"
    },
    {
      id: 2,
      title: "Development",
      level: "Build",
      duration: "1 month", 
      date: "June 2024",
      description: "Scripting, building and testing software infrastructure. Growing early interest with 100 users on waitlist and 20 primary school letters of intent.",
      topics: ["Scripting & building software", "Testing infrastructure", "100 on waitlist", "20 primary school LOI's"],
      color: "purple",
      bgGradient: "from-purple-500/20 via-pink-500/10 to-indigo-500/20",
      iconGradient: "from-purple-400 to-pink-400",
      status: "completed"
    },
    {
      id: 3,
      title: "Beta Launch",
      level: "Testing",
      duration: "1 month",
      date: "July 2024",
      description: "Public beta release achieving significant traction with 4,500 site visits and 85 active beta testers providing valuable feedback.",
      topics: ["4,500 site visits", "85 active beta testers", "User feedback collection", "Platform optimization"],
      color: "orange",
      bgGradient: "from-orange-500/20 via-yellow-500/10 to-red-500/20",
      iconGradient: "from-orange-400 to-yellow-400",
      status: "completed"
    },
    {
      id: 4,
      title: "Commercialization", 
      level: "Scale",
      duration: "1 month",
      date: "August 2024",
      description: "Classroom dashboard development, SSO pilot readiness, and building school partnerships with 5 schools queued for implementation.",
      topics: ["Classroom dashboard", "SSO pilot ready", "5 schools queued", "Partnership development"],
      color: "green",
      bgGradient: "from-green-500/20 via-emerald-500/10 to-teal-500/20",
      iconGradient: "from-green-400 to-emerald-400",
      status: "completed"
    },
    {
      id: 5,
      title: "Pilots Kickoff",
      level: "Deploy",
      duration: "6 weeks",
      date: "September 2024",
      description: "6 week cohorts scheduled with 50+ teachers. Targets set for 70%+ Weekly Active Users (WAU) to measure engagement and success.",
      topics: ["6 week cohorts with 50+ teachers", "Targets set (70%+ WAU)", "Teacher training programs", "Success metrics tracking"],
      color: "cyan",
      bgGradient: "from-cyan-500/20 via-teal-500/10 to-blue-500/20",
      iconGradient: "from-cyan-400 to-teal-400",
      status: "active"
    }
  ]

  const toggleStep = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? null : stepId)
  }

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
                  className="text-white hover:text-white/80 transition-all duration-300 font-normal text-lg relative group"
                >
                  Learn
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-white/60 to-white/30"></span>
                </a>
                <a 
                  href="/download"
                  className="bg-gradient-to-r from-white/20 via-white/10 to-white/5 backdrop-blur-sm text-white border border-white/30 hover:border-white/50 rounded-full px-8 py-3 transition-all duration-300 font-normal text-lg hover:bg-gradient-to-r hover:from-white/30 hover:via-white/15 hover:to-white/10 hover:scale-105 relative overflow-hidden before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:skew-x-12 before:transition-transform before:duration-500 hover:before:translate-x-[100%]"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen bg-transparent text-white">
        {/* Hero Section - ARISE Story */}
        <section className="pt-32 pb-16 px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <img 
                src="/ariselogo.png" 
                alt="ARISE Logo" 
                className="mx-auto h-20 w-auto object-contain mb-8 animate-float"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-light text-white mb-8 animate-fade-in-up">
              How ARISE Began
            </h1>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-white/80 leading-relaxed animate-fade-in-up animate-delay-200">
              <p>
                ARISE started as a simple idea: <span className="text-white">make robotics education accessible to everyone</span>. 
                In 2020, we started the Scarborough Stem Alliance (SSA) which was a non profit organization dedicated to creating opportunities for students and youth to get free hands on STEM education specifically with robotics. 
              </p>
              <p>
                After hosting over 100 workshops globally, impacting over 10,000 youth, and distributing robotics kits all around the world, we noticed something that our efforts didn't address. Robotics is an iterative process and you learn from doing and failing hundreds of times. More often than not, children typically won't grasp the content by attending one or two workshops. Physical robotics kits, especially ones we were conducting the workshops with: lego spike prime kits would cost anywhere between $500-1000 with expansion kits and other equipment. This was a huge barrier for many students and schools, especially in low income areas. So we created ARISE, the all in one robotics education platform.
              </p>
              <p>
                Our founders, passionate about both education and technology, envisioned a platform where 
                <span className="text-blue-400"> drag-and-drop simplicity meets professional-grade simulation</span>. 
                From late-night coding sessions to partnerships with leading educational institutions, 
                ARISE has grown into a comprehensive robotics learning ecosystem.
              </p>
              <p className="text-xl text-blue-300 font-normal">
                Today, we're empowering thousands of students worldwide to build, program, and deploy robots 
                without the traditional barriers of entry.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="pb-20 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-light text-center text-white mb-16">
              Company Timeline
            </h2>
            {/* Timeline Header */}
            <div className="relative mb-16">
              
              {/* Timeline Steps - Clean design with liquid glass beam */}
              <div className="flex justify-between items-center relative px-16">
                {/* Liquid Glass Timeline Line - connects all numbers from 1 to 4 */}
                <div className="absolute top-1/2 h-0.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full transform -translate-y-1/2 z-0 shadow-[0_0_10px_rgba(255,255,255,0.1)]" 
                     style={{ left: '12.5%', right: '12.5%' }}></div>
                
                {/* Animated Liquid Glass Beam - extends full line */}
                <div className="absolute top-1/2 h-0.5 transform -translate-y-1/2 z-10 overflow-hidden"
                     style={{ left: '12.5%', right: '12.5%' }}>
                  <div className="h-full animate-beam-slide-full"></div>
                </div>

                {steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center relative z-20">
                    {/* Date */}
                    <div className="mb-8 text-center">
                      <span className="text-sm text-white/60 font-normal">
                        {step.date}
                      </span>
                    </div>

                    {/* Clickable Circle */}
                    <button
                      onClick={() => toggleStep(step.id)}
                      className={`
                        w-12 h-12 rounded-full border-2 flex items-center justify-center relative
                        transition-all duration-300 hover:scale-110 cursor-pointer z-30
                        backdrop-blur-sm shadow-lg hover:shadow-xl
                        ${expandedStep === step.id
                          ? 'bg-yellow-400 border-yellow-400 text-black hover:bg-yellow-300 hover:shadow-yellow-400/30'
                          : 'bg-black border-white/40 text-white hover:border-white/60 hover:bg-gray-900'
                        }
                      `}
                    >
                      <span className="text-base font-normal">{step.id}</span>
                    </button>

                    {/* Title */}
                    <div className="mt-8 text-center">
                      <h3 className="text-white font-normal text-base whitespace-nowrap">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expandable Content */}
            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.id}>
                  {expandedStep === step.id && (
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                      {/* Header */}
                      <div className="flex items-center justify-between p-8 border-b border-white/10">
                        <div className="flex items-center space-x-4">
                          <h2 className="text-2xl font-normal text-white">{step.title}</h2>
                          {step.status === 'active' && (
                            <span className="text-yellow-400 text-lg">✏️</span>
                          )}
                        </div>
                        <button
                          onClick={() => setExpandedStep(null)}
                          className="text-white/60 hover:text-white transition-colors text-xl"
                        >
                          ↑
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        <p className="text-white/80 text-lg mb-8 leading-relaxed border border-white/10 rounded-lg p-6 bg-white/5">
                          {step.description}
                        </p>

                        {/* Key Achievements */}
                        <div className="space-y-4">
                          <h3 className="text-white font-normal text-lg mb-4">Key Achievements:</h3>
                          <div className="grid gap-3">
                            {step.topics.map((topic, index) => (
                              <div key={index} className="flex items-center text-white/80">
                                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-4 flex-shrink-0"></span>
                                <span className="text-base">{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>          {/* Call to Action */}
          <div className="mt-20 text-center">
            <Button
              onClick={() => window.open('https://iabai.itch.io/arise-sim', '_blank')}
              className="bg-white text-black hover:bg-white/90 px-8 py-4 rounded-lg text-lg font-normal transition-all duration-300 hover:scale-105"
            >
              Join Our Journey
            </Button>
          </div>
        </div>
      </section>
      </div>
    </main>
  )
}
