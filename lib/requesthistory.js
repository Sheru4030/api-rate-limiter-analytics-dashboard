import mongoose from "mongoose";

const RequestLogSchema =
    new mongoose.Schema({
        userId: String,
        endpoint: String,
        status: String,
        responseTime: Number,
        timestamp: Date,
    });

export default
    mongoose.models.RequestLog ||
    mongoose.model(
        "RequestLog",
        RequestLogSchema
    );