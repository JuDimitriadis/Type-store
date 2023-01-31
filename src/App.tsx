
import React, {useEffect, useState} from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import './App.css';
import {useScrollTrigger, Slide, AppBar, Toolbar, Button,Box, Container, Typography, IconButton} from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const navButton: {
  color: string;
  textShadow: string;
  paddingX: string;
} = {color:'#f1f7f2', textShadow: "0px 1px 1px #fbb484", paddingX:"1vw"};

interface Error {
  error: boolean,
  message: string,
};

interface MyProps {
  removeCookie: Function
}


function App(props: MyProps) {
  const [apiError, setApiError] = useState<Error>({error: false, message: ""})
  
  //By default it has the window as Target and threshold = 100, and it 
  //change the trigger value when the vertical scroll strictly crosses this threshold (exclusive).
  //returned value is used to trigger the <Slide>.
  const trigger = useScrollTrigger();

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





  return (<>
   <BrowserRouter>
   <img src='/patternpad.svg' alt="colorful shapes"/>
    {/* If "in" = true, the component will transition in.  */}
    <Slide in={!trigger}>
        <AppBar>
            <Toolbar variant="dense" component="nav" sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
               <Box sx={{display:"flex", flexDirection:"row"}}>
                <LocalMallOutlinedIcon fontSize="large"/>
                <Typography variant="h4">Type-Store</Typography>
                </Box>
                <Box> 
                <Link to="/home">
                    <Button variant="text" sx={navButton}>Home</Button>
                </Link>
                <Link to="/products">
                    <Button variant="text" sx={navButton}>Products</Button>
                </Link>
                <Link to="/carts">
                    <Button variant="text" sx={navButton}>Carts</Button>
                </Link>
                <Link to="/customers">
                    <Button variant="text" sx={navButton}>Customers</Button>
                </Link>
                </Box>

                <IconButton aria-label="logout" onClick={()=>props.removeCookie("TypeStore", {user: "username", auth: true})} sx={{}}>
                    <ExitToAppOutlinedIcon fontSize="large" sx={{color:'#f1f7f2'}}/>
                </IconButton>
            </Toolbar>
        </AppBar>
    </Slide>
    <Routes>
        <Route path="/">
          <Route path="home">I AM HOME</Route>
          <Route path="products">I AM products</Route>
          <Route path="carts">I AM carts</Route>
          <Route path="customers">I AM customers</Route>
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*">I AM *</Route>
        </Route>
      </Routes>
</BrowserRouter>
</>
  );
}

export default App;




// import React from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import { flexbox } from '@mui/system';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// interface Props {}

// const MenuBar: React.FC<Props> = () => {
//   const classes = useStyles();
//   const history = useHistory();

//   const handleLogout = () => {
//     // Perform logout logic
//     history.push('/');
//   };

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" className={classes.title}>
//             My Application
//           </Typography>
//           <Link to="/home">
//             <Typography variant="button">Home</Typography>
//           </Link>
//           <Link to="/about">
//             <Typography variant="button">About</Typography>
//           </Link>
//           <Link to="/contact">
//             <Typography variant="button">Contact</Typography>
//           </Link>
//           <Link to="/settings">
//             <Typography variant="button">Settings</Typography>
//           </Link>
//           <IconButton
//             edge="end"
//             aria-label="logout"
//             onClick={handleLogout}
//           >
//             <ExitToAppIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// };

// export default MenuBar;
