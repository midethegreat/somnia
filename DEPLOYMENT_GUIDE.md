# Somnia Testnet Deployment Guide

## Setup Instructions

### 1. Configure Environment Variables
Create a `.env.local` file with your Somnia testnet RPC endpoint:

\`\`\`env
NEXT_PUBLIC_SOMNIA_RPC_URL=https://rpc.somnia.network
NEXT_PUBLIC_SOMNIA_CHAIN_ID=1149
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### 3. Run Locally
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` and connect your wallet to the Somnia testnet.

### 4. Build for Production
\`\`\`bash
npm run build
npm start
\`\`\`

### 5. Deploy to Vercel
\`\`\`bash
vercel deploy
\`\`\`

Make sure to add the environment variables in your Vercel project settings.

## Network Configuration

**Chain Details:**
- Chain ID: 1149
- Network: Somnia Testnet
- RPC: https://rpc.somnia.network
- Explorer: https://explorer.somnia.network

## Wallet Setup

Users need to add Somnia testnet to their wallet:
1. Network Name: Somnia Testnet
2. RPC URL: https://rpc.somnia.network
3. Chain ID: 1149
4. Currency Symbol: SMN
5. Explorer: https://explorer.somnia.network

## Testing

1. Connect your wallet (MetaMask, Coinbase, Trust Wallet)
2. Make sure you're on Somnia testnet
3. View available prediction markets
4. Place test bets
5. Check your bet history

All data is stored and retrieved from Somnia Data Streams on the testnet.
