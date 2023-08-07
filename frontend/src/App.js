import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";


import MyRoutes from './routes-nav/MyRoutes';
import UserContext from './profile/UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import JoblyApi from './api/api';
import Nav from './routes-nav/MyNav';


function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [applications, setApplications] = useState(null);
  const [token, setToken] = useLocalStorage(null);
  const [userInfoLoaded, setUserInfoLoaded] = useState(false)



  async function registerUser(data) {
    const res = await JoblyApi.registerUser(data);
    setToken(res);

    setCurrentUser(res)
  }


  async function loginUser(data) {
    const res = await JoblyApi.loginUser(data);
    setToken(res);
    setCurrentUser(res)
  }


  async function updateUser(data) {
    const user = await JoblyApi.updateUser(currentUser.username, data)
    setCurrentUser(user)
  }

  
  useEffect(() => {
    async function checkToken() {
      if (token) {
        try {
          let { username } = jwt_decode(token);
          JoblyApi.token = token;
          const user = await JoblyApi.getUser(username);
          setCurrentUser(user);
          setApplications(user.applications)

        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }

      }
      setUserInfoLoaded(true)
    }
    setUserInfoLoaded(false)
    checkToken();


  }, [token]);



  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider 
        value={{  currentUser, setCurrentUser, applications,
                  setApplications, setToken, token, userInfoLoaded, 
                  setUserInfoLoaded, loginUser, registerUser, updateUser }}>

          <Nav />
          <main>
            <MyRoutes />
          </main>
        </UserContext.Provider >
      </BrowserRouter>



    </div>
  );
}

export default App;
