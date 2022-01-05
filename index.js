import express from "express"
import mongoose from "mongoose"
import authRouter from "./authRouter.js"
import cors from "cors"

const port = process.env.PORT || 5000

const app = express()
const DB_URL = 'mongodb+srv://tema2294:943833fF@cluster0.hq7ki.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(express.json())
app.use('/auth',authRouter)

const corsOptions ={
    origin:['http://localhost:3000'],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors());
app.options('*', cors());

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(port, () => console.log('SERVER STARTED ON PORT ' + port+ 'haha'))
    } catch (e) {
        console.log(e)
    }
}
startApp()

