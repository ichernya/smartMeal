import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import {useNavigate, Link} from 'react-router-dom';

import '../colors.css';
import './DrawerContent.css';
import createList from '../GenerateList';
import {useMeals} from '../MealContextProvider';

/**
 * Represents what is in the sidebar component
 * @param {Object} props
 * @return {JSX} Jsx
 */
function DrawerContent(props) {
  const {settingsDialog, setSettings, open} =
    React.useContext(props['context']);
  const history = useNavigate();
  const {setIngredientList, startWeek} = useMeals();
  const logout = () => {
    localStorage.removeItem('user');
    history('/login');
  };
  const onClickNav = (path) => {
    if (path === '/checklist') {
      createList(setIngredientList, startWeek);
    };
  };
  const settingsOnclick = () => {
    setSettings(!settingsDialog);
  };

  const urls = ['/home', '/checklist', '/mealplans'];
  const icons = [<HomeIcon/>, <FormatListBulletedIcon/>, <LocalDiningIcon/>];

  return (
    <div className='options greyBack'>
      <List className='pages'>
        {['Home', 'Grocery List', 'Meal Plans'].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{display: 'block'}}
          >
            <Link to={urls[index]} className='sidebarLink' id={text}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => onClickNav(urls[index])}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icons[index]}
                </ListItemIcon>
                <ListItemText className='blackColor'
                  primary={text} sx={{opacity: open ? 1 : 0}}
                />
              </ListItemButton>
            </Link>
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
            id={text}
            onClick={text === 'Logout' ? logout : settingsOnclick}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {index % 2 === 0 ? <SettingsIcon /> : <LogoutIcon />}
              </ListItemIcon>
              <ListItemText className='blackColor'
                primary={text} sx={{opacity: open ? 1 : 0}}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>

  );
};

export default DrawerContent;
