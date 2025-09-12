"use client"

import { useState } from "react"
import { motion, AnimatePresence, easeInOut } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { QuizQuestion } from "@/components/survey/survey-question"
import { QuizResults } from "@/components/survey/survey-results"

export interface QuizData {
  personalInfo: {
    fullName: string
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
    creditScore: string
    employment: string
    employmentLength: string
    income: string
    desiredVehicle: string
  }
}

const initialQuizData: QuizData = {
  personalInfo: {
    fullName: "",
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
    creditScore: "",
    employment: "",
    employmentLength: "",
    income: "",
    desiredVehicle: "",
  },
}

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [quizData, setQuizData] = useState<QuizData>(initialQuizData)
  const [isComplete, setIsComplete] = useState(false)
  const [direction, setDirection] = useState<1 | -1>(1)

  const totalSteps = 12

  const updateQuizData = (
    section: keyof QuizData,
    field: string,
    value: string | number | boolean
  ) => {
    setQuizData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const nextStep = () => {
    setDirection(1)
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setIsComplete(true)
    }
  }

  const prevStep = () => {
    setDirection(-1)
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const progress = ((currentStep + 1) / totalSteps) * 100

  if (isComplete) {
    return <QuizResults quizData={quizData} />
  }

  // Animation variants for card transitions
  const cardVariants = {
    enter: (dir: 1 | -1) => ({
      x: dir === 1 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 350, damping: 30 },
    },
    exit: (dir: 1 | -1) => ({
      x: dir === 1 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.25, ease: easeInOut },
    }),
  }

  // Animation for progress bar and title
  const progressVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 200, damping: 22 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 py-8 lg:pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header, Progress Bar, and Title together */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={progressVariants}
          className="mb-8"
        >
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Apply Today, Drive Tomorrow!</h1>
            <p className="text-muted-foreground text-lg">
              We specialize in getting London drivers the vehicle they want, at payments they can afford!
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentStep + 1} of {totalSteps}
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </motion.div>

        {/* Quiz Content with contained animation */}
        <div className="relative min-h-[220px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentStep}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
              style={{ position: "relative" }}
            >
              <Card className="shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <QuizQuestion
                    step={currentStep}
                    quizData={quizData}
                    updateQuizData={updateQuizData}
                    onNext={nextStep}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

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