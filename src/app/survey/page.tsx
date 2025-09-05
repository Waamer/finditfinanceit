"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { QuizQuestion } from "@/components/survey/survey-question"
import { QuizResults } from "@/components/survey/survey-results"

export interface QuizData {
  personalInfo: {
    fullName: string
    firstName: string
    lastName: string
    email: string
    phone: string
    city: string
    province: string
    streetAddress: string
    postalCode: string
    dateOfBirth: string
    companyName: string
    jobTitle: string
  }
  vehicleInfo: {
    vehicleType: string
    budget: string
    tradeIn: string
    timeframe: string
    creditScore: string
    employment: string
    employmentLength: string
    income: string
  }
  preferences: {
    financing: string[]
    priorities: string[]
    experience: string
  }
}

const initialQuizData: QuizData = {
  personalInfo: {
    fullName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    province: "",
    streetAddress: "",
    postalCode: "",
    dateOfBirth: "",
    companyName: "",
    jobTitle: "",
  },
  vehicleInfo: {
    vehicleType: "",
    budget: "",
    tradeIn: "",
    timeframe: "",
    creditScore: "",
    employment: "",
    employmentLength: "",
    income: "",
  },
  preferences: {
    financing: [],
    priorities: [],
    experience: "",
  },
}

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [quizData, setQuizData] = useState<QuizData>(initialQuizData)
  const [isComplete, setIsComplete] = useState(false)

  const totalSteps = 11

  const updateQuizData = (section: keyof QuizData, field: string, value: any) => {
    setQuizData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setIsComplete(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const progress = ((currentStep + 1) / totalSteps) * 100

  if (isComplete) {
    return <QuizResults quizData={quizData} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-card/30 to-background py-8 lg:pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Apply Today, Drive Tomorrow!</h1>
          <p className="text-muted-foreground text-lg">
            We specialize in getting London drivers the vehicle they want, at payments they can afford!
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </motion.div>

        {/* Quiz Content */}
        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <QuizQuestion
                  step={currentStep}
                  quizData={quizData}
                  updateQuizData={updateQuizData}
                  onNext={nextStep}
                />
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Mobile Navigation - visible only on small screens */}
        <div className="flex justify-between mt-8 lg:hidden">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <Button onClick={nextStep} className="flex items-center space-x-2">
            <span>{currentStep === totalSteps - 1 ? "Complete Quiz" : "Next"}</span>
            {currentStep === totalSteps - 1 ? <CheckCircle className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Fixed Bottom Navigation Bar for Large Screens */}
      <div className="hidden lg:block fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t shadow-lg z-50">
        <div className="container mx-auto px-4 max-w-4xl py-4">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {totalSteps}
              </p>
            </div>

            <Button onClick={nextStep} className="flex items-center space-x-2">
              <span>{currentStep === totalSteps - 1 ? "Complete Quiz" : "Next"}</span>
              {currentStep === totalSteps - 1 ? <CheckCircle className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}