import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="border-b border-border/50 bg-gradient-to-r from-primary to-primary/95 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        {/* Logo and Brand */}
     <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
  <h1 className="text-4xl font-bold text-white tracking-tight whitespace-nowrap">
    IntelliMED <span className="text-sm font-medium text-white/80 ml-2 uppercase tracking-widest">Healthcare Management</span>
  </h1>
</Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8">
          <Link href="/" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
            Home
          </Link>
          <Link href="/register" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
            Register
          </Link>
          <Link href="/patients" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
            Patients
          </Link>
          <Link href="/register">
            {/* <Button size="sm" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-medium">
              Get Started
            </Button> */}
          </Link>
        </nav>
      </div>
    </header>
  )
}
