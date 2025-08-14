"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileText, CheckCircle, Loader2 } from "lucide-react"

interface CVUploadStepProps {
  onNext: () => void
  onDataExtracted: (data: any) => void
}

export function CVUploadStep({ onNext, onDataExtracted }: CVUploadStepProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [extractedData, setExtractedData] = useState<any>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [])

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    setUploadedFile(file)

    // Simulate CV processing with dummy data
    setTimeout(() => {
      const dummyData = {
        name: "Alex Johnson",
        email: "alex.johnson@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        title: "Senior Software Engineer",
        experience: "5+ years",
        skills: ["React", "Node.js", "TypeScript", "Python", "AWS"],
        education: "BS Computer Science, Stanford University",
        summary: "Experienced software engineer with expertise in full-stack development and cloud technologies.",
      }

      setExtractedData(dummyData)
      onDataExtracted(dummyData)
      setIsUploading(false)
    }, 2000)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  if (extractedData) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 font-sans">CV Processed Successfully!</h3>
          <p className="text-muted-foreground font-mono">We've extracted the following information:</p>
        </div>

        <Card className="bg-card/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold font-sans mb-2">Personal Information</h4>
                <div className="space-y-1 text-sm font-mono">
                  <p>
                    <span className="text-muted-foreground">Name:</span> {extractedData.name}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Email:</span> {extractedData.email}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Phone:</span> {extractedData.phone}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Location:</span> {extractedData.location}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold font-sans mb-2">Professional Details</h4>
                <div className="space-y-1 text-sm font-mono">
                  <p>
                    <span className="text-muted-foreground">Title:</span> {extractedData.title}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Experience:</span> {extractedData.experience}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Education:</span> {extractedData.education}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold font-sans mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {extractedData.skills.map((skill: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={onNext} size="lg" className="shine-effect glow-on-hover">
            Continue to Chat Setup
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2 font-sans">Upload Your CV</h3>
        <p className="text-muted-foreground font-mono">
          We'll automatically extract your basic information to get you started quickly.
        </p>
      </div>

      <Card
        className={`border-2 border-dashed transition-all duration-300 cursor-pointer ${
          isDragOver
            ? "border-primary bg-primary/5 glow-on-hover"
            : "border-muted-foreground/25 hover:border-primary/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="p-12 text-center">
          {isUploading ? (
            <div className="space-y-4">
              <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin" />
              <div>
                <h4 className="font-semibold font-sans">Processing your CV...</h4>
                <p className="text-sm text-muted-foreground font-mono">
                  Extracting information from {uploadedFile?.name}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <h4 className="font-semibold font-sans">Drop your CV here</h4>
                <p className="text-sm text-muted-foreground font-mono">or click to browse files</p>
              </div>
              <p className="text-xs text-muted-foreground font-mono">Supports PDF, DOC, DOCX files up to 10MB</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center">
        <input
          type="file"
          id="cv-upload"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
          disabled={isUploading}
        />
        <label htmlFor="cv-upload">
          <Button variant="outline" className="glow-on-hover bg-transparent" disabled={isUploading} asChild>
            <span>Browse Files</span>
          </Button>
        </label>
      </div>
    </div>
  )
}
