import { createContext, useEffect, useReducer } from "react";
// import api from "../component/ApiConfig";
import axios from "axios";
export const MyContext = createContext()

const initialValue = { user: null }
const reduce = (state, action) => {
    switch (action.type) {
        case "Login":
            return { ...state, user: action.payload }
        case "Logout":
            return { ...state, user: null }
        default:
            return state
    }
}
const AuthContext = ({ children }) => {
    const [state, dispatch] = useReducer(reduce, initialValue)
    // console.log(state,"authcontext state")
    useEffect(() => {
        async function currentUser() {
            const token = JSON.parse(localStorage.getItem("token"))
            if (token) {
                try {
                    const response = await axios.post("http://localhost:4000/get-current-user", { token })
                    if (response.data.success) {
                        dispatch({
                            type: "Login",
                            payload: response.data.user
                        })
                    }
                } catch (error) {
                    console.log(error.response.data.message)
                }
            }
        }
        currentUser()
    }, [])

    return (
        <MyContext.Provider value={{ state, dispatch }}>
            {children}
        </MyContext.Provider>
    )
}
export default AuthContext;