import Favourite from '../Models/Favourite.model.js' 
import Property from '../Models/Property.model.js';
import User from '../Models/User.model.js';

const updateFav = async (req, res) => {
  const userId = req?.user?._id;
  
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
  
  const propertyId = req.params.propertyId;
  
  if (!propertyId) {
    return res.status(400).json({ message: "Property Id Not Provided" });
  }
  
  try {
    const existingFavorite = await Favourite.findOne({ user: userId, property: propertyId });

    if (existingFavorite) {
      // Deleting Old Fav
      await existingFavorite.deleteOne();
      await Property.findByIdAndUpdate(
        {
          _id : propertyId
        },
        {
          $inc : {
            favourite : -1
          }
        }
      )
      return res.status(200).json({ message: "Favorite removed successfully" });
    } 

    // creating new one if old doesn't exist
    const newFavorite = new Favourite({ user: userId, property: propertyId });
    await newFavorite.save();
    await Property.findByIdAndUpdate(
      {
        _id : propertyId
      },
      {
        $inc : {
          favourite : 1
        }
      }
    )
    return res.status(201).json({ message: "Favorite added successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error in Updating Favourite Info" });
  }
}

const userFavourite = async(req,res) => {
  const userId = req?.user?._id;
  if(!userId) {
    return res.status(401).json({message : "Unautorized Access"})
  }
  try {
    const favProperty = await Favourite.find(
      {
        user : userId
      }
    )
    return res.status(200).json(
      {
        message : "Fetched SuccesFully",
        favProperty
      }
    )
  } catch (error) {
    return res.status(500).json({message : "Internal Server Error in Fetching User Favourite Properties"})
  }
}

const userFavDetail = async (req, res) => {
  const userId = req?.user?._id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  try {
    const favProperty = await Favourite.find({ user: userId })
      .populate({
        path: "property",
        select: "-zip -msgThroughPhone -msgThroughEmail -msgThroughApp -email -phone -description -createdAt -updatedAt -__v", 
        populate: {
          path: "owner", 
          select: "avatar fullName userName", 
        },
      });
    
    const properties = favProperty.map(item => item.property);

    return res.status(200).json({
      message: "Fetched Successfully",
      favProperty : properties,
    });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({
      message: "Internal Server Error in Fetching User Favourite Properties",
    });
  }
};

const userfavPlusProperties = async (req, res) => {
  const userId = req?.user?._id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  try {
    const properties = await Property.aggregate([
      {
        $lookup: {
          from: 'favourites',  
          let: { propertyId: '$_id', userId: userId }, 
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$property', '$$propertyId'] },  
                    { $eq: ['$user', '$$userId'] },  
                  ],
                },
              },
            },
            {
              $limit: 1,  
            },
          ],
          as: 'likedProperty', 
        },
      },
      {
        $addFields: {
          isLiked: { $gt: [{ $size: '$likedProperty' }, 0] },  
        },
      },
      {
        $project: {
          likedProperty: 0,  
        },
      },
      {
        $lookup : {
          from : 'users',
          localField : 'owner',
          foreignField : '_id',
          as : 'ownerDetails'
        }
      },
      {
        $addFields : {
          owner : {
            $arrayElemAt : ['$ownerDetails',0]
          }
        }
      },
      {
        $project : {
          ownerDetails : 0,
          'owner.password' : 0,
          'owner.listedPropertyForRent' : 0,
          'owner.listedPropertyForSale' : 0,
          'owner.location' : 0,
          'owner.phone' : 0,
          'owner.email' : 0,
          'owner.dob' : 0,
        }
      }
    ]);

    return res.status(200).json({
      message: "Fetched Successfully",
      properties,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error in Fetching Properties",
    });
  }
};

export { 
  updateFav,
  userFavourite,
  userFavDetail,
  userfavPlusProperties
};
