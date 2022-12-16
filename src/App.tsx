
import React, {useEffect, useState} from 'react';
import './App.css';

interface Error {
  error: boolean,
  message: string,
};

interface MyProps {
  removeCookie: Function
}

function App(props: MyProps) {
  const [apiError, setApiError] = useState<Error>({error: false, message: ""})
  console.log("MyProps", props)

  //Fetching data from the "fakestoreapi"
  //This function will be called inside the useEffect hook, every time the user load the page 
  const getCarts = async () => {
    const response = await fetch('https://fakestoreapi.com/carts')
    console.log("response", response)
    // response.ok returns true if the request was successful (status in the range 200-299) and false if it was not successful.
    if(response.ok === false) {
      setApiError({
        error: true,
        message: `${response.status} - Something went wrong, please try again`
      })
      return
    }

    // status 204 = No Content
    if(response.status === 204) {
      setApiError({
        error: true,
        message: `No carts available`
      })
      return
    }

    const parse = await response.json();

    //add redux and encapsulation 
    return;
  }

  useEffect(()=> {
    getCarts();
  }, [])




console.log("apiError", apiError)
  return (
<>
{apiError.error && <>{apiError.message}</>}
</>
  );
}

export default App;
