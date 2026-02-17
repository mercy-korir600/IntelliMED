'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/Header'

export default function VitalsPage() {
  const router = useRouter()
  const [patientName, setPatientName] = useState('')
  const [formData, setFormData] = useState({
    visitDate: new Date().toISOString().split('T')[0],
    height: '',
    weight: '',
  })
  const [bmi, setBmi] = useState<number | null>(null)

  useEffect(() => {
    const patient = sessionStorage.getItem('currentPatient')
    if (patient) {
      const patientData = JSON.parse(patient)
      setPatientName(`${patientData.firstName} ${patientData.lastName}`)
    }
  }, [])

  const calculateBMI = (height: string, weight: string) => {
    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100
      const weightInKg = parseFloat(weight)
      const calculatedBMI = weightInKg / (heightInMeters * heightInMeters)
      setBmi(Math.round(calculatedBMI * 10) / 10)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)
    if (name === 'height' || name === 'weight') {
      calculateBMI(name === 'height' ? value : newFormData.height, name === 'weight' ? value : newFormData.weight)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (bmi === null) {
      alert('Please enter valid height and weight')
      return
    }

    const vitalsData = {
      ...formData,
      bmi,
      patientName,
      recordedAt: new Date().toISOString(),
    }

    sessionStorage.setItem('currentVitals', JSON.stringify(vitalsData))
    
    console.log('Vitals recorded:', vitalsData)

    if (bmi <= 25) {
      router.push('/assessment/general')
    } else {
      router.push('/assessment/overweight')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/register" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Registration
          </Link>
          <h2 className="text-3xl font-bold text-primary mb-2">Patient Vitals</h2>
          <p className="text-muted-foreground">Record patient vital signs and measurements</p>
        </div>

        <Card className="p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Name Display */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Patient Name
              </label>
              <input
                type="text"
                value={patientName}
                disabled
                className="w-full px-3 py-2 border border-input rounded-md bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>

            {/* Visit Date */}
            <div>
              <label htmlFor="visitDate" className="block text-sm font-medium text-foreground mb-2">
                Visit Date *
              </label>
              <input
                type="date"
                id="visitDate"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
              />
            </div>

            {/* Height and Weight */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-foreground mb-2">
                  Height (cm) *
                </label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  step="0.1"
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  placeholder="170"
                />
              </div>
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-foreground mb-2">
                  Weight (KG) *
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  step="0.1"
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  placeholder="70"
                />
              </div>
            </div>

            {/* BMI Display */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">BMI (Auto-calculated)</span>
                <span className="text-2xl font-bold text-primary">
                  {bmi !== null ? bmi : '—'}
                </span>
              </div>
              {bmi !== null && (
                <p className="text-xs text-muted-foreground mt-2">
                  {bmi <= 18.5 && '🟢 Underweight (BMI < 18.5)'}
                  {bmi > 18.5 && bmi < 25 && '🟢 Normal (BMI 18.5-24.9)'}
                  {bmi >= 25 && '🟠 Overweight (BMI ≥ 25)'}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-primary text-primary hover:bg-primary/5"
                onClick={() => {
                  setFormData({
                    visitDate: new Date().toISOString().split('T')[0],
                    height: '',
                    weight: '',
                  })
                  setBmi(null)
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
