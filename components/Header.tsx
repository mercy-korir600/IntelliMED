import Link from 'next/link'
import { Heart, Menu, X } from 'lucide-react' 
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-border/50 bg-gradient-to-r from-primary to-primary/95 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
        <div className="flex items-center justify-between">
          
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight whitespace-nowrap flex items-baseline">
              IntelliMED 
              <span className="hidden sm:block text-[10px] md:text-sm font-medium text-white/80 ml-2 uppercase tracking-widest">
                Healthcare Management
              </span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
              Home
            </Link>
            <Link href="/register" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
              Register
            </Link>
            <Link href="/patients" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
              Patients
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white/90 hover:text-white text-base font-medium border-b border-white/10 pb-2"
            >
              Home
            </Link>
            <Link 
              href="/register" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white/90 hover:text-white text-base font-medium border-b border-white/10 pb-2"
            >
              Register
            </Link>
            <Link 
              href="/patients" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white/90 hover:text-white text-base font-medium pb-2"
            >
              Patients
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}