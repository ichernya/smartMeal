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
 * @return {object}
 */
function MediaCard() {
  return (
    <Card sx={{maxWidth: 345}}>
      <CardMedia
        sx={{height: 165}}
        image={immagine}
        title="You recipes"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          You recipes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You can create any recipe you want adding a title, an image
          and a list of ingredients.
          Personalize your healty recipes and share them with the world!
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
