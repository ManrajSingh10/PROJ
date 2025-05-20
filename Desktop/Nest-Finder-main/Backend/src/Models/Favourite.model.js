import mongoose,{Schema} from 'mongoose'

const favouriteSchema = new Schema(
  {
    user : {
      type : Schema.Types.ObjectId,
      ref : "User",
      required : true    
    },
    property : {
      type : Schema.Types.ObjectId,
      ref : "Property",
      required : true    
    }
  }
)

const Favourite = mongoose.model("Favourite",favouriteSchema)
export default Favourite