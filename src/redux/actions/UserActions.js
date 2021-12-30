import { CLEAR_USER_INFO, SAVE_USER_INFO } from "../actionTypes/UserActionsTypes";

export const saveUserInfo = (userInfo) => {
    return {
        type: SAVE_USER_INFO,
        payload: userInfo
    }
}

export const clearUserInfo = (userInfo) => {
    return {
        type: CLEAR_USER_INFO,
        payload: userInfo
    }
}