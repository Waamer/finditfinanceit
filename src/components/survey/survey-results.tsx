"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Mail, Phone, ArrowRight, Loader2, BadgeCheck, CheckCircle2, AlertCircle } from "lucide-react"
import type { QuizData } from "@/app/survey/page"

interface QuizResultsProps {
  quizData: QuizData
}

export function QuizResults({ quizData }: QuizResultsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/submit-survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit quiz data")
      }

      setIsSubmitted(true)
      console.log("Quiz submitted successfully:", result)
      
      // Show success toast with alert
      toast.custom(() => (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Application Submitted Successfully!</AlertTitle>
          <AlertDescription className="text-green-700">
            Our automotive financing specialists will review your information and contact you within 24 hours with personalized options.
          </AlertDescription>
        </Alert>
      ), {
        duration: 8000,
      })
    } catch (error) {
      console.error("Error submitting quiz:", error)
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      
      // Show error toast with alert and retry action
      toast.custom(() => (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Submission Failed</AlertTitle>
          <AlertDescription>
            <p className="mb-3">{errorMessage}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-7 bg-background border-destructive/30 text-destructive hover:bg-destructive/10"
                onClick={() => {
                  toast.dismiss()
                  handleSubmit()
                }}
              >
                Try Again
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                onClick={() => toast.dismiss()}
              >
                Dismiss
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ), {
        duration: Infinity, // Keep open until user dismisses
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-card/30 to-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-xl py-0">
            <CardHeader className="text-center bg-gradient-to-r from-red-300 to-red-400 text-primary-foreground/90 py-4 rounded-t-lg">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center mb-2"
              >
                <BadgeCheck className="h-16 w-16" />
              </motion.div>
              <CardTitle className="text-3xl font-bold">
                {isSubmitted ? "Thank You!" : "Survey Complete!"}
              </CardTitle>
              <p className="text-primary-foreground/90 text-lg">
                {isSubmitted
                  ? "Your information has been submitted successfully"
                  : "Thank you for completing our automotive financing survey"}
              </p>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 pt-2">
              <div className="space-y-6">
                {/* Personal Summary */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Your Information Summary</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <p><strong>Full Name:</strong> {quizData.personalInfo.fullName}</p>
                      <p><strong>Email:</strong> {quizData.personalInfo.email}</p>
                      <p><strong>Phone:</strong> {quizData.personalInfo.phone}</p>
                      <p><strong>Street Address:</strong> {quizData.personalInfo.streetAddress}</p>
                      <p><strong>City:</strong> {quizData.personalInfo.city}</p>
                      <p><strong>Province:</strong> {quizData.personalInfo.province}</p>
                      <p><strong>Postal Code:</strong> {quizData.personalInfo.postalCode}</p>
                      <p><strong>Date of Birth:</strong> {quizData.personalInfo.dateOfBirth}</p>
                      <p><strong>Company Name:</strong> {quizData.personalInfo.companyName}</p>
                      <p><strong>Job Title:</strong> {quizData.personalInfo.jobTitle}</p>
                    </div>
                    <div className="space-y-1">
                      <p><strong>Vehicle Type:</strong> {quizData.vehicleInfo.vehicleType}</p>
                      <p><strong>Desired Vehicle:</strong> {quizData.vehicleInfo.desiredVehicle}</p>
                      <p><strong>Budget:</strong> {quizData.vehicleInfo.budget}</p>
                      <p><strong>Trade In:</strong> {quizData.vehicleInfo.tradeIn}</p>
                      <p><strong>Credit Score:</strong> {quizData.vehicleInfo.creditScore}</p>
                      <p><strong>Employment Status:</strong> {quizData.vehicleInfo.employment}</p>
                      <p><strong>Employment Length:</strong> {quizData.vehicleInfo.employmentLength}</p>
                      <p><strong>Monthly Income:</strong> {quizData.vehicleInfo.income}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Next Steps */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-primary/10 p-6 rounded-lg text-center sm:text-left"
                >
                  <h3 className="text-xl font-semibold text-foreground mb-4">What Happens Next?</h3>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <p>Our automotive financing specialists will review your information</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <p>You&apos;ll receive personalized financing options within 24 hours</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <p>Schedule a consultation to discuss your best options</p>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                {!isSubmitted && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Button
                      onClick={handleSubmit}
                      size="lg"
                      className="flex-1 py-6 group text-sm sm:text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          Submit My Application
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}

                {/* Contact Info */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center pt-6 border-t"
                >
                  <p className="text-muted-foreground mb-3">Have questions? Our team is here to help!</p>
                  <div className="flex flex-col sm:flex-row justify-center space-x-6 gap-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm">1-123-456-7890</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm">info@fifi.com</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}