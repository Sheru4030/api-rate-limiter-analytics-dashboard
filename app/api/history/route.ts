import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { RequestHistory } from "@/lib/models";

export async function GET() {
    try {
        await connectDB();

        const history = await RequestHistory.find({})
            .sort({ createdAt: -1 })
            .limit(100)
            .lean();

        return NextResponse.json({
            success: true,
            history: history.map((item) => ({
                id: item._id.toString(),
                identifier: item.identifier,
                endpoint: item.endpoint,
                status: item.status,
                statusCode: item.statusCode,
                createdAt: item.createdAt,
            })),
        });
    } catch (error) {
        console.error("History API error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to load request history",
            },
            { status: 500 }
        );
    }
}