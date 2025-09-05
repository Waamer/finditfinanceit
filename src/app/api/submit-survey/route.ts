import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface QuizSubmission {
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
    timeframe?: string
    creditScore: string
    employment: string
    employmentLength: string
    income: string
  }
  preferences?: {
    financing: string[]
    priorities: string[]
    experience: string
  }
}

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Submit to GoHighLevel Survey (FIXED METHOD)
async function submitToGoHighLevelSurvey(data: QuizSubmission) {
  try {
    // For GHL Surveys, the submission endpoint is usually different
    // Method 1: Try the survey submission endpoint
    const surveyId = 'miWO77PJnCRklEYP5moa' // Extract from your URL
    const ghlSurveySubmitUrl = `https://api.leadconnectorhq.com/widget/survey/${surveyId}/submit`
    
    // Alternative Method 2: Try the form submission endpoint that matches your HTML
    const alternativeUrl = 'https://api.leadconnectorhq.com/widget/form/submit'
    
    console.log('Attempting GHL Survey submission for:', data.personalInfo.fullName)
    
    // Create the payload that matches GHL survey expectations
    const surveyPayload = {
      // Survey metadata
      surveyId: surveyId,
      source: 'website',
      submittedAt: new Date().toISOString(),
      
      // Survey responses - match the actual field names from HTML
      responses: {
        'what_type_of_vehicle_are_you_looking_for': data.vehicleInfo.vehicleType,
        'what_is_you_budget': data.vehicleInfo.budget,
        'radio_3dxv': data.vehicleInfo.tradeIn,
        'what_is_your_estimated_credit_rating': data.vehicleInfo.creditScore,
        'what_is_your_employment_status': data.vehicleInfo.employment,
        'what_is_your_monthly_income': data.vehicleInfo.income,
        'how_long_have_you_been_employed_at_your_current_job': data.vehicleInfo.employmentLength,
        'companys_name': data.personalInfo.companyName,
        'job_title': data.personalInfo.jobTitle,
        'address': data.personalInfo.streetAddress,
        'City_country': data.personalInfo.city,
        'province': data.personalInfo.province,
        'postal_code': data.personalInfo.postalCode,
        'date_of_birth': data.personalInfo.dateOfBirth,
        'full_name': data.personalInfo.fullName,
        'phone': data.personalInfo.phone,
        'email_0': data.personalInfo.email
      },
      
      // Contact information for lead creation
      contact: {
        firstName: data.personalInfo.firstName,
        lastName: data.personalInfo.lastName,
        email: data.personalInfo.email,
        phone: data.personalInfo.phone,
        address1: data.personalInfo.streetAddress,
        city: data.personalInfo.city,
        state: data.personalInfo.province,
        postalCode: data.personalInfo.postalCode,
        country: 'CA'
      }
    }

    // Method 1: Try JSON submission to survey endpoint
    let response = await fetch(ghlSurveySubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
        'Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
      },
      body: JSON.stringify(surveyPayload),
    })

    if (response.ok) {
      const responseData = await response.text()
      console.log('Successfully submitted to GHL Survey (Method 1):', responseData)
      return true
    }

    console.log('Method 1 failed, trying Method 2...')

    // Method 2: Try form-data submission to alternative endpoint
    const formData = new URLSearchParams()
    
    // Add all the survey responses as form data
    Object.entries(surveyPayload.responses).forEach(([key, value]) => {
      formData.append(key, value)
    })
    
    // Add metadata
    formData.append('surveyId', surveyId)
    formData.append('source', 'website')
    
    response = await fetch(alternativeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Origin': process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
        'Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
      },
      body: formData.toString(),
    })

    if (response.ok) {
      const responseData = await response.text()
      console.log('Successfully submitted to GHL Survey (Method 2):', responseData)
      return true
    }

    console.log('Method 2 failed, trying Method 3 (direct form submission)...')

    // Method 3: Try the exact URL from your env but with correct field mapping
    const directFormData = new URLSearchParams()
    
    // Use the exact field names that would be expected by the survey
    directFormData.append('what_type_of_vehicle_are_you_looking_for', data.vehicleInfo.vehicleType)
    directFormData.append('what_is_you_budget', data.vehicleInfo.budget)
    directFormData.append('radio_3dxv', data.vehicleInfo.tradeIn)
    directFormData.append('what_is_your_estimated_credit_rating', data.vehicleInfo.creditScore)
    directFormData.append('what_is_your_employment_status', data.vehicleInfo.employment)
    directFormData.append('what_is_your_monthly_income', data.vehicleInfo.income)
    directFormData.append('how_long_have_you_been_employed_at_your_current_job', data.vehicleInfo.employmentLength)
    directFormData.append('companys_name', data.personalInfo.companyName)
    directFormData.append('job_title', data.personalInfo.jobTitle)
    directFormData.append('address', data.personalInfo.streetAddress)
    directFormData.append('City_country', data.personalInfo.city)
    directFormData.append('province', data.personalInfo.province)
    directFormData.append('postal_code', data.personalInfo.postalCode)
    directFormData.append('date_of_birth', data.personalInfo.dateOfBirth)
    directFormData.append('full_name', data.personalInfo.fullName)
    directFormData.append('phone', data.personalInfo.phone)
    directFormData.append('email_0', data.personalInfo.email)
    
    // Add tracking
    directFormData.append('source', 'Auto Quiz Website')
    directFormData.append('lead_type', 'Auto Financing Survey')
    directFormData.append('submission_time', new Date().toISOString())

    const ghlFormUrl = process.env.GHL_SURVEY_URL
    if (!ghlFormUrl) {
      console.log('No GHL survey URL configured')
      return false
    }

    response = await fetch(ghlFormUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Origin': process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
        'Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
      },
      body: directFormData.toString(),
    })

    if (response.ok) {
      const responseData = await response.text()
      console.log('Successfully submitted to GHL Survey (Method 3):', responseData)
      return true
    }

    // Log all failures for debugging
    const errorText = await response.text()
    console.error('All GHL submission methods failed. Final error:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
      url: ghlFormUrl,
      payload: directFormData.toString()
    })
    
    return false
    
  } catch (error) {
    console.error('Error submitting to GoHighLevel survey:', error)
    return false
  }
}

// Send email notification as backup
async function sendEmailNotification(data: QuizSubmission, integrationStatus: { ghl: boolean }) {
  try {
    // Skip email if no SMTP configuration
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.ADMIN_EMAIL) {
      console.log('Email configuration missing, skipping email notification')
      return false
    }

    const transporter = createTransporter()
    
    const statusBadge = (success: boolean) => 
      success ? '✅ Success' : '❌ Failed'
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Auto Quiz Submission
        </h2>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #495057;">Integration Status</h3>
          <p><strong>GoHighLevel Survey:</strong> ${statusBadge(integrationStatus.ghl)}</p>
        </div>
        
        <div style="background: white; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
          <h3 style="color: #007bff; margin-top: 0;">Personal Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 5px; font-weight: bold;">Name:</td><td style="padding: 5px;">${data.personalInfo.fullName}</td></tr>
            <tr><td style="padding: 5px; font-weight: bold;">Email:</td><td style="padding: 5px;">${data.personalInfo.email}</td></tr>
            <tr><td style="padding: 5px; font-weight: bold;">Phone:</td><td style="padding: 5px;">${data.personalInfo.phone}</td></tr>
            <tr><td style="padding: 5px; font-weight: bold;">Address:</td><td style="padding: 5px;">${data.personalInfo.streetAddress}, ${data.personalInfo.city}, ${data.personalInfo.province} ${data.personalInfo.postalCode}</td></tr>
            <tr><td style="padding: 5px; font-weight: bold;">DOB:</td><td style="padding: 5px;">${data.personalInfo.dateOfBirth}</td></tr>
            <tr><td style="padding: 5px; font-weight: bold;">Company:</td><td style="padding: 5px;">${data.personalInfo.companyName}</td></tr>
            <tr><td style="padding: 5px; font-weight: bold;">Job Title:</td><td style="padding: 5px;">${data.personalInfo.jobTitle}</td></tr>
          </table>
          
          <h3 style="color: #007bff; margin-top: 30px;">Vehicle & Financial Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 5px; font-weight: bold;">Vehicle Type:</td><td style="padding: 5px;">${data.vehicleInfo.vehicleType}</td></tr>
            <tr><td style="padding: 5px; font-weight: bold;">Budget:</td><td style="padding: 5px;">${data.vehicleInfo.budget}</td></tr>
            <tr><td style="padding: 5px; font-weight: bold;">Trade In:</td><td style="padding: 5px;">${data.vehicleInfo.tradeIn}</td></tr>
            <tr><td style="padding: 5px; font-weight: bold;">Credit Score:</td><td style="padding: 5px;">${data.vehicleInfo.creditScore}</td></tr>
            <tr><td style="padding: 5px; font-weight: bold;">Employment:</td><td style="padding: 5px;">${data.vehicleInfo.employment}</td></tr>
            <tr><td style="padding: 5px; font-weight: bold;">Employment Length:</td><td style="padding: 5px;">${data.vehicleInfo.employmentLength}</td></tr>
            <tr><td style="padding: 5px; font-weight: bold;">Monthly Income:</td><td style="padding: 5px;">${data.vehicleInfo.income}</td></tr>
          </table>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 5px;">
          <p style="margin: 0;"><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
          <p style="margin: 5px 0 0 0;"><strong>Source:</strong> Auto Quiz Website</p>
        </div>
      </div>
    `
    
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `🚗 New Auto Quiz Lead: ${data.personalInfo.fullName} - ${data.vehicleInfo.vehicleType}`,
      html: htmlContent,
    })
    
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

// Validate required fields
function validateQuizData(data: QuizSubmission): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Required personal info fields
  if (!data.personalInfo?.fullName?.trim()) errors.push('Full name is required')
  if (!data.personalInfo?.email?.trim()) errors.push('Email is required')
  if (!data.personalInfo?.phone?.trim()) errors.push('Phone number is required')
  if (!data.personalInfo?.city?.trim()) errors.push('City is required')
  if (!data.personalInfo?.province?.trim()) errors.push('Province is required')
  if (!data.personalInfo?.streetAddress?.trim()) errors.push('Street address is required')
  if (!data.personalInfo?.postalCode?.trim()) errors.push('Postal code is required')
  if (!data.personalInfo?.dateOfBirth?.trim()) errors.push('Date of birth is required')
  if (!data.personalInfo?.companyName?.trim()) errors.push('Company name is required')
  if (!data.personalInfo?.jobTitle?.trim()) errors.push('Job title is required')
  
  // Required vehicle info fields
  if (!data.vehicleInfo?.vehicleType?.trim()) errors.push('Vehicle type is required')
  if (!data.vehicleInfo?.budget?.trim()) errors.push('Budget is required')
  if (!data.vehicleInfo?.tradeIn?.trim()) errors.push('Trade in preference is required')
  if (!data.vehicleInfo?.creditScore?.trim()) errors.push('Credit score is required')
  if (!data.vehicleInfo?.employment?.trim()) errors.push('Employment status is required')
  if (!data.vehicleInfo?.employmentLength?.trim()) errors.push('Employment length is required')
  if (!data.vehicleInfo?.income?.trim()) errors.push('Monthly income is required')
  
  // Email format validation
  if (data.personalInfo?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email)) {
    errors.push('Invalid email format')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: QuizSubmission = await request.json()
    
    console.log('Received quiz submission:', {
      name: data.personalInfo?.fullName,
      email: data.personalInfo?.email,
      vehicleType: data.vehicleInfo?.vehicleType
    })
    
    // Validate the submitted data
    const validation = validateQuizData(data)
    if (!validation.isValid) {
      console.error('Validation failed:', validation.errors)
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validation.errors 
        },
        { status: 400 }
      )
    }
    
    // Try GoHighLevel survey submission first (primary method)
    console.log('Attempting GoHighLevel survey submission...')
    const ghlSuccess = await submitToGoHighLevelSurvey(data)
    console.log('GHL submission result:', ghlSuccess)
    
    // Send email notification as backup/confirmation
    console.log('Sending email notification...')
    const emailSuccess = await sendEmailNotification(data, {
      ghl: ghlSuccess,
    })
    console.log('Email notification result:', emailSuccess)
    
    // Success if GHL worked (email is optional backup)
    if (ghlSuccess) {
      return NextResponse.json({
        success: true,
        message: 'Survey submission processed successfully',
        integrations: {
          goHighLevel: ghlSuccess,
          email: emailSuccess,
        },
      })
    } else {
      // If GHL failed but email worked, still consider it a partial success
      if (emailSuccess) {
        return NextResponse.json({
          success: true,
          message: 'Survey submission received (backup method used)',
          integrations: {
            goHighLevel: false,
            email: true,
          },
        })
      } else {
        throw new Error('All submission methods failed')
      }
    }
    
  } catch (error) {
    console.error('Error processing quiz submission:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process quiz submission',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    message: 'Survey submission endpoint is running',
    timestamp: new Date().toISOString(),
    config: {
      ghlConfigured: !!process.env.GHL_SURVEY_URL,
      emailConfigured: !!(process.env.SMTP_USER && process.env.SMTP_PASS && process.env.ADMIN_EMAIL)
    }
  })
}