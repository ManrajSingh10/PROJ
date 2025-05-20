import Property from "../Models/Property.model.js";
import User from "../Models/User.model.js";
import Favourite from "../Models/Favourite.model.js"
import Request from "../Models/Request.model.js"
import Message from "../Models/message.model.js"
import Chat from "../Models/chat.model.js"
import { uploadOnCloudinary } from "../Utils/cloudinary.utils.js";

const listProperty = async (req, res) => {
  const userId = req?.user?._id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  try {
    const {
      title,
      propType,
      listingType,
      address,
      neighborhood,
      city,
      state,
      zip,
      area,
      bedrooms,
      floor,
      parkingAvailable,
      furnishingStatus,
      propAge,
      description,
      paymentTerms,
      amount,
      securityDeposit,
      negotiability,
      currency,
      msgThroughApp,
      msgThroughPhone,
      msgThroughEmail,
      phone,
      email,
    } = req.body;

    const newProperty = await Property.create({
      title,
      propType,
      listingType,
      address,
      neighborhood,
      city,
      state,
      zip,
      area,
      bedrooms,
      floor,
      parkingAvailable,
      furnishingStatus,
      propAge,
      description,
      paymentTerms,
      amount,
      securityDeposit,
      negotiability,
      currency,
      msgThroughApp,
      msgThroughPhone,
      msgThroughEmail,
      phone,
      email,
      owner : userId
    });

    if (!newProperty) {
      return res.status(400).json({ message: "Failed to create property" });
    }
    if(listingType.toLowerCase()==="sale") {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          $push: { listedPropertyForSale: newProperty._id },
        },
        { new: true } 
      );
    }
    else {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          $push: { listedPropertyForRent: newProperty._id },
        },
        { new: true } 
      );
    }
    

    return res.status(201).json({
      message: "Property listed successfully",
      property: newProperty,
    });
  } catch (error) {
    console.error("Error creating property:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const listAllProperty = async (req, res) => {
  try {
    const { limit = 10, lastId = null } = req.query;

    const limitNumber = parseInt(limit);
    
    if (isNaN(limitNumber) || limitNumber <= 0) {
      return res.status(400).json({ message: "Invalid limit parameter" });
    }

    let query = {};

    if (lastId) {
      query = { _id: { $gt: lastId } };
    }
    
    const properties = await Property.find(query)
      .select("-zip -msgThroughPhone -msgThroughEmail -msgThroughApp -email -phone -description -createdAt -updatedAt -__v")
      .populate({
        path: "owner",
        select: "avatar fullName userName",
      })
      .limit(limitNumber)
      .sort({ _id: 1 }); 

    const nextId = properties[properties.length - 1]?._id || null;

    return res.status(200).json({
      message: "Properties fetched successfully",
      properties,
      nextId: nextId?.toString(), 
    });

  } catch (error) {
    console.error("Error fetching properties:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const listSingleProperty = async (req,res) => {
  const propertyId = req.params.propertyId
  if(!propertyId){
    return res.status(400).json({message : "CourseId not Provided"})
  }
  try {
    const property = await Property.findById(propertyId).select("-__v -updatedAt -createdAt ").populate({
      path : "owner",
      select : "avatar fullName userName"
    })
    if(!property){
      return res.status(404).json({message : "Property Not Found"})
    }
    return res.status(200).json({
      message : "Property Data Fetched Successfully",
      property
    })
  } catch (error) {
    console.error("Internal Server Error in Fetching Single Property data",error)
  }
};

const listRentedProperty = async (req,res) => {
  const userId = req?.user?._id
  if(!userId){
    return res.status(401).json({message : "Unathorized Access"})
  }
  try {
    const userRentedProperty = await User.findById(userId)
  .select("listedPropertyForRent")
  .populate({
    path: "listedPropertyForRent",
    select: "-zip -msgThroughPhone -msgThroughEmail -msgThroughApp -email -phone -description -createdAt -updatedAt -__v",
    populate: {
      path: "owner", 
      select: "fullName avatar" 
    }
  });


    if(!userRentedProperty){
      return res.status(404).json({message : "No Rented Property Found"})
    }
    return res.status(200).json(
      {
        message : "User Rented Property Fetched Successfully",
        rentedProperties : userRentedProperty.listedPropertyForRent
      }
    )
  } catch (error) {
    console.error("Error in fetching rentedProperty Data",error)
    return res.status(500).json({message : "Internal Server Error in Fetcing Rented Property Data"})
  }
};

const listSaleProperty = async (req,res) => {
  const userId = req?.user?._id
  if(!userId){
    return res.status(401).json({message : "Unathorized Access"})
  }
  try {
    const userSaleProperty = await User.findById(userId)
    .select("listedPropertyForSale")
    .populate({
      path: "listedPropertyForSale",
      select : "-zip -msgThroughPhone -msgThroughEmail -msgThroughApp -email -phone -description -createdAt -updatedAt -__v",
      populate: {
        path: "owner", 
        select: "fullName avatar" 
      }
    });

    if(!userSaleProperty){
      return res.status(404).json({message : "No sale Property Found"})
    }
    return res.status(200).json(
      {
        message : "User Sale Property Fetched Successfully",
        saleProperties : userSaleProperty.listedPropertyForSale
      }
    )
  } catch (error) {
    console.error("Error in fetching saleProperty Data",error)
    return res.status(500).json({message : "Internal Server Error in Fetcing Sale Property Data"})
  }
};

const editBasicProperty = async (req,res) => {
  const userId = req?.user?._id
  const propertyId = req?.params?.propertyId
  if(!userId) {
    return res.status(401).json({message : "Unauthorized Access"})
  }
  if(!propertyId) {
    return res.status(400).json({message : "Property Id not Provided"})
  }
  try {
    const {formData} = req.body
    const basicPropertyInfo = await Property.findOneAndUpdate(
      {
        _id : propertyId
      },
      {
        title : formData.title,
        listingType : formData.listingType,
        propType : formData.propType,
        address : formData.address,
        neighborhood : formData.neighborhood,
        city : formData.city,
        state : formData.state,
        zip : formData.zip
      },
      { new: true }
    )

    
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: {
          listedPropertyForRent: propertyId,  
          listedPropertyForSale: propertyId,  
        }
      }
    );
    
    const arrayToPush = formData.listingType === 'Sale' ? 'listedPropertyForSale' : 'listedPropertyForRent';

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          [arrayToPush]: propertyId  
        }
      }
    );

    if(!basicPropertyInfo){
      return res.status(400).json({message : "Error in Upadting Basic Property Info"})
    }
    return res.status(200).json(
      {
        message : "Basic Property Info Updated SuccessFully",
        basicPropertyInfo
      }
    )
  } catch (error) {
    console.error("error in updating Basic Property Info",error) 
    return res.status(500).json({message : "Internal Server Error in Updating Basic Property Info"})
  }
}

const editDetailProperty = async (req,res) => {
  const userId = req?.user?._id
  const propertyId = req?.params?.propertyId
  if(!userId) {
    return res.status(401).json({message : "Unauthorized Access"})
  }
  if(!propertyId) {
    return res.status(400).json({message : "Property Id not Provided"})
  }
  try {
    const {formData} = req.body
    const basicPropertyInfo = await Property.findOneAndUpdate(
      {
        _id : propertyId
      },
      {
        area : formData.area,
        bedrooms : formData.bedrooms,
        floor : formData.floor,
        parkingAvailable : formData.parkingAvailable,
        furnishingStatus : formData.furnishingStatus,
        propAge : formData.propAge,
        description : formData.description
      },
      { new: true }
    )

    
    if(!basicPropertyInfo){
      return res.status(400).json({message : "Error in Updating Details of Property Info"})
    }
    return res.status(200).json(
      {
        message : "Details of Property Info Updated SuccessFully",
        basicPropertyInfo
      }
    )
  } catch (error) {
    console.error("error in updating Details of Property Info",error) 
    return res.status(500).json({message : "Internal Server Error in Updating Details of Property Info"})
  }
}

const editPricingProperty = async (req, res) => {
  const userId = req?.user?._id
  const propertyId = req?.params?.propertyId
  if(!userId) {
    return res.status(401).json({message : "Unauthorized Access"})
  }
  if(!propertyId) {
    return res.status(400).json({message : "Property Id not Provided"})
  }

  try {
    const {formData} = req.body
    const basicPropertyInfo = await Property.findOneAndUpdate(
      {
        _id : propertyId
      },
      {
        amount : formData.amount,
        securityDeposit : formData.securityDeposit,
        currency : formData.currency,
        paymentTerms : formData.paymentTerms,
        negotiability : formData.negotiability,
      },
      { new: true }
    )

    
    if(!basicPropertyInfo){
      return res.status(400).json({message : "Error in Updating Pricing Info of Property"})
    }
    return res.status(200).json(
      {
        message : "Pricing Info of Property Updated SuccessFully",
        basicPropertyInfo
      }
    )
  } catch (error) {
    console.error("error in updating Pricing Info of Property",error) 
    return res.status(500).json({message : "Internal Server Error in Updating Pricing Info of Property"})
  }

}

const editImageProperty = async (req, res) => {
  const userId = req?.user?._id
  if (!userId) {
    return res.status(401).json({message : "Unauthorized Access"})
  }

  const propertyId = req?.params?.propertyId
  if (!propertyId) {
    return res.status(400).json({message : "Property Id not provided"})
  }

  try {
    const {index} = req?.body
    if (!index) {
      return res.status(400).json({message : "Index not provided"})
    }

    if (!req?.file?.path) {
      return res.status(400).json({message : "No Image Provided"})
    }

    const image = await uploadOnCloudinary(req.file?.path)
    if(!image || !image.url){
        return res.status(500).json({message:"Internal Server Error in uploading image on cloudinary!!!"})
    }

    const updatedProperty = await Property.findOneAndUpdate(
      { _id: propertyId },
      { 
        $set: { [`media.${index}`]: image.url }
      },
      { new: true }
    );
    
    // for adding new image
    if (updatedProperty) {
      const media = updatedProperty.media;
      if (index >= media.length) {
        media.push(image.url);
        await Property.findByIdAndUpdate(propertyId, { media });
      }
    }

    return res.status(200).json({
      message : "Image Updated SuccessFully",
      media : updatedProperty.media
    })
  } catch (error) {
    console.error("Error in updating image of property")
    return res.status(500).json({message : "Internal Server Error in Updating Image"})
  }
}

const editContactProperty = async (req, res) => {
  const userId = req?.user?._id
  if (!userId) {
    return res.status(401).json({message : "Unauthorized Access"})
  }

  const propertyId = req?.params?.propertyId
  if (!propertyId) {
    return res.status(400).json({message : "Property Id not provided"})
  }

  try {
    const {formData} = req.body
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      {
        $set : {
          msgThroughEmail : formData.msgThroughEmail,
          msgThroughPhone : formData.msgThroughPhone,
          phone : formData.phone,
          email : formData.email
        }
      },
      { new: true }
    )

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json({ message: "Contact info updated successfully", updatedProperty });
  } catch (error) {
    console.error("Error in upadating contact info",error)
    return res.status(500).json({message : "Inernal Server Error in updating contact info"})
  }
}

const deleteProperty = async (req, res) => {
  const userId = req?.user?._id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  try {
    const propertyId = req?.params.propertyId;
    if (!propertyId) {
      return res.status(400).json({ message: "Property Id not provided" });
    }

    await Favourite.deleteMany({ property: propertyId });
    await Request.deleteMany({ property: propertyId });

    const chatsToDelete = await Chat.find({ property: propertyId });

    if (chatsToDelete.length > 0) {
      const messageIds = chatsToDelete.reduce((acc, chat) => {
        return [...acc, ...chat.messages]; 
      }, []);

      await Message.deleteMany({ _id: { $in: messageIds } });

      await Chat.deleteMany({ property: propertyId });
    }

    await Property.deleteOne({ _id: propertyId });

    return res.status(200).json({ message: "Property Data Deleted Successfully" });
  } catch (error) {
    console.error("Error in deleting property", error);
    return res.status(500).json({ message: "Internal server error in deleting property" });
  }
};

const filterProperty = async (req, res) => {
  try {
    const { 
      bedrooms, 
      minArea, 
      maxArea, 
      listingType, 
      furnishingStatus, 
      minAmount, 
      maxAmount 
    } = req.query;

    let query = {};

    if (bedrooms) {
      query.bedrooms = bedrooms; 
    }
    if (minArea || maxArea) {
      query.area = {}; 
      if (minArea) query.area.$gte = minArea; 
      if (maxArea) query.area.$lte = maxArea; 
    }
    if (listingType && listingType !== 'all') {
      query.listingType = listingType; 
    }
    if (furnishingStatus) {
      query.furnishingStatus = furnishingStatus; 
    }
    if (minAmount || maxAmount) {
      query.amount = {}; 
      if (minAmount) query.amount.$gte = minAmount; 
      if (maxAmount) query.amount.$lte = maxAmount; 
    }

    const properties = await Property.find(query).populate("owner","fullName userName avatar");

    res.status(200).json({message : "Filtered Properties fteched Successfully", properties});
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: 'Error fetching properties' });
  }
};


export {
  listProperty,
  listAllProperty,
  listRentedProperty,
  listSaleProperty,
  listSingleProperty,
  editBasicProperty,
  editDetailProperty,
  editPricingProperty,
  editImageProperty,
  editContactProperty,
  deleteProperty,
  filterProperty
}