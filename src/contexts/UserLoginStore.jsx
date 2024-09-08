
import { set } from "react-hook-form";
import { userLoginContext } from "./userLoginContext";
import { useState } from "react";

function UserLoginStore({ children }) {
  //login user state
  let [currentUser, setCurrentUser] = useState(null);
  let [userLoginStatus, setUserLoginStatus] = useState(false);
  let [err, setErr] = useState("");

  //user login
  async function loginUser(userCred) {
    try {
      let res = await fetch(
        'http://localhost:4000/user-api/login',
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(userCred),
        }
      );
      let result = await res.json();
      if (result.message ==='login success') {
        //invalid credentials
        setCurrentUser(result.user)
        setUserLoginStatus(true)
        setErr('')
        //save token in session storage
        sessionStorage.setItem('token',result.token)//(key,value)
       
      } else {
        setUserLoginStatus(false);
        setErr(result.message);
        setCurrentUser({});
      }
    } catch (error) {
      setErr(error.message);
    }
  }

  //user logout
  function logoutUser() {
    //reset state
    setCurrentUser({});
    setUserLoginStatus(false);
    setErr('')
    //remove token from session storage
    sessionStorage.removeItem('token')
  }

  return (
    <userLoginContext.Provider
      value={{ loginUser, logoutUser, userLoginStatus,err,currentUser,setCurrentUser }}
    >
      {children}
    </userLoginContext.Provider>
  );
}

export default UserLoginStore;
