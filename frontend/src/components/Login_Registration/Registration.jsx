import * as React from 'react';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';

import './Registration.css';

const SignUp = () => {
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
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  sx={{
                    width: '100%',
                  }}
                  id="confirm email"
                  label="Confirm Email Address"
                  name="confirm email"
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
                  name="confirm password"
                  label="Confirm Password"
                  type="confirm password"
                  id="confirm password"
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
