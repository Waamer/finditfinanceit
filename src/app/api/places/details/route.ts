import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const placeId = searchParams.get('placeId')
    
    if (!placeId) {
      return NextResponse.json({ error: 'Place ID is required' }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Google Places API key not configured' }, { status: 500 })
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=address_components&key=${apiKey}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch place details from Google Places API')
    }

    const data = await response.json()
    
    if (data.result) {
      return NextResponse.json(data.result)
    }
    
    return NextResponse.json({ error: 'Place not found' }, { status: 404 })
  } catch (error) {
    console.error('Error fetching place details:', error)
    return NextResponse.json({ error: 'Failed to fetch place details' }, { status: 500 })
  }
}