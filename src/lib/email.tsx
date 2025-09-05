import nodemailer from "nodemailer";

// Email configuration
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Verify transporter configuration
export async function verifyEmailConfig() {
  try {
    await transporter.verify()
    console.log("Email server is ready to take our messages")
    return true
  } catch (error) {
    console.error("Email server configuration error:", error)
    return false
  }
}

// Send user confirmation email
export async function sendUserConfirmationEmail(quizData: any) {
  const { personalInfo, vehicleInfo } = quizData

  const mailOptions = {
    from: `"AutoQuiz Pro" <${process.env.SMTP_USER}>`,
    to: personalInfo.email,
    subject: "Thank you for completing your AutoQuiz Pro assessment!",
    html: generateUserConfirmationHTML(quizData),
    text: generateUserConfirmationText(quizData),
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log("User confirmation email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending user confirmation email:", error)
    throw error
  }
}

// Send admin notification email
export async function sendAdminNotificationEmail(quizData: any, leadScore: number) {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    console.warn("No admin email configured")
    return { success: false, error: "No admin email configured" }
  }

  const { personalInfo, vehicleInfo } = quizData

  const mailOptions = {
    from: `"AutoQuiz Pro System" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `New AutoQuiz Lead: ${personalInfo.firstName} ${personalInfo.lastName} (Score: ${leadScore})`,
    html: generateAdminNotificationHTML(quizData, leadScore),
    text: generateAdminNotificationText(quizData, leadScore),
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log("Admin notification email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending admin notification email:", error)
    throw error
  }
}

// Generate user confirmation email HTML
function generateUserConfirmationHTML(quizData: any) {
  const { personalInfo, vehicleInfo, preferences } = quizData

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AutoQuiz Pro - Assessment Complete</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #003366, #007acc); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
        .content { padding: 30px; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #003366; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #007acc; padding-bottom: 5px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
        .info-item { background-color: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #007acc; }
        .info-item strong { color: #003366; }
        .next-steps { background-color: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .step { display: flex; align-items: center; margin-bottom: 15px; }
        .step-number { background-color: #007acc; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; }
        .footer { background-color: #003366; color: white; padding: 20px; text-align: center; }
        .contact-info { margin-top: 15px; }
        .contact-info a { color: #87ceeb; text-decoration: none; }
        @media (max-width: 600px) {
          .info-grid { grid-template-columns: 1fr; }
          .container { margin: 0 10px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚗 AutoQuiz Pro</h1>
          <p>Thank you for completing your automotive assessment!</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h2>Hello ${personalInfo.firstName}!</h2>
            <p>Thank you for taking the time to complete our comprehensive automotive assessment. We've received your information and our team of financing experts is already reviewing your responses.</p>
          </div>
          
          <div class="section">
            <h2>Your Assessment Summary</h2>
            <div class="info-grid">
              <div class="info-item">
                <strong>Vehicle Interest:</strong><br>
                ${vehicleInfo.vehicleType}
              </div>
              <div class="info-item">
                <strong>Budget Range:</strong><br>
                ${vehicleInfo.budget}
              </div>
              <div class="info-item">
                <strong>Purchase Timeframe:</strong><br>
                ${vehicleInfo.timeframe}
              </div>
              <div class="info-item">
                <strong>Location:</strong><br>
                ${personalInfo.city}, ${personalInfo.province}
              </div>
            </div>
          </div>
          
          <div class="next-steps">
            <h2>What Happens Next?</h2>
            <div class="step">
              <div class="step-number">1</div>
              <div>Our automotive financing experts will review your assessment within 2 hours</div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div>You'll receive personalized financing options within 24 hours</div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div>Schedule a consultation to discuss your best options</div>
            </div>
          </div>
          
          <div class="section">
            <h2>Why Choose AutoQuiz Pro?</h2>
            <ul>
              <li><strong>Expert Guidance:</strong> Professional automotive advice tailored to your situation</li>
              <li><strong>Best Rates:</strong> Access to competitive financing options from multiple lenders</li>
              <li><strong>Fast Process:</strong> Quick approvals and streamlined paperwork</li>
              <li><strong>No Obligation:</strong> Free consultation with no pressure to commit</li>
            </ul>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Questions? We're here to help!</strong></p>
          <div class="contact-info">
            <p>📞 Phone: <a href="tel:1-888-AUTO-QUIZ">1-888-AUTO-QUIZ</a></p>
            <p>✉️ Email: <a href="mailto:info@autoquizpro.com">info@autoquizpro.com</a></p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; opacity: 0.8;">
            © 2024 AutoQuiz Pro. All rights reserved.<br>
            This email was sent because you completed our automotive assessment quiz.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Generate user confirmation email text version
function generateUserConfirmationText(quizData: any) {
  const { personalInfo, vehicleInfo } = quizData

  return `
AutoQuiz Pro - Assessment Complete

Hello ${personalInfo.firstName}!

Thank you for completing our comprehensive automotive assessment. We've received your information and our team of financing experts is already reviewing your responses.

Your Assessment Summary:
- Vehicle Interest: ${vehicleInfo.vehicleType}
- Budget Range: ${vehicleInfo.budget}
- Purchase Timeframe: ${vehicleInfo.timeframe}
- Location: ${personalInfo.city}, ${personalInfo.province}

What Happens Next?
1. Our automotive financing experts will review your assessment within 2 hours
2. You'll receive personalized financing options within 24 hours
3. Schedule a consultation to discuss your best options

Questions? We're here to help!
Phone: 1-888-AUTO-QUIZ
Email: info@autoquizpro.com

© 2024 AutoQuiz Pro. All rights reserved.
  `
}

// Generate admin notification email HTML
function generateAdminNotificationHTML(quizData: any, leadScore: number) {
  const { personalInfo, vehicleInfo, preferences } = quizData

  const priorityClass = leadScore >= 80 ? "high" : leadScore >= 60 ? "medium" : "low"
  const priorityColor = leadScore >= 80 ? "#dc3545" : leadScore >= 60 ? "#ffc107" : "#28a745"

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
        .lead-score { background-color: ${priorityColor}; color: white; padding: 10px 20px; border-radius: 25px; font-weight: bold; font-size: 18px; display: inline-block; margin-top: 10px; }
        .content { padding: 30px; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #003366; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #007acc; padding-bottom: 5px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
        .info-item { background-color: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #007acc; }
        .info-item strong { color: #003366; }
        .full-width { grid-column: 1 / -1; }
        .contact-priority { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .contact-priority.high { background-color: #f8d7da; border-color: #f5c6cb; }
        .contact-priority.medium { background-color: #fff3cd; border-color: #ffeaa7; }
        .contact-priority.low { background-color: #d4edda; border-color: #c3e6cb; }
        @media (max-width: 600px) {
          .info-grid { grid-template-columns: 1fr; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚨 New AutoQuiz Lead</h1>
          <p>${personalInfo.firstName} ${personalInfo.lastName}</p>
          <div class="lead-score">Lead Score: ${leadScore}/100</div>
        </div>
        
        <div class="content">
          <div class="contact-priority ${priorityClass}">
            <strong>Contact Priority: ${leadScore >= 80 ? "HIGH" : leadScore >= 60 ? "MEDIUM" : "LOW"}</strong>
            <p>Recommended follow-up: ${leadScore >= 80 ? "Contact within 1 hour" : leadScore >= 60 ? "Contact within 4 hours" : "Contact within 24 hours"}</p>
          </div>
          
          <div class="section">
            <h2>Contact Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <strong>Name:</strong><br>
                ${personalInfo.firstName} ${personalInfo.lastName}
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
                <strong>Budget:</strong><br>
                ${vehicleInfo.budget}
              </div>
              <div class="info-item">
                <strong>Timeframe:</strong><br>
                ${vehicleInfo.timeframe}
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
                <strong>Income:</strong><br>
                ${vehicleInfo.income}
              </div>
            </div>
          </div>
          
          <div class="section">
            <h2>Preferences & Additional Info</h2>
            <div class="info-grid">
              <div class="info-item">
                <strong>Financing Preferences:</strong><br>
                ${preferences.financing.join(", ") || "None specified"}
              </div>
              <div class="info-item">
                <strong>Priorities:</strong><br>
                ${preferences.priorities.join(", ") || "None specified"}
              </div>
              ${
                preferences.experience
                  ? `
              <div class="info-item full-width">
                <strong>Additional Comments:</strong><br>
                ${preferences.experience}
              </div>
              `
                  : ""
              }
            </div>
          </div>
          
          <div class="section">
            <p><strong>Quiz completed:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Source:</strong> AutoQuiz Pro Website</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

// Generate admin notification email text version
function generateAdminNotificationText(quizData: any, leadScore: number) {
  const { personalInfo, vehicleInfo, preferences } = quizData

  return `
NEW AUTOQUIZ LEAD - LEAD SCORE: ${leadScore}/100

Contact Priority: ${leadScore >= 80 ? "HIGH" : leadScore >= 60 ? "MEDIUM" : "LOW"}
Recommended follow-up: ${leadScore >= 80 ? "Contact within 1 hour" : leadScore >= 60 ? "Contact within 4 hours" : "Contact within 24 hours"}

CONTACT INFORMATION:
Name: ${personalInfo.firstName} ${personalInfo.lastName}
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
Location: ${personalInfo.city}, ${personalInfo.province}

VEHICLE & FINANCIAL INFORMATION:
Vehicle Type: ${vehicleInfo.vehicleType}
Budget: ${vehicleInfo.budget}
Timeframe: ${vehicleInfo.timeframe}
Credit Score: ${vehicleInfo.creditScore}
Employment: ${vehicleInfo.employment}
Income: ${vehicleInfo.income}

PREFERENCES:
Financing Preferences: ${preferences.financing.join(", ") || "None specified"}
Priorities: ${preferences.priorities.join(", ") || "None specified"}
${preferences.experience ? `Additional Comments: ${preferences.experience}` : ""}

Quiz completed: ${new Date().toLocaleString()}
Source: AutoQuiz Pro Website
  `
}
