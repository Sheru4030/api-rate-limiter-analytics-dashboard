import mongoose, { Model, Schema } from "mongoose";

/* ---------------- Rate Limit Log ---------------- */

export interface IRateLimitLog {
    identifier: string;
    timestamps: Date[];
    createdAt?: Date;
    updatedAt?: Date;
}

const RateLimitLogSchema = new Schema<IRateLimitLog>(
    {
        identifier: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        timestamps: {
            type: [Date],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

/* ---------------- Analytics ---------------- */

export interface IAnalytics {
    metricKey: string;
    totalRequests: number;
    blockedRequests: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const AnalyticsSchema = new Schema<IAnalytics>(
    {
        metricKey: {
            type: String,
            required: true,
            unique: true,
            default: "global_metrics",
        },
        totalRequests: {
            type: Number,
            default: 0,
            min: 0,
        },
        blockedRequests: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

/* ---------------- Request History ---------------- */

export type RequestStatus = "allowed" | "blocked";

export interface IRequestHistory {
    identifier: string;
    endpoint: string;
    status: RequestStatus;
    statusCode: number;
    timestamp: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

const RequestHistorySchema = new Schema<IRequestHistory>(
    {
        identifier: {
            type: String,
            required: true,
            index: true,
        },
        endpoint: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["allowed", "blocked"],
            required: true,
        },
        statusCode: {
            type: Number,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

/* ---------------- Models ---------------- */

export const RateLimitLog: Model<IRateLimitLog> =
    (mongoose.models.RateLimitLog as Model<IRateLimitLog>) ||
    mongoose.model<IRateLimitLog>(
        "RateLimitLog",
        RateLimitLogSchema
    );

export const Analytics: Model<IAnalytics> =
    (mongoose.models.Analytics as Model<IAnalytics>) ||
    mongoose.model<IAnalytics>(
        "Analytics",
        AnalyticsSchema
    );

export const RequestHistory: Model<IRequestHistory> =
    (mongoose.models.RequestHistory as Model<IRequestHistory>) ||
    mongoose.model<IRequestHistory>(
        "RequestHistory",
        RequestHistorySchema
    );