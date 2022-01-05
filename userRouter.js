import Router from "express"
import {roleMiddleware} from "./middleware/roleMiddlewere.js";
import {getUsers, updateUser} from "./controllers/userController.js";



const userRouter = new Router()


userRouter.get('/all-users', roleMiddleware(["ADMIN"]), getUsers)

userRouter.post('/update',updateUser)

export default userRouter