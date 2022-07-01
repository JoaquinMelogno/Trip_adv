import React from 'react'
import './Styles.js'
import GoogleMapReact from 'google-map-react'
import { Paper,Typography,useMediaQuery } from '@material-ui/core'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Rating } from '@mui/material';

import useStyles from './Styles.js'
const Map = ({setCoordinates,setBounds,coordinates,places,setchild,weatherdata}) => {
  const classes = useStyles();
  const isdesktop = useMediaQuery('(min-width:600px)')



  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact 
      bootstrapURLKeys={{ key: 'AIzaSyCBV6qveLnE9GgLy64rTbFrh4XkslkEKMA'}}
      defaultCenter={coordinates}
      center={coordinates}
      defaultZoom={14}
      margin={[50,50,50,50]}
      options={''}
      onChange={(e) => {
        setCoordinates({lat: e.center.lat, lng: e.center.lng});
        setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
    }}
      onChildClick={(child)=>setchild(child)}
      >
        {places?.map((place,i)=>(
          <div
            className={classes.markerContainer}
            lat={place.latitude}
            lng={place.longitude}
            key={i}
          >
            {!isdesktop?(
              <LocationOnIcon color='primary' fontSize='large'/>
            ):(
              <Paper elevation={3} className={classes.paper}>
                <Typography className={classes.typography} variant='subtitle2'>
                  {place.name}
                </Typography>

                <img
                  className={classes.pointer}
                  src={place.photo ? place.photo.images.large.url : ''}
                  alt={place.name}
                />
                <Rating size='small' value={Number(place.rating)} readOnly/>
              </Paper>

            )
          }


          </div>
        ))}
        {weatherdata?.list?.map((data,i)=>(
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png}`} alt="" />
          </div>
        ))}

      </GoogleMapReact>


    </div>
  );
}

export default Map