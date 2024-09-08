import express from "express"
import { deleteUser, getUserList, loginUser, registerUser, updateRoleUser } from "../controller/UserController.js"

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/remove",deleteUser)
userRouter.post("/role",updateRoleUser)
userRouter.get("/listUser",getUserList)
export default userRouter;