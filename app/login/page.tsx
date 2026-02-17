'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Eye, EyeOff, ShieldCheck, Activity, AlertCircle } from 'lucide-react'

interface LoginResponse {
  message: string
  success: boolean
  code: number
  data: {
    id: number
    name: string
    email: string
    updated_at: string
    created_at: string
    access_token: string
  }
}

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Replace with your actual environment variable or API URL
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/user/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result: LoginResponse = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Authentication failed. Please check your credentials.')
      }

      // 1. Store the Access Token (Bearer Token)
      localStorage.setItem('auth_token', result.data.access_token)
      
      // 2. Store minimal User info for UI display (optional)
      localStorage.setItem('user_session', JSON.stringify({
        name: result.data.name,
        email: result.data.email
      }))

      // 3. Success Feedback & Redirect
      router.push('/register')
      
    } catch (err: any) {
      setError(err.message || 'Unable to connect to healthcare server.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
      
      <div className="w-full max-w-[440px]">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Intelli<span className="text-primary">MED</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1 uppercase tracking-[0.15em]">
            Healthcare Management
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-10 border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-md bg-white/90 rounded-3xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
            <p className="text-slate-500 text-sm mt-1">Please enter your clinical credentials.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-700 ml-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="doctor@intellimed.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white outline-none transition-all placeholder:text-slate-300 text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <Link href="#" className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white outline-none transition-all placeholder:text-slate-300 text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-xs font-medium text-red-600 flex items-start gap-3 animate-in fade-in zoom-in-95">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-7 rounded-xl text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center gap-3">
                  <span className="h-5 w-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Enter Portal <ShieldCheck className="w-5 h-5" />
                </span>
              )}
            </Button>

<div className="mt-8 pt-6 border-t border-slate-100 text-center">
  <p className="text-sm text-slate-500 font-medium">
    New to the platform?{' '}
    <Link href="/signup" className="text-primary font-bold hover:underline transition-all">
      Create an account
    </Link>
  </p>
</div>

          </form>
        </Card>

        {/* Footer */}
        <div className="mt-10 flex flex-col items-center gap-4">
         
          <p className="text-[10px] text-slate-400 font-medium">
            © {new Date().getFullYear()} INTELLIMED SYSTEMS • SECURE CLINICAL PORTAL
          </p>
        </div>
      </div>
    </div>
  )
}