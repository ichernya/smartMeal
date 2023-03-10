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
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './Tags.css';

/**
 * Represents the page to select the filters/tags
 * @param {Object} props
 * @return {JSX} Jsx
 */
function Toggles(props) {
  const {alignments, setAlignment, name} = props;

  // Current alignment
  const value = alignments[name];
  const control = {
    value: value,
    exclusive: true,
  };

  const updateTags = (name, newAlignment) => {
    setAlignment({...alignments, [name]: newAlignment});
    // UPDATED IN DB TODO
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
        style={{
          color: value? '' : 'red',
        }}
      >
        <SentimentDissatisfiedOutlinedIcon />
      </ToggleButton>
      <ToggleButton
        value={true}
        onClick={() => updateTags(name, true)}
        style={{
          color: value ? 'green' : '',
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

  const setAllState = (choice) => {
    const copyAlign = {...alignments};
    for (const key of Object.keys(copyAlign)) {
      copyAlign[key] = choice;
    }
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
    >
      <div className='header'>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon/>
        </IconButton>
        <div className='stretch'/>
        <IconButton
          onClick={() => setAllState(false)}
        >
          <MoodBadIcon id='red'/>
        </IconButton>
        <IconButton
          onClick={() => setAllState(true)}
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
