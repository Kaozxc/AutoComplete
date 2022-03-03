import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LIST_OF_FOUND_USERS, SET_ACTIVE_SUGGESTION, SET_JSON_DATA, SET_SHOW_SUGGESTION_LIST } from './redux/actions';
import './app.css';
import axios from 'axios';

const App = () => {

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((res) => res)
      .then((json) => {
        dispatch({ type: SET_JSON_DATA, payload: json.data });
      })
      .catch(error => {
        console.log('error fetching', error);
      })
  }, []);

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
    let foundUsers = userNames.map((name) => {
      return (name.toLowerCase()).startsWith(searchValue.toLowerCase()) ? name : null;
    })
    dispatch({ type: SET_SHOW_SUGGESTION_LIST, payload: foundUsers.length > 0 });

    if (foundUsers.length > 0) {
      dispatch({ type: SET_LIST_OF_FOUND_USERS, payload: foundUsers.filter(n => n) });
    }
  }

  const onKeyDown = (e) => {
    const key = e.keyCode;
    const currentIndex = activeSuggestion;
    switch (key) {
      case 38:
        dispatch({ type: SET_ACTIVE_SUGGESTION, payload: currentIndex === 0 ? listOfFoundUsers.length - 1 : currentIndex - 1 });
        break;
      case 40:
        dispatch({ type: SET_ACTIVE_SUGGESTION, payload: currentIndex >= listOfFoundUsers.length - 1 ? 0 : currentIndex + 1 });
        break;
      case 13:
        e.preventDefault();
        break;
    }
  }

  let listComponent;

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

  return (
    <div>
      <input className='usersInput' type="text" onKeyDown={onKeyDown} onChange={e => handleClick(e)} placeholder="Users" />
      {listComponent}
    </div>
  )
}

export default App;
