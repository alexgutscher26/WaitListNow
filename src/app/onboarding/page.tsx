/* eslint-disable jsx-a11y/label-has-associated-control */
"use client"

import { CheckCircle2, ArrowRight, Link as LinkIcon, Users, Settings, Bell, Zap, Copy } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const onboardingSteps = [  
  {
    title: "Welcome to WaitlistNow",
    description: "Let's get your waitlist and referral system up and running in minutes.",
    icon: <Zap className="h-8 w-8 text-primary" />,
    content: (
      <div className="space-y-4">
        <p>With WaitlistNow, you can:</p>
        <ul className="space-y-2 text-left">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Create beautiful, embeddable waitlist forms</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Grow with a built-in referral system</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Manage your waitlist with ease</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Set Up Your Waitlist",
    description: "Customize your waitlist to match your brand.",
    icon: <Settings className="h-8 w-8 text-primary" />,
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Waitlist Name</label>
          <input
            type="text"
            className="w-full rounded-md border p-2"
            placeholder="e.g., Get Early Access"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Website URL</label>
          <input
            type="url"
            className="w-full rounded-md border p-2"
            placeholder="https://yourapp.com"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Enable Referral System",
    description: "Turn your waitlist into a growth engine.",
    icon: <Users className="h-8 w-8 text-primary" />,
    content: (
      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable Referral Rewards</h4>
              <p className="text-sm text-muted-foreground">
                Users get moved up the waitlist when they refer friends
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" defaultChecked />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20"></div>
            </label>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Embed Your Waitlist",
    description: "Add your waitlist to your website with a simple snippet.",
    icon: <LinkIcon className="h-8 w-8 text-primary" />,
    content: (
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <h4 className="mb-2 font-medium">1. Add this script to your website's &lt;head&gt;</h4>
            <div className="relative">
              <pre className="overflow-x-auto rounded-md bg-background p-3 text-sm">
                <code className="text-foreground">
                  {`<script src="${window.location.origin}/embed.js" data-waitlist="YOUR_WAITLIST_ID" async></script>`}
                </code>
              </pre>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-2 top-2 h-6 w-6 p-0"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `<script src="${window.location.origin}/embed.js" data-waitlist="YOUR_WAITLIST_ID" async></script>`
                  );
                }}
              >
                <Copy className="h-3.5 w-3.5" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          </div>
          
          <div className="rounded-lg bg-muted p-4">
            <h4 className="mb-2 font-medium">2. Add this where you want the widget to appear</h4>
            <div className="relative">
              <pre className="overflow-x-auto rounded-md bg-background p-3 text-sm">
                <code className="text-foreground">
                  {`<div data-waitlist-embed></div>`}
                </code>
              </pre>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-2 top-2 h-6 w-6 p-0"
                onClick={() => {
                  navigator.clipboard.writeText('<div data-waitlist-embed></div>');
                }}
              >
                <Copy className="h-3.5 w-3.5" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Bell className="h-4 w-4" />
          <span>We'll email you when your waitlist is ready to be embedded.</span>
        </div>
      </div>
    ),
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const currentStepData = onboardingSteps[currentStep]
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100

  const handleNext = async () => {
    if (currentStep === onboardingSteps.length - 1) {
      // On the last step, complete onboarding
      setIsLoading(true)
      try {
        // TODO: Here you would typically make an API call to mark onboarding as complete
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
        router.push("/dashboard")
      } catch (error) {
        console.error("Error completing onboarding:", error)
      } finally {
        setIsLoading(false)
      }
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            {currentStepData.icon}
          </div>
          <CardTitle className="text-2xl font-bold">{currentStepData.title}</CardTitle>
          <p className="text-muted-foreground">{currentStepData.description}</p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
            <div className="mt-2 flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {onboardingSteps.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
          </div>
          <div className="min-h-[200px]">
            {currentStepData.content}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0 || isLoading}
          >
            Back
          </Button>
          <Button onClick={handleNext} disabled={isLoading}>
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-primary" />
            ) : currentStep === onboardingSteps.length - 1 ? (
              "Finish Setup"
            ) : (
              <>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
