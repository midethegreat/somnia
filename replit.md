# Somniai - Prediction Markets on Somnia Data Streams

## Overview
Somniai is a decentralized prediction markets application built on Somnia Data Streams. Users can connect their Web3 wallet (MetaMask, Coinbase Wallet, Trust Wallet, or WalletConnect) to place bets on market outcomes, with all data stored transparently on the blockchain.

## Project Architecture

### Tech Stack
- **Next.js 16** - Frontend framework with React Server Components and Turbopack
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS 4** - Styling
- **Somnia Data Streams** - On-chain data storage via `@somnia-chain/streams`
- **Viem** - Web3 wallet integration and blockchain interactions
- **Shadcn/ui** - UI component library (Radix UI primitives)
- **Recharts** - Data visualization for bet statistics

### Key Components
- `components/wallet-connect.tsx` - Wallet connection interface
- `components/dashboard.tsx` - Main betting dashboard
- `components/betting-interface.tsx` - Bet placement UI
- `components/bet-history-modal.tsx` - Shows user's betting history from SDS
- `components/available-bets.tsx` - Displays live prediction markets
- `lib/somnia-sdk.ts` - Somnia Data Streams SDK integration
- `lib/viem-client.ts` - Web3 wallet client configuration
- `lib/somnia-chain.ts` - Somnia Testnet chain configuration

### Configuration Files
- `next.config.mjs` - Next.js configuration with TypeScript build error ignoring and unoptimized images
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*`)
- `package.json` - Dependencies and dev server configured for Replit (port 5000, host 0.0.0.0)

## Replit Setup

### Development Server
- **Port**: 5000 (required for Replit webview)
- **Host**: 0.0.0.0 (allows Replit proxy)
- **Command**: `npm run dev`

### Deployment Configuration
- **Type**: Autoscale (stateless web application)
- **Build**: `npm run build`
- **Run**: `npm start`

### Environment Variables (Optional)
The app has defaults for all required configurations:
- `NEXT_PUBLIC_SOMNIA_RPC_URL` - Somnia RPC endpoint (defaults to "https://rpc.somnia.network")
- `NEXT_PUBLIC_PREDICTION_MARKET_CONTRACT` - Smart contract address (defaults to "0x0")

## Recent Changes (November 22, 2025)

### Replit Environment Setup (Completed)
1. Added `.gitignore` for Next.js project
2. Updated `package.json` dev script to bind to `0.0.0.0:5000` for Replit compatibility
3. Configured `next.config.mjs` with `allowedDevOrigins` set to Replit domain for proper proxy handling
4. Installed all dependencies using `npm install --legacy-peer-deps` (React 19 compatibility)
5. Set up workflow "Start application" running on port 5000 with webview output
6. Configured deployment with autoscale target (build: npm run build, run: npm start)
7. Verified application is running successfully and displays wallet connection screen without errors

## Development Workflow

### Starting the App
The app starts automatically via the "Start application" workflow. It runs on port 5000 and is accessible via the Replit webview.

### Building for Production
```bash
npm run build
npm start
```

## User Flow

1. **Connect Wallet** - User selects and connects their Web3 wallet
2. **Browse Markets** - View available prediction markets with live odds
3. **Place Bets** - Choose Buy (bet market goes up) or Sell (bet market goes down)
4. **Sign Transaction** - Wallet prompts for signature to publish bet to Somnia Data Streams
5. **View History** - All bets are stored on-chain and retrievable from SDS

## Data Storage on Somnia

All bet data is stored on Somnia Data Streams in the following format:
```
timestamp | bet type (buy/sell) | amount | odds | bet ID | market ID
```

This data is tied to the user's wallet address and is:
- Immutable and permanent
- Publicly verifiable
- Owned by the user
- Accessible from any Somnia-compatible app

## Smart Contracts

The project includes a Solidity contract at `contracts/PredictionMarket.sol` for managing prediction market logic.

## Notes

- The app uses `localStorage` to persist wallet connection between sessions
- React 19 is used which requires `--legacy-peer-deps` for some package installations
- TypeScript build errors are ignored in the config (already set by the original project)
- Vercel Analytics is integrated for telemetry (dev mode only, no production data sent)
- Images are unoptimized to avoid Next.js image optimization requirements
