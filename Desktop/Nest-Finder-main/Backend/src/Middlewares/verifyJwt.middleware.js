import User from "../Models/User.model.js";
import jwt from "jsonwebtoken"
const verifyJwt = async(req,res,next) => {
  const token =  req.cookies?.token
  if (!token) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }
  try {
    const decodedValue = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedValue._id).select("-password -requestSent -requestReceived -listedPropertyForRent -listedPropertyForSale")
    if (user) {
      req.user = user;  
      next();  
    } else {
      return res.status(403).json({ message: "You are not authenticated!" });
    }
  } catch (error) {
    console.error(error)
    return res.status(400).json({ message: "Invalid Token" });
  }
}

export default verifyJwt