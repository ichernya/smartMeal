import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import immagine from '../../assets/Cacio_E_Pepe.png';

/**
 * @return {object}}
 */
function MediaCard() {
  return (
    <Card sx={{maxWidth: 345}}>
      <CardMedia
        sx={{height: 165}}
        image={immagine}
        title="Weekly Schedule"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Weekly Schedule
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Personalize your weekly meal plan,
          find the meals that fit you the best
          and add them to your schedule.
          Choose your preferred diet with the filter tool and much more
        </Typography>
      </CardContent>
      <CardActions>
        <Link to='/login' className='center'>
          <Button size="small">Get started</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
