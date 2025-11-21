export interface MarketTemplate {
  category: string
  title: string
  description: string
  icon: string
}

export const MARKET_CATEGORIES = {
  crypto: {
    name: "Crypto",
    icon: "₿",
    templates: [
      { title: "Bitcoin above $60k by end of year?", category: "Crypto" },
      { title: "Ethereum flips Bitcoin by market cap?", category: "Crypto" },
      { title: "Solana rebounds to $200+?", category: "Crypto" },
      { title: "Major stablecoin depeg event in 2024?", category: "Crypto" },
    ],
  },
  sports: {
    name: "Sports",
    icon: "⚽",
    templates: [
      { title: "Team A wins championship 2024?", category: "Sports" },
      { title: "Player scores 50+ points in playoff game?", category: "Sports" },
      { title: "Conference finals go to Game 7?", category: "Sports" },
      { title: "Rookie wins Player of the Year?", category: "Sports" },
    ],
  },
  weather: {
    name: "Weather",
    icon: "🌤",
    templates: [
      { title: "Record high temperature this summer?", category: "Weather" },
      { title: "Hurricane makes landfall in season?", category: "Weather" },
      { title: "Snowfall exceeds 50 inches?", category: "Weather" },
      { title: "Heatwave causes emergency declarations?", category: "Weather" },
    ],
  },
  economics: {
    name: "Economics",
    icon: "📊",
    templates: [
      { title: "Federal Reserve cuts rates in 2024?", category: "Economics" },
      { title: "Unemployment below 3.5%?", category: "Economics" },
      { title: "Stock market hits new all-time high?", category: "Economics" },
      { title: "Inflation rate drops below 2%?", category: "Economics" },
    ],
  },
  entertainment: {
    name: "Entertainment",
    icon: "🎬",
    templates: [
      { title: "Movie breaks $1B box office globally?", category: "Entertainment" },
      { title: "Album debuts at #1 on charts?", category: "Entertainment" },
      { title: "Award show viewership increases?", category: "Entertainment" },
      { title: "New TV series renewed for season 2?", category: "Entertainment" },
    ],
  },
}

export function getMarketsByCategory(category: string) {
  const cat = MARKET_CATEGORIES[category as keyof typeof MARKET_CATEGORIES]
  return cat ? cat.templates : []
}

export function getAllMarkets() {
  const allMarkets = []
  for (const category of Object.values(MARKET_CATEGORIES)) {
    allMarkets.push(...category.templates)
  }
  return allMarkets
}
