import { createPublicClient, createWalletClient, http } from "viem"
import { somniaTestnet } from "viem/chains"

/**
 * Create a public client for reading blockchain data
 */
export function createPublicClientInstance() {
  return createPublicClient({
    chain: somniaTestnet,
    transport: http(),
  })
}

/**
 * Create a wallet client for wallet interactions
 */
export function createWalletClientInstance() {
  return createWalletClient({
    chain: somniaTestnet,
    transport: http(),
  })
}

/**
 * Request wallet connection (MetaMask, Coinbase, etc.)
 */
export async function requestWalletConnection() {
  if (!window.ethereum) {
    throw new Error("No wallet extension found")
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    return accounts[0] as `0x${string}`
  } catch (error) {
    console.error("Wallet connection error:", error)
    throw error
  }
}

/**
 * Get connected wallet accounts
 */
export async function getConnectedAccounts() {
  if (!window.ethereum) {
    return []
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    })

    return accounts as `0x${string}`[]
  } catch (error) {
    console.error("Error getting accounts:", error)
    return []
  }
}

/**
 * Listen for wallet account changes
 */
export function onAccountsChanged(callback: (accounts: `0x${string}`[]) => void) {
  if (!window.ethereum) return

  window.ethereum.on("accountsChanged", (accounts: any) => {
    callback(accounts)
  })
}

/**
 * Listen for chain changes
 */
export function onChainChanged(callback: (chainId: string) => void) {
  if (!window.ethereum) return

  window.ethereum.on("chainChanged", (chainId: string) => {
    callback(chainId)
  })
}
