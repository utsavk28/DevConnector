import {
    CLEAR_PROFILE,
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    GET_REPOS,
} from '../actions/type';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {},
};

const profile = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
                error: {},
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false,
                error: {},
            };
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false,
                error: {},
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                profiles: [],
                repos: [],
                loading: false,
                error: {},
            };
        default:
            return state;
    }
};

export default profile;
