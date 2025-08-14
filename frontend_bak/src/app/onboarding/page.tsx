"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, CheckCircle, AlertCircle, User, Mail, Phone, Briefcase } from "lucide-react"

interface ParsedCV {
  personal_info: {
    name: string
    email: string
    mobile_number: string
  }
  skills: {
    technical_skills: string[]
    all_skills: string[]
  }
  experience: {
    total_experience: number
    experience_details: any[]
  }
  education: {
    degree: string[]
    education_details: any[]
  }
  projects: any[]
  ats_analysis: {
    score: number
    feedback: string[]
    grade: string
  }
  raw_data: any
}

export default function OnboardingPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [parsedData, setParsedData] = useState<ParsedCV | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB")
        return
      }
      if (!file.name.toLowerCase().match(/\.(pdf|doc|docx)$/)) {
        setError("Only PDF, DOC, and DOCX files are supported")
        return
      }
      setSelectedFile(file)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      console.log('Uploading file:', selectedFile.name)
      
      const response = await fetch('http://localhost:8000/api/cv/upload', {
        method: 'POST',
        body: formData,
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error response:', errorText)
        
        try {
          const errorData = JSON.parse(errorText)
          throw new Error(errorData.detail || 'Upload failed')
        } catch {
          throw new Error(`Upload failed with status ${response.status}: ${errorText}`)
        }
      }

      const data = await response.json()
      console.log('Parsed data:', data)
      setParsedData(data)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50"
    if (score >= 60) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Job Tracker! 🚀</h1>
          <p className="text-gray-600">Let's start by analyzing your CV with our free ATS scanner</p>
        </div>

        {!parsedData ? (
          <Card className="p-8">
            <div className="text-center">
              <Upload className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Upload Your CV</h2>
              <p className="text-gray-600 mb-6">
                Upload your resume to get instant ATS compatibility analysis and extract your information
              </p>

              <div className="max-w-md mx-auto">
                <Label htmlFor="cv-upload" className="block text-sm font-medium mb-2">
                  Choose your CV file
                </Label>
                <Input
                  id="cv-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="mb-4"
                />
                
                {selectedFile && (
                  <div className="flex items-center justify-center gap-2 p-3 bg-blue-50 rounded mb-4">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-600">{selectedFile.name}</span>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 rounded mb-4">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600">{error}</span>
                  </div>
                )}

                <Button 
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading}
                  className="w-full"
                >
                  {isUploading ? "Analyzing CV..." : "Analyze CV"}
                </Button>

                <p className="text-xs text-gray-500 mt-4">
                  Supported formats: PDF, DOC, DOCX (Max 10MB)
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* ATS Score */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">ATS Compatibility Score</h2>
                <div className={`px-4 py-2 rounded-lg ${getScoreColor(parsedData.ats_analysis.score)}`}>
                  <span className="text-2xl font-bold">{parsedData.ats_analysis.score}/100</span>
                </div>
              </div>
              <p className="text-lg font-medium text-gray-700 mb-4">{parsedData.ats_analysis.grade}</p>
              
              <div className="space-y-2">
                {parsedData.ats_analysis.feedback.map((feedback, index) => (
                  <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <span>{feedback}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Personal Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">Name</Label>
                  <p className="font-medium">{parsedData.personal_info.name || "Not detected"}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Email</Label>
                  <p className="font-medium">{parsedData.personal_info.email || "Not detected"}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Phone</Label>
                  <p className="font-medium">{parsedData.personal_info.mobile_number || "Not detected"}</p>
                </div>
              </div>
            </Card>

            {/* Skills */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Skills Detected</h2>
              {parsedData.skills.technical_skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {parsedData.skills.technical_skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No skills detected. Consider adding a dedicated skills section.</p>
              )}
            </Card>

            {/* Experience */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Experience
              </h2>
              <div>
                <Label className="text-sm text-gray-500">Total Experience</Label>
                <p className="font-medium">
                  {parsedData.experience.total_experience > 0 
                    ? `${parsedData.experience.total_experience} years` 
                    : "Experience not clearly detected"}
                </p>
              </div>
            </Card>

            {/* Education */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Education</h2>
              {parsedData.education.degree.length > 0 ? (
                <div className="space-y-2">
                  {parsedData.education.degree.map((degree, index) => (
                    <p key={index} className="font-medium">{degree}</p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Education not detected. Ensure your education section is clearly labeled.</p>
              )}
            </Card>

            {/* Next Steps */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Ready to Start Job Tracking!
              </h2>
              <p className="text-gray-600 mb-4">
                Your CV has been analyzed! Now you can start tracking your job applications with confidence.
              </p>
              <div className="flex gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => window.location.href = '/'}>
                  Go to Dashboard
                </Button>
                <Button variant="outline" onClick={() => {
                  setParsedData(null)
                  setSelectedFile(null)
                  setError(null)
                }}>
                  Upload Different CV
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}