import { SDK } from "@somnia-chain/streams"
import { createPublicClient, createWalletClient, http } from "viem"
import { somniaTestnet } from "@/lib/somnia-chain"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get("eventId") || "your-event-id"

    const publicClient = createPublicClient({
      chain: somniaTestnet,
      transport: http(),
    })

    const walletClient = createWalletClient({
      chain: somniaTestnet,
      transport: http(),
    })

    const sdk = new SDK({
      public: publicClient,
      wallet: walletClient,
    })

    const params = {
      somniaStreamsEventId: eventId,
      context: "data",
      ethCalls: [],
      onlyPushChanges: true,
      onData: (data: any) => {
        console.log("New stream data:", data)
      },
      onError: (error: Error) => {
        console.error("Stream error:", error)
      },
    }

    const sub = await sdk.streams.subscribe(params)

    return Response.json({
      success: true,
      message: "Subscription active",
      eventId: eventId,
    })
  } catch (error) {
    console.error("Subscription error:", error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
