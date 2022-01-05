import User from "../models/user.js"

import jwt from "jsonwebtoken"
import {secret} from "../config.js";



 export const updateUser =   async (req, res) => {
        try {
            const { username:oldUserName,newUsername:username,password,coins } = req.body;

            const user = await User.findOne({username:oldUserName})

            const token = req.headers.authorization

            const { id,roles } = jwt.verify(token, secret)

            if (id === user?._id.toString() || roles.includes("ADMIN")) {
                const updateUser = await User.findByIdAndUpdate(id,{username,password,coins},{new: true})
                return res.json({message: 'success, user was updated',user: updateUser})
            }

            return res.json({message: "You are don't have permissions"})
        } catch (e) {
            res.status(400).json({message: 'update error'})
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
