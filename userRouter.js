import Router from "express"
import {roleMiddleware} from "./middleware/roleMiddlewere.js";
import {getUserInfo, getUsers, updateUser} from "./controllers/userController.js";
import {authMiddleware} from "./middleware/authMiddleware.js";



const userRouter = new Router()


userRouter.get('/all-users', roleMiddleware(["ADMIN"]), getUsers)
userRouter.get('/user-info', authMiddleware, getUserInfo)

userRouter.post('/update',updateUser)

export default userRouter