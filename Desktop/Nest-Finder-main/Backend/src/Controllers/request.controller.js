import Request from "../Models/Request.model.js"
import Chat from "../Models/chat.model.js"
import Property from "../Models/Property.model.js"
import mongoose from "mongoose"

const sendRequest = async (req, res) => {
  const userId = req?.user?._id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  try {
    const { message, propertyId } = req?.body;
    const ownerId = req?.params.ownerId;

    if (!message || !propertyId) {
      return res.status(400).json({ message: "Message and Property ID are required" });
    }
    if (!ownerId) {
      return res.status(400).json({ message: "Owner ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(propertyId) || !mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({ message: "Invalid ObjectId provided" });
    }

    const userRequestCount = await Request.countDocuments({ sender: userId });
    if (userRequestCount >= 5) {
      return res.status(400).json({ message: "You cannot send more than 5 requests" });
    }

    const existingRequest = await Request.findOne({
      sender: userId,
      reciever: ownerId,
      property: propertyId,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "You have already sent a request for this property to this owner" });
    }

    const newRequest = await Request.create({
      msg: message,
      sender: userId,
      reciever: ownerId,
      property: propertyId,
    })

    return res.status(200).json({
      message: "Request sent successfully",
      request: newRequest,  
    });

  } catch (error) {
    console.error("Sending Request Error", error);
    return res.status(500).json({ message: "Internal Server Error in Send Request" });
  }
};

const getRequest = async (req, res) => {
  const userId = req?.user?.id; 

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  try {
    const sentRequests = await Request.find({ sender: userId })
      .populate([
        { path: 'reciever', select: 'fullName email avatar _id' },  
        { path: 'property', select: 'title description media _id' },  
      ]);

    const receivedRequests = await Request.find({ reciever: userId })
      .populate([
        { path: 'sender', select: 'fullName email avatar _id' }, 
        { path: 'property', select: 'title description media _id' }, 
      ]);

    return res.status(200).json({
      message: "Requests fetched successfully",
      requestSent: sentRequests, 
      requestReceived: receivedRequests, 
    });

  } catch (error) {
    console.error("Error in fetching Requests", error);
    return res.status(500).json({ message: "Internal Server Error in fetching requests" });
  }
};

const acceptRequest = async (req, res) => {
  const userId = req?.user?._id;
  if (!userId) {
    return res.status(401).json({message : "Unauthorized Access"})
  }

  try {
    const {requestId, senderId, propertyId} = req.body
    if (!senderId) {
      return res.status(400).json({message : "Reciever Id not Provided"})
    }

    const chat = await Chat.create(
      {
        participants : [userId,senderId],
        property : propertyId
      }
    )

    if(!chat) {
      return res.status(500).json({message : "Internal Server Error in creating chat"})
    }

    await Request.deleteOne({_id : requestId})

    return res.status(200).json({message : "Request Accepted successfully"})
  } catch (error) {
    console.error("Erorr in accepting request",error)
    return res.status(500).json({message : "Internal Server Error in accepting request"})
  }
}

const rejectRequest = async(req, res) => {
  const userId = req?.user?._id;
  if (!userId) {
    return res.status(401).json({message : "Unauthorized Access"})
  }
   
  try {
    const {requestId} = req.body;
    if (!requestId) {
      return res.status(400).json({message : "Request Id not provided"})
    }

    await Request.deleteOne({_id : requestId})

    return res.status(200).json({message : "Request Rejected/Withdrawn Successfuly"})
  } catch (error) {
    console.error("Internal Server Error in rejecting request", error)
    return res.status(500).json({message : "Internal Server Error in rejecting request"})
  }
}


export {
  sendRequest,
  getRequest,
  acceptRequest,
  rejectRequest
}