import { CLEAR_APPROVED_CONCESSION_REQ, CLEAR_CONCESSION_REQ, CLEAR_VERIFICATION_REQ, CLEAR_VERIFIED_PROFILES, GET_APPROVED_CONCESSION_REQ, GET_CONCESSION_REQ, GET_VERIFICATION_REQ, GET_VERIFIED_PROFILES } from "../actionTypes/AdminActionTypes"

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
