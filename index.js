import express from "express"
import mongoose from "mongoose"
import authRouter from "./authRouter.js"
import userRouter from "./userRouter.js"
import cors from "cors"
import { WebSocketServer } from 'ws'
import {webSocketController} from "./controllers/webSocket.js";
const port = process.env.PORT || 5000

const app = express()
const DB_URL = `mongodb+srv://${process.env.loginDb || 'tema2294'}:${ process.env.passwordDb || '943833fF'}@cluster0.hq7ki.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

app.use(cors());

app.use(express.json())

app.use('/auth',authRouter)
app.use('/user',userRouter)

const wsProps = process.env.PORT ? { noServer: true } : {port: 5050}
export const wss = new WebSocketServer(wsProps)

wss.on('connection', webSocketController)



async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(port, () => console.log('SERVER STARTED ON PORT ' + port + 'haha'))

    } catch (e) {
        console.log(e)
    }
}


startApp()

