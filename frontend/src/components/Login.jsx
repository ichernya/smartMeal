
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import './Login.css';

// eslint-disable-next-line require-jsdoc
function Login() {
  return (
    <Grid container component="main" direction="row">
      <Grid item xs={0} sm={6} md={7}
        elevation={6} square alignItems
        sx={{height: '100vh'}}>
        <Grid id='grid_About'>
          <Typography component="h1" variant="h5" id="aboutUs">
              Who we are?
          </Typography>
          <Typography component="h1" variant="h5" id="us">
              The Smart Team
          </Typography>
          <Typography component="h1" variant="h5" id="whatUsDo">
              What we are about?
          </Typography>
          <Typography component="h1" variant="h5" id="usDo">
              We are about hard work and dedication
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={5}
        component={Paper} elevation={6} square alignItems
        id="grid_Login">
        <Box id="box_login">
          <div id="padder"/>
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              Sign in
          </Typography>
          <Box component="form" noValidate id="email_form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password" />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
                Sign In
            </Button>
            <Grid>
              <div id="padder1"/>
              <Grid item>
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
              </Grid>
              <div id="padder1"/>
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
}

export default Login;
