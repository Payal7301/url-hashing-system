import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from "../../context/userContext";
import AddUrlComponent from '../AddUrlComponent';

function AuthOptions () {
    const { userData, setUserData } = useContext(UserContext);
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem("auth-token","");
    };

    return (
        <nav className="auth-options">
            {userData.user ? (
                <div>
                <div className="App container -mt5">
                 <AddUrlComponent />
                </div>
                <div className="text-center">
                <button className="btn  btn-primary mr-2" onClick={logout}>Logout</button>
                </div>
                </div>
            ) : (
                <>
                <Link to='/user/register'><button className="btn btn-primary mr-2" >Sign Up</button></Link>
                <Link to='/user/login'><button className="btn btn-primary mr-2" >Login</button></Link>
                </>
            )}
        </nav>
    )
}

export default AuthOptions;