import Router from "express"
import {check} from "express-validator"
import { login, registration} from "./controllers/authController.js"


const authRouter = new Router()

authRouter.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], registration)
authRouter.post('/login', login)

// authRouter.get('/createAdmin', async ()=>{
//     const userRole = await Role.findOne({value: "USER"})
//     const userRole1 = await Role.findOne({value: "ADMIN"})
//     const user = new User({username: 'tema2294', password: bcrypt.hashSync('943833ff', 7), roles: [userRole.value,userRole1.value]})
//     await user.save()
// })

export default authRouter