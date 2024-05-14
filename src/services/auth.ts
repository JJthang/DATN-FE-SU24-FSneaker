import { IUser } from "@/common/type"
import instance from "@/core/api"

export const signup = async (user: IUser) => {
    try {
        const response = await instance.post(`/signup`, user)
        return response.data
    } catch (error) {
        console.log("Create user error", error)
    }
}