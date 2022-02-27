import { SET_JSON_DATA, SET_LIST_OF_FOUND_USERS, SET_SHOW_SUGGESTION_LIST, SET_ACTIVE_SUGGESTION } from "./actions";

const initialState = {
    jsonData: null,
    listOfFoundUsers: [],
    showSuggestionList: false,
    activeSuggestion: 0,
}


function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_JSON_DATA:
            return { ...state, jsonData: action.payload };
        case SET_LIST_OF_FOUND_USERS:
            return { ...state, listOfFoundUsers: action.payload };
        case SET_SHOW_SUGGESTION_LIST:
            return { ...state, showSuggestionList: action.payload };
        case SET_ACTIVE_SUGGESTION:
            return { ...state, activeSuggestion: action.payload };
        default:
            return state;
    }
}

export default userReducer;