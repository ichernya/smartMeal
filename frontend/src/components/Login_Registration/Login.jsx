import React, {useState, useEffect} from 'react';
import Fab from '@mui/material/Fab';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import BgImg from '../../assets/p1t.jpg';
import {useNavigate} from 'react-router-dom';
import './Login.css';

// eslint-disable-next-line require-jsdoc
const Login = () => {
  const [user, setUser] = React.useState({email: '', password: ''});
  const [status, setStatus] = useState();
  const history = useNavigate();
  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = user;
    u[name] = value;
    setUser(u);
  };
  const submitLoginForm = (event) => {
    event.preventDefault();
    fetch('http://localhost:3010/v0/login', {
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
        localStorage.setItem('user', JSON.stringify(json));
        history('/home');
      }).catch((err) => {
        setStatus(true);
      });
  };
  useEffect(() => {
    if (localStorage.getItem('user')) {
      history('/home');
    }
  }, [history]);
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleInputChange}
              autoFocus
              sx={{
                width: '100%',
              }}
            />
            <TextField
              margin="normal"
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
            {status ? <div className='error'>
              Invalid Credentials
            </div> : null}
            <Fab
              variant="extended"
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
              sx={{mt: 3, width: '100%'}}
              className="Fab_SignIn_Others"
            >
                Continue with Google
            </Fab>
            <Fab
              variant="extended"
              size="medium"
              sx={{mt: 4, mb: 2, width: '100%'}}
              className="Fab_SignIn_Others"
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
