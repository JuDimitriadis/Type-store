import React from 'react';
import './Login.css';
import {Container, Paper, Box, TextField, Button, Alert, Typography} from '@mui/material';

  type MyState = {
    username: string,
    password: string,
    alert: string
  };
  
  
  export default class Login extends React.Component<any,MyState> {
    constructor(props: any, state: MyState) {
        super(props);
        this.state = state;

        this.handleChange = this.handleChange.bind(this);

    }
  

    handleChange (evt: { target: { name: string; value: string; }; }) {
        this.setState(
            //adding this.state here will destructure the state object, 
            //then I am able to add/modify more objects to the destructured object. 
            //In order to take all of it and assign to the current state using this.setState
            { ...this.state,
                [evt.target.name]: evt.target.value,
            }
        )
    } 

    render() {
        return (
            <Container sx={{display: "flex", justifyContent: "center", alignContent: "flex-start", height: "100vh", flexWrap: "wrap", padding: "5%"}}>
                <img src='/patternpad.svg' alt="colorful shapes"/>
                <Paper elevation={10} sx={{ width: {xs: "90vw", sm: "70vw", md: "50vw"}, p:2, textAlign: "center", height: "fit-content"  }}>
                    <Typography variant="h3" sx={{fontWeight: "bold"}}>Type-Store</Typography>
                    <Box component="form" sx={{m: 1, width: '100%', height: "100%", display: "flex", flexDirection: "column", flexWrap: "wrap", alignContent: "center"}} autoComplete="off">
                        <TextField required id="outlined-required" label="Username" type="username" name="username" sx={{m:1}} onChange={this.handleChange}/>
                        <TextField required id="outlined-password-input" label="Password" type="password" name="password" sx={{m:1}} onChange={this.handleChange}/>
                        <Button variant="contained" size="small" sx={{m:1}}>Login</Button>
                        {/* {this.state.alert && <Alert severity={this.state.alert}>{this.state.error}</Alert>}         */}
                    </Box>
                </Paper>              
            </Container>
      
      );
    }
  }
