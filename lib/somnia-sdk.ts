import { SDK, SchemaEncoder } from "@somnia-chain/streams"
import type { PublicClient, WalletClient, Hex } from "viem"

/**
 * Initialize Somnia SDK with public and wallet clients
 */
export function initializeSDK(publicClient: PublicClient, walletClient: WalletClient) {
  return new SDK({
    public: publicClient,
    wallet: walletClient,
  })
}

/**
 * Schema for bet data on Somnia Data Streams
 * Stores bet information with timestamp, bet type, amount, and odds
 */
export const BET_SCHEMA = `uint64 timestamp, uint8 betType, uint256 amount, uint256 odds, bytes32 betId, bytes32 marketId`

/**
 * Create a schema encoder for bet data
 */
export function createBetSchemaEncoder() {
  return new SchemaEncoder(BET_SCHEMA)
}

/**
 * Compute schema ID for bet data
 */
export async function computeBetSchemaId(sdk: SDK): Promise<Hex> {
  return await sdk.streams.computeSchemaId(BET_SCHEMA) as Hex
}

/**
 * Encode bet data for publishing to Somnia Data Streams
 * @param schemaEncoder The SchemaEncoder instance
 * @param data The bet data to encode
 */
export function encodeBetData(
  schemaEncoder: SchemaEncoder,
  data: {
    timestamp: number
    betType: number // 0 for UP, 1 for DOWN
    amount: bigint
    odds: bigint
    betId: Hex
    marketId: Hex
  },
) {
  return schemaEncoder.encodeData([
    { name: "timestamp", value: data.timestamp.toString(), type: "uint64" },
    { name: "betType", value: data.betType.toString(), type: "uint8" },
    { name: "amount", value: data.amount.toString(), type: "uint256" },
    { name: "odds", value: data.odds.toString(), type: "uint256" },
    { name: "betId", value: data.betId, type: "bytes32" },
    { name: "marketId", value: data.marketId, type: "bytes32" },
  ])
}

/**
 * Publish bet data to Somnia Data Streams
 */
export async function publishBetData(sdk: SDK, schemaId: Hex, publisherAddress: Hex, encodedData: Hex) {
  return await sdk.streams.set([
    {
      id: publisherAddress,
      schemaId: schemaId,
      data: encodedData,
    },
  ])
}

/**
 * Retrieve bet data from Somnia Data Streams
 */
export async function getBetData(sdk: SDK, schemaId: Hex, publisherAddress: Hex, betId: Hex) {
  return await sdk.streams.getByKey(schemaId, publisherAddress, betId)
}

/**
 * Retrieve all bet data for a user
 */
export async function getAllUserBets(sdk: SDK, schemaId: Hex, publisherAddress: Hex) {
  return await sdk.streams.getAllPublisherDataForSchema(schemaId, publisherAddress)
}

/**
 * Subscribe to bet events using Somnia Streams
 */
export async function subscribeToBetEvents(
  sdk: SDK,
  callback: (data: any) => void,
  errorCallback?: (error: Error) => void,
) {
  return await sdk.streams.subscribe({
    ethCalls: [],
    onData: callback,
    onError: errorCallback,
    onlyPushChanges: true,
  })
}
