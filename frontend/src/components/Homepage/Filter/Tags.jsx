import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedOutlinedIcon
  from '@mui/icons-material/SentimentDissatisfiedOutlined';
import SentimentSatisfiedAltOutlinedIcon
  from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './Tags.css';

// eslint-disable-next-line require-jsdoc
function Toggles(props) {
  const {alignments, setAlignment, name, setFilter, filters, category} = props;

  const value = alignments[category][name];
  const control = {
    value: value,
    exclusive: true,
  };

  const updateTags = (name, newAlignment) => {
    if (filters[name] &&
      (newAlignment === 'default' || newAlignment === value)) {
      const copy = {...filters};
      delete copy[name];
      setFilter(copy);
    } else if (newAlignment !== value) {
      setFilter({...filters, [name]: newAlignment});
    }

    if (value === newAlignment) {
      setAlignment(
        {...alignments,
          [category]: {...alignments[category],
            [name]: 'default'},
        },
      );
    } else {
      setAlignment(
        {...alignments,
          [category]: {...alignments[category],
            [name]: newAlignment},
        },
      );
    }
  };

  return (
    <ToggleButtonGroup
      size="small"
      {...control}
      aria-label="Small sizes"
    >
      <ToggleButton
        value="no"
        onClick={() => updateTags(name, 'no')}
        style={{
          color: value === 'no' ? 'red' : '',
        }}
      >
        <SentimentDissatisfiedOutlinedIcon />
      </ToggleButton>
      <ToggleButton
        value="default"
        onClick={() => updateTags(name, 'default')}
      >
        <SentimentNeutralIcon/>
      </ToggleButton>
      <ToggleButton
        value="yes"
        onClick={() => updateTags(name, 'yes')}
        style={{
          color: value === 'yes' ? 'green' : '',
        }}
      >
        <SentimentSatisfiedAltOutlinedIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

// eslint-disable-next-line require-jsdoc
function Tags(props) {
  const {tagsDrawer, setDrawer, setFilter, filters,
    alignments, setAlignment,
  } = React.useContext(props['HomeContext']);


  // Represents whether the category is hidden or not
  // TODO should be a query to db later
  const [categoryView, setView] = React.useState({
    'tag1': true,
    'tag2': true,
  });

  const updateView = (category) => {
    // Swap the view
    setView({...categoryView, [category]: !categoryView[category]});
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawer(open);
  };

  const list = () => (
    <Box
      className='tagsList'
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      {Object.keys(categoryView).map((category) => {
        const allTags = Object.keys(alignments[category]);
        return (
          <Grid container spacing={1} className='tagsRow' key={category}>
            <Grid item className='category'>
              {category}
              <IconButton onClick={() => updateView(category)}>
                {categoryView[category] ?
                  <ExpandLessIcon/> :
                  <ExpandMoreIcon/>
                }
              </IconButton>
            </Grid>
            <Grid
              container
              spacing={1}
              style={{
                display: categoryView[category] ? '' : 'none',
              }}
            >
              {allTags.map((name) => {
                return (
                  <Grid container item spacing={0} key={name} className='row'>
                    <React.Fragment>
                      <Grid item xs={6}>
                        {name}
                      </Grid>
                      <Grid item xs={6} className='selections'>
                        <Toggles
                          setAlignment={setAlignment}
                          alignments={alignments}
                          name={name}
                          setFilter={setFilter}
                          filters={filters}
                          category={category}
                        />
                      </Grid>
                    </React.Fragment>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );

  return (
    <Drawer
      anchor={'right'}
      open={tagsDrawer}
      onClose={toggleDrawer(false)}
    >
      <div className='header'>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon/>
        </IconButton>
      </div>
      <Divider/>
      {list()}
    </Drawer>
  );
}

export default Tags;
