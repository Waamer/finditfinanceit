import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const input = searchParams.get('input')
    
    if (!input) {
      return NextResponse.json({ error: 'Input is required' }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Google Places API key not configured' }, { status: 500 })
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input
      )}&components=country:ca&types=address&key=${apiKey}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch suggestions from Google Places API')
    }

    const data = await response.json()
    
    if (data.predictions) {
      const suggestions = data.predictions.map((prediction: {
        place_id: string
        description: string
        structured_formatting?: {
          main_text?: string
          secondary_text?: string
        }
      }) => ({
        placeId: prediction.place_id,
        description: prediction.description,
        mainText: prediction.structured_formatting?.main_text || "",
        secondaryText: prediction.structured_formatting?.secondary_text || ""
      }))
      
      return NextResponse.json({ suggestions })
    }
    
    return NextResponse.json({ suggestions: [] })
  } catch (error) {
    console.error('Error fetching address suggestions:', error)
    return NextResponse.json({ error: 'Failed to fetch address suggestions' }, { status: 500 })
  }
}