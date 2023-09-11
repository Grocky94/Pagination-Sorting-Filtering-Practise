import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { GetCurrentUser, Login, Register } from "./Controller/User.Controller.js";
import { CreateEvent } from "./Controller/Event.Controller.js";
import { allEvents } from "./Controller/Seeking.Controller.js";
const app = express()

app.use(express.json());
app.use(morgan("dev"));
app.use(cors())
dotenv.config()

app.get((req, res) => {
    return res.send("Working")
})
app.post("/register", Register)
app.post("/login", Login)
app.post("/createEvent", CreateEvent)
app.post("/allEvents", allEvents)
app.post("/get-current-user",GetCurrentUser)

mongoose.connect(process.env.MongoDB_URL).then(() => {
    console.log("connected to MongoDB AtLas")
}).catch((error) => {
    console.log(error)
})

app.listen(4000, () => {
    console.log("Port working on 4000")
})