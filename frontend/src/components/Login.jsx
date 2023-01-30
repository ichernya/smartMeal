import React, {useState, useEffect} from 'react';
import Fab from '@mui/material/Fab';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import BgImg from '../assets/p1t.jpg';
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
        sm={12}
        md={12}
        sx={{
          backgroundImage: `url(${BgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12}
        component={Paper} elevation={6} alignItems
        id="grid_Login">
        <Box id="box_login">
          <div variant="dense" id="projectName" className=''>
            <a id="project" href='/'>
              SmartMeal
            </a>
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
            <Fab
              variant="extended"
              fullWidth
              size="medium"
              color='primary'
              sx={{mt: 3, mb: 2, width: '100%'}}
              onClick={submitLoginForm}
              id="Fab_SignIn"
            >
                Sign In
            </Fab>
            <div id="or">
              <Divider spacing={1}>or</Divider>
            </div>
            <Fab
              variant="extended"
              size="medium"
              fullWidth
              sx={{mt: 3, width: '100%'}}
              id="Fab_SignIn_Others"
            >
                Continue with Google
            </Fab>
            <Fab
              variant="extended"
              size="medium"
              fullWidth
              sx={{mt: 4, mb: 2, width: '100%'}}
              id="Fab_SignIn_Others"
            >
                Continue with Apple
            </Fab>
            <Divider id="padder1"/>
            <Grid id="extra">
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
