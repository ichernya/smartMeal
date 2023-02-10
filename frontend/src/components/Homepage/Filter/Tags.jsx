import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import CheckIcon from '@mui/icons-material/Check';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';


// eslint-disable-next-line require-jsdoc
function Toggles(props) {
  const {alignments, setAlignment, name, setTags, tags} = props;

  const state = alignments[name];
  const control = {
    value: state,
    exclusive: true,
  };

  const updateTags = (name, newAlignment) => {
    if (tags[name] &&
      (newAlignment === 'default' || newAlignment === alignments[name])) {
      const copy = {...tags};
      delete copy[name];
      setTags(copy);
    } else if (newAlignment !== alignments[name]) {
      setTags({...tags, [name]: newAlignment});
    }

    if (alignments[name] === newAlignment) {
      setAlignment({...alignments, [name]: 'default'});
    } else {
      setAlignment({...alignments, [name]: newAlignment});
    }
  };

  return (
    <ToggleButtonGroup size="small" {...control} aria-label="Small sizes">
      <ToggleButton
        value="no"
        onClick={() => updateTags(name, 'no')}
        style={{
          color: state === 'no' ? 'red' : '',
        }}
      >
        <DoNotDisturbIcon />
      </ToggleButton>
      <ToggleButton
        value="default"
        onClick={() => updateTags(name, 'default')}
      >
        <FormatAlignCenterIcon />
      </ToggleButton>
      <ToggleButton
        value="yes"
        onClick={() => updateTags(name, 'yes')}
        style={{
          color: state === 'yes' ? 'green' : '',
        }}
      >
        <CheckIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

// eslint-disable-next-line require-jsdoc
function Tags(props) {
  const {tagsDrawer, setDrawer, setTags, tags,
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

  const list = () => (
    <Box
      sx={{width: 250}}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >

      <Grid container spacing={1}>
        {Object.keys(alignments).map((name) => (
          <Grid container item spacing={0}>
            <React.Fragment>
              <Grid Item xs={6}>
                {name}
              </Grid>
              <Grid Item xs={6}>
                <Toggles
                  setAlignment={setAlignment}
                  alignments={alignments}
                  name={name}
                  setTags={setTags}
                  tags={tags}
                />
              </Grid>
            </React.Fragment>
          </Grid>

        ))}
      </Grid>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={'right'}
          open={tagsDrawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default Tags;
