import User from "../Model/User.Model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body.userData;
        if (!name || !email || !password) return res.status(404).json({ success: false, message: "all field required" })
        const emailAlreadyExist = await User.find({ email })
        if (emailAlreadyExist?.length) {
            return res.status(404).json({ success: false, message: "Email already used, try another email" })

        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, password: hashPassword, email })
        await user.save()
        return res.status(200).json({ success: true, message: "register successful" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body.userData;
        if (!email || !password) return res.status(404).json({ success: false, message: "All fields are mandatory" })

        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User not found.." })
        }
        const isPasswordRight = await bcrypt.compare(password, user.password);

        if (isPasswordRight) {
            const userObject = {
                name: user.name,
                email: user.email,
                userId: user._id,
            }
            // const expiryTime = user?.role == "Seller" ? "1m" : "1h";
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

            return res.json({ success: true, message: "login successfull", user: userObject, token: token })
        }
        return res.json({ success: false, message: "password is wrong" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const GetCurrentUser = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(404).json({ success: false, message: "Token is required!" })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decodedData, "decodedData...")

        if (!decodedData) {
            return res.status(404).json({ success: false, message: "Not valid json token.." })
        }
        const userId = decodedData?.userId

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found.." })
        }

        const userObject = {
            name: user.name,
            email: user.email,
            _id: user._id,
            role: user.role,
            number: user.number
        }
        return res.status(200).json({ success: true, user: userObject })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.response})
    }
}