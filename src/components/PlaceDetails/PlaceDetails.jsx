import React from 'react'
import './Styles.js'
import { Box,Typography,Button,Card,CardMedia,CardContent,CardActions,Chip } from '@material-ui/core'
import {BiMapPin} from 'react-icons/bi'
import {BsFillTelephoneFill} from 'react-icons/bs'
import { Rating } from '@mui/material'


import useStyles from './Styles';
import { ClassNames } from '@emotion/react'

const PlaceDetails = ({place, selected, refProp}) => {
  const classes = useStyles();

  if(selected) refProp?.current?.scrollIntoView({ behavior:"smooth", block:"start" });

  return (
    <Card elevation={6}>
      <CardMedia
        style={{height:350}}
        image={place.photo?place.photo.images.large.url : ''}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5'>{place.name}</Typography>
        <Box display='flex' justifyContent='space-between'>
          <Rating  value={Number(place.rating)} color='golden' readOnly/>
          <Typography gutterBottom variant='subtitle1'>out of {place.num_reviews} reviews</Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Price</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
        </Box>
        {place?.awards?.map((award,i)=>(
          <Box my={1} key={i} display='flex' justifyContent='space-between' alignItems='center'>
              <img src={award.images.small} alt={award.display_name}/>
              <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
          </Box>
        ))}

        {place?.cuisine?.map(({name})=>(
          <Chip key={name} size='small' label={name} className={ClassNames.chip} />
        ))}
        {place?.address&&(
          <Typography gutterBottom variant='body2' color='textSecondary' className={classes.subtitle}>
            <BiMapPin/> {place.address}
          </Typography>
        )}
        {place?.phone&&(
          <Typography gutterBottom variant='body2' color='textSecondary' className={classes.subtitle}>
            <BiMapPin/> {place.phone}
          </Typography>
        )}

        <CardActions>
          <Button size='small' color='primary' onClick={()=>window.open(place.web_url,'_blank')}>
            Trip Advisor
          </Button>
          <Button size='small' color='primary' onClick={()=>window.open(place.website,'_blank')}>
            WebSite
          </Button>
          
        </CardActions>
      </CardContent>

    </Card>
  );
}

export default PlaceDetails