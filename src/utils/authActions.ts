import { toast } from "react-toastify"
import { resetUser, setCurrentPlan, setToken, setUser } from "../redux/slices/userSlice"
import { logoutUser, userNotificationApi } from "../services/api"
import { requestForToken } from "./fcm"

export const loginUser = async (response: any, dispatch: any, navigate: any) => {
    dispatch(setUser(response?.data?.user))
    dispatch(setToken(response?.data?.token))
    dispatch(setCurrentPlan(response?.data?.user?.active_plan))
    localStorage.setItem("token", response?.data?.token)
    navigate('/')
    const fcmToken = await requestForToken()
    if (fcmToken) {
        await userNotificationApi({
            device_token: fcmToken,
            notifications_enabled: true
        })
    }
}

export const logoutUtil = async (dispatch?: any, navigate?: any) => {
    try {
        const response = await logoutUser()
        if (response?.data?.message === "Logout successful") {
            dispatch(resetUser())
            localStorage.removeItem("persist:root");
            localStorage.removeItem("token")
            localStorage.removeItem("plan")
            navigate('/')
            toast.success("Logout successful")
        }
    } catch (err: any) {
        throw new Error(err?.message || "Couldn't logout")
    }
}