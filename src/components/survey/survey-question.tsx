"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { AddressAutocomplete } from "@/components/survey/address-autocomplete"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, ChevronDownIcon, CloudUpload, FileText, X, Check, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import NextImage from "next/image"
import type { QuizData } from "@/app/survey/page"

interface QuizQuestionProps {
  step: number
  quizData: QuizData
  updateQuizData: (section: keyof QuizData, field: string, value: string | number | boolean) => void
  validationError?: string
}

interface PayStubUploaderProps {
  currentPayStub: string | null
  onFileChange: (payStubData: string) => void
  onFileRemove: () => void
}

function PayStubUploader({ currentPayStub, onFileChange, onFileRemove }: PayStubUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Parse current pay stub data if it exists
  const parsePayStubData = (payStubData: string | null) => {
    if (!payStubData) return null
    try {
      return JSON.parse(payStubData)
    } catch {
      // Old format fallback
      if (payStubData.startsWith('data:image')) {
        return { original: payStubData, filename: 'paystub.jpg', size: 0 }
      }
      return null
    }
  }

  const currentFile = parsePayStubData(currentPayStub)

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 15
        })
      }, 100)

      // Convert file to base64
      const base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      // Create compressed version
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      await new Promise<void>((resolve) => {
        img.onload = () => {
          const maxSize = 300
          let { width, height } = img

          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width
              width = maxSize
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height
              height = maxSize
            }
          }

          canvas.width = width
          canvas.height = height
          ctx?.drawImage(img, 0, 0, width, height)
          resolve()
        }
        img.src = base64String
      })

      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.3)

      // Complete progress
      setUploadProgress(100)
      
      setTimeout(() => {
        const payStubData = JSON.stringify({
          original: base64String,
          compressed: compressedBase64,
          filename: file.name,
          size: file.size
        })

        onFileChange(payStubData)
        setIsUploading(false)
        setUploadProgress(0)
      }, 300)

    } catch (error) {
      console.error('Upload failed:', error)
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    const validFile = files.find(file => 
      file.type.startsWith('image/') || file.type === 'application/pdf'
    )
    
    if (validFile && validFile.size <= 10 * 1024 * 1024) {
      handleFileUpload(validFile)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full"
    >
      {!currentFile ? (
        <motion.div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300",
            isDragging 
              ? "border-primary bg-primary/5 scale-[1.02]" 
              : "border-muted-foreground/20 hover:border-primary/40 hover:bg-primary/2",
            isUploading && "pointer-events-none"
          )}
        >
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          
          <motion.div
            animate={{ 
              scale: isDragging ? 1.1 : 1,
              rotate: isDragging ? 5 : 0 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center gap-4"
          >
            {isUploading ? (
              <>
                <div className="relative">
                  <Upload className="size-12 text-primary animate-bounce" />
                  <motion.div
                    className="absolute -bottom-2 -right-2 size-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {uploadProgress}
                  </motion.div>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Uploading...</p>
                  <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <CloudUpload className={cn(
                  "size-12 transition-colors duration-300",
                  isDragging ? "text-primary" : "text-muted-foreground"
                )} />
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">
                    {isDragging ? "Drop your file here!" : "Upload Pay Stub"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Click here or drag and drop your pay stub
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-1 bg-muted rounded">PDF</span>
                    <span className="px-2 py-1 bg-muted rounded">PNG</span>
                    <span className="px-2 py-1 bg-muted rounded">JPG</span>
                    <span className="text-muted-foreground/60">• Max 10MB</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-xl p-6"
        >
          <div className="flex items-start gap-4 flex-col sm:flex-row">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              className="flex-shrink-0"
            >
              {currentFile.original?.startsWith('data:image') ? (
                <div className="relative">
                  <NextImage
                    src={currentFile.original}
                    alt="Pay stub preview"
                    width={64}
                    height={64}
                    className="size-16 object-cover rounded-lg border-2 border-green-200 dark:border-green-700"
                  />
                  <div className="absolute -top-1 -right-1 size-6 bg-green-500 text-white rounded-full flex items-center justify-center">
                    <Check className="size-3" />
                  </div>
                </div>
              ) : (
                <div className="size-16 bg-green-100 dark:bg-green-900/30 rounded-lg border-2 border-green-200 dark:border-green-700 flex items-center justify-center">
                  <FileText className="size-8 text-green-600 dark:text-green-400" />
                  <div className="absolute -top-1 -right-1 size-6 bg-green-500 text-white rounded-full flex items-center justify-center">
                    <Check className="size-3" />
                  </div>
                </div>
              )}
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <p className="font-semibold text-foreground truncate">
                  {currentFile.filename}
                </p>
                <p className="text-sm text-muted-foreground">
                  {(currentFile.size / (1024 * 1024)).toFixed(2)} MB • Uploaded successfully
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Check className="size-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">Ready for processing</span>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={onFileRemove}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors duration-200"
              >
                <X className="size-4" />
              </Button>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-4 pt-4 border-t border-green-200 dark:border-green-800"
          >
            <div className="flex items-center justify-between text-sm flex-col text-center sm:text-left sm:flex-row gap-2">
              <span className="text-green-700 dark:text-green-300 font-medium">
                ✅ File uploaded and ready for review
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const input = document.createElement('input')
                  input.type = 'file'
                  input.accept = 'image/*,.pdf'
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0]
                    if (file) handleFileUpload(file)
                  }
                  input.click()
                }}
                className="text-xs h-7 border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-950/20"
              >
                Replace File
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export function QuizQuestion({ step, quizData, updateQuizData, validationError }: QuizQuestionProps) {
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  
  const handleInputChange = (field: string, value: string | number | boolean, section: keyof QuizData) => {
    updateQuizData(section, field, value)
  }



  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Convert date to YYYY-MM-DD format for consistency
      const formattedDate = selectedDate.toISOString().split('T')[0]
      handleInputChange("dateOfBirth", formattedDate, "personalInfo")
    }
    setDatePickerOpen(false)
  }

  const ErrorAlert = ({ error }: { error?: string }) => (
    <AnimatePresence>
      {error && (
        <motion.div
          transition={{ duration: 0.2 }}
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Validation Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  )

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
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <ErrorAlert error={validationError} />
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Find A Specific Vehicle?</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="" className="text-base font-medium"></Label>
                <Input
                  id=""
                  value={quizData.vehicleInfo.desiredVehicle || ""}
                  onChange={(e) => handleInputChange("desiredVehicle", e.target.value, "vehicleInfo")}
                  placeholder="Find A Specific Vehicle? (Ex: 2020 Honda Civic)"
                  className="mt-2"
                />
              </div>
            </div>
            <ErrorAlert error={validationError} />
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
            <ErrorAlert error={validationError} />
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
            <ErrorAlert error={validationError} />
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
            <ErrorAlert error={validationError} />
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
            <ErrorAlert error={validationError} />
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
            <ErrorAlert error={validationError} />
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
            <ErrorAlert error={validationError} />
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
            <ErrorAlert error={validationError} />
          </div>
        )

      case 9:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">What is your address?</h2>
            <AddressAutocomplete
              onAddressSelect={(addressData) => {
                updateQuizData("personalInfo", "streetAddress", addressData.streetAddress)
                updateQuizData("personalInfo", "city", addressData.city)
                updateQuizData("personalInfo", "province", addressData.province)
                updateQuizData("personalInfo", "postalCode", addressData.postalCode)
              }}
              streetAddress={quizData.personalInfo.streetAddress || ""}
              city={quizData.personalInfo.city || ""}
              province={quizData.personalInfo.province || ""}
              postalCode={quizData.personalInfo.postalCode || ""}
              validationError={validationError}
            />
          </div>
        )

      case 10:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Date of Birth</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col gap-3"
            >
              <Label htmlFor="date" className="px-1 text-base font-medium">
                Date of birth *
              </Label>
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <motion.div
                  >
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full justify-between font-normal h-12 text-left"
                    >
                      {quizData.personalInfo.dateOfBirth 
                        ? new Date(quizData.personalInfo.dateOfBirth + 'T00:00:00').toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : "Select your date of birth"
                      }
                      <ChevronDownIcon className="h-4 w-4 opacity-50" />
                    </Button>
                  </motion.div>
                </PopoverTrigger>
                <AnimatePresence>
                  {datePickerOpen && (
                    <PopoverContent 
                      className="w-auto overflow-hidden p-0" 
                      align="start"
                      asChild
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Calendar
                          mode="single"
                          selected={quizData.personalInfo.dateOfBirth 
                            ? new Date(quizData.personalInfo.dateOfBirth + 'T00:00:00') 
                            : undefined
                          }
                          captionLayout="dropdown"
                          onSelect={handleDateSelect}
                          fromYear={1924}
                          toYear={2028}
                          defaultMonth={new Date(2000, 0)}
                        />
                      </motion.div>
                    </PopoverContent>
                  )}
                </AnimatePresence>
              </Popover>
            </motion.div>
            <ErrorAlert error={validationError} />
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
            <ErrorAlert error={validationError} />
          </div>
        )

      case 12:
        return (
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl font-semibold text-foreground mb-2"
              >
                ⚡ Speed Up Your Approval!
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground text-lg mb-6"
              >
                Upload a recent pay stub for faster processing (Optional)
              </motion.p>
            </motion.div>
            
            <PayStubUploader 
              currentPayStub={quizData.documents.payStub}
              onFileChange={(payStubData) => handleInputChange("payStub", payStubData, "documents")}
              onFileRemove={() => handleInputChange("payStub", "", "documents")}
            />
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center text-sm text-muted-foreground"
            >
              <p>💡 This step is optional. You can skip if you prefer to.</p>
            </motion.div>
            
            <ErrorAlert error={validationError} />
          </div>
        )

      default:
        return null
    }
  }

  return <div>{renderQuestion()}</div>
}
