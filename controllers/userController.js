import User from "../models/user.js"

import jwt from "jsonwebtoken"
import {secret} from "../config.js";


export const updateUser = async (req, res) => {
    try {
        const {username: oldUserName, newUsername: username, password, coins = []} = req.body;

        let user;
        const token = req.headers.authorization.split(' ')[1]

        const {id, roles} = jwt.verify(token, secret)

        if (!oldUserName) {
            user = await User.findById(id)
        } else {
            user = await User.findOne({username: oldUserName})
        }


        const isMyUser = id === user?._id.toString()


        if (isMyUser || roles.includes("ADMIN")) {
            const updateUser = await User.findByIdAndUpdate(id, {
                username,
                password,
                coins: [...user.coins, ...coins]
            }, {new: true})
            return res.json({message: 'success, user was updated', [isMyUser ? 'user' : 'otherUser']: updateUser})
        }
        return res.json({message: "You are don't have permissions"})
    } catch (e) {
        res.status(400).json({message: 'update error'})
    }
}


export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        return res.json(users)
    } catch (e) {
        console.log(e)
    }
}
export const getUserInfo = async (req, res) => {
    try {
        const {id} = req.user

        const user = await User.findById(id)

        return res.json(user)
    } catch (e) {
        res.status(400).json({message: 'user not found'})
    }
}
export const deleteCoin = async (req, res) => {
    try {
        const { params } = req
        const { coinName:  coinNameForDeleted } = params
        if (!coinNameForDeleted) {
            res.status(400).json({message: 'Coin name is not specified'})
        }
        const {id} = req.user

        const {coins} = await User.findById(id)
        const filteredCoins = coins.filter((coin)=> coin.coinName !== coinNameForDeleted)
        const updatedUser = await User.findByIdAndUpdate(id,{coins:filteredCoins},{new: true})

        return res.json(updatedUser.coins)
    } catch (e) {
        res.status(400).json({message: 'Error deleting coin'})
    }
}

export const updateCoin = async (req, res) => {
    try {
        const { count, coinId } = req.body;

        const token = req.headers.authorization.split(' ')[1]

        const { id } = jwt.verify(token, secret)
        const user = await User.findById(id)

        const isMyUser = id === user?._id.toString()


        if (isMyUser || roles.includes("ADMIN")) {

            const updatedCoins = user.coins.map((coin) =>{
                const {id} = coin
                const isCoinForUpdate = id === coinId
                if (isCoinForUpdate) {
                    return {...coin,count}
                } else {
                    return coin
                }
            })
            const updatedUser = await User.findByIdAndUpdate(id, {
                ...user,
                coins: updatedCoins
            }, {new: true})
            return updatedUser
        } else {
            return res.json({message: "You are don't have permissions"})
        }
    } catch (e) {
        res.status(400).json({message: 'update error'})
    }
}