import Router from "express"
import {roleMiddleware} from "./middleware/roleMiddlewere.js";
import {
    deleteCoin,
    deleteOtherInvestment,
    getUserInfo,
    getUsers,
    updateCoin,
    updateUser
} from "./controllers/userController.js";
import {authMiddleware} from "./middleware/authMiddleware.js";



const userRouter = new Router()


userRouter.get('/all-users', roleMiddleware(["ADMIN"]), getUsers)
userRouter.get('/user-info', authMiddleware, getUserInfo)
userRouter.delete('/:coinName', authMiddleware, deleteCoin)
userRouter.delete('/other-investment/:id', authMiddleware, deleteOtherInvestment)

userRouter.post('/update',updateUser)
userRouter.post('/update-coin',updateCoin)

export default userRouter