import { FETCH_DATA } from "../actions/appActions";

export const appReducer = (state = { data: null }, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};
