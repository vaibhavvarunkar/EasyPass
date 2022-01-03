import { CLAER_USER_PROFILE_INFO, CLEAR_USER_INFO, SAVE_USER_INFO, USER_PROFILE_INFO } from "../actionTypes/UserActionsTypes";

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

export const userProfileInfo = (profileInfo) => {
    return {
        type: USER_PROFILE_INFO,
        payload: profileInfo
    }
}


export const clearUserProfileInfo = (profileInfo) => {
    return {
        type: CLAER_USER_PROFILE_INFO,
        payload: profileInfo
    }
}