import { useState } from 'react';
import usersData from './users.json';

const App = () => {
  const [userInput, setUserInput] = useState('');
  const [listOfFoundUsers, setListOfFoundUsers] = useState([]);
  const [canStart, setCanStart] = useState(false);

  let arr = [];

  const usersFromJson = (usersData) => {
    for(let i = 0; i < usersData.length; i++) {
      arr += JSON.stringify(usersData[i].name);
    }
    arr = arr.split('"').filter(n => n !== '' );
    return arr;
  }

  const handleClickOnSuggestions = (valueFromInput) => {
    let getInput = document.querySelector('.usersInput');
    getInput.value = valueFromInput;
  }


  const handleClick = (e) => {
    usersFromJson(usersData)

    let foundUsers = [];

    for(let i = 0; i < arr.length; i++) {
       if(e.target.value.toLowerCase() === arr[i].substr(0, e.target.value.length).toLowerCase() ) {
        foundUsers += `'${arr[i]}'`
        setCanStart(true);
      } else {
        //console.log('foundusers HERERERE', foundUsers)
        continue;
      }
      console.log('foundusers HERERERE', foundUsers)
      console.log('foundusers to Array', foundUsers.split('"'))
    }
    
    if(foundUsers.length !== 0) {
      setListOfFoundUsers(foundUsers.split("'").filter(n => n !== '' ));
      console.log('listoffoundusers',listOfFoundUsers)
    } 
  }

  let listComponent;

  {
 
    if(canStart) {
      listComponent = (
        <ul>
          {listOfFoundUsers.map((listOfFoundUsers) => {
            return (
              <li key={listOfFoundUsers} onClick={e => handleClickOnSuggestions(e.target.innerText)}>
              {listOfFoundUsers}
            </li>
            );
          })}
        </ul>
      )  
    } else {
      listComponent = (
        <div>
          No names to autocomplete
        </div>
      )
    }
   }
  
{}
  return (
    <div>
      {/* <form>
         <input type="text" onChange={e => handleClick(e.target.value)} placeholder="Users"/>
          <button type='submit' onClick={submitForm}>Button</button>
      </form> */}
      <input className='usersInput' type="text" onChange={e => handleClick(e)} placeholder="Users"/> 
        {listComponent}
      <br/>

     {/* Users : {usersFromJson(usersData)} */}
    </div>
  )
}

export default App;
