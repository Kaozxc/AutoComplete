import { useState } from 'react';
import usersData from './users.json';

const App = () => {
  const [userInput, setUserInput] = useState();
  const [listOfFoundUsers, setListOfFoundUsers] = useState([]);

  let arr = [];

  const usersFromJson = (usersData) => {
    for(let i = 0; i < usersData.length; i++) {
      arr += JSON.stringify(usersData[i].name);
    }
    arr = arr.split('"').filter(n => n !== '' );
    return arr;
  }


  const handleClick = (e) => {
    let foundUsers = [];
    //  console.log(e.target.value)
    for(let i = 0; i < arr.length; i++) {
      let name = arr[i].toString();
      console.log('name', name);
      console.log('before', e.target.value);
      console.log('before',arr[i][0]);
      if(e.target.value.toLowerCase() === arr[i].substr(0, e.target.value.length).toLowerCase() ) {
        foundUsers += `'${arr[i]}'`
      } else {
      console.log('In the if',e.target.value);
      console.log('In the if',arr[i]);
        continue;
      }
    }
    setListOfFoundUsers(foundUsers.split("'").filter(n => n !== '' ));
    console.log('found users', foundUsers.split("'").filter(n => n !== '' ));
  }

  let listComponent;

  {
    if(listOfFoundUsers.length) {
      listComponent = (
        <ul>
        {console.log(listOfFoundUsers)}
        {console.log('typeof', typeof listOfFoundUsers)}
          {listOfFoundUsers.map((listOfFoundUsers, i) => {
            return (
              <li key={3} onClick={handleClick}>
              {listOfFoundUsers}
            </li>
            );
          })}
        </ul>
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
      <input type="text" onChange={e => handleClick(e)} placeholder="Users"/> 
        {listComponent}
      <br/>

     Users : {usersFromJson(usersData)}
    </div>
  )
}

export default App;
