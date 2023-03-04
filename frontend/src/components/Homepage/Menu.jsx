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
import {Link} from 'react-router-dom';
import Paper from '@mui/material/Paper';

import Tools from './Tools.jsx';
import './Menu.css';
import './Home.css';

/*
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    dishname: 'Breakfast',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    dishname: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    dishname: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    dishname: 'Coffee',
    author: '@nolanissac',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    dishname: 'Hats',
    author: '@hjrc33',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    dishname: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    dishname: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    dishname: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    dishname: 'Mushrooms',
    author: '@silverdalex',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    dishname: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    dishname: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    dishname: 'Bike',
    author: '@southside_customs',
    cols: 2,
  },
];
*/

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


// Grabs the recipes for the menu from the database
const getRecipes = (setMenu) => {
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const bearerToken = person ? person.accessToken : '';
  fetch('http://localhost:3010/v0/recipes', {
  // fetch('http://localhost:3010/v0/mealWeek?mealsid=1&dayof=2023-01-19', {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
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
  fetch(`http://localhost:3010/v0/userSearch?userInput=${query}`, {
    method: 'get',
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


// eslint-disable-next-line require-jsdoc
function Menu(props) {
  const {
    width, selectedFood, setSelected, search,
    setAddMeal, addMeal,
  } = React.useContext(props['HomeContext']);

  // Represents the current recipes displayed on the menu
  const [recipes, setMenu] = React.useState([]);
  // number of rows for the menu display
  const ROWS = 2;

  React.useEffect(() => {
    getRecipes(setMenu);
    // TODO setMenu([...itemData]);
  }, []);

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
                    onScroll={scroller}
                    ref={scrollRef}
                    className={'menu ' + menuClass}
                  >
                    {new Array(Math.ceil(recipes.length / 2))
                      .fill(0)
                      .map((_, ind) => {
                        const item = recipes[(ind * 2) + index];
                        if (!item) {
                          return <div/>;
                        }

                        const image = item['imageData'] ? item['imageData'] :
                          require('../../assets/ass.png');
                        return (
                          <ImageListItem
                            className='margins'
                            onClick={() => clickItem(item)}
                            key={item['dishname'] + ind}
                          >
                            <img
                              src={`${image}w=248&fit=crop&auto=format`}
                              srcSet={
                                `${image}?w=248&fit=crop&auto=format&dpr=2 2x`
                              }
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
          <IconButton onClick={() => setAddMeal(!addMeal)}>
            <AddIcon className='btn brownColor'/>
          </IconButton>
          <Link to='/checklist'>
            <IconButton>
              <FormatListBulletedIcon className='btn brownColor'/>
            </IconButton>
          </Link>
          <Link to='/mealplans'>
            <IconButton>
              <LocalDiningIcon className='btn brownColor'/>
            </IconButton>
          </Link>
        </div>
      </Grid>
    </div>
  );
}

export default Menu;


