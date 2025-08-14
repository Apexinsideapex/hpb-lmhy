"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CVUploadStep } from "@/components/onboarding/cv-upload-step"
import { ChatbotStep } from "@/components/onboarding/chatbot-step"
import { WelcomeStep } from "@/components/onboarding/welcome-step"
import { CompletionStep } from "@/components/onboarding/completion-step"
import { Briefcase, ArrowLeft, X, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

const STEPS = [
  { id: "welcome", title: "Welcome", description: "Get started with JobTracker Pro" },
  { id: "upload", title: "Upload CV", description: "Extract your basic information" },
  { id: "chat", title: "Complete Profile", description: "Fill in the gaps with our AI assistant" },
  { id: "complete", title: "All Set!", description: "Your profile is ready" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [extractedData, setExtractedData] = useState<any>(null)
  const [showSkipDialog, setShowSkipDialog] = useState(false)
  const router = useRouter()

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    setShowSkipDialog(true)
  }

  const confirmSkip = () => {
    // Set a flag in localStorage to show onboarding reminder later
    localStorage.setItem("onboarding_skipped", "true")
    localStorage.setItem("onboarding_skip_date", new Date().toISOString())
    router.push("/")
  }

  const progress = ((currentStep + 1) / STEPS.length) * 100

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header with Skip Button */}
        <div className="flex justify-between items-start mb-8">
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center glow-on-hover">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold font-sans">JobTracker Pro</h1>
            </div>
            <p className="text-muted-foreground font-mono">Let's set up your job tracking workspace</p>
          </div>

          {currentStep < STEPS.length - 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Skip for now
            </Button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-mono text-muted-foreground">
              Step {currentStep + 1} of {STEPS.length}
            </span>
            <span className="text-sm font-mono text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2 shine-effect" />
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    index <= currentStep
                      ? "bg-primary text-primary-foreground glow-on-hover"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                      index < currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Card className="shine-effect">
          <CardHeader className="text-center">
            <CardTitle className="font-sans">{STEPS[currentStep].title}</CardTitle>
            <CardDescription className="font-mono">{STEPS[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="transition-all duration-500 ease-in-out">
              {currentStep === 0 && <WelcomeStep onNext={nextStep} />}
              {currentStep === 1 && <CVUploadStep onNext={nextStep} onDataExtracted={setExtractedData} />}
              {currentStep === 2 && <ChatbotStep extractedData={extractedData} onNext={nextStep} />}
              {currentStep === 3 && <CompletionStep />}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="glow-on-hover bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="text-sm text-muted-foreground font-mono">
            {currentStep === STEPS.length - 1 ? "Setup Complete!" : "Continue to proceed"}
          </div>
        </div>

        <Dialog open={showSkipDialog} onOpenChange={setShowSkipDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Skip Onboarding?
              </DialogTitle>
              <DialogDescription>
                You can always complete your profile setup later from the dashboard. However, completing it now will
                help you get the most out of JobTracker Pro.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setShowSkipDialog(false)} className="w-full sm:w-auto">
                Continue Setup
              </Button>
              <Button onClick={confirmSkip} className="w-full sm:w-auto">
                Skip for Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
