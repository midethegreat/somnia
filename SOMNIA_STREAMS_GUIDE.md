# Somnia Streams Implementation Guide

This guide explains how to use the Somnia Data Streams real-time functionality that has been implemented in your application.

## What's Been Implemented

### 1. API Routes

#### `/app/api/somnia/subscribe/route.ts`
A server API route that subscribes to Somnia data streams in real-time.

**Endpoint:** `GET /api/somnia/subscribe`

**Query Parameters:**
- `eventId` (optional) - The specific event ID to subscribe to

**Response:**
```json
{
  "success": true,
  "message": "Subscription active",
  "eventId": "your-event-id"
}
```

**How it works:**
- Creates a Somnia SDK instance
- Subscribes to the specified event stream
- Listens for real-time data updates
- Logs new data to the server console

#### `/app/api/somnia/emit/route.ts`
A server API route that emits data to Somnia streams.

**Endpoint:** `POST /api/somnia/emit`

**Request Body:**
```json
{
  "schemaId": "0x...",
  "encodedData": "0x...",
  "eventId": "your-event-id",
  "topics": [],
  "data": "0x",
  "streamId": "optional-stream-id"
}
```

**Response:**
```json
{
  "success": true,
  "tx": "transaction-hash",
  "message": "Data emitted successfully"
}
```

### 2. Client Components

#### `/components/somnia-button.tsx`
A reusable React component that triggers stream subscriptions.

**Props:**
- `eventId?: string` - Optional event ID to subscribe to
- `variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary"` - Button style variant
- `className?: string` - Additional CSS classes

**Usage Example:**
```tsx
import { SomniaButton } from "@/components/somnia-button"

export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <SomniaButton eventId="my-event-123" />
    </div>
  )
}
```

### 3. Demo Page

#### `/app/somnia-demo/page.tsx`
A fully functional demo page showing both subscription and emission capabilities.

**Access it at:** `http://localhost:5000/somnia-demo`

**Features:**
- Subscribe to real-time data streams
- Emit sample data to streams
- Interactive UI with toast notifications
- Detailed explanations of how it works

## How to Use

### Subscribe to a Stream

1. Navigate to `/somnia-demo` in your browser
2. Enter an event ID (or use the default)
3. Click "Start Somnia Stream"
4. The subscription will activate and listen for real-time updates
5. All new data will be logged to the server console

**Programmatically:**
```typescript
// From a client component
const response = await fetch("/api/somnia/subscribe?eventId=my-event")
const data = await response.json()
console.log(data.message) // "Subscription active"
```

### Emit Data to a Stream

1. Navigate to `/somnia-demo`
2. Click "Emit Sample Data"
3. Data will be published to the blockchain
4. All subscribers will receive the update

**Programmatically:**
```typescript
// From a client component
const response = await fetch("/api/somnia/emit", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    schemaId: "0x1234...",
    encodedData: "0x...",
    eventId: "my-event",
    topics: [],
    data: "0x"
  })
})
const result = await response.json()
console.log(result.tx) // Transaction hash
```

## Integration with Your Betting App

You can integrate this streaming functionality with your existing betting platform:

### Example: Real-Time Bet Updates

```typescript
// Subscribe to bet events
const subscribeToLiveBets = async () => {
  await fetch("/api/somnia/subscribe?eventId=live-bets")
}

// Emit a new bet
const emitNewBet = async (betData) => {
  const response = await fetch("/api/somnia/emit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      schemaId: betData.schemaId,
      encodedData: betData.encodedData,
      eventId: "live-bets",
      topics: [betData.marketId],
      data: betData.rawData
    })
  })
  return response.json()
}
```

## Files Created

- ✅ `/app/api/somnia/subscribe/route.ts` - Subscription API endpoint
- ✅ `/app/api/somnia/emit/route.ts` - Data emission API endpoint  
- ✅ `/components/somnia-button.tsx` - Reusable subscription button component
- ✅ `/app/somnia-demo/page.tsx` - Interactive demo page

## Testing the Implementation

1. **Start the development server** (already running on port 5000)
2. **Navigate to** `http://localhost:5000/somnia-demo`
3. **Click "Start Somnia Stream"** to activate a subscription
4. **Click "Emit Sample Data"** to send test data
5. **Check the server console** to see real-time updates

## Next Steps

1. **Configure Event IDs**: Replace placeholder event IDs with your actual Somnia event IDs
2. **Add Wallet Integration**: Connect the emit functionality to your wallet for signing transactions
3. **Customize Data Schema**: Modify the data structure to match your specific use case
4. **Error Handling**: Add more robust error handling for production use
5. **WebSocket Alternative**: For client-side subscriptions, consider implementing WebSocket connections

## Need Help?

- Check the [Somnia Documentation](https://docs.somnia.network)
- Review the existing `lib/somnia-sdk.ts` for more SDK methods
- Look at the betting interface components for real-world usage examples

---

**Built with Somnia Data Streams** 🚀
