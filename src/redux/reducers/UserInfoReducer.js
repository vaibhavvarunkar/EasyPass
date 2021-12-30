import { SAVE_USER_INFO, CLEAR_USER_INFO } from "../actionTypes/UserActionsTypes";

const initialState = {
    userInfo: []
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

        default: return state

    }

}

export default userInfoReducer