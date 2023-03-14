import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SentimentDissatisfiedOutlinedIcon
  from '@mui/icons-material/SentimentDissatisfiedOutlined';
import SentimentSatisfiedAltOutlinedIcon
  from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon
  from '@mui/icons-material/SentimentVerySatisfied';
import CloseIcon from '@mui/icons-material/Close';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

import './Tags.css';

// Updates a diet filter
const updateDietFilter = (diet, value) => {
  const item = localStorage.getItem('user');
  const person = JSON.parse(item);
  const bearerToken = person ? person.accessToken : '';
  const userId = person ? person.userid : '';

  const body = {
    'mealsid': userId,
    'dietTag': diet,
    'newValue': value,
  };

  fetch(`http://localhost:3010/v0/diets`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  });
};

/**
 * Represents the page to select the filters/tags
 * @param {Object} props
 * @return {JSX} Jsx
 */
function Toggles(props) {
  const {alignments, setAlignment, name,
    setChange} = props;

  // Current alignment
  const value = alignments[name];
  const control = {
    value: value,
    exclusive: true,
  };

  const updateTags = (name, newAlignment) => {
    // Update alignment for a tag
    setChange(true);
    updateDietFilter(name, newAlignment);
    setAlignment({...alignments, [name]: newAlignment});
  };

  return (
    <ToggleButtonGroup
      size="small"
      {...control}
      aria-label="Small sizes"
    >
      <ToggleButton
        value={false}
        onClick={() => updateTags(name, false)}
        id={`${name}False`}
        style={{
          color: value? '' : 'red',
        }}
      >
        <SentimentDissatisfiedOutlinedIcon />
      </ToggleButton>
      <ToggleButton
        value={true}
        onClick={() => updateTags(name, true)}
        id={`${name}True`}
        style={{
          color: value ? 'green' : '',
        }}
      >
        <SentimentSatisfiedAltOutlinedIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

/**
 * Represents the tags
 * @param {Object} props
 * @return {JSX} Jsx
 */
function Tags(props) {
  const {tagsDrawer, setDrawer, setFilter, filters,
    alignments, setAlignment, setChange,
  } = React.useContext(props['HomeContext']);


  const toggleDrawer = (open) => (event) => {
    setDrawer(open);
  };

  const setAllState = (choice) => {
    // Sets all alignments to true/false
    const copyAlign = {...alignments};
    for (const key of Object.keys(copyAlign)) {
      copyAlign[key] = choice;
      updateDietFilter(key, choice);
    }
    setChange(true);
    setAlignment(copyAlign);
  };


  const list = () => (
    <Box
      className='tagsList'
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <Grid
        container
        spacing={1}
        className='tagsRow'
      >
        {Object.keys(alignments).map((name) => {
          return (
            <Grid container item spacing={0} key={name} className='row'>
              <React.Fragment>
                <Grid item xs={6}>
                  {name}
                </Grid>
                <Grid item xs={6} className='selections'>
                  <Toggles
                    setAlignment={setAlignment}
                    setChange={setChange}
                    alignments={alignments}
                    name={name}
                    setFilter={setFilter}
                    filters={filters}
                  />
                </Grid>
              </React.Fragment>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );

  return (
    <Drawer
      anchor={'right'}
      open={tagsDrawer}
      onClose={toggleDrawer(false)}
      id='tagsDrawer'
    >
      <div className='header'>
        <IconButton onClick={toggleDrawer(false)} id='closeTags'>
          <CloseIcon/>
        </IconButton>
        <div className='stretch'/>
        <IconButton
          onClick={() => setAllState(false)}
          id='allFalse'
        >
          <MoodBadIcon id='red'/>
        </IconButton>
        <IconButton
          onClick={() => setAllState(true)}
          id='allTrue'
        >
          <SentimentVerySatisfiedIcon id='green'/>
        </IconButton>

      </div>
      <Divider/>
      {list()}
    </Drawer>
  );
}

export default Tags;
