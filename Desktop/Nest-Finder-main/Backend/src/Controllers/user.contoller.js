import User from "../Models/User.model.js"
import jwt from "jsonwebtoken"
import {uploadOnCloudinary, destroy} from '../Utils/cloudinary.utils.js'

const login = async(req,res) => {
  const {email,userName,password} = req.body
  if(!password || (!email && !userName) ) {
    return res.status(400).json({
      message : "All Credentials are required"
    })
  } 

  if(typeof password === String) password = String(password)
  try {
    let user = await User.findOne({
      $or : [{ userName },{ email }]
    })
    .select(" -__v")

    if(!user) {
      return res.status(400).json({
        message : "Credentials Wrong"
      })
    }
    const verification = await user.isPasswordCorrect(password)

    if(!verification){
      return res.status(400).json({
        message : "Credentials Wrong"
      })
    }

    const token = await user.generateToken()

    if(!token){
      return res.status(500).json({
        message : "Internal Server error in generating Token"
      })
    }


    user = user.toObject();  
    delete user.password;

    const options = {
      httpOnly: true,  
      secure: process.env.NODE_ENV === 'production',  
      maxAge: 60 * 60 * 24 * 7 * 1000, 
    };


    return res
    .status(200)
    .cookie("token",token,options)
    .json({
      message : "Successfully Loggedin",
      user ,
      token
    })

  } catch (error) {
    console.error("Error in login",error)
    return res.status(500).json({
      message : "Internal Server error"
    })
  }
}

const registerUser = async(req,res) => {
  const {fullName,userName,email,password} = req.body
  if(!fullName || !userName || !email || !password ){
    return res.status(400).json({message : "All fields are required"})
  }
  try {
    const existingUser = await User.findOne(
      {
        $or : [{userName},{email}]
      }
    )
    if(existingUser) {
      return res.status(400).json({message : "Email/userName Already Taken"})
    }

    let avatarUrl = null;

    if (req.file) {
      avatarUrl = await uploadOnCloudinary(req.file.path); 
    }

    if(!avatarUrl) {
      return res.status(400).json({message : "File Not Uploaded"})
    }

    const user = await User.create(
      {
        fullName,
        email,
        userName,
        password,
        avatar : avatarUrl.url
      }
    )
    return res.status(200).json(
      {
        message : "User Registered SuccessFully",
        user
      }
    )
  } catch (error) {
    console.error("error in registering user",error)
    return res.status(500).json({message : "Internal Server Error in Registering User"})
  }
}

const logout = async(req,res) => {
  return res.status(200).clearCookie("token").json({message:"Succeffully logout"})
}

const userInfo = async(req,res) => {
  return res.status(200).json(
    {
      message : "User Info Fetched Successfully",
      user : req.user
    }
  )
}

const isLoggedin = async(req,res) => {
  const token = req?.cookies.token
  if(!token) {
    return res.status(200).json(
      {
        message : "User is not Logged In",
        isLoggedin : false,
      }
    ) 
  }
  try {
    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken._id).select("-password -__v -listedPropertyForSale -listedPropertyForRent")
    if(!user){
      return res.status(200).json(
        {
          message : "User is not Logged In",
          isLoggedin : false,
        }
      ) 
    }
    return res.status(200).json(
      {
        message : "User is Logged In",
        isLoggedin : true,
        user
      }
    )
  } catch (error) {
    return res.status(200).json(
      {
        message : "User is not Logged In",
        isLoggedin : false,
      }
    ) 
  }
}

const updatePersonalInfo = async(req,res) => {
  const userId = req.user?._id
  if(!userId){
    return res.status(400).json({message:"Unathorized Access"})
  }
  try {
    const {phone,email,dob,fullName} = req.body
    if(!phone || !email || !dob || !fullName){
      return res.status(400).json({message:"All Field/Data Required"})
    }
    const user = await User.findOneAndUpdate(
      {
        _id : userId
      },
      {
        $set : {
          phone,
          email,
          dob,
          fullName
        }
      },
      {
        new : true
      }
    ).select("-password -__v -listedPropertyForSale -listedPropertyForRent")

    if(!user){
      return res.status(404).json({message:"Internal Server Error in Updating User Personal Info"})
    }
    return res.status(200).json(
      {
        message : "User Personal Info Updated Successfully",
        user
      }
    )
  } catch (error) {
    console.error("Error in Updating personalInfo",error)
    return res.status(500).json({message:"Internal Server Error"})
  }
}

const upadteUserAvatar = async(req, res) => {
  const userId = req?.user?._id 
  if (!userId) {
    return res.status(401).json({message : "Unauthorized Access"})
  }
  try {
    const {prevImage} = req.body
    const avatarPath = req?.file?.path
    if (!avatarPath) {
      return res.status(400).json({message : "No Image provided"})
    }
    const avatar = await uploadOnCloudinary(avatarPath)
    if(!avatar) {
      return res.status(500).json({message : "Internal Server error in uploading image in cloudinary"})
    }
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set : {
          avatar : avatar.url
        }
      },
      {new : true}
    )

    if (prevImage) {
      const publicId = prevImage.split('/').pop().split('.')[0]; 
      await destroy(publicId); 
    }


    return res.status(200).json({
      message : "Avatar Updated Successfully",
      avatar : user.avatar
    })
  } catch (error) {
    console.error("Internal Server Error in updating avatar", error)
    return res.status(500).json({message : "Ineternal Server Error in updating avatar of User"})
  }
}

const updateSocketId = async(req,res) => {
  const userId = req?.user?._id
  if(!userId){
    return res.status(400).json({message : "Unathorised Access"})
  }
  const {socketId} = req?.body 
  if(!socketId){
    return res.status(400).json({message : "SocketId not provided"})
  }
  try {
    await User.findByIdAndUpdate(
      userId,
      {
        socketId,
        isActive : true
      }
    )
    return res.status(200).json({message : "SocketId Updated Successfully"})
  } catch (error) {
    return res.status(500).json({message : "Internal Server Error in Updating SocketId"})
  }
}

const removeSocketId = async(req,res) => {
  const userId = req?.user?._id
  if(!userId){
    return res.status(400).json({message : "Unathorised Access"})
  }
  try {
    await User.findByIdAndUpdate(
      userId,
      {
        socketId : null,
        isActive : false
      }
    )
    return res.status(200).json({message : "SocketId Removed Successfully"})
  } catch (error) {
    return res.status(500).json({message : "Internal Server Error in Removing SocketId"})
  }
}



export {
  login,
  registerUser,
  logout,
  userInfo,
  isLoggedin,
  updatePersonalInfo,
  upadteUserAvatar,
  updateSocketId,
  removeSocketId,
}