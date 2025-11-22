"use client"

import { SomniaButton } from "@/components/somnia-button"
import { useState } from "react"
import { toast } from "sonner"

export default function SomniaDemoPage() {
  const [eventId, setEventId] = useState("your-event-id")

  async function emitSampleData() {
    try {
      const response = await fetch("/api/somnia/emit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schemaId: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
          encodedData: "0x",
          eventId: eventId,
          topics: [],
          data: "0x",
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success("Data emitted successfully!")
      } else {
        toast.error(result.error || "Failed to emit data")
      }
    } catch (error) {
      toast.error("Failed to emit data")
      console.error("Emit error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Somnia Live Data Streams</h1>
          <p className="text-muted-foreground">
            Subscribe to real-time data streams and emit events on the Somnia blockchain
          </p>
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Subscribe to Stream</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Click the button below to activate a subscription to Somnia data streams. This will listen for
              real-time updates.
            </p>
            <div className="space-y-4">
              <div>
                <label htmlFor="eventId" className="block text-sm font-medium mb-2">
                  Event ID (optional)
                </label>
                <input
                  id="eventId"
                  type="text"
                  value={eventId}
                  onChange={(e) => setEventId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  placeholder="Enter event ID"
                />
              </div>
              <SomniaButton eventId={eventId} />
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Emit Data to Stream</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Send data to the blockchain streams. This triggers events that subscribed clients can receive.
            </p>
            <button
              onClick={emitSampleData}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
            >
              Emit Sample Data
            </button>
          </div>
        </div>

        <div className="border rounded-lg p-6 bg-muted">
          <h3 className="text-lg font-semibold mb-2">How It Works</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>
              <strong>Subscribe:</strong> Click "Start Somnia Stream" to listen for real-time data updates from the
              blockchain
            </li>
            <li>
              <strong>Emit:</strong> Use "Emit Sample Data" to publish data to the stream, triggering notifications
              to all subscribers
            </li>
            <li>
              <strong>Real-Time:</strong> All updates happen instantly across all connected clients
            </li>
          </ol>
        </div>

        <div className="border rounded-lg p-6 bg-muted">
          <h3 className="text-lg font-semibold mb-2">API Endpoints</h3>
          <div className="space-y-2 text-sm font-mono">
            <div>
              <span className="text-green-600">GET</span> /api/somnia/subscribe
            </div>
            <div>
              <span className="text-blue-600">POST</span> /api/somnia/emit
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
