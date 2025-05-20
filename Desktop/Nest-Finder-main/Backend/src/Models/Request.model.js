import mongoose,{Schema} from "mongoose";

const rqSchema = new Schema({
  msg : {
    type : String,
    required : true
  },
  sender : {
    type : Schema.Types.ObjectId,
    ref : "User",
    required : true
  },
  reciever : {
    type : Schema.Types.ObjectId,
    ref : "User",
    required : true
  },
  property : {
    type : Schema.Types.ObjectId,
    ref : "Property",
    required : true
  }
},{timestamps : true})

const Request = mongoose.model("Request",rqSchema)

export default Request