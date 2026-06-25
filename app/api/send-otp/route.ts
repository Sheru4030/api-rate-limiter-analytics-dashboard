import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? "unknown";
  const userId = body.email ?? ip;

  const result = checkRateLimit(userId);

  if (!result.allowed) {
    return NextResponse.json(
      { success: false, message: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "OTP sent successfully",
  });
}
