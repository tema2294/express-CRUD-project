import User from "../models/user.js"
import Role from "../models/role.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { validationResult } from 'express-validator'
import {secret} from "../config.js";


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "120"} )
}


 export const registration =   async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: "Пользователь успешно зарегистрирован"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

export const login = async (req, res) => {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user._id, user.roles)

            return res.json({token,user})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

   export const getUsers =async (req, res)=> {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
}
