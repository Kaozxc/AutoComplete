import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { setJsonData, setListOfFoundUsers, setShowSuggestionList, setActiveSuggestion, SET_LIST_OF_FOUND_USERS, SET_ACTIVE_SUGGESTION } from './redux/actions';
import { SET_JSON_DATA, SET_SHOW_SUGGESTION_LIST } from './redux/actions';
import './app.css';
import userReducer from './redux/reducers';
import { Store } from './redux/store';

const App = () => {

  useEffect(() => {
    fetch(
      "https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: SET_JSON_DATA, payload: json });
      })
      .catch(error => {
        console.log('error fetching', error);
      })
  }, [])

  const { jsonData, listOfFoundUsers, showSuggestionList, activeSuggestion } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const extractNamesFromJson = (data) => {
    return data.map((user) => user.name);
  }

  const handleClickOnSuggestions = (valueFromInput) => {
    let getInput = document.querySelector('.usersInput');
    getInput.value = valueFromInput.target.innerText;
    dispatch({ type: SET_SHOW_SUGGESTION_LIST, payload: false });
  }

  const handleClick = (e) => {
    const searchValue = e.target.value;

    if (!searchValue) {
      dispatch({ type: SET_SHOW_SUGGESTION_LIST, payload: false });
      return;
    }

    const userNames = extractNamesFromJson(jsonData);
    console.log('usernames', userNames)
    console.log('jsonglobal', jsonData)
    console.log('showsuggestion', showSuggestionList)
    let foundUsers = userNames.map((name) => {
      return (name.toLowerCase()).startsWith(searchValue.toLowerCase()) ? name : null;
    })
    dispatch({ type: SET_SHOW_SUGGESTION_LIST, payload: foundUsers.length > 0 });

    if (foundUsers.length > 0) {
      dispatch({ type: SET_LIST_OF_FOUND_USERS, payload: foundUsers.filter(n => n) });
    }
  }

  const onKeyDown = (e) => {
    // dispatch({ type: SET_ACTIVE_SUGGESTION, payload: listOfFoundUsers.length - 1 });
    const key = e.keyCode;
    const currentIndex = activeSuggestion;
    if (key === 38) {
      dispatch({ type: SET_ACTIVE_SUGGESTION, payload: currentIndex === 0 ? listOfFoundUsers.length - 1 : currentIndex - 1 });
    }
    else if (key === 40) {
      dispatch({ type: SET_ACTIVE_SUGGESTION, payload: currentIndex >= listOfFoundUsers.length - 1 ? 0 : currentIndex + 1 });
    } else if (e.keyCode == 13) {
      e.preventDefault();
    }
  }

  let listComponent;

  {

    if (showSuggestionList && listOfFoundUsers.length) {
      listComponent = (
        <ul className='suggestions'>
          {listOfFoundUsers.map((listOfFoundUsers, index) => {
            let className;

            if (index === activeSuggestion) {
              className = "suggestion-active";
            }

            return (
              <li className={className} key={index} onClick={handleClickOnSuggestions}>
                {listOfFoundUsers}
              </li>
            );
          })}
        </ul>
      )
    }
  }


  return (
    <div>
      <input className='usersInput' type="text" onKeyDown={onKeyDown} onChange={e => handleClick(e)} placeholder="Users" />
      {listComponent}
    </div>
  )
}

export default App;
