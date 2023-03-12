import React from 'react';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material/styles';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import {Link, useNavigate} from 'react-router-dom';
import Paper from '@mui/material/Paper';

import Tools from './Tools.jsx';
import './Menu.css';
import './Home.css';

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


// Grabs the recipes for the menu from the database
const getRecipes = (setMenu, history) => {
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const bearerToken = person ? person.accessToken : '';
  fetch('http://localhost:3010/v0/recipes', {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      // User timed out, so redirect back to login
      // Unsure if we're keeping this functionality
      /*
      if (response['status'] === 403) {
        alert('You have time out. Please log back in.');
        localStorage.removeItem('user');
        history('/login');
        return [];
      }
      */
      return response.json();
    })
    .then((json) => {
      setMenu([...json]);
    });
};

// Query for meals based on a search query
const searchRecipes = (query, setMenu) => {
  const item = localStorage.getItem('user');
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  const userId = user ? user.userid : '';
  fetch(`http://localhost:3010/v0/userSearch?userInput=${query}&userid=${userId}`, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      setMenu(json);
    });
};


/**
 * Represents the display for the meals the user can select from
 * @param {Object} props
 * @return {JSX} Jsx
 */
function Menu(props) {
  const history = useNavigate();
  const {
    width, selectedFood, setSelected, search,
    setAddMeal, addMeal,
  } = React.useContext(props['HomeContext']);

  // Represents the current recipes displayed on the menu
  const [recipes, setMenu] = React.useState([]);
  // number of rows for the menu display
  const ROWS = 2;

  React.useEffect(() => {
    getRecipes(setMenu, history);
  }, [history]);

  const [chosenFood] = selectedFood || [null, null];
  const menuSize = React.useRef(width >= 1200 ? (width * .14) : 175);

  React.useEffect(() => {
    menuSize.current = width >= 1200 ? (width * .14) : 175;
  }, [width]);

  React.useEffect(() => {
    // Update search state
    if (search) {
      searchRecipes(search, setMenu);
    }
  }, [search]);

  const clickItem = (item) => {
    // Choose item on click
    if (chosenFood === item) {
      setSelected(null);
    } else {
      setSelected([item, 0]);
    }
  };

  // Use references to move both menu sliders together
  const topMenu = React.useRef(0);
  const botMenu = React.useRef(0);

  const handleTopScroll = (scroll) => {
    botMenu.current.scrollLeft = scroll.target.scrollLeft;
  };

  const handleBotScroll = (scroll) => {
    topMenu.current.scrollLeft = scroll.target.scrollLeft;
  };

  return (
    <div>
      <Tools HomeContext={props['HomeContext']}/>
      <Grid
        container
        spacing={0}
        id='wrapping'
        className='greyBack'
      >
        <Stack className='menu' spacing={0}>
          {new Array(ROWS)
            .fill(0)
            .map((_, index) => {
              const scroller = index === 0 ? handleTopScroll : handleBotScroll;
              const scrollRef = index === 0 ? topMenu : botMenu;
              const menuClass = index === 0 ? 'hiddenScrollbar' : '';
              return (
                <Item
                  className='menus greyBack'
                  key={index}
                  style={{
                    height: `${menuSize.current}px`,
                    display: (recipes.length >= index + 1 ? '' : 'none'),
                  }}
                >
                  <ImageList
                    id={`menu${index}`}
                    onScroll={scroller}
                    ref={scrollRef}
                    className={'menu ' + menuClass}
                  >
                    {new Array(Math.ceil(recipes.length / 2))
                      .fill(0)
                      .map((_, ind) => {
                        const item = recipes[(ind * 2) + index];
                        if (!item) {
                          return <div key={ind + index}/>;
                        }

                        const image = item['imagedata'] ? item['imagedata'] :
                          require('../../assets/default.png');
                        return (
                          <ImageListItem
                            className='margins'
                            onClick={() => clickItem(item)}
                            key={item['dishname'] + ind + index}
                            id={item['dishname']}
                          >
                            <img
                              /* src={`${image}w=248&fit=crop&auto=format`}
                              srcSet={
                                `${image}?w=248&fit=crop&auto=format&dpr=2 2x`
                              } */
                              src={image}
                              alt={item['dishname']}
                              loading="lazy"
                              id={chosenFood === item ?
                                'selected' : 'unselected'}
                              style={{
                                width: `${menuSize.current}px`,
                                height: `${menuSize.current}px`,
                              }}
                            />
                            <ImageListItemBar
                              title={item['dishname']}
                              actionIcon={
                                <IconButton
                                  sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                  aria-label={`info about ${item['dishname']}`}
                                >
                                  <InfoIcon/>
                                </IconButton>
                              }
                            />
                          </ImageListItem>
                        );
                      })}
                  </ImageList>
                </Item>
              );
            })
          }
        </Stack>
        <div className='stretch'/>
        <div id='btnList'>
          <IconButton onClick={() => setAddMeal(!addMeal)} id='addMeal'>
            <AddIcon className='btn brownColor'/>
          </IconButton>
          <Link to='/checklist'>
            <IconButton id='checklist'>
              <FormatListBulletedIcon className='btn brownColor'/>
            </IconButton>
          </Link>
          <Link to='/mealplans'>
            <IconButton id='mealsPlans'>
              <LocalDiningIcon className='btn brownColor'/>
            </IconButton>
          </Link>
        </div>
      </Grid>
    </div>
  );
}

export default Menu;


