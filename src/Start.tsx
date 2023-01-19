import React from 'react';
import App from './App';
import Login from './Login';
import { useCookies } from 'react-cookie';


function Start() {
    const [cookies, setCookie, removeCookie] = useCookies(["TypeStore"]);
   
    return (<>
        {cookies.TypeStore ? <App /* removeCookie={removeCookie}*/></App> : <Login setCookie={setCookie}></Login>}
    \</>)
   
};

export default Start