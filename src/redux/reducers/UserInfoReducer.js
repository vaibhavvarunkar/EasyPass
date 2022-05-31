import { CLEAR_VERIFICATION_REQ, CLEAR_VERIFIED_PROFILES, GET_VERIFICATION_REQ, GET_VERIFIED_PROFILES, GET_CONCESSION_REQ, GET_APPROVED_CONCESSION_REQ, CLEAR_CONCESSION_REQ, CLEAR_APPROVED_CONCESSION_REQ } from "../actionTypes/AdminActionTypes";
import { CLEAR_BUS_APPROVED_PASS_REQS, CLEAR_BUS_PASS_REQS, GET_BUS_APPROVED_PASS_REQ, GET_BUS_PASS_REQS } from "../actionTypes/BusAdminActionTypes";
import { CLEAR_TRAIN_APPROVED_PASS_REQS, CLEAR_TRAIN_PASS_REQS, GET_TRAIN_APPROVED_PASS_REQ, GET_TRAIN_PASS_REQS } from "../actionTypes/TrainAdminActionTypes";
import { SAVE_USER_INFO, CLEAR_USER_INFO, USER_PROFILE_INFO, CLAER_USER_PROFILE_INFO } from "../actionTypes/UserActionsTypes";

const initialState = {
    userInfo: [],
    profileInfo: [],
    getVerificationReqs: [],
    getVerifiedProfiles: [],
    getConcessionReqs: [],
    getApprovedConcessionReqs: [],
    getBusPassReqs: [],
    getApprovedBusPassReqs: [],
    getTrainPassReqs: [],
    getApprovedPassReqsTrain: []
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
        case GET_BUS_PASS_REQS:
            return {
                ...state,
                getBusPassReqs: action.payload
            }
        case GET_BUS_APPROVED_PASS_REQ:
            return {
                ...state,
                getApprovedPassReqs: action.payload
            }
        case CLEAR_BUS_PASS_REQS:
            return {
                ...state,
                getBusPassReqs: []
            }
        case CLEAR_BUS_APPROVED_PASS_REQS:
            return {
                ...state,
                getApprovedPassReqs: []
            }
        case GET_TRAIN_PASS_REQS:
            return {
                ...state,
                getTrainPassReqs: action.payload
            }
        case GET_TRAIN_APPROVED_PASS_REQ:
            return {
                ...state,
                getApprovedPassReqsTrain: action.payload
            }
        case CLEAR_TRAIN_PASS_REQS:
            return {
                ...state,
                getTrainPassReqs: []
            }
        case CLEAR_TRAIN_APPROVED_PASS_REQS:
            return {
                ...state,
                getApprovedPassReqsTrain: []
            }
        default: return state

    }

}

export default userInfoReducer