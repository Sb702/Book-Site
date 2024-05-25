import './App.css';
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import Homescreen from './components/Homescreen';
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [createUser, setCreateUser] = useState(false);
  const [user, setUser] = useState({});

  console.log(user);

  return (
    <div>
      {isLoggedIn === false ? (
        <div>
          <Login setIsLoggedIn={setIsLoggedIn} setCreateUser={setCreateUser} createUser={createUser} setUser={setUser} />
          {createUser ? (
            <CreateUser />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <Homescreen user={user}/>
      )}
    </div>
  );
}

export default App;
