export const SET_JSON_DATA = 'SET_JSON_DATA';
export const SET_LIST_OF_FOUND_USERS = 'SET_LIST_OF_FOUND_USERS';
export const SET_SHOW_SUGGESTION_LIST = 'SET_SHOW_SUGGESTION_LIST';
export const SET_ACTIVE_SUGGESTION = 'SET_ACTIVE_SUGGESTION';


export const setJsonData = jsonData => dispatch => {
    dispatch({
        type: SET_JSON_DATA,
        payload: jsonData,
    });
}

export const setListOfFoundUsers = listOfFoundUsers => dispatch => {
    dispatch({
        type: SET_LIST_OF_FOUND_USERS,
        payload: listOfFoundUsers,
    });
}

export const setShowSuggestionList = showSuggestionList => dispatch => {
    dispatch({
        type: SET_SHOW_SUGGESTION_LIST,
        payload: showSuggestionList,
    });
}

export const setActiveSuggestion = activeSuggestion => dispatch => {
    dispatch({
        type: SET_ACTIVE_SUGGESTION,
        payload: activeSuggestion,
    });
}
