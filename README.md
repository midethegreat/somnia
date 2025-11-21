# Somnia

A prediction markets app built on Somnia Data Streams. Place bets on market outcomes, check your history, and everything is stored on the blockchain transparently.

## What's Somnia?

Somnia is a betting platform where you can predict market movements and earn returns. Instead of a company holding all your bet data, it's stored on **Somnia Data Streams** - so you own everything.

You connect your wallet (MetaMask, Coinbase Wallet, Trust Wallet, or WalletConnect), place bets, and all the data lives on-chain permanently. No middleman, no shady databases.

## How Somnia Data Streams Makes This Work

Think of Somnia Data Streams as a shared, transparent record that everyone can read but only you can add to (with your wallet). 

Here's the flow:

1. **You place a bet** - Click buy or sell on any market
2. **Data gets encoded** - Your bet info (amount, type, odds, timestamp) gets formatted
3. **Published to SDS** - Your wallet signs and sends it to Somnia Data Streams
4. **It's permanent** - The bet is now on the blockchain, forever
5. **Anyone can verify** - Your history is public and verifiable anytime

## How to Use

### Connect Your Wallet

1. Open Somnia
2. Click "Connect Wallet"
3. Choose your wallet (MetaMask recommended)
4. Approve the connection

That's it. You're in.

### Place a Bet

1. Browse available markets
2. Pick one you like
3. Click Buy (bet it goes up) or Sell (bet it goes down)
4. Enter your amount
5. Confirm in your wallet
6. Bet is now on-chain

### Check Your History

1. Click the history icon in the top right
2. See all your past bets
3. Check wins, losses, profits
4. Everything's stored on Somnia Data Streams

## The Tech Behind It

### Bet Data Storage

Every bet follows the same format:
`
timestamp (when) | bet type (up/down) | amount | odds | bet ID | market ID`

This structure lets us store and retrieve bets efficiently, and it's the same format everyone uses. No mess.

### Your Wallet Address = Your ID

When you publish a bet, it's tied to your wallet address. So:
- `0x1234...` places a bet
- It's stored under `0x1234...` on SDS
- Only you can prove you placed it (you have the private key)
- Anyone can verify it (it's on-chain)

### Real-Time Prices

Markets update every 3 seconds with live prices. It's pulling current data and calculating odds based on what's actually happening in the market.

## The Parts That Matter

- **lib/somnia-sdk.ts** - Handles all SDS communication (publish bets, read bets)
- **lib/viem-client.ts** - Manages wallet connections
- **components/betting-interface.tsx** - The bet placement UI
- **components/bet-history-modal.tsx** - Shows your history from SDS
- **components/available-bets.tsx** - Displays live markets

## Data Flow

### When You Place a Bet

You click BUY
    ↓
Bet details collected (amount, odds, market)
    ↓
Data encoded to match our schema
    ↓
Sent to your wallet for signing
    ↓
You approve it
    ↓
Published to Somnia Data Streams
    ↓
It's permanent on the blockchain

### When You Check History


You click history icon
    ↓
App fetches all bets for your wallet from SDS
    ↓
Decodes the data back into readable format
    ↓
Calculates stats (wins, losses, profit)
    ↓
Shows it all
## Traditional App vs. Somnia

| What | Normal App | Somnia |
|------|-----------|---------|
| Where's your data? | Their servers | Blockchain |
| Who owns it? | Them | You |
| Can they see everything? | Yes | Only what's on-chain |
| Can they delete your history? | Yes | No |
| Can they go offline? | Yes | No (it's decentralized) |
| Can you verify bets? | No | Yes (cryptographically) |

## Getting Started Locally

\`\`\`bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Open http://localhost:3000
\`\`\`

That's it.

## What You Need

- A web3 wallet installed (MetaMask, Coinbase Wallet, etc.)
- Connected to Ethereum (or whatever network we're on)
- Some test tokens if you want to actually place bets

## The Stack

- **Next.js 16** - Frontend framework
- **React 19** - UI library
- **TailwindCSS** - Styling
- **Somnia Data Streams** - On-chain data storage
- **Viem** - Wallet integration
- **Shadcn/ui** - UI components

## What's Stored on Somnia?

Every bet you place, including:
- When you placed it
- If it was a buy or sell
- How much you bet
- The odds at the time
- The market you bet on
- Your unique bet ID

All stored under your wallet address so it's provably yours.


## Built By

**Mide**

