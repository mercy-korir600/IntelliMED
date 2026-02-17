'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Search } from 'lucide-react'
import { Header } from '@/components/Header'

interface Patient {
  id: number
  firstName: string
  lastName: string
  age: number
  gender: string
  bmiStatus: string
  lastAssessmentDate: string
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([])
  const [filterDate, setFilterDate] = useState('')

  useEffect(() => {
    // Load mock patient data for demo
    const mockPatients: Patient[] = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Mdoe',
        age: 33,
        gender: 'Male',
        bmiStatus: 'Normal',
        lastAssessmentDate: '2025-12-01',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Mdoe',
        age: 28,
        gender: 'Female',
        bmiStatus: 'Overweight',
        lastAssessmentDate: '2025-11-29',
      },
     
    ]

    // Check if there's a newly registered patient in session
    const currentPatient = sessionStorage.getItem('currentPatient')
    if (currentPatient) {
      try {
        const patientData = JSON.parse(currentPatient)
        const newPatient: Patient = {
          id: patientData.id,
          firstName: patientData.firstName,
          lastName: patientData.lastName,
          age: calculateAge(patientData.dateOfBirth),
          gender: patientData.gender,
          bmiStatus: calculateBMIStatus(sessionStorage.getItem('currentVitals')),
          lastAssessmentDate: new Date().toISOString().split('T')[0],
        }
        // Add new patient to the beginning if not already in list
        const exists = mockPatients.some(p => p.id === newPatient.id)
        if (!exists) {
          mockPatients.unshift(newPatient)
        }
        // Clear session data after showing
        sessionStorage.removeItem('currentPatient')
        sessionStorage.removeItem('currentVitals')
        sessionStorage.removeItem('currentAssessment')
      } catch (e) {
        console.log('No current patient data')
      }
    }

    setPatients(mockPatients)
    setFilteredPatients(mockPatients)
  }, [])

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const calculateBMIStatus = (vitalsJson: string | null): string => {
    if (!vitalsJson) return 'Not recorded'
    try {
      const vitals = JSON.parse(vitalsJson)
      const bmi = vitals.bmi
      if (bmi < 18.5) return 'Underweight'
      if (bmi <= 25) return 'Normal'
      return 'Overweight'
    } catch {
      return 'Not recorded'
    }
  }

  const handleFilterByDate = (date: string) => {
    setFilterDate(date)
    if (!date) {
      setFilteredPatients(patients)
    } else {
      const filtered = patients.filter(p => p.lastAssessmentDate === date)
      setFilteredPatients(filtered)
    }
  }

  const getBMIStatusColor = (status: string) => {
    switch (status) {
      case 'Underweight':
        return 'bg-blue-100 text-blue-800'
      case 'Normal':
        return 'bg-green-100 text-green-800'
      case 'Overweight':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">Patient Listing</h2>
              <p className="text-muted-foreground">View all registered patients and their health status</p>
            </div>
            <Link href="/register">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Register New Patient
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Section */}
        <Card className="p-4 mb-6 border border-border">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => handleFilterByDate(e.target.value)}
              className="flex-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
              placeholder="Filter by visit date"
            />
            {filterDate && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFilterByDate('')}
                className="border-primary text-primary hover:bg-primary/5"
              >
                Clear Filter
              </Button>
            )}
          </div>
        </Card>

        {/* Patient Table */}
        <Card className="border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Patient Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Age</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Gender</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">BMI Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Last Assessment</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground font-medium">
                      {patient.firstName} {patient.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{patient.age}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{patient.gender}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getBMIStatusColor(patient.bmiStatus)}`}>
                        {patient.bmiStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{patient.lastAssessmentDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredPatients.length === 0 && (
            <div className="px-6 py-8 text-center">
              <p className="text-muted-foreground">No patients found for the selected date.</p>
            </div>
          )}
        </Card>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <Card className="p-6 border border-border">
            <p className="text-sm text-muted-foreground mb-2">Total Patients</p>
            <p className="text-3xl font-bold text-primary">{patients.length}</p>
          </Card>
          <Card className="p-6 border border-border">
            <p className="text-sm text-muted-foreground mb-2">Normal BMI</p>
            <p className="text-3xl font-bold text-green-600">
              {patients.filter(p => p.bmiStatus === 'Normal').length}
            </p>
          </Card>
          <Card className="p-6 border border-border">
            <p className="text-sm text-muted-foreground mb-2">Overweight</p>
            <p className="text-3xl font-bold text-orange-600">
              {patients.filter(p => p.bmiStatus === 'Overweight').length}
            </p>
          </Card>
          <Card className="p-6 border border-border">
            <p className="text-sm text-muted-foreground mb-2">Underweight</p>
            <p className="text-3xl font-bold text-blue-600">
              {patients.filter(p => p.bmiStatus === 'Underweight').length}
            </p>
          </Card>
        </div>
      </main>
    </div>
  )
}
