import mongoose, { Schema } from "mongoose";

const PropertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    propType: {
      type: String,
      enum: ['House', 'Apartment', 'Condo', 'Townhouse', 'Studio', 'Other'],
    },
    listingType: {
      type: String,
      required: true,
      enum : ["Sale","Rent"]
    },
    address: {
      type: String,
      required: true,
    },
    neighborhood: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    area: {
      type: Number,
      required: true, 
      min: 1, 
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0, 
    },
    floor : {
      type : Number,
      default : 0
    },
    parkingAvailable: {
      type: Boolean,
      default: false, 
    },
    furnishingStatus: {
      type: String,
      enum: ['Fully-Furnished', 'Unfurnished', 'Semi-Furnished'], 
    },
    propAge: {
      type: Number,
      min: 0, 
    },
    description: {
      type: String,
      maxlength: 1000, 
    },
    media : [{
      type : String,
      default : []
    }],
    paymentTerms: {
      type: String,
      enum : ["Monthly","Quarterly","Yearly"]
    },
    amount: {
      type: Number,
      required: true, 
      min: 0, 
    },
    securityDeposit: {
      type: Number,
      min: 0, 
    },
    negotiability: {
      type: Boolean,
      default: false, 
    },
    currency: {
      type: String,
      enum: ['USD', 'INR'], 
      required: true,
    },
    msgThroughApp: {
      type: Boolean,
      default: true, 
    },
    msgThroughPhone: {
      type: Boolean,
      default: false, 
    },
    msgThroughEmail: {
      type: Boolean,
      default: false, 
    },
    phone: {
      type: String,
      // validate: {
      //   validator: function (v) {
      //     return /\d{10}/.test(v); // Validate phone number with 10 digits
      //   },
      //   message: 'Phone number must be a valid 10-digit number.',
      // },
    },
    email: {
      type: String,
      // validate: {
      //   validator: function (v) {
      //     return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v); // Basic email validation
      //   },
      //   message: 'Invalid email address.',
      // },
    },
    owner : {
      type : Schema.Types.ObjectId,
      ref : "User",
      required : true
    },
    favourite : {
      type : Number,
      default : 0
    }
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", PropertySchema);

export default Property;