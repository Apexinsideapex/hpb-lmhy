"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Upload, MessageSquare, Sparkles } from "lucide-react"

interface WelcomeStepProps {
  onNext: () => void
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto glow-on-hover">
        <Sparkles className="w-10 h-10 text-primary" />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2 font-sans">Welcome to JobTracker Pro!</h3>
        <p className="text-muted-foreground font-mono">
          Let's get you set up in just a few minutes. We'll help you create your profile and start tracking your job
          applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <div className="p-4 rounded-lg border border-border bg-card/50">
          <Upload className="w-8 h-8 text-primary mb-2 mx-auto" />
          <h4 className="font-semibold font-sans">Upload CV</h4>
          <p className="text-sm text-muted-foreground font-mono">We'll extract your basic info</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card/50">
          <MessageSquare className="w-8 h-8 text-primary mb-2 mx-auto" />
          <h4 className="font-semibold font-sans">Chat Setup</h4>
          <p className="text-sm text-muted-foreground font-mono">Complete your profile interactively</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card/50">
          <CheckCircle className="w-8 h-8 text-primary mb-2 mx-auto" />
          <h4 className="font-semibold font-sans">Start Tracking</h4>
          <p className="text-sm text-muted-foreground font-mono">Begin your job search journey</p>
        </div>
      </div>

      <Button onClick={onNext} size="lg" className="shine-effect glow-on-hover">
        Let's Get Started
      </Button>
    </div>
  )
}
