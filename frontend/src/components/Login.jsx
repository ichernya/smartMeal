
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
import Toolbar from '@mui/material/Toolbar';


// eslint-disable-next-line require-jsdoc
function Login() {
  return (
    <Grid container component="main" direction="row" height="100%">
      <Grid item xs={12} sm={6} md={7}
        component={Paper} elevation={6} square alignItems
        sx={{height: '100vh'}}
      >
        <Grid
          sx={{
            my: 8,
            mx: 4,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Toolbar />
          <Toolbar />
          <Toolbar />
          <Typography component="h1" variant="h5">
              Who we are?
          </Typography>
          <Typography component="h1" variant="h5">
              Smart Team
          </Typography>
          <Toolbar />
          <Toolbar />
          <Typography component="h1" variant="h5">
              What we are about?
          </Typography>
          <Typography component="h1" variant="h5">
              We are about hard work and dedication
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={5}
        component={Paper} elevation={6} square alignItems
        sx={{
          right: 0,
          height: '100vh',
          position: 'absolute'}}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Toolbar />
          <Toolbar />
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              Sign in
          </Typography>
          <Box component="form" noValidate
            sx={{mt: 1}}>
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
            <Grid container>
              <Grid item xs>
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
}

export default Login;
