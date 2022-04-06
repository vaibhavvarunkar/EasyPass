import { CLEAR_VERIFICATION_REQ, CLEAR_VERIFIED_PROFILES, GET_VERIFICATION_REQ, GET_VERIFIED_PROFILES, GET_CONCESSION_REQ, GET_APPROVED_CONCESSION_REQ, CLEAR_CONCESSION_REQ, CLEAR_APPROVED_CONCESSION_REQ } from "../actionTypes/AdminActionTypes";
import { SAVE_USER_INFO, CLEAR_USER_INFO, USER_PROFILE_INFO, CLAER_USER_PROFILE_INFO } from "../actionTypes/UserActionsTypes";

const initialState = {
    userInfo: [],
    profileInfo: [],
    getVerificationReqs: [],
    getVerifiedProfiles: [],
    getConcessionReqs: [],
    getApprovedConcessionReqs: []
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
        case GET_VERIFICATION_REQ:
            return {
                ...state,
                getVerificationReqs: action.payload
            }
        case CLEAR_VERIFICATION_REQ:
            return {
                ...state,
                getVerificationReqs: []
            }
        case GET_VERIFIED_PROFILES:
            return {
                ...state,
                getVerifiedProfiles: action.payload
            }
        case CLEAR_VERIFIED_PROFILES:
            return {
                ...state,
                getVerifiedProfiles: []
            }
        case GET_CONCESSION_REQ:
            return {
                ...state,
                getConcessionReqs: action.payload
            }
        case CLEAR_CONCESSION_REQ:
            return {
                ...state,
                getConcessionReqs: []
            }
        case GET_APPROVED_CONCESSION_REQ:
            return {
                ...state,
                getApprovedConcessionReqs: action.payload
            }
        case CLEAR_APPROVED_CONCESSION_REQ:
            return {
                ...state,
                getApprovedConcessionReqs: []
            }
        default: return state

    }

}

export default userInfoReducer