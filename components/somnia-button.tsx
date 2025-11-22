"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface SomniaButtonProps {
  eventId?: string
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary"
  className?: string
}

export function SomniaButton({ eventId, variant = "default", className }: SomniaButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function startSubscription() {
    setIsLoading(true)
    try {
      const url = eventId ? `/api/somnia/subscribe?eventId=${eventId}` : "/api/somnia/subscribe"
      const response = await fetch(url)
      const data = await response.json()

      if (data.success) {
        toast.success("Somnia subscription activated!")
      } else {
        toast.error(data.error || "Failed to activate subscription")
      }
    } catch (error) {
      toast.error("Failed to connect to Somnia streams")
      console.error("Subscription error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={startSubscription} disabled={isLoading} variant={variant} className={className}>
      {isLoading ? "Connecting..." : "Start Somnia Stream"}
    </Button>
  )
}
