
import AddUrlComponent from './AddUrlComponent'
import React, { useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../context/userContext';

function Home () {
    const {userData} = useContext(UserContext);
    return (
        <div>
            {userData.user ? (
                <div className="App container mt-5">
                    <AddUrlComponent />
               </div>
            ) : (
                <>
                    <h2>You are not logged in</h2>
                </>
            )}
        </div>
    );
}
 
export default Home;