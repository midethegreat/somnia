import { defineChain } from "viem"

/**
 * Somnia Testnet Chain Configuration
 * Update RPC URL based on your Somnia testnet endpoint
 */
export const somniaTestnet = defineChain({
  id: 1149, // Somnia testnet chain ID
  name: "Somnia Testnet",
  network: "somnia-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Somnia",
    symbol: "SMN",
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_SOMNIA_RPC_URL || "https://rpc.somnia.network"],
    },
    public: {
      http: [process.env.NEXT_PUBLIC_SOMNIA_RPC_URL || "https://rpc.somnia.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "Somnia Explorer",
      url: "https://explorer.somnia.network",
    },
  },
})
