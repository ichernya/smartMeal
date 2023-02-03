/* eslint-disable no-unused-vars */
import React from 'react';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material/styles';
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
      console.log(json);
    });
};


// eslint-disable-next-line require-jsdoc
function Menu(props) {
  const {width, cardSize, selectedFood, setSelected, search} =
    React.useContext(props['HomeContext']);

  const [recipes, setMenu] = React.useState([]);
  const [updated, setUpdated] = React.useState(false);

  if (!updated) {
    setUpdated(true);
    getRecipes(setMenu);
  }

  const [chosenFood] = selectedFood || [null, null];
  const MARGIN = 7 * 16;
  const menuSize = React.useRef(width >= 1200 ? (width * .13) : 175);

  React.useEffect(() => {
    menuSize.current = width >= 1200 ? (width * .13) : 175;
  }, [width]);

  React.useEffect(() => {
    if (search) {
      searchRecipes(search, setMenu);
    }
  }, [search]);

  const clickItem = (item) => {
    if (chosenFood === item) {
      setSelected(null);
    } else {
      setSelected([item, 0]);
    }
  };

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
      >
        <Stack className='menu' spacing={0}>
          <Item
            style={{height: `${menuSize.current}px`}}
            className='menus'
          >
            <ImageList
              onScroll={handleTopScroll}
              ref={topMenu}
              className='menu hiddenScrollbar'
            >
              {new Array(Math.ceil(recipes.length / 2))
                .fill(0)
                .map((_, ind) => {
                  const item = recipes[(ind * 2)];
                  return (
                    <ImageListItem
                      className='margins'
                      onClick={() => clickItem(item)}
                      key={item['dishname'] + ind}
                    >
                      <img
                        src={item['img'] ?
                          `${item['img']}?w=248&fit=crop&auto=format` : ''}
                        srcSet={item['img'] ?
                          `${item['img']}` +
                            `?w=248&fit=crop&auto=format&dpr=2 2x` : ''
                        }
                        alt={item['dishname']}
                        loading="lazy"
                        id={chosenFood === item ? 'selected' : 'unselected'}
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
          <Item
            style={{height: `${menuSize.current}px`}}
            className='menus'
          >
            <ImageList
              onScroll={handleBotScroll}
              ref={botMenu}
              className='menu'
            >
              {new Array(Math.floor(recipes.length / 2))
                .fill(0)
                .map((_, ind) => {
                  const item = recipes[(ind * 2) + 1];
                  return (
                    <ImageListItem
                      className='margins'
                      onClick={() => clickItem(item)}
                      key={item['dishname'] + ind}
                    >
                      <img
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={
                          `${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`
                        }
                        alt={item['dishname']}
                        loading="lazy"
                        id={chosenFood === item ? 'selected' : 'unselected'}
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
        </Stack>
        <div className='stretch'/>
        <div id='btnList'>
          <Button
            variant="filled"
            disabled
            color="primary"
          >
            $MONEY
          </Button>
          <IconButton
            color="secondary"
          >
            <ShoppingCartIcon className='btn'/>
          </IconButton>
          <IconButton color="secondary">
            <FormatListBulletedIcon className='btn'/>
          </IconButton>
        </div>
      </Grid>
    </div>
  );
}

export default Menu;

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

