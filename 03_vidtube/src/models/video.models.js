import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
});

export const Video = mongoose.model("Video",videoSchema)