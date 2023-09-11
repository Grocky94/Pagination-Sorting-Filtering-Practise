import Event from "../Model/Event.Model.js"
import jwt from "jsonwebtoken"
export const CreateEvent = async (req, res) => {
    try {
        const { name, date, token } = req.body;
        if (!name || !date || !token) return res.status(404).json({ success: false, message: "all fields are required" })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
        if (decodedData) {
            const userId = decodedData.userId
            const event = new Event({ name, date, creator: userId })
            await event.save()
            return res.status(200).json({ success: true, message: "event add successfully" })
        }
        return res.status(404).json({ success: false, message: "invalid user found.." })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}