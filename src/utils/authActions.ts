import { toast } from "react-toastify"
import { resetToken, resetUser, setAllowNotifications, setCurrentPlan, setToken, setUser } from "../redux/slices/userSlice"
import { logoutUser, userNotificationApi } from "../services/api"
import { getInitialNotificationPermission, requestBrowserNotificationPermission, requestForToken } from "./fcm"

export const loginUser = async (response: any, dispatch: any, navigate: any) => {
    dispatch(setUser(response?.data?.user))
    dispatch(setToken(response?.data?.token))
    dispatch(setCurrentPlan(response?.data?.user?.active_plan))
    localStorage.setItem("token", response?.data?.token)
    dispatch(setAllowNotifications(response?.data?.user?.notifications_enabled))
    navigate('/')
    if (getInitialNotificationPermission() === "denied") {
        requestBrowserNotificationPermission()
    }
    if (getInitialNotificationPermission() === 'granted') {
        const fcmToken = await requestForToken()
        if (fcmToken) {
            await userNotificationApi({
                device_token: fcmToken,
                notifications_enabled: true
            })
        }
    }

}

export const logoutUtil = async (dispatch?: any, navigate?: any) => {
    try {
        const response = await logoutUser()
        if (response?.data?.message === "Logout successful") {
            dispatch(resetUser())
            dispatch(resetToken())
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