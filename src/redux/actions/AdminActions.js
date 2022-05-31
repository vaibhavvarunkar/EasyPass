import { CLEAR_APPROVED_CONCESSION_REQ, CLEAR_CONCESSION_REQ, CLEAR_VERIFICATION_REQ, CLEAR_VERIFIED_PROFILES, GET_APPROVED_CONCESSION_REQ, GET_CONCESSION_REQ, GET_VERIFICATION_REQ, GET_VERIFIED_PROFILES } from "../actionTypes/AdminActionTypes"
import { GET_BUS_APPROVED_PASS_REQ, GET_BUS_PASS_REQS } from "../actionTypes/BusAdminActionTypes"
import { GET_TRAIN_APPROVED_PASS_REQ, GET_TRAIN_PASS_REQS } from "../actionTypes/TrainAdminActionTypes"

export const getVerificationReq = (getVerificationReqs) => {
    return {
        type: GET_VERIFICATION_REQ,
        payload: getVerificationReqs
    }
}

export const clearVerificationReq = (clearVerificationReqs) => {
    return {
        type: CLEAR_VERIFICATION_REQ,
        payload: clearVerificationReqs
    }
}

export const getVerifiedProfiles = (getVerifiedPRofiles) => {
    return {
        type: GET_VERIFIED_PROFILES,
        payload: getVerifiedPRofiles
    }
}

export const clearVerifiedProfiles = (clearVerifiedProfiles) => {
    return {
        type: CLEAR_VERIFIED_PROFILES,
        payload: clearVerifiedProfiles
    }
}

export const getConcessionReq = (concessionReqs) => {
    return {
        type: GET_CONCESSION_REQ,
        payload: concessionReqs
    }
}

export const clearConcessionReq = (clearConcessionReqs) => {
    return {
        type: CLEAR_CONCESSION_REQ,
        payload: clearConcessionReqs
    }
}

export const getApprovedConcessionReq = (approvedConcessionReqs) => {
    return {
        type: GET_APPROVED_CONCESSION_REQ,
        payload: approvedConcessionReqs
    }
}


export const clearApprovedConcessionReq = (clearApprovedConcessionReqs) => {
    return {
        type: CLEAR_APPROVED_CONCESSION_REQ,
        payload: clearApprovedConcessionReqs
    }
}

export const getBusPassReqs = (busPassReqs) => {
    return {
        type: GET_BUS_PASS_REQS,
        payload: busPassReqs
    }
}

export const getApprovedBusPassReqs = (busApprovedPassReqs) => {
    return {
        type: GET_BUS_APPROVED_PASS_REQ,
        payload: busApprovedPassReqs
    }
}

export const clearGetBusPassReqs = (clearBusPassReqs) => {
    return {
        type: GET_BUS_PASS_REQS,
        payload: clearBusPassReqs
    }
}

export const clearGetApprovedBusPassReqs = (clearBusApprovedPassReqs) => {
    return {
        type: GET_BUS_APPROVED_PASS_REQ,
        payload: clearBusApprovedPassReqs
    }
}

export const getTrainPassReqs = (trainPassReqs) => {
    return {
        type: GET_TRAIN_PASS_REQS,
        payload: trainPassReqs
    }
}

export const getApprovedTrainPassReqs = (trainApprovedPassReqs) => {
    return {
        type: GET_TRAIN_APPROVED_PASS_REQ,
        payload: trainApprovedPassReqs
    }
}

export const clearGetTrainPassReqs = (clearTrainPassReqs) => {
    return {
        type: GET_TRAIN_PASS_REQS,
        payload: clearTrainPassReqs
    }
}

export const clearGetApprovedTrainPassReqs = (clearTrainApprovedPassReqs) => {
    return {
        type: GET_TRAIN_APPROVED_PASS_REQ,
        payload: clearTrainApprovedPassReqs
    }
}
