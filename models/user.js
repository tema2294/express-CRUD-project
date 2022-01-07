import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: {type: String,unique: true,required: true},
    password: {type: String,required: true},
    roles: [{type: String, ref: 'Role'}],
    coins: [{
        coinName: {type: String,unique: true},
        count: {type: String},
    }]
})

export default mongoose.model("User",User)


