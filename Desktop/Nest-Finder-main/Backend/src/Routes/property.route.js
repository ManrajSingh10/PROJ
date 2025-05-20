import { Router } from "express";
import verifyJwt from "../Middlewares/verifyJwt.middleware.js"
import upload from "../Middlewares/multer.middleware.js"

import { 
  deleteProperty,
  editBasicProperty,
  editContactProperty,
  editDetailProperty,
  editImageProperty,
  editPricingProperty,
  filterProperty,
  listAllProperty, 
  listProperty, 
  listRentedProperty, 
  listSaleProperty, 
  listSingleProperty} from "../Controllers/property.controller.js";

const router = Router()

router.route("/listProperty").post(verifyJwt,listProperty)
router.route("/listAllProperty").get(listAllProperty)
router.route("/listSingleProperty/:propertyId").get(listSingleProperty)
router.route("/listRentedProperty").get(verifyJwt,listRentedProperty)
router.route("/listSaleProperty").get(verifyJwt,listSaleProperty)
router.route("/delete/:propertyId").delete(verifyJwt,deleteProperty)
router.route("/filterProperty").get(filterProperty)


// Editing Property Information
router.route("/editBasicInfo/:propertyId").patch(verifyJwt,editBasicProperty)
router.route("/editDetailsInfo/:propertyId").patch(verifyJwt,editDetailProperty)
router.route("/editPricingInfo/:propertyId").patch(verifyJwt,editPricingProperty)
router.route("/editImageInfo/:propertyId").patch(verifyJwt,upload.single('image'),editImageProperty)
router.route("/editContactInfo/:propertyId").patch(verifyJwt,editContactProperty)

export default router