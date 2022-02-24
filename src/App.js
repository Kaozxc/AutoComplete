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

  const handleClickOnSuggestions = (e) => {
    let getInput = document.querySelector('.usersInput');
    console.log('one', getInput);
    getInput.innerText = e;
    if(e === ' ' || e === undefined) {
      getInput.value = '';
    }
    alert('YOU HAVE CLICKEd', e);
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
        setCanStart(true);
      } else {
        continue;
      }
      console.log(foundUsers)
    }
    setListOfFoundUsers(foundUsers.split("'").filter(n => n !== '' ));

    // while(!canStart && i < 10) {
    //   // setListOfFoundUsers(foundUsers.split("'").filter(n => n !== '' ));
    //   console.log('error')
    //  i++;
    // } 
   // console.log('found users', foundUsers.split("'").filter(n => n !== '' ));
  }

  let listComponent;

  {
 
    if(listOfFoundUsers.length) {
      listComponent = (
        <ul>
        {console.log(listOfFoundUsers)}
        {console.log('typeof', typeof listOfFoundUsers)}
          {listOfFoundUsers.map((listOfFoundUsers, i) => {
            // console.log('listoffoundusers + i',listOfFoundUsers[i])
            return (
              <li key={listOfFoundUsers} onClick={handleClickOnSuggestions}>
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
      <input className='usersInput' type="text" onChange={e => handleClick(e)} placeholder="Users"/> 
        {listComponent}
      <br/>

     Users : {usersFromJson(usersData)}
    </div>
  )
}

export default App;
