"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface MobileOptimizedFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  initialData?: any
  type: "job" | "contact"
}

export function MobileOptimizedForm({ onSubmit, onCancel, initialData, type }: MobileOptimizedFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(
    type === "job"
      ? {
          company: initialData?.company || "",
          position: initialData?.position || "",
          location: initialData?.location || "",
          salary: initialData?.salary || "",
          status: initialData?.status || "applied",
          source: initialData?.source || "",
          priority: initialData?.priority || "medium",
          notes: initialData?.notes || "",
          url: initialData?.url || "",
          deadline: initialData?.deadline || "",
        }
      : {
          name: initialData?.name || "",
          email: initialData?.email || "",
          phone: initialData?.phone || "",
          role: initialData?.role || "",
          company: initialData?.company || "",
          notes: initialData?.notes || "",
          linkedin: initialData?.linkedin || "",
          tags: initialData?.tags?.join(", ") || "",
        },
  )

  const jobSteps = [
    {
      title: "Basic Info",
      fields: ["company", "position"],
    },
    {
      title: "Details",
      fields: ["location", "salary", "status", "priority"],
    },
    {
      title: "Additional",
      fields: ["source", "url", "deadline", "notes"],
    },
  ]

  const contactSteps = [
    {
      title: "Personal",
      fields: ["name", "email", "phone"],
    },
    {
      title: "Professional",
      fields: ["company", "role", "linkedin"],
    },
    {
      title: "Notes & Tags",
      fields: ["notes", "tags"],
    },
  ]

  const steps = type === "job" ? jobSteps : contactSteps
  const currentStepData = steps[currentStep]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      const submitData =
        type === "contact"
          ? {
              ...formData,
              tags: formData.tags
                .split(",")
                .map((tag: string) => tag.trim())
                .filter(Boolean),
            }
          : formData
      onSubmit(submitData)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  const canProceed = currentStepData.fields.every((field) => {
    if (field === "company" || field === "position" || field === "name" || field === "email") {
      return formData[field as keyof typeof formData].trim() !== ""
    }
    return true
  })

  return (
    <div className="fixed inset-0 bg-background z-50 md:bg-background/80 md:backdrop-blur-sm md:flex md:items-center md:justify-center md:p-4">
      <Card className="h-full w-full md:h-auto md:max-w-lg md:max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border">
          <div className="flex items-center gap-3">
            {currentStep > 0 && (
              <Button variant="ghost" size="icon" onClick={() => setCurrentStep(currentStep - 1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
            )}
            <div>
              <CardTitle className="font-sans text-lg">
                {type === "job" ? "Add Job Application" : "Add Contact"}
              </CardTitle>
              <p className="text-sm text-muted-foreground font-mono">
                Step {currentStep + 1} of {steps.length}: {currentStepData.title}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        {/* Progress Indicator */}
        <div className="px-6 pt-4">
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full transition-all ${index <= currentStep ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
        </div>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dynamic Form Fields Based on Current Step */}
            {currentStepData.fields.map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field} className="font-mono capitalize">
                  {field.replace(/([A-Z])/g, " $1").trim()}{" "}
                  {(field === "company" || field === "position" || field === "name" || field === "email") && "*"}
                </Label>

                {field === "notes" ? (
                  <Textarea
                    id={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    placeholder={`Enter ${field}...`}
                    rows={4}
                    className="shine-effect text-base" // Larger text for mobile
                  />
                ) : field === "status" || field === "priority" || field === "source" || field === "role" ? (
                  <Select
                    value={formData[field as keyof typeof formData]}
                    onValueChange={(value) => handleChange(field, value)}
                  >
                    <SelectTrigger className="shine-effect h-12 text-base">
                      <SelectValue placeholder={`Select ${field}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field === "status" && (
                        <>
                          <SelectItem value="applied">Applied</SelectItem>
                          <SelectItem value="interview">Interview</SelectItem>
                          <SelectItem value="offer">Offer</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </>
                      )}
                      {field === "priority" && (
                        <>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </>
                      )}
                      {field === "source" && (
                        <>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                          <SelectItem value="Indeed">Indeed</SelectItem>
                          <SelectItem value="Company Website">Company Website</SelectItem>
                          <SelectItem value="Referral">Referral</SelectItem>
                          <SelectItem value="Recruiter">Recruiter</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </>
                      )}
                      {field === "role" && (
                        <>
                          <SelectItem value="Senior Recruiter">Senior Recruiter</SelectItem>
                          <SelectItem value="Recruiter">Recruiter</SelectItem>
                          <SelectItem value="Talent Acquisition">Talent Acquisition</SelectItem>
                          <SelectItem value="Engineering Manager">Engineering Manager</SelectItem>
                          <SelectItem value="Hiring Manager">Hiring Manager</SelectItem>
                          <SelectItem value="CTO">CTO</SelectItem>
                          <SelectItem value="VP Engineering">VP Engineering</SelectItem>
                          <SelectItem value="Director">Director</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field}
                    type={
                      field === "email"
                        ? "email"
                        : field === "phone"
                          ? "tel"
                          : field === "url" || field === "linkedin"
                            ? "url"
                            : field === "deadline"
                              ? "date"
                              : "text"
                    }
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    placeholder={`Enter ${field}...`}
                    required={field === "company" || field === "position" || field === "name" || field === "email"}
                    className="shine-effect h-12 text-base" // Larger inputs for mobile
                  />
                )}
              </div>
            ))}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-6">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex-1"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button type="submit" disabled={!canProceed} className="flex-1 shine-effect glow-on-hover h-12 text-base">
                {currentStep < steps.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  `${initialData ? "Update" : "Add"} ${type === "job" ? "Application" : "Contact"}`
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
