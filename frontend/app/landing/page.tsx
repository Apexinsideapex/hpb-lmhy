"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  BarChart3,
  Users,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Smartphone,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center glow-on-hover">
                <Briefcase className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold font-sans">JobTracker Pro</h1>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/auth/signin">
                <Button variant="ghost" className="glow-on-hover">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="shine-effect glow-on-hover">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6 font-mono">
            <Zap className="w-3 h-3 mr-1" />
            Stealth Mode: Beta Access
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sans">
            Job Hunting,
            <span className="bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent"> Reimagined</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-mono">
            Transform your job search from chaos to clarity. Track applications, analyze progress, and land your dream
            job with our intelligent tracking platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/signup">
              <Button size="lg" className="shine-effect glow-on-hover text-lg px-8">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="glow-on-hover text-lg px-8 bg-transparent">
              Watch Demo
            </Button>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { number: "10,000+", label: "Job Applications Tracked" },
              { number: "85%", label: "Higher Response Rate" },
              { number: "2.3x", label: "Faster Job Placement" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold font-sans text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-sans">
              Everything You Need to Land Your Next Role
            </h2>
            <p className="text-lg text-muted-foreground font-mono max-w-2xl mx-auto">
              Stop using spreadsheets. Start using a purpose-built platform designed for modern job seekers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Kanban Job Board",
                description:
                  "Visualize your pipeline with drag-and-drop boards. Move applications through stages effortlessly.",
                color: "text-primary",
              },
              {
                icon: BarChart3,
                title: "Smart Analytics",
                description:
                  "Track response rates, identify patterns, and optimize your job search strategy with data.",
                color: "text-chart-3",
              },
              {
                icon: Users,
                title: "Contact Management",
                description: "Never lose track of recruiters and hiring managers. Build relationships that matter.",
                color: "text-chart-4",
              },
              {
                icon: Smartphone,
                title: "Mobile-First Design",
                description: "Apply on the go. Our mobile-optimized interface works perfectly on any device.",
                color: "text-chart-2",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your job search data is encrypted and private. We never share your information.",
                color: "text-destructive",
              },
              {
                icon: Zap,
                title: "AI-Powered Insights",
                description: "Get personalized recommendations and insights to improve your application success rate.",
                color: "text-primary",
              },
            ].map((feature, index) => (
              <Card key={index} className="mobile-card glow-on-hover">
                <CardHeader>
                  <feature.icon className={`w-8 h-8 ${feature.color} mb-2`} />
                  <CardTitle className="font-sans">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="font-mono">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 font-sans">Trusted by Job Seekers Worldwide</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                quote: "JobTracker Pro helped me organize my search and land 3 offers in 2 months. Game changer!",
                author: "Sarah Chen",
                role: "Software Engineer at Google",
                rating: 5,
              },
              {
                quote:
                  "The analytics showed me exactly where I was losing opportunities. Improved my response rate by 60%.",
                author: "Marcus Johnson",
                role: "Product Manager at Stripe",
                rating: 5,
              },
              {
                quote: "Finally, a tool built for job seekers by job seekers. The mobile app is incredible.",
                author: "Elena Rodriguez",
                role: "UX Designer at Figma",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="mobile-card">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm mb-4 font-mono italic">"{testimonial.quote}"</p>
                  <div className="text-left">
                    <div className="font-semibold font-sans text-sm">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground font-mono">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-chart-3/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans">Ready to Transform Your Job Search?</h2>
          <p className="text-lg text-muted-foreground mb-8 font-mono max-w-2xl mx-auto">
            Join thousands of job seekers who've already upgraded their search process. Start your free trial today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/auth/signup">
              <Button size="lg" className="shine-effect glow-on-hover text-lg px-8">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              14-day free trial
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="font-bold font-sans">JobTracker Pro</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground font-mono">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Support
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground font-mono">
            © 2024 JobTracker Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
