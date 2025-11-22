# Somniai - Complete Feature Set

## Core Features

### 1. Wallet Integration
- Support for multiple wallets: MetaMask, Coinbase Wallet, Trust Wallet, WalletConnect
- Secure wallet connection with session persistence
- Display connected wallet address in header
- One-click disconnect functionality

### 2. Real-Time Prediction Markets
- Live market data with 3-second refresh cycles
- Real-time price updates and odds adjustments
- Place bets with instant confirmation
- Buy (YES) and Sell (NO) betting mechanics
- Automatic odds calculation based on pool reserves

### 3. Somnia Data Streams Integration
- All bet data published to Somnia Data Streams
- Immutable transaction records
- Real-time event subscriptions
- User bet history retrieval from blockchain

### 4. Bet Management
- View available markets across multiple categories
- Place bets with customizable amounts
- Real-time bet history with filtering
- Win/loss tracking and statistics

### 5. Smart Contracts (Solidity)
- PredictionMarket.sol contract for on-chain settlements
- Automated payout calculations
- Oracle-based market resolution
- Pool-based odds mechanics

### 6. Automated Market Maker (AMM)
- Constant product formula (x*y=k) for dynamic odds
- Liquidity pools for each market
- Buy/sell mechanics that adjust odds in real-time
- Liquidity provider support with LP tokens

### 7. Oracle Integration
- Price data feeds from oracle endpoints
- Market outcome determination
- Historical price tracking
- Confidence scoring for resolutions

### 8. Admin Dashboard
- Create new prediction markets
- Manage market categories (Crypto, Sports, Weather, Economics, Entertainment)
- Resolve markets with YES/NO outcomes
- Monitor total volume and active bets
- Delete markets if needed

### 9. Leaderboard
- Top players ranked by profit, wins, or streak
- Configurable timeframes (Week, Month, All Time)
- Display win rates, total volume, and streaks
- Real-time position tracking

### 10. User Statistics Dashboard
- Personal performance metrics (wins, losses, win rate)
- Profit trend visualization with line chart
- Bet category distribution (pie chart)
- Streak tracking (current and best)
- Average bet size and total volume
- Responsive charts and analytics

### 11. Responsive Design
- Mobile-first approach with Tailwind CSS
- Fully responsive on all screen sizes
- Touch-friendly navigation and controls
- Fast load times with optimized assets

## Market Categories

- **Crypto**: Bitcoin, Ethereum, altcoin predictions
- **Sports**: Team winners, championship predictions, player stats
- **Weather**: Temperature records, extreme weather events
- **Economics**: Interest rates, inflation, stock market indices
- **Entertainment**: Box office records, awards, releases

## Technical Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Blockchain**: Viem for web3 interactions
- **Data**: Somnia Data Streams SDK for immutable records
- **Smart Contracts**: Solidity (EVM-compatible)
- **Charts**: Recharts for data visualization

## Security Features

- Row-level security on blockchain data
- Secure wallet connection with no key exposure
- Non-custodial bet management
- Smart contract auditing recommendations
- Oracle-based dispute resolution

## Future Enhancements

- Multi-chain deployment
- Governance token for community voting
- Referral rewards program
- Advanced analytics and signals
- Mobile app for iOS/Android
- Telegram/Discord bots for notifications
