# Somnia Data Streams JSON Download Feature

## Overview
This feature allows users to download their bet history from Somnia Data Streams in JSON format.

## How It Works

1. **Connect Wallet**: User connects their Web3 wallet (MetaMask, Coinbase Wallet, etc.)
2. **View Bet History**: Click "History" in the navigation to open the betting history modal
3. **Download Data**: Click the "Download JSON" button to export all bet data from Somnia Data Streams

## JSON Export Format

```json
{
  "exportDate": "2025-11-22T08:45:30.123Z",
  "walletAddress": "0x1234...5678",
  "schema": "uint64 timestamp, uint8 betType, uint256 amount, uint256 odds, bytes32 betId, bytes32 marketId",
  "totalRecords": 5,
  "bets": [
    {
      "timestamp": 1732241234,
      "betType": "UP",
      "amount": "100000000000000000000",
      "odds": "1950000000000000000",
      "betId": "0x...",
      "marketId": "0x..."
    }
  ]
}
```

## Data Schema

The bet data is stored on Somnia Data Streams with the following schema:
- `timestamp` (uint64): Unix timestamp when the bet was placed
- `betType` (uint8): 0 for UP, 1 for DOWN
- `amount` (uint256): Bet amount in wei (1e18 = 1 token)
- `odds` (uint256): Odds in wei format (1.95x = 1950000000000000000)
- `betId` (bytes32): Unique identifier for the bet
- `marketId` (bytes32): Market identifier

## Implementation Details

### Components
- `hooks/use-bet-history.ts`: Fetches bet data from Somnia streams and provides download functionality
- `hooks/use-somnia-sdk.ts`: Initializes Somnia SDK with browser wallet connection
- `components/bet-history-modal.tsx`: UI for viewing and downloading bet history

### Features
- ✅ Real-time data fetching from Somnia Data Streams
- ✅ Download as formatted JSON file
- ✅ Loading states and error handling
- ✅ Uses connected browser wallet (signer-aware)
- ✅ Falls back to mock data when no bets exist

### Current Limitations
1. **Bet Outcomes**: All fetched bets show as "PENDING" status since outcome data is not yet stored on-chain
2. **Result Filtering**: WIN/LOSS tabs will only show data once bet outcome tracking is implemented
3. **All bets are currently displayed in the "All" and "Pending" tabs**

## Future Enhancements
- Store bet outcomes on Somnia Data Streams
- Implement real-time bet result calculation
- Add historical P&L tracking
- Support for multiple market types
