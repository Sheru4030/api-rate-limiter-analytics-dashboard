import { NextResponse } from "next/server";
import { getAnalytics } from "@/lib/rate-limit";

export async function GET() {
    return NextResponse.json(getAnalytics());
}
