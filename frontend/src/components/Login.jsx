import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import './Login.css';

// eslint-disable-next-line require-jsdoc
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [status, setStatus] = useState();
  const submitLoginForm = () => {
    setStatus(true);
  };
  useEffect(() => {
    console.log(email);
  }, [email]);
  useEffect(() => {
    console.log(password);
  }, [password]);
  return (
    <Grid container component="main" sx={{height: '100vh'}} direction="row">
      <CssBaseline />
      <Grid
        item
        xs={false}
        elevation={5} alignItems
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] :
              t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12}
        component={Paper} elevation={6} alignItems
        id="grid_Login">
        <Box id="box_login">
          <div variant="dense" id="projectName" className=''>
            <div id="project">
              SmartMeal
            </div>
          </div>
          <Divider style={{width: '80%'}} />
          <Box component="form" noValidate id="email_form">
            <div id="signIn">
              Sign in
            </div>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {status ? <div class='error'>
              Invalid Credentials
            </div> : null}
            <Button
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
              onClick={submitLoginForm}
            >
                Sign In
            </Button>
            <div id="or">
              <Divider spacing={1}>or</Divider>
            </div>
            <Button
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
                Continue with Google
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
                Continue with Apple
            </Button>
            <Divider/>
            <Grid>
              <Grid item>
                <span>
                Don't have an account?
                </span>
                &nbsp;
                <Link href="./signup" id="link_c">
                  Sign Up
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" id="link_c">
                    Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
