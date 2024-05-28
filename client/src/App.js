import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Homescreen from './components/Homescreen';
import { useEffect, useState } from "react";
import UserBooks from "./pages/UserBooks";
import ChatContainer from "./components/AI/ChatContainer";

function App() {
  const [createUser, setCreateUser] = useState(false);
  const [user, setUser] = useState({});
  const [userBooks, setUserBooks] = useState([]);


  console.log(user);

  return (
    <Router>
      <Routes>
        <Route path="/ai" element={<ChatContainer user={user} userBooks={userBooks}/>} />
        <Route path="/books" element={<UserBooks user={user} userBooks={userBooks} setUserBooks={setUserBooks}/>} />
        <Route path="/home" element={<Homescreen user={user} setUser={setUser}/>} />
        <Route path="/" element={<Login setCreateUser={setCreateUser} createUser={createUser} setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;