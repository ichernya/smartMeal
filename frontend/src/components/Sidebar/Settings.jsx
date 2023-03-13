/* eslint-disable no-unused-vars */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

/**
 * Represents the settings popup
 * @param {Object} props
 * @return {JSX} Jsx
 */
function Settings(props) {
  const {setSettings, settingsDialog} = React.useContext(props['context']);
  // Represents whether we need to update the database for the users allergies
  // depends on whether there has been change registered
  const [needSave, setSave] = React.useState(false);
  // Represents the state of the allergies
  // TODO db querty
  const [allergies, setAllergies] = React.useState({
    'some allergy': false,
    'other': false,
    'some': true,
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setSettings(false);
    // db query to update things TODO
  };

  const updateAllergies = (allergy) => {
    setAllergies({...allergies, [allergy]: !allergies[allergy]});
    setSave(true);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={settingsDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Use Google\'s location service?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Allergies are fun :)
          </DialogContentText>
          <FormGroup>
            {Object.keys(allergies).map((allergy) => (
              <FormControlLabel
                id={allergy}
                key={allergy}
                control={<Switch checked={allergies[allergy]} />}
                label={allergy}
                onChange={() => updateAllergies(allergy)}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus id='closeSetting'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Settings;
