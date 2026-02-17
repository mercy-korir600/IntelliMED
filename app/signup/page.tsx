'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Eye, EyeOff, ShieldCheck, UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '', // Added field
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 1. Password Match Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please check and try again.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Registration failed')
      }

      localStorage.setItem('auth_token', result.data.access_token)
      router.push('/dashboard')
      
    } catch (err: any) {
      setError(err.message || 'Unable to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-50 via-white to-slate-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-[480px]">
        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Intelli<span className="text-primary">MED</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1 uppercase tracking-[0.15em]">Registration</p>
        </div>

        <Card className="p-8 border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-md bg-white/90 rounded-3xl">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900">Get Started</h2>
            <p className="text-slate-500 text-sm">Create your secure medical provider account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 ml-1 flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-primary" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Dr. Alexander Pierce"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 ml-1 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary" /> Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="pierce@gmail.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 ml-1 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-primary" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
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

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 ml-1 flex items-center gap-2">
             <Lock className="w-3.5 h-3.5 text-primary" />  Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 outline-none transition-all bg-white ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword 
                    ? 'border-red-300 focus:ring-red-100' 
                    : 'border-slate-200 focus:ring-primary/20 focus:border-primary'
                }`}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-xs font-medium text-red-600 animate-in fade-in zoom-in-95">
                {error}
              </div>
            )}

       <Button
  type="submit"
  disabled={isLoading}
  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-7 rounded-xl text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
>
  {isLoading ? (
    <span className="flex items-center gap-3">
      {/* The Spinner */}
      <span className="h-5 w-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
      Processing...
    </span>
  ) : (
    <span className="flex items-center gap-2">
      SignIn
    </span>
  )}
</Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Already using IntelliMED?{' '}
              <Link href="/login" className="text-primary font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}