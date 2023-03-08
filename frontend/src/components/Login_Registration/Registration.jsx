/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import {useNavigate} from 'react-router-dom';

import './Registration.css';

const validateEmail = (mail) => {
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (pattern.test(mail)) {
    return (true);
  }
  return false;
};


/**
 * Registration component
 * @return {object}
 */
function SignUp() {
  const history = useNavigate();

  const [status, setStatus] = useState(true);
  const [user, setUser] = useState({
    first_name: '', last_name: '',
    email: '', password: '', confirmPassword: '',
  });
  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = user;
    u[name] = value;
    setStatus(!(validateEmail(user['email']) &&
    user['password'] === user['confirmPassword'] && user['password'] !== ''));
    setUser(u);
  };
  const submitRegistorForm = (event) => {
    const userData = {...user};
    delete userData['first_name'];
    delete userData['last_name'];
    delete userData['confirmPassword'];
    event.preventDefault();
    fetch('http://localhost:3010/v0/signup', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        console.log(json);
        history('/home');
      }).catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box>
      <div id="projectName">
        <a id="project" href="/">
              SmartMeal
        </a>
      </div>
      <Divider style={{width: '100%'}} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box id="registrationBox">
          <div id="signUp">
              Sign up
          </div>
          <Box component="form" noValidate sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  id="firstName"
                  label="First Name"
                  onChange={handleInputChange}
                  autoFocus
                  sx={{
                    width: '100%',
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={handleInputChange}
                  autoComplete="family-name"
                  sx={{
                    width: '100%',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  sx={{
                    width: '100%',
                  }}
                  id="email"
                  onChange={handleInputChange}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  sx={{
                    width: '100%',
                  }}
                  name="password"
                  label="Password"
                  onChange={handleInputChange}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  sx={{
                    width: '100%',
                  }}
                  name="confirmPassword"
                  onChange={handleInputChange}
                  label="confirmPassword"
                  type="password"
                  id="confirmPassword"
                />
              </Grid>
            </Grid>
            <Fab
              variant="extended"
              size="medium"
              color='primary'
              sx={{mt: 3, width: '100%'}}
              href=""
              id="Fab_SignUp"
              onClick={submitRegistorForm}
              disabled = {status}
            >
              Sign Up
            </Fab>
            <Divider id="bottomPadder" />
            <Grid container justifyContent="center">
              <Grid item>
                <span>
                  Already have an account?
                </span>
                &nbsp;
                <Link href="./login" id="link_c">
                  Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};


export default SignUp;
