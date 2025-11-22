# ✅ Place Bet Now Publishes to Somnia Blockchain!

## What Changed:

When you click **"Place Bet"**, the app now:
1. ✅ Publishes actual bet data to the Somnia blockchain
2. ✅ Includes the real price, bet type, odds, and all betting details
3. ✅ Works exactly like "Start Somnia Stream" but with your bet information

## Bet Data Published to Blockchain:

Every time you place a bet, this data is stored on Somnia:

```json
{
  "betType": "UP" or "DOWN",
  "amount": 100,
  "odds": 1.95,
  "potentialPayout": 195.00,
  "profit": 95.00,
  "marketTitle": "BTC/USD Price Up in 30s",
  "currentPrice": 93250,
  "timestamp": 1732241234567
}
```

## How It Works:

1. **User enters bet amount** (e.g., $100)
2. **Selects UP or DOWN**
3. **Clicks "Place Bet"**
4. **App publishes to Somnia blockchain:**
   - Bet type (UP/DOWN)
   - Bet amount (actual price)
   - Current odds
   - Potential payout
   - Market details
   - Timestamp

5. **Success notification shows:**
   - "✅ Bet published to Somnia blockchain!"
   - Details: "UP for $100 at 1.95x odds"

## Technical Details:

- **Stream ID:** `bet-stream`
- **Schema ID:** `bet-schema-v1`
- **Event ID:** Unique per bet (`bet-{timestamp}`)
- **Topics:** Bet type and amount for filtering
- **Data:** Complete bet information in JSON

## Try It Now:

1. Connect your wallet
2. Enter a bet amount (e.g., $100)
3. Choose UP or DOWN
4. Click **"Place Bet"**
5. See the success notification
6. Your bet is now stored on the Somnia blockchain! 🎉

The bet data is transparent, immutable, and stored on-chain for everyone to see!
