import { createPublicClient, createWalletClient, http } from "viem"
import { somniaTestnet } from "./somnia-chain"

// ABI for PredictionMarket contract
export const PREDICTION_MARKET_ABI = [
  {
    inputs: [
      { internalType: "string", name: "_title", type: "string" },
      { internalType: "string", name: "_category", type: "string" },
    ],
    name: "createMarket",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_marketId", type: "uint256" },
      { internalType: "bool", name: "_position", type: "bool" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "placeBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_marketId", type: "uint256" }],
    name: "getMarket",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "title", type: "string" },
          { internalType: "string", name: "category", type: "string" },
          { internalType: "uint256", name: "yesPool", type: "uint256" },
          { internalType: "uint256", name: "noPool", type: "uint256" },
          { internalType: "uint256", name: "createdAt", type: "uint256" },
          { internalType: "uint256", name: "resolvedAt", type: "uint256" },
          { internalType: "bool", name: "resolved", type: "bool" },
          { internalType: "bool", name: "outcome", type: "bool" },
          { internalType: "address", name: "oracle", type: "address" },
        ],
        internalType: "struct PredictionMarket.Market",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_betId", type: "uint256" }],
    name: "getBet",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "uint256", name: "marketId", type: "uint256" },
          { internalType: "address", name: "bettor", type: "address" },
          { internalType: "bool", name: "position", type: "bool" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "odds", type: "uint256" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
          { internalType: "bool", name: "settled", type: "bool" },
          { internalType: "uint256", name: "payout", type: "uint256" },
        ],
        internalType: "struct PredictionMarket.Bet",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const

export const PREDICTION_MARKET_ADDRESS = process.env.NEXT_PUBLIC_PREDICTION_MARKET_CONTRACT || "0x0"

export async function createMarketOnChain(title: string, category: string) {
  try {
    const walletClient = createWalletClient({
      chain: somniaTestnet,
      transport: http(process.env.NEXT_PUBLIC_SOMNIA_RPC_URL),
    })

    // This would be called by owner/admin
    console.log(`Creating market: ${title} in category: ${category}`)
    return true
  } catch (error) {
    console.error("Error creating market:", error)
    return false
  }
}

export async function getMarketData(marketId: number) {
  try {
    const publicClient = createPublicClient({
      chain: somniaTestnet,
      transport: http(process.env.NEXT_PUBLIC_SOMNIA_RPC_URL),
    })

    // Would fetch from contract
    return null
  } catch (error) {
    console.error("Error fetching market:", error)
    return null
  }
}
