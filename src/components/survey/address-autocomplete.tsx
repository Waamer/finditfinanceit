"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Loader2 } from "lucide-react"

interface AddressAutocompleteProps {
  onAddressSelect: (addressData: {
    streetAddress: string
    city: string
    province: string
    postalCode: string
  }) => void
  streetAddress: string
  city: string
  province: string
  postalCode: string
  validationError?: string
}

interface AddressSuggestion {
  placeId: string
  description: string
  mainText: string
  secondaryText: string
}

export function AddressAutocomplete({
  onAddressSelect,
  streetAddress,
  city,
  province,
  postalCode,
  validationError
}: AddressAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(streetAddress)
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setInputValue(streetAddress)
  }, [streetAddress])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const fetchAddressSuggestions = async (input: string) => {
    try {
      const response = await fetch(`/api/places/autocomplete?input=${encodeURIComponent(input)}`)

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions")
      }

      const data = await response.json()
      return data.suggestions || []
    } catch (error) {
      console.error("Error fetching address suggestions:", error)
      return []
    }
  }

  const fetchPlaceDetails = async (placeId: string) => {
    try {
      const response = await fetch(`/api/places/details?placeId=${placeId}`)

      if (!response.ok) {
        throw new Error("Failed to fetch place details")
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching place details:", error)
      return null
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Update street address in real-time
    onAddressSelect({
      streetAddress: value,
      city,
      province,
      postalCode
    })

    if (value.length > 0) {
      setIsLoading(true)
      
      // Debounce the API call
      timeoutRef.current = setTimeout(async () => {
        const fetchedSuggestions = await fetchAddressSuggestions(value)
        setIsLoading(false)
        setSuggestions(fetchedSuggestions.slice(0, 5))
        setIsOpen(fetchedSuggestions.length > 0)
      }, 150)
    } else {
      setIsOpen(false)
      setSuggestions([])
      setIsLoading(false)
    }
  }

  const handlePlaceSelect = async (placeId: string) => {
    const placeDetails = await fetchPlaceDetails(placeId)
    
    if (placeDetails?.address_components) {
      let streetNumber = ""
      let route = ""
      let locality = ""
      let administrativeAreaLevel1 = ""
      let postalCodeResult = ""

      placeDetails.address_components.forEach((component: {
        long_name: string
        short_name: string
        types: string[]
      }) => {
        const types = component.types
        
        if (types.includes("street_number")) {
          streetNumber = component.long_name
        }
        if (types.includes("route")) {
          route = component.long_name
        }
        if (types.includes("locality")) {
          locality = component.long_name
        }
        if (types.includes("administrative_area_level_1")) {
          administrativeAreaLevel1 = component.short_name
        }
        if (types.includes("postal_code")) {
          postalCodeResult = component.long_name
        }
      })

      const fullStreetAddress = `${streetNumber} ${route}`.trim()
      setInputValue(fullStreetAddress)
      setIsOpen(false)
      setSuggestions([])

      onAddressSelect({
        streetAddress: fullStreetAddress,
        city: locality,
        province: administrativeAreaLevel1,
        postalCode: postalCodeResult
      })
    }
  }

  return (
    <div className="space-y-4">
      {/* Street Address with Autocomplete */}
      <div className="relative">
        <Label htmlFor="streetAddress" className="text-base font-medium">
          Street Address *
        </Label>
        <div className="relative mt-2">
          <Input
            id="streetAddress"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Start typing your address..."
            className="w-full"
            autoComplete="new-address"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          {isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            </div>
          )}
        </div>

        {/* Autocomplete Dropdown */}
        <AnimatePresence>
          {isOpen && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.placeId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                  className="flex items-center px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-black/10 transition-colors duration-150"
                  onClick={() => handlePlaceSelect(suggestion.placeId)}
                  whileTap={{ scale: 0.98 }}
                >
                  <MapPin className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {suggestion.mainText}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {suggestion.secondaryText}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Other Address Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          animate={city ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Label htmlFor="city" className="text-base font-medium">
            City/Country *
          </Label>
          <Input
            id="city"
            value={city}
            onChange={(e) => onAddressSelect({
              streetAddress,
              city: e.target.value,
              province,
              postalCode
            })}
            placeholder="Enter your city"
            className="mt-2"
            autoComplete="address-level2"
            required
          />
        </motion.div>
        <motion.div
          animate={province ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Label htmlFor="province" className="text-base font-medium">
            Province *
          </Label>
          <Input
            id="province"
            value={province}
            onChange={(e) => onAddressSelect({
              streetAddress,
              city,
              province: e.target.value,
              postalCode
            })}
            placeholder="Enter your province"
            className="mt-2"
            autoComplete="address-level1"
            required
          />
        </motion.div>
      </div>
      
      <motion.div
        animate={postalCode ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Label htmlFor="postalCode" className="text-base font-medium">
          Postal Code *
        </Label>
        <Input
          id="postalCode"
          value={postalCode}
          onChange={(e) => onAddressSelect({
            streetAddress,
            city,
            province,
            postalCode: e.target.value
          })}
          placeholder="Enter your postal code"
          className="mt-2"
          autoComplete="postal-code"
          required
        />
      </motion.div>

      {validationError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-600 text-sm mt-2"
        >
          {validationError}
        </motion.div>
      )}
    </div>
  )
}