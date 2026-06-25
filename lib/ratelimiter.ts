import { RateLimitLog } from "@/lib/models";

const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 1000;

export async function checkRateLimit(identifier: string) {
    const now = new Date();
    const windowStartMs = now.getTime() - WINDOW_MS;

    const userLog = await RateLimitLog.findOne({ identifier });

    // First request from this identifier
    if (!userLog) {
        await RateLimitLog.create({
            identifier,
            timestamps: [now],
        });

        return {
            allowed: true,
            remaining: MAX_REQUESTS - 1,
        };
    }

    // Keep only requests made during the last 60 seconds
    const recentTimestamps = userLog.timestamps.filter(
        (timestamp: Date) => timestamp.getTime() > windowStartMs
    );

    // Sixth request inside the one-minute window is blocked
    if (recentTimestamps.length >= MAX_REQUESTS) {
        userLog.timestamps = recentTimestamps;
        await userLog.save();

        return {
            allowed: false,
            remaining: 0,
        };
    }

    // Record this allowed request
    recentTimestamps.push(now);
    userLog.timestamps = recentTimestamps;
    await userLog.save();

    return {
        allowed: true,
        remaining: MAX_REQUESTS - recentTimestamps.length,
    };
}