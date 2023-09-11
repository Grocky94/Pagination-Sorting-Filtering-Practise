import { populate } from "dotenv";
import Event from "../Model/Event.Model.js"
// export const query = async (req, res) => {
//     try {
//         const { page = 1, limit = 10, name, sort = "date" } = req.body
//         const query = {}
//         if (name) {
//             query.name = { $regex: name, $options: 'i' }
//         }
//         const sortPrefix = sort[0] == '-' ? "-" : "";
//         const sortField = sort.replace(/^-/, "");
//         const sortOption = {[sortField]: `${sortPrefix}1`}

//         const skip = (parseInt(page) - 1 * parseInt(limit))
//         const limitValue = parseInt(limit)

//         const event = await Event.find(query).sort(sortOption).skip(skip).limit(limitValue).lean()

//         return res.status(200).json({ success: true, event })

//         } catch (error) {
//             return res.status(500).json({ success: false, message: error })
//         }
//     }

export const allEvents = async (req, res) => {
    try {
        const { page, limit = 4, sort = 'date' } = req.body;
        const { name } = req.body.name
        console.log(name)
        const query = {};
        if (name) {
            query.name = { $regex: name, $options: 'i' }
        }

        const sortPrefix = sort[0] == '-' ? "-" : "";
        const sortField = sort.replace(/^-/, "");
        const sortOption = { [sortField]: `${sortPrefix}1` }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const limitValue = parseInt(limit);

        const setevents = await Event.find(query).populate("creator").sort(sortOption).skip(skip).limit(limitValue).lean();
        // const event = await Event.find({})
        if (setevents) {
            return res.status(200).json({ success: true, event: setevents, message: "page got changed" })
        }
        return res.status(404).json({ success: false, message: "internal error" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}