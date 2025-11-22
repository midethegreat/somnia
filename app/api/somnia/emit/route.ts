import { SDK } from "@somnia-chain/streams"
import { createPublicClient, createWalletClient, http, toHex } from "viem"
import { somniaTestnet } from "@/lib/somnia-chain"

export async function POST(request: Request) {
  try {
    const body = await request.json()

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

    const dataStreams = [
      {
        id: body.streamId || toHex("44-7", { size: 32 }),
        schemaId: body.schemaId,
        data: body.encodedData,
      },
    ]

    const eventStreams = [
      {
        id: body.eventId,
        argumentTopics: body.topics || [],
        data: body.data || "0x",
      },
    ]

    const result = await sdk.streams.setAndEmitEvents(dataStreams, eventStreams)

    return Response.json({
      success: true,
      tx: result,
      message: "Data emitted successfully",
    })
  } catch (error) {
    console.error("Emit error:", error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
