"use client"

import { useState } from "react"
import { motion, AnimatePresence, easeInOut } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { QuizQuestion } from "@/components/survey/survey-question"
import { QuizResults } from "@/components/survey/survey-results"
import Image from "next/image"

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
  const [validationError, setValidationError] = useState<string>("")
  const [shouldShake, setShouldShake] = useState(false)

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
    
    // Clear validation errors when user makes changes
    if (validationError) {
      setValidationError("")
    }
    
    // Auto-advance for radio button selections (not for input fields)
    const isRadioQuestion = [0, 2, 3, 4, 5, 6, 7].includes(currentStep)
    if (isRadioQuestion) {
      setTimeout(() => {
        // Auto-advance without validation since selecting a radio option IS the answer
        setDirection(1)
        setValidationError("") // Clear any existing errors
        if (currentStep < totalSteps - 1) {
          setCurrentStep((prev) => prev + 1)
        } else {
          setIsComplete(true)
        }
      }, 100) // Small delay to show selection feedback
    }
  }

  const validateCurrentStep = () => {
    // Skip validation for case 1 (Q2 - optional question)
    if (currentStep === 1) {
      setValidationError("") // Clear error for optional question
      return true
    }
    
    let errorMessage = ""
    
    // Validation logic for mandatory steps
    switch (currentStep) {
      case 0: // Vehicle type
        if (!quizData.vehicleInfo.vehicleType?.trim()) {
          errorMessage = "Please select a vehicle type"
        }
        break
      case 2: // Budget
        if (!quizData.vehicleInfo.budget?.trim()) {
          errorMessage = "Please select your budget"
        }
        break
      case 3: // Trade in
        if (!quizData.vehicleInfo.tradeIn?.trim()) {
          errorMessage = "Please select if you have a trade-in"
        }
        break
      case 4: // Credit score
        if (!quizData.vehicleInfo.creditScore?.trim()) {
          errorMessage = "Please select your credit rating"
        }
        break
      case 5: // Employment status
        if (!quizData.vehicleInfo.employment?.trim()) {
          errorMessage = "Please select your employment status"
        }
        break
      case 6: // Income
        if (!quizData.vehicleInfo.income?.trim()) {
          errorMessage = "Please select your monthly income"
        }
        break
      case 7: // Employment length
        if (!quizData.vehicleInfo.employmentLength?.trim()) {
          errorMessage = "Please select your employment length"
        }
        break
      case 8: // Company information
        if (!quizData.personalInfo.companyName?.trim() || !quizData.personalInfo.jobTitle?.trim()) {
          errorMessage = "Please fill in both company name and job title"
        }
        break
      case 9: // Address information
        if (!quizData.personalInfo.streetAddress?.trim() || 
            !quizData.personalInfo.city?.trim() || 
            !quizData.personalInfo.province?.trim() || 
            !quizData.personalInfo.postalCode?.trim()) {
          errorMessage = "Please fill in all address fields"
        }
        break
      case 10: // Date of birth
        if (!quizData.personalInfo.dateOfBirth?.trim()) {
          errorMessage = "Please enter your date of birth"
        }
        break
      case 11: // Contact information
        if (!quizData.personalInfo.fullName?.trim() || 
            !quizData.personalInfo.phone?.trim() || 
            !quizData.personalInfo.email?.trim()) {
          errorMessage = "Please fill in all contact fields"
        } else {
          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(quizData.personalInfo.email)) {
            errorMessage = "Please enter a valid email address"
          }
        }
        break
    }
    
    // Only update the validation error if it's different from the current one
    // This prevents unnecessary re-animations of the ErrorAlert component
    if (errorMessage !== validationError) {
      setValidationError(errorMessage)
    }
    
    return errorMessage === ""
  }

  const nextStep = () => {
    if (!validateCurrentStep()) {
      // Trigger shake animation
      setShouldShake(true)
      setTimeout(() => setShouldShake(false), 600)
      return
    }
    
    setDirection(1)
    setValidationError("") // Clear error on successful validation
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setIsComplete(true)
    }
  }

  const prevStep = () => {
    setDirection(-1)
    setValidationError("") // Clear error when going back
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
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 py-8">
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
              <motion.div
                animate={shouldShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Card className="shadow-lg py-0">
                  <CardContent className="p-6 md:p-8">
                    <QuizQuestion
                      step={currentStep}
                      quizData={quizData}
                      updateQuizData={updateQuizData}
                      validationError={validationError}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Logo Bar */}
        <div className="flex justify-center mt-8 mb-4 lg:mb-32">
          <Image 
            src="/logobar.png" 
            alt="Trusted partners - Norton by Symantec, McAfee Secure, South West Auto Group, Google Reviews" 
            width={800}
            height={200}
            className="max-w-full h-auto"
            priority={false}
          />
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