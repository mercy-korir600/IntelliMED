'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart, ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react'

const features = [
  {
    title: "Patient Registration",
    description: "Quick enrollment with comprehensive information capture and digital record creation.",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1200&q=80",
  },
  {
    title: "Vital Tracking",
    description: "Record height, weight, and automatic BMI calculations with real-time health alerts.",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&q=80",
  },
  {
    title: "Health Assessments",
    description: "Tailored assessments and diagnostic tools based on specific patient health status.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80",
  },
  {
    title: "Patient Listing",
    description: "Centralized database to view all patients with health status and historical data.",
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=1200&q=80",
  }
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group transition-all">
            <div className="flex flex-row items-baseline whitespace-nowrap">
              <h1 className="text-5xl font-extrabold text-primary tracking-tight">
                IntelliMED
              </h1>
              <span className="ml-3 text-lg font-bold text-slate-500 uppercase tracking-[0.2em] hidden sm:block">
                Healthcare Management
              </span>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
           
            <Link href="/signup">
              <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 rounded-full px-6">
                Enter System
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="z-10 text-center lg:text-left">
             
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-[1.1]">
                Advanced Patient <span className="text-primary">Intelligence</span> for Modern Clinics.
              </h2>
              <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Empowering healthcare providers with real-time vital tracking, intelligent registration, and comprehensive patient insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/signup">
                  <Button size="lg" className="px-8 py-7 bg-primary hover:bg-primary/90 text-lg rounded-xl shadow-xl shadow-primary/20 group">
                    Enter Portal
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-2xl" />
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80" 
                  alt="Healthcare professional using tablet"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Carousel Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Core Clinical Features</h3>
            <p className="text-lg text-slate-600">Precision tools designed to streamline the entire patient journey from check-in to assessment.</p>
          </div>
          
          <div className="relative group max-w-6xl mx-auto h-[600px] overflow-hidden rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] bg-slate-900">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"
                }`}
              >
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-12 md:p-20">
                  <div className={`transition-all duration-700 delay-300 ${index === currentIndex ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
                    <h4 className="text-4xl md:text-5xl font-bold text-white mb-6">
                      {feature.title}
                    </h4>
                    <p className="text-xl text-slate-200 max-w-2xl leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-8 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-xl p-4 rounded-full text-white transition-all opacity-0 group-hover:opacity-100 border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-8 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-xl p-4 rounded-full text-white transition-all opacity-0 group-hover:opacity-100 border border-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Progress Bars (Bottom) */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-4">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${
                    index === currentIndex ? "bg-white w-16" : "bg-white/30 w-8"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}