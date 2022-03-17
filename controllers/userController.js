import User from "../models/user.js"

import jwt from "jsonwebtoken"
import {secret} from "../config.js";


export const updateUser = async (req, res) => {
    try {
        const {username: oldUserName, newUsername: username, password, coins = [],otherInvestments:otherInvestmentsFromRequest } = req.body;
        let user;
        const token = req.headers.authorization.split(' ')[1]

        const {id, roles} = jwt.verify(token, secret)
        console.log(token)
        if (!oldUserName) {
            user = await User.findById(id)
        } else {
            user = await User.findOne({username: oldUserName})
        }

        const isMyUser = id === user?._id.toString()

         const newOtherInvestments = [...user.otherInvestments]

            if (otherInvestmentsFromRequest) {
                const { investmentName,count,isUsd } = otherInvestmentsFromRequest
                const isFullOtherInvestments = investmentName.length > 0 && count > 0 && isUsd
                const otherInvestments = isFullOtherInvestments ? {investmentName , count , isUsd: isUsd ?? false} : undefined
                newOtherInvestments.push(otherInvestments)
            }

        if (isMyUser || roles.includes("ADMIN")) {

            const updateUser = await User.findByIdAndUpdate(id, {
                username,
                password,
                coins: [...user.coins, ...coins],
                otherInvestments: newOtherInvestments
            }, {new: true})
            return res.json({message: 'success, user was updated', [isMyUser ? 'user' : 'otherUser']: updateUser})
        }
        return res.json({message: "You are don't have permissions"})
    } catch (e) {
        console.log(e)
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
        const {params} = req
        const {coinName: coinNameForDeleted} = params
        if (!coinNameForDeleted) {
            res.status(400).json({message: 'Coin name is not specified'})
        }
        const {id} = req.user

        const {coins} = await User.findById(id)
        const filteredCoins = coins.filter((coin) => coin.coinName !== coinNameForDeleted)
        const updatedUser = await User.findByIdAndUpdate(id, {coins: filteredCoins}, {new: true})

        return res.json(updatedUser.coins)
    } catch (e) {
        res.status(400).json({message: 'Error deleting coin'})
    }
}

export const deleteOtherInvestment = async (req, res) => {
    try {
        const { params } = req
        const { id } = params

        const {id: userId} = req.user
        const { otherInvestments } = await User.findById(userId)

        const updatedOtherInvestments = otherInvestments.filter((coin) => coin._id.toString() !== id)

        const updatedUser = await User.findByIdAndUpdate(userId, {otherInvestments: updatedOtherInvestments}, {new: true})

        return res.json(updatedUser.otherInvestments)
    } catch (e) {
        res.status(400).json({message: 'Error deleting coin'})
    }
}
export const updateCoin = async (req, res) => {
    try {
        const {coinId, count} = req.body
        const token = req.headers.authorization.split(' ')[1]
        const {id} = jwt.verify(token, secret)
        const {coins} = await User.findById(id)

        const updatedCoins = coins.map((coin) => {
            if (coin.coinName === coinId) {
                return {coinName: coinId, count}
            } else return coin
        })

        const newUser = await User.findByIdAndUpdate(id, {coins: updatedCoins}, {new: true})

        return res.json({coinId, count})
    } catch (e) {
        res.status(400).json({message: 'update error'})
    }
}