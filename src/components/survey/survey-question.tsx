"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowRight, CheckCircle } from "lucide-react"
import type { QuizData } from "@/app/survey/page"

interface QuizQuestionProps {
  step: number
  quizData: QuizData
  updateQuizData: (section: keyof QuizData, field: string, value: string | number | boolean) => void
  onNext: () => void
}

export function QuizQuestion({ step, quizData, updateQuizData, onNext }: QuizQuestionProps) {
  const [validationError, setValidationError] = useState<string>("")

  const handleInputChange = (field: string, value: string | number | boolean, section: keyof QuizData) => {
    updateQuizData(section, field, value)
    // Clear validation error when user starts typing
    if (validationError) setValidationError("")
  }

  const validateAndProceed = () => {
    // Validation logic for form steps
    switch (step) {
      case 8: // Company information
        if (!quizData.personalInfo.companyName?.trim() || !quizData.personalInfo.jobTitle?.trim()) {
          setValidationError("Please fill in both company name and job title")
          return
        }
        break
      case 9: // Address information
        if (!quizData.personalInfo.streetAddress?.trim() || 
            !quizData.personalInfo.city?.trim() || 
            !quizData.personalInfo.province?.trim() || 
            !quizData.personalInfo.postalCode?.trim()) {
          setValidationError("Please fill in all address fields")
          return
        }
        break
      case 10: // Date of birth
        if (!quizData.personalInfo.dateOfBirth?.trim()) {
          setValidationError("Please enter your date of birth")
          return
        }
        break
      case 11: // Contact information
        if (!quizData.personalInfo.fullName?.trim() || 
            !quizData.personalInfo.phone?.trim() || 
            !quizData.personalInfo.email?.trim()) {
          setValidationError("Please fill in all contact fields")
          return
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(quizData.personalInfo.email)) {
          setValidationError("Please enter a valid email address")
          return
        }
        break
    }
    
    setValidationError("")
    onNext()
  }

  const renderQuestion = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
              What type of vehicle are you looking for?
            </h2>
            <RadioGroup
              value={quizData.vehicleInfo.vehicleType}
              onValueChange={(value) => {
                handleInputChange("vehicleType", value, "vehicleInfo")
                requestAnimationFrame(onNext);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { value: "Car", icon: "🚗", bgColor: "bg-blue-50", borderColor: "border-blue-200", hoverColor: "hover:bg-blue-100", selected: "bg-blue-200/85 shadow-lg" },
                  { value: "SUV", icon: "🚙", bgColor: "bg-green-50", borderColor: "border-green-200", hoverColor: "hover:bg-green-100", selected: "bg-green-200/85 shadow-lg" },
                  { value: "Truck", icon: "🚛", bgColor: "bg-red-50", borderColor: "border-red-200", hoverColor: "hover:bg-red-100", selected: "bg-red-200/85 shadow-lg" },
                  { value: "Sedan", icon: "🚗", bgColor: "bg-yellow-50", borderColor: "border-yellow-200", hoverColor: "hover:bg-yellow-100", selected: "bg-yellow-200/85 shadow-lg" }
                ].map((vehicle) => {
                  const isSelected = quizData.vehicleInfo.vehicleType === vehicle.value
                  return (
                    <div key={vehicle.value} className="relative">
                      <RadioGroupItem
                        value={vehicle.value}
                        id={vehicle.value}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={vehicle.value}
                        className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 min-h-[140px]
                          ${vehicle.bgColor} ${vehicle.borderColor} ${vehicle.hoverColor}
                          ${isSelected ? vehicle.selected  : ""}
                          peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:shadow-md
                        `}
                      >
                        <div className="text-4xl mb-3">{vehicle.icon}</div>
                        <span className="text-lg font-medium text-foreground">{vehicle.value}</span>
                      </Label>
                    </div>
                  )
                })}
              </div>
            </RadioGroup>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">List your desired vehicle</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="" className="text-base font-medium"></Label>
                <Input
                  id=""
                  value={quizData.vehicleInfo.desiredVehicle || ""}
                  onChange={(e) => handleInputChange("desiredVehicle", e.target.value, "vehicleInfo")}
                  placeholder="Enter your desired vehicle (Ex: 2020 Honda Civic)"
                  className="mt-2"
                  required
                />
              </div>
            </div>
            {validationError && (
              <div className="text-red-600 text-sm mt-2">{validationError}</div>
            )}
            <div className="pt-4">
              <Button onClick={validateAndProceed} className="w-full">
                <span>Next</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">What is your budget?</h2>
            <RadioGroup
              value={quizData.vehicleInfo.budget}
              onValueChange={(value) => {
                handleInputChange("budget", value, "vehicleInfo")
                requestAnimationFrame(onNext);
              }}
            >
              <div className="space-y-4">
                {[
                  { value: "Under $400", label: "Under $400 / Month", subtitle: "(Ballin on a Budget)" },
                  { value: "$400-499", label: "$400-499 / Month", subtitle: "(Payment Pro)" },
                  { value: "$500-600", label: "$500-600 / Month", subtitle: "(Boss Level Budget)" },
                  { value: "Over $600", label: "Over $600 / Month", subtitle: "(Big Baller)" }
                ].map((budget) => {
                  const isSelected = quizData.vehicleInfo.budget === budget.value
                  return (
                    <div key={budget.value} className="relative">
                      <RadioGroupItem
                        value={budget.value}
                        id={budget.value}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={budget.value}
                        className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 min-h-[60px]
                          ${isSelected
                            ? "border-primary bg-primary text-primary-foreground shadow"
                            : "border-gray-200 bg-white text-foreground  hover:bg-gray-100"}
                        `}
                      >
                        <div>
                          <div className="text-lg font-medium">{budget.label}</div>
                          <div className="text-sm text-muted-foreground">{budget.subtitle}</div>
                        </div>
                        <div className={`w-4 h-4 border-2 rounded-full ${isSelected ? "border-primary bg-primary" : "border-gray-400"}`}></div>
                      </Label>
                    </div>
                  )
                })}
              </div>
            </RadioGroup>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Do you have a trade in?</h2>
            <RadioGroup
              value={quizData.vehicleInfo.tradeIn}
              onValueChange={(value) => {
                handleInputChange("tradeIn", value, "vehicleInfo")
                requestAnimationFrame(onNext);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Yes", "No", "Unsure"].map((option) => {
                  const isSelected = quizData.vehicleInfo.tradeIn === option
                  return (
                    <div key={option} className="relative">
                      <RadioGroupItem
                        value={option}
                        id={option}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={option}
                        className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 min-h-[60px]
                          ${isSelected
                            ? "border-primary bg-primary text-primary-foreground shadow"
                            : "border-gray-200 bg-white text-foreground  hover:bg-gray-100"}
                        `}
                      >
                        <span className="text-lg font-medium">{option}</span>
                      </Label>
                    </div>
                  )
                })}
              </div>
            </RadioGroup>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">What is your estimated credit rating?</h2>
            <RadioGroup
              value={quizData.vehicleInfo.creditScore}
              onValueChange={(value) => {
                handleInputChange("creditScore", value, "vehicleInfo")
                requestAnimationFrame(onNext);
              }}
            >
              <div className="space-y-3">
                {[
                  "Excellent (760-900)",
                  "Very Good (725-759)",
                  "Good (660-724)",
                  "Fair (600-659)",
                  "Poor (300-599)",
                  "No Credit / Unsure"
                ].map((credit) => {
                  const isSelected = quizData.vehicleInfo.creditScore === credit
                  return (
                    <div key={credit} className="relative">
                      <RadioGroupItem
                        value={credit}
                        id={credit}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={credit}
                        className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 min-h-[60px]
                          ${isSelected
                            ? "border-primary bg-primary text-primary-foreground shadow"
                            : "border-gray-200 bg-white text-foreground  hover:bg-gray-100"}
                        `}
                      >
                        <span className="text-lg font-medium">{credit}</span>
                        <div className={`w-4 h-4 border-2 rounded-full ${isSelected ? "border-primary bg-primary" : "border-gray-400"}`}></div>
                      </Label>
                    </div>
                  )
                })}
              </div>
            </RadioGroup>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">What is your employment status?</h2>
            <RadioGroup
              value={quizData.vehicleInfo.employment}
              onValueChange={(value) => {
                handleInputChange("employment", value, "vehicleInfo")
                requestAnimationFrame(onNext);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Employed", "Self-Employed", "Student", "Retired/Pension", "Other"].map((employment) => {
                  const isSelected = quizData.vehicleInfo.employment === employment
                  return (
                    <div key={employment} className="relative">
                      <RadioGroupItem
                        value={employment}
                        id={employment}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={employment}
                        className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 min-h-[60px]
                          ${isSelected
                            ? "border-primary bg-primary text-primary-foreground shadow"
                            : "border-gray-200 bg-white text-foreground  hover:bg-gray-100"}
                        `}
                      >
                        <span className="text-lg font-medium">{employment}</span>
                      </Label>
                    </div>
                  )
                })}
              </div>
            </RadioGroup>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">What is your monthly income?</h2>
            <RadioGroup
              value={quizData.vehicleInfo.income}
              onValueChange={(value) => {
                handleInputChange("income", value, "vehicleInfo")
                requestAnimationFrame(onNext);
              }}
            >
              <div className="space-y-3">
                {[
                  "$2000-$2500",
                  "$2501-$3500",
                  "$3501-$4500",
                  "$4500+"
                ].map((income) => {
                  const isSelected = quizData.vehicleInfo.income === income
                  return (
                    <div key={income} className="relative">
                      <RadioGroupItem
                        value={income}
                        id={income}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={income}
                        className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 min-h-[60px]
                          ${isSelected
                            ? "border-primary bg-primary text-primary-foreground shadow"
                            : "border-gray-200 bg-white text-foreground  hover:bg-gray-100"}
                        `}
                      >
                        <span className="text-lg font-medium">{income}</span>
                        <div className={`w-4 h-4 border-2 rounded-full ${isSelected ? "border-primary bg-primary" : "border-gray-400"}`}></div>
                      </Label>
                    </div>
                  )
                })}
              </div>
            </RadioGroup>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">How long have you been employed at your current job?</h2>
            <RadioGroup
              value={quizData.vehicleInfo.employmentLength}
              onValueChange={(value) => {
                handleInputChange("employmentLength", value, "vehicleInfo")
                requestAnimationFrame(onNext);
              }}
            >
              <div className="space-y-3">
                {[
                  "Less than 3 Months",
                  "3 Months-2 Years",
                  "2+ Years"
                ].map((length) => {
                  const isSelected = quizData.vehicleInfo.employmentLength === length
                  return (
                    <div key={length} className="relative">
                      <RadioGroupItem
                        value={length}
                        id={length}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={length}
                        className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 min-h-[60px]
                          ${isSelected
                            ? "border-primary bg-primary text-primary-foreground shadow"
                            : "border-gray-200 bg-white text-foreground  hover:bg-gray-100"}
                        `}
                      >
                        <span className="text-lg font-medium">{length}</span>
                        <div className={`w-4 h-4 border-2 rounded-full ${isSelected ? "border-primary bg-primary" : "border-gray-400"}`}></div>
                      </Label>
                    </div>
                  )
                })}
              </div>
            </RadioGroup>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Where do you work?</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName" className="text-base font-medium">Company Name *</Label>
                <Input
                  id="companyName"
                  value={quizData.personalInfo.companyName || ""}
                  onChange={(e) => handleInputChange("companyName", e.target.value, "personalInfo")}
                  placeholder="Enter your company name"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="jobTitle" className="text-base font-medium">Job Title *</Label>
                <Input
                  id="jobTitle"
                  value={quizData.personalInfo.jobTitle || ""}
                  onChange={(e) => handleInputChange("jobTitle", e.target.value, "personalInfo")}
                  placeholder="Enter your job title"
                  className="mt-2"
                  required
                />
              </div>
            </div>
            {validationError && (
              <div className="text-red-600 text-sm mt-2">{validationError}</div>
            )}
            <div className="pt-4">
              <Button onClick={validateAndProceed} className="w-full">
                <span>Next</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 9:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">What is your address?</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="streetAddress" className="text-base font-medium">Street Address *</Label>
                <Input
                  id="streetAddress"
                  value={quizData.personalInfo.streetAddress || ""}
                  onChange={(e) => handleInputChange("streetAddress", e.target.value, "personalInfo")}
                  placeholder="Enter your street address"
                  className="mt-2"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-base font-medium">City/Country *</Label>
                  <Input
                    id="city"
                    value={quizData.personalInfo.city || ""}
                    onChange={(e) => handleInputChange("city", e.target.value, "personalInfo")}
                    placeholder="Enter your city"
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="province" className="text-base font-medium">Province *</Label>
                  <Input
                    id="province"
                    value={quizData.personalInfo.province || ""}
                    onChange={(e) => handleInputChange("province", e.target.value, "personalInfo")}
                    placeholder="Enter your province"
                    className="mt-2"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="postalCode" className="text-base font-medium">Postal Code *</Label>
                <Input
                  id="postalCode"
                  value={quizData.personalInfo.postalCode || ""}
                  onChange={(e) => handleInputChange("postalCode", e.target.value, "personalInfo")}
                  placeholder="Enter your postal code"
                  className="mt-2"
                  required
                />
              </div>
            </div>
            {validationError && (
              <div className="text-red-600 text-sm mt-2">{validationError}</div>
            )}
            <div className="pt-4">
              <Button onClick={validateAndProceed} className="w-full">
                <span>Next</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 10:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Date of Birth</h2>
            <div>
              <Label htmlFor="dateOfBirth" className="text-base font-medium">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={quizData.personalInfo.dateOfBirth || ""}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value, "personalInfo")}
                className="mt-2"
                required
              />
            </div>
            {validationError && (
              <div className="text-red-600 text-sm mt-2">{validationError}</div>
            )}
            <div className="pt-4">
              <Button onClick={validateAndProceed} className="w-full">
                <span>Next</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 11:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">How do we get in touch with you?</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-base font-medium">Full Name *</Label>
                <Input
                  id="fullName"
                  value={quizData.personalInfo.fullName || ""}
                  onChange={(e) => handleInputChange("fullName", e.target.value, "personalInfo")}
                  placeholder="Enter your full name"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber" className="text-base font-medium">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={quizData.personalInfo.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value, "personalInfo")}
                  placeholder="Enter your phone number"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-base font-medium">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={quizData.personalInfo.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value, "personalInfo")}
                  placeholder="Enter your email address"
                  className="mt-2"
                  required
                />
              </div>
            </div>
            {validationError && (
              <div className="text-red-600 text-sm mt-2">{validationError}</div>
            )}
            <div className="pt-4">
              <Button onClick={validateAndProceed} className="w-full">
                <span>Complete Quiz</span>
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return <div>{renderQuestion()}</div>
}