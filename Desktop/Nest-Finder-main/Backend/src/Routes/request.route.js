import {Router} from "express"
import { sendRequest, getRequest, acceptRequest, rejectRequest } from "../Controllers/request.controller.js"
import verifyJwt from "../Middlewares/verifyJwt.middleware.js"

const router = Router()

router.route("/sendRequest/:ownerId").post(verifyJwt,sendRequest)
router.route("/getRequest").get(verifyJwt,getRequest)
router.route("/accept").post(verifyJwt, acceptRequest)
router.route("/reject").post(verifyJwt, rejectRequest)

export default router