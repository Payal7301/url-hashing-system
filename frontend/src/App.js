import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route,Link } from 'react-router-dom';
import AddUrlComponent from "./components/AddUrlComponent";
import { useEffect,useState } from "react";
import UserContext from './context/userContext';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import axios from "axios";
import Header from "./components/layout/Header";
import Home from "./components/Home";
function App() {
  const [ userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post('http://localhost:3000/users/tokenIsValid', null, {headers: {"x-auth-token": token}});
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:3000/users/user", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    }

    checkLoggedIn();
  }, []);
  return (
    <BrowserRouter>
    <UserContext.Provider value={{ userData, setUserData }}>
      <Header />
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route exact path="/user/register"><Register/></Route>
        <Route exact path="/user/login"><Login/></Route>
      </Switch>
      </UserContext.Provider>
  </BrowserRouter>
  );
}

export default App;