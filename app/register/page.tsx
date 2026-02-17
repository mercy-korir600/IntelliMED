'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/Header'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    patientNo: '',
    registrationDate: new Date().toISOString().split('T')[0],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
  
    if (name === 'dateOfBirth') {
      const selectedDate = new Date(value)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate > today) {
        return 
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    const patientData = {
      ...formData,
      id: Date.now(),
      registeredAt: new Date().toISOString(),
    }
    
    sessionStorage.setItem('currentPatient', JSON.stringify(patientData))
    
    console.log('Patient registered:', patientData)
    
    router.push('/vitals')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl  mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">Patient Registration</h2>
          <p className="text-muted-foreground">Enter patient information to register a new patient</p>
        </div>

        <Card className="p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Section */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="middleName" className="block text-sm font-medium text-foreground mb-2">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    placeholder="(Optional)"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

          {/* Gender and DOB */}
<div className="grid md:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium text-foreground mb-3">
      Gender *
    </label>
    <div className="flex items-center gap-6 mt-2">
      {/* Male Option */}
      <label className="flex items-center gap-2 cursor-pointer group">
        <div className="relative flex items-center justify-center">
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleChange}
            required
            className="peer appearance-none w-5 h-5 border-2 border-input rounded-full checked:border-primary transition-all bg-background"
          />
          {/* Custom Inner Dot using bg-primary */}
          <div className="absolute w-2.5 h-2.5 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
        </div>
        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          Male
        </span>
      </label>
      
      {/* Female Option */}
      <label className="flex items-center gap-2 cursor-pointer group">
        <div className="relative flex items-center justify-center">
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={handleChange}
            required
            className="peer appearance-none w-5 h-5 border-2 border-input rounded-full checked:border-primary transition-all bg-background"
          />
          {/* Custom Inner Dot using bg-primary */}
          <div className="absolute w-2.5 h-2.5 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
        </div>
        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          Female
        </span>
      </label>
    </div>
  </div>

  <div>
    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-foreground mb-2">
      Date of Birth *
    </label>
    <input
      type="date"
      id="dateOfBirth"
      name="dateOfBirth"
      value={formData.dateOfBirth}
      onChange={handleChange}
      required
      max={new Date().toISOString().split('T')[0]}
      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all"
    />
  </div>
</div>
            {/* Patient No and Registration Date */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="patientNo" className="block text-sm font-medium text-foreground mb-2">
                  Patient No *
                </label>
                <input
                  type="text"
                  id="patientNo"
                  name="patientNo"
                  value={formData.patientNo}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  placeholder="P-00001"
                />
              </div>
              <div>
                <label htmlFor="registrationDate" className="block text-sm font-medium text-foreground mb-2">
                  Registration Date
                </label>
                <input
                  type="date"
                  id="registrationDate"
                  name="registrationDate"
                  value={formData.registrationDate}
                  disabled
                  className="w-full px-3 py-2 border border-input rounded-md bg-muted text-muted-foreground cursor-not-allowed"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-primary text-primary hover:bg-primary/5"
                onClick={() => {
                  setFormData({
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    gender: '',
                    dateOfBirth: '',
                    patientNo: '',
                    registrationDate: new Date().toISOString().split('T')[0],
                  })
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Submit
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  )
}
