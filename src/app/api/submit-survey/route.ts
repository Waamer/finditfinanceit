import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'
import { DateTime } from 'luxon'

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
    creditScore: string
    employment: string
    employmentLength: string
    income: string
    desiredVehicle: string
  }
}

// --- GOOGLE SHEETS SETUP ---

const GOOGLE_SHEET_ID = (process.env.GOOGLE_SHEET_ID || '').replace(/['"]/g, '')

function getGoogleAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      project_id: process.env.GOOGLE_PROJECT_ID,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

// (Removed unused flattenKeys)

// --- FLATTEN KEYS, REMOVE PREFIXES, REMOVE firstName/lastName ---
function flattenKeysNoPrefix(obj: QuizSubmission): string[] {
  // Only include keys from personalInfo (excluding firstName/lastName) and vehicleInfo
  const personalKeys = Object.keys(obj.personalInfo).filter(
    (k) => k !== 'firstName' && k !== 'lastName'
  )
  const vehicleKeys = Object.keys(obj.vehicleInfo)
  return [...personalKeys, ...vehicleKeys]
}

// --- FLATTEN VALUES, MATCHING THE FLAT KEYS ---
function flattenValuesNoPrefix(obj: QuizSubmission, keys: string[]): (string | number)[] {
  return keys.map((key) => {
    if (key in obj.personalInfo) {
      // @ts-expect-error: dynamic key
      return obj.personalInfo[key] ?? ''
    }
    if (key in obj.vehicleInfo) {
      // @ts-expect-error: dynamic key
      return obj.vehicleInfo[key] ?? ''
    }
    return ''
  })
}

async function appendToGoogleSheet(data: QuizSubmission) {
  if (!GOOGLE_SHEET_ID) throw new Error('Google Sheet ID not configured')
  const auth = getGoogleAuth()
  const sheets = google.sheets({ version: 'v4', auth })

  // 1. Get current headers from the sheet
  const sheetMeta = await sheets.spreadsheets.values.get({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: 'A1:1',
  })
  const headers: string[] = sheetMeta.data.values?.[0] || []

  // 2. Build new headers (flat, no prefix, no first/last name)
  const submissionKeys = ['Submitted At', ...flattenKeysNoPrefix(data)]
  let updated = false
  submissionKeys.forEach((key) => {
    if (!headers.includes(key)) {
      headers.push(key)
      updated = true
    }
  })

  // 3. Update header row if needed
  if (updated || headers.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'A1',
      valueInputOption: 'RAW',
      requestBody: { values: [headers] },
    })
  }

  // 4. Prepare row data in the correct order
  const row: (string | number)[] = headers.map((header) => {
    if (header === 'Submitted At') {
      return DateTime.now().setZone('America/Toronto').toFormat('yyyy-MM-dd hh:mm:ss a')
    }
    // Use flat value lookup
    return flattenValuesNoPrefix(data, [header])[0]
  })

  // 5. Append the row
  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: 'A1',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  })
}

// --- EMAIL ADMIN ONLY ---

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS?.replace(/['"]/g, ''),
    },
  })
}

// --- Admin Email HTML (from email.tsx, adapted) ---
function generateAdminNotificationHTML(quizData: QuizSubmission) {
  const { personalInfo, vehicleInfo } = quizData

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New AutoQuiz Lead</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 700px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #003366, #007acc); color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #003366; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #007acc; padding-bottom: 5px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
        .info-item { background-color: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #007acc; }
        .info-item strong { color: #003366; }
        .full-width { grid-column: 1 / -1; }
        @media (max-width: 600px) {
          .info-grid { grid-template-columns: 1fr; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚨 New FiFi Survey Response</h1>
          <p>${personalInfo.fullName}</p>
        </div>
        <div class="content">
          <div class="section">
            <h2>Contact Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <strong>Name:</strong><br>
                ${personalInfo.fullName}
              </div>
              <div class="info-item">
                <strong>Email:</strong><br>
                <a href="mailto:${personalInfo.email}">${personalInfo.email}</a>
              </div>
              <div class="info-item">
                <strong>Phone:</strong><br>
                <a href="tel:${personalInfo.phone}">${personalInfo.phone}</a>
              </div>
              <div class="info-item">
                <strong>Location:</strong><br>
                ${personalInfo.city}, ${personalInfo.province}
              </div>
              <div class="info-item">
                <strong>Street Address:</strong><br>
                ${personalInfo.streetAddress}
              </div>
              <div class="info-item">
                <strong>Postal Code:</strong><br>
                ${personalInfo.postalCode}
              </div>
              <div class="info-item">
                <strong>Date of Birth:</strong><br>
                ${personalInfo.dateOfBirth}
              </div>
              <div class="info-item">
                <strong>Company:</strong><br>
                ${personalInfo.companyName}
              </div>
              <div class="info-item">
                <strong>Job Title:</strong><br>
                ${personalInfo.jobTitle}
              </div>
            </div>
          </div>
          <div class="section">
            <h2>Vehicle & Financial Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <strong>Vehicle Type:</strong><br>
                ${vehicleInfo.vehicleType}
              </div>
              <div class="info-item">
                <strong>Desired Vehicle:</strong><br>
                ${vehicleInfo.desiredVehicle}
              </div>
              <div class="info-item">
                <strong>Budget:</strong><br>
                ${vehicleInfo.budget}
              </div>
              <div class="info-item">
                <strong>Trade In:</strong><br>
                ${vehicleInfo.tradeIn}
              </div>
              <div class="info-item">
                <strong>Credit Score:</strong><br>
                ${vehicleInfo.creditScore}
              </div>
              <div class="info-item">
                <strong>Employment:</strong><br>
                ${vehicleInfo.employment}
              </div>
              <div class="info-item">
                <strong>Employment Length:</strong><br>
                ${vehicleInfo.employmentLength}
              </div>
              <div class="info-item">
                <strong>Income:</strong><br>
                ${vehicleInfo.income}
              </div>
            </div>
          </div>
          <div class="section">
            <p><strong>Quiz completed:</strong> ${DateTime.now().setZone('America/Toronto').toFormat('yyyy-MM-dd hh:mm:ss a')}</p>
            <p><strong>Source:</strong> FindItFinanceIt Website</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

async function sendAdminNotification(quizData: QuizSubmission) {
  if (!process.env.ADMIN_EMAIL) return false
  const transporter = createTransporter()
  const htmlContent = generateAdminNotificationHTML(quizData)
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New FindItFinanceIt Survey Response: ${quizData.personalInfo.fullName}`,
    html: htmlContent,
  })
  return true
}

// --- VALIDATION ---

function validateQuizData(data: QuizSubmission): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
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
  if (!data.vehicleInfo?.vehicleType?.trim()) errors.push('Vehicle type is required')
  // desiredVehicle is optional (Question 2 is optional)
  if (!data.vehicleInfo?.budget?.trim()) errors.push('Budget is required')
  if (!data.vehicleInfo?.tradeIn?.trim()) errors.push('Trade in preference is required')
  if (!data.vehicleInfo?.creditScore?.trim()) errors.push('Credit score is required')
  if (!data.vehicleInfo?.employment?.trim()) errors.push('Employment status is required')
  if (!data.vehicleInfo?.employmentLength?.trim()) errors.push('Employment length is required')
  if (!data.vehicleInfo?.income?.trim()) errors.push('Monthly income is required')
  if (data.personalInfo?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email)) {
    errors.push('Invalid email format')
  }
  return { isValid: errors.length === 0, errors }
}

// --- API HANDLER ---

export async function POST(request: NextRequest) {
  try {
    const data: QuizSubmission = await request.json()
    const validation = validateQuizData(data)
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      )
    }

    // Save to Google Sheet
    await appendToGoogleSheet(data)

    // Email admin only (with improved HTML)
    await sendAdminNotification(data)

    return NextResponse.json({
      success: true,
      message: 'Quiz submission saved to Google Sheet and admin notified.',
    })
  } catch (error) {
    console.error('Error processing quiz submission:', error)
    return NextResponse.json(
      { error: 'Failed to process quiz submission', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    message: 'Quiz submission endpoint is running',
    timestamp: new Date().toISOString(),
    config: {
      googleSheetConfigured: !!process.env.GOOGLE_SHEET_ID,
      emailConfigured: !!(process.env.SMTP_USER && process.env.SMTP_PASS && process.env.ADMIN_EMAIL)
    }
  })
}