import express from "express"
import userRouter from "./user.js"
import listingRouter from "./listing.js"

const router =express.Router()

router.use("/user",userRouter)
router.use("/listing",listingRouter)


export default router