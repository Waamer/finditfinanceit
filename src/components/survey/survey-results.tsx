"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Mail, Phone, ArrowRight, Loader2 } from "lucide-react"
import type { QuizData } from "@/app/survey/page"

interface QuizResultsProps {
  quizData: QuizData
}

export function QuizResults({ quizData }: QuizResultsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

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
    } catch (error) {
      console.error("Error submitting quiz:", error)
      setSubmitError(error instanceof Error ? error.message : "An unexpected error occurred")
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
          <Card className="shadow-xl">
            <CardHeader className="text-center bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-t-lg">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center mb-4"
              >
                <CheckCircle className="h-16 w-16" />
              </motion.div>
              <CardTitle className="text-3xl font-bold mb-2">
                {isSubmitted ? "Thank You!" : "Quiz Complete!"}
              </CardTitle>
              <p className="text-primary-foreground/90 text-lg">
                {isSubmitted
                  ? "Your information has been submitted successfully"
                  : "Thank you for completing our automotive financing quiz"}
              </p>
            </CardHeader>

            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Success Message */}
                {isSubmitted && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                  >
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Submission Successful!</h3>
                    <p className="text-green-700">
                      Our automotive financing specialists will review your information and contact you within 24 hours with personalized options tailored to your needs.
                    </p>
                  </motion.div>
                )}

                {/* Error Message */}
                {submitError && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
                  >
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Submission Error</h3>
                    <p className="text-red-700 mb-4">{submitError}</p>
                    <Button
                      onClick={handleSubmit}
                      variant="outline"
                      className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Retrying...
                        </>
                      ) : (
                        "Try Again"
                      )}
                    </Button>
                  </motion.div>
                )}

                {/* Personal Summary */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Your Information Summary</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <p>
                        <strong>Name:</strong> {quizData.personalInfo.fullName}
                      </p>
                      <p>
                        <strong>Email:</strong> {quizData.personalInfo.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {quizData.personalInfo.phone}
                      </p>
                      <p>
                        <strong>Location:</strong> {quizData.personalInfo.city}, {quizData.personalInfo.province}
                      </p>
                      <p>
                        <strong>Company:</strong> {quizData.personalInfo.companyName}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p>
                        <strong>Vehicle Type:</strong> {quizData.vehicleInfo.vehicleType}
                      </p>
                      <p>
                        <strong>Budget:</strong> {quizData.vehicleInfo.budget}
                      </p>
                      <p>
                        <strong>Trade In:</strong> {quizData.vehicleInfo.tradeIn}
                      </p>
                      <p>
                        <strong>Credit Rating:</strong> {quizData.vehicleInfo.creditScore}
                      </p>
                      <p>
                        <strong>Employment:</strong> {quizData.vehicleInfo.employment}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Next Steps */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg"
                >
                  <h3 className="text-xl font-semibold text-foreground mb-4">What Happens Next?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <p>Our automotive financing specialists will review your information</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <p>You&apos;ll receive personalized financing options within 24 hours</p>
                    </div>
                    <div className="flex items-center space-x-3">
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
                    className="flex flex-col sm:flex-row gap-4 pt-6"
                  >
                    <Button
                      onClick={handleSubmit}
                      size="lg"
                      className="flex-1 text-lg py-6 group"
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
                  <p className="text-muted-foreground mb-4">Have questions? Our team is here to help!</p>
                  <div className="flex justify-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm">1-888-AUTO-QUIZ</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm">info@autoquizpro.com</span>
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