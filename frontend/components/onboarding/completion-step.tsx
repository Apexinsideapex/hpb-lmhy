import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export function CompletionStep() {
  return (
    <div className="text-center space-y-6">
      <div className="relative">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto glow-on-hover">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <Sparkles className="w-6 h-6 text-primary absolute -top-2 -right-2 animate-pulse" />
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-2 font-sans">You're All Set!</h3>
        <p className="text-muted-foreground font-mono">
          Your profile has been created successfully. You can now start tracking your job applications and take control
          of your job search.
        </p>
      </div>

      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-6">
          <h4 className="font-semibold font-sans mb-4">What's Next?</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">1</span>
              </div>
              <p className="font-mono">Add your first job application</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">2</span>
              </div>
              <p className="font-mono">Organize with Kanban boards</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">3</span>
              </div>
              <p className="font-mono">Track your progress</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Link href="/">
        <Button size="lg" className="shine-effect glow-on-hover">
          Go to Dashboard
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </div>
  )
}
