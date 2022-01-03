import { SAVE_USER_INFO, CLEAR_USER_INFO, USER_PROFILE_INFO, CLAER_USER_PROFILE_INFO } from "../actionTypes/UserActionsTypes";

const initialState = {
    userInfo: [],
    profileInfo: []
}

const userInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
            }
        case CLEAR_USER_INFO:
            return {
                ...state,
                userInfo: []
            }
        case USER_PROFILE_INFO:
            return {
                ...state,
                profileInfo: action.payload
            }
        case CLAER_USER_PROFILE_INFO:
            return {
                ...state,
                profileInfo: []
            }
        default: return state

    }

}

export default userInfoReducer