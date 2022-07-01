import React,{useState,useEffect,createRef }from 'react'
import { CircularProgress,Grid,Typography,InputLabel,MenuItem,FormControl,Select, Input} from '@material-ui/core'
import PlaceDetails from '../PlaceDetails/PlaceDetails'
import useStyles from './Styles'



const List = ({places,child,loading,type,setType,setRating,rating}) => {
  const classes = useStyles();

  const [elRefs, setelRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, i)=> elRefs[i] || createRef());
    setelRefs(refs);

  }, [places])
  
  return (
    <div className={classes.container}>
      <Typography variant='h4'>Restaurants,Hotels & Attractions around you</Typography>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress size='5rem'/>
        </div>
      ) : (
        <>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
          <Select value={type} onChange={(e)=>setType(e.target.value)}>
              <MenuItem value='restaurants'>Restaurants</MenuItem>
              <MenuItem value='hotels'>Hotels</MenuItem>
              <MenuItem value='attractions'>Attractions</MenuItem>
          </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
          <Select value={rating} onChange={(e)=>setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4.5}>Above 4.0</MenuItem>
          </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {places?.map((places,i)=>(
          <Grid  ref={elRefs[i]} item key={i} xs={12}>
              <PlaceDetails 
                place={places}
                selected={Number(child) === i}
                refProp={elRefs[i]}
              />
          </Grid>
        ))}

      </Grid>
      </>
  )}

    </div>
  )
}

export default List