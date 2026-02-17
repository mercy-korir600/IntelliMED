'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/Header'

export default function GeneralAssessmentPage() {
  const router = useRouter()
  const [patientName, setPatientName] = useState('')
  const [formData, setFormData] = useState({
    visitDate: new Date().toISOString().split('T')[0],
    generalHealth: '',
    drugsUsage: '',
    comments: '',
  })

  useEffect(() => {
    const patient = sessionStorage.getItem('currentPatient')
    if (patient) {
      const patientData = JSON.parse(patient)
      setPatientName(`${patientData.firstName} ${patientData.lastName}`)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const assessmentData = {
      type: 'general',
      ...formData,
      patientName,
      recordedAt: new Date().toISOString(),
    }

    sessionStorage.setItem('currentAssessment', JSON.stringify(assessmentData))
    console.log('General assessment recorded:', assessmentData)
    
    router.push('/patients')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/vitals" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Vitals
          </Link>
          <h2 className="text-3xl font-bold text-primary mb-2">General Assessment Form</h2>
          <p className="text-muted-foreground">For patients with normal BMI (≤ 25)</p>
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

            {/* General Health */}
            <div>
              <label htmlFor="generalHealth" className="block text-sm font-medium text-foreground mb-2">
                General Health *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="generalHealth"
                    value="Good"
                    checked={formData.generalHealth === 'Good'}
                    onChange={handleChange}
                    required
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-foreground">Good</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="generalHealth"
                    value="Poor"
                    checked={formData.generalHealth === 'Poor'}
                    onChange={handleChange}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-foreground">Poor</span>
                </label>
              </div>
            </div>

            {/* Drug Usage */}
            <div>
              <label htmlFor="drugsUsage" className="block text-sm font-medium text-foreground mb-2">
                Are you currently using any drugs? *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="drugsUsage"
                    value="Yes"
                    checked={formData.drugsUsage === 'Yes'}
                    onChange={handleChange}
                    required
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-foreground">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="drugsUsage"
                    value="No"
                    checked={formData.drugsUsage === 'No'}
                    onChange={handleChange}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-foreground">No</span>
                </label>
              </div>
            </div>

            {/* Comments */}
            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-foreground mb-2">
                Comments
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground resize-none"
                placeholder="Additional notes or observations..."
              />
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
                    generalHealth: '',
                    drugsUsage: '',
                    comments: '',
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
