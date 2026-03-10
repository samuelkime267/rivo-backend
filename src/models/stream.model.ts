import mongoose, { InferSchemaType, HydratedDocument } from "mongoose";

const streamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  isLive: Boolean,
  startedAt: Date,
  endedAt: Date,
  scheduledFor: Date,
  vodUrl: String,
  streamUrl: String,
  category: String,
  tags: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  viewers: Number,
});

const defaultStreamInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  category: String,
  tags: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

const Stream = mongoose.model("Stream", streamSchema);
export const DefaultStreamInfo = mongoose.model(
  "DefaultStreamInfo",
  defaultStreamInfoSchema,
);

export default Stream;

export type StreamType = InferSchemaType<typeof streamSchema>;
export type StreamDocument = HydratedDocument<StreamType>;
