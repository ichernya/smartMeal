import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Fab from '@mui/material/Fab';
import {useDimensions} from '../DimensionsProvider.jsx';

import Settings from './Settings.jsx';
import DrawerContent from './DrawerContent.jsx';
import './SideBar.css';
import '../colors.css';

const drawerWidth = '240px';
const SidebarContext = React.createContext();

const openedMixin = (theme) => ({
  width: drawerWidth,
  maxWidth: drawerWidth,
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  maxWidth: 'inherit',
  width: '100% !important',
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp:
  (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    maxWidth: 'inherit',
    width: '100%',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


/**
 * Represents the sidebar itself
 * @param {Object} props
 * @return {JSX} Jsx
 */
function TheDrawer() {
  const [open, setOpen] = React.useState(false);
  const [settingsDialog, setSettings] = React.useState(false);
  const {width} = useDimensions();

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <SidebarContext.Provider
      value={{settingsDialog, setSettings, open}}
    >
      <div className='maxWidth'>
        <Settings
          context={SidebarContext}
        />
        <Fab className='mobileOpen' onClick={handleDrawer} color={'primary'}>
          <ChevronRightIcon/>
        </Fab>
        <Box className="SideBar">
          <React.Fragment>
            <Drawer
              sx={{display: (!open && width < 800) ? 'none' : 'flex'}}
              variant='permanent'
              anchor={'left'}
              open={open}
            >
              <DrawerHeader className='greyBack'>
                <IconButton onClick={handleDrawer}>
                  {open ? <ChevronLeftIcon /> :
                    <ChevronRightIcon />}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <DrawerContent context={SidebarContext}/>
            </Drawer>
          </React.Fragment>
        </Box>
      </div>
    </SidebarContext.Provider>
  );
}

export default TheDrawer;
