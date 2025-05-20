import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],

    property : {
      type : Schema.Types.ObjectId,
      ref : "Property",
      required : true
    }
    
  },
  { timestamps: true }
);

chatSchema.index({ participants: 1 });

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
