import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import {useNavigate} from 'react-router-dom';


import './DrawerContent.css';

// eslint-disable-next-line require-jsdoc
function DrawerContent(prop) {
  const history = useNavigate();
  const logout = () => {
    localStorage.removeItem('user');
    history('/login');
  };

  const redirect = (link) => {
    history(link);
  };

  const urls = ['/home', '/checklist'];

  return (
    <div className='options'>
      <List className='pages'>
        {['Inbox', 'Starred'].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{display: 'block'}}
            onClick={() => redirect(urls[index])}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: prop.open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: prop.open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {index % 2 === 0 ? <HomeIcon /> : <FormatListNumberedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{opacity: prop.open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
      </List>
      <List className='bottomBtns'>
        <Divider />
        {['Settings', 'Logout'].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{display: 'block'}}
            onClick={text === 'Logout' ? logout : null}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: prop.open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: prop.open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {index % 2 === 0 ? <SettingsIcon /> : <LogoutIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{opacity: prop.open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>

  );
};

export default DrawerContent;
