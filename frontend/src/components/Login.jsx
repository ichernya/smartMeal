import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';

import './Login.css';

// eslint-disable-next-line require-jsdoc
const Login = () => {
  return (
    <Grid container component="main" sx={{height: '100vh'}} direction="row">
      <CssBaseline />
      <Grid
        item
        xs={false}
        elevation={5} square alignItems
        sx={{
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] :
              t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12}
        component={Paper} elevation={6} square alignItems
        id="grid_Login">
        <Box id="box_login">
          <Toolbar variant="dense" id="projectName" className='projectPad'>
            <div>
              SmartMeal
            </div>
          </Toolbar>
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
                Sign In
            </Button>
            <div id="or">
              <Divider spacing={1}>or</Divider>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
                SIGN IN WITH GOOGLE
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
                SIGN IN WITH APPLE
            </Button>
            <Divider/>
            <Grid>
              <Grid item>
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {'Don\'t have an account? Sign Up'}
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
