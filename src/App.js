import React from 'react';
import { useState } from 'react';
import usersData from './users.json';
import './app.css';

const App = () => {

  const [userInput, setUserInput] = useState('');
  const [listOfFoundUsers, setListOfFoundUsers] = useState([]);
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  let arr = [];

  const usersFromJson = (usersData) => {
    for(let i = 0; i < usersData.length; i++) {
      arr += JSON.stringify(usersData[i].name);
    }
    arr = arr.split('"').filter(n => n !== '' );
    return arr;
  }

  const handleClickOnSuggestions = (valueFromInput) => {
    // setUserInput(valueFromInput);
    // console.log('valuefrominnput',valueFromInput);
    let getInput = document.querySelector('.usersInput');
    getInput.value = valueFromInput.target.innerText;
    setShowSuggestionList(false);
  }


  const handleClick = (e) => {

    let foundUsers = [];

    console.log('e is a: ', e.target.value)

    for(let i = 0; i < arr.length; i++) {
       if(e.target.value.toLowerCase() === arr[i].substr(0, e.target.value.length).toLowerCase() ) {
        foundUsers += `'${arr[i]}'`;
        setShowSuggestionList(true);
      } else {
        //console.log('foundusers HERERERE', foundUsers)
        setShowSuggestionList(false);
        continue;
      }
      console.log('foundusers HERERERE', foundUsers)
      console.log('foundusers to Array', foundUsers.split('"'))
    }
    
    if(foundUsers.length !== 0) {
      setListOfFoundUsers(foundUsers.split("'").filter(n => n !== '' ));
      console.log('listoffoundusers',listOfFoundUsers)
      setShowSuggestionList(true);
    } 

    if(e.target.value === '') {
      setShowSuggestionList(false);
    }

  }

  const onKeyDown = (e) => {
    setActiveSuggestion(listOfFoundUsers.length - 1);
    if(e.keyCode == 38) {
      console.log('activesuggestion',activeSuggestion)
      if(activeSuggestion === 0) {
        return;
      }
      if(activeSuggestion >= listOfFoundUsers.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode == 40) {
      console.log('activesuggestion',activeSuggestion)
      
      if(activeSuggestion > listOfFoundUsers.length - 1) {
        return
      }
      setActiveSuggestion(activeSuggestion + 1);
    } else if(e.keyCode == 13) {
      e.preventDefault();
    }
  }

  usersFromJson(usersData);

  let listComponent;

  {
 
    if(showSuggestionList && listOfFoundUsers.length) {
      console.log('showsuggestionList', showSuggestionList);
      console.log('listoffoundusers length', listOfFoundUsers.length);
      listComponent = (
        <ul className='suggestions'>
          {listOfFoundUsers.map((listOfFoundUsers, index) => {
            console.log('inside component', listOfFoundUsers );
            console.log('inside component and INDEX', index );

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
      {/* <form>
         <input type="text" onChange={e => handleClick(e.target.value)} placeholder="Users"/>
          <button type='submit' onClick={submitForm}>Button</button>
      </form> */}
      <input className='usersInput' type="text" onKeyDown={onKeyDown} onChange={e => handleClick(e)} placeholder="Users"/> 
        {listComponent}
      <br/>

     {/* Users : {usersFromJson(usersData)} */}
    </div>
  )
}

export default App;
