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

import Tools from './Tools.jsx';
import './Menu.css';
import './Home.css';

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


// eslint-disable-next-line require-jsdoc
function Menu(props) {
  const {width, cardSize, selectedFood, setSelected} =
    React.useContext(props['HomeContext']);

  const [chosenFood] = selectedFood || [null, null];
  const MARGIN = 7 * 16;
  const menuSize = React.useRef(width >= 1200 ? (width * .18) : 175);

  React.useEffect(() => {
    menuSize.current = width >= 1200 ? (width * .18) : 175;
  }, [width]);

  const clickItem = (item) => {
    if (chosenFood === item) {
      setSelected(null);
    } else {
      setSelected([item, 0]);
    }
  };

  return (
    <div>
      <Tools HomeContext={props['HomeContext']}/>
      <Grid
        container
        spacing={0}
        id='wrapping'
      >
        <ImageList className='menu'
          style={{
            marginLeft: (width - (cardSize.current * 7) - MARGIN > 0 ?
              `${width - (cardSize.current * 7) - MARGIN}px` : '15px'),
          }}
        >
          {itemData.map((item, ind) => (
            <ImageListItem
              className='margins'
              onClick={() => clickItem(item)}
              key={item['dishname'] + ind}
            >
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
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
          ))}
        </ImageList>

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
