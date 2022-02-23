import Router from "express"
import {roleMiddleware} from "./middleware/roleMiddlewere.js";
import {deleteCoin, getUserInfo, getUsers, updateCoin, updateUser} from "./controllers/userController.js";
import {authMiddleware} from "./middleware/authMiddleware.js";



const userRouter = new Router()


userRouter.get('/all-users', roleMiddleware(["ADMIN"]), getUsers)
userRouter.get('/user-info', authMiddleware, getUserInfo)
userRouter.delete('/:coinName', authMiddleware, deleteCoin)

userRouter.post('/update',updateUser)
userRouter.post('/update-coin',updateCoin)

export default userRouter