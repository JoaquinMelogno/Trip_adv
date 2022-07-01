import React,{useState} from 'react'
import './Styles.js'
import { Autocomplete } from '@react-google-maps/api';
import { AppBar,Toolbar,Typography,Box } from '@material-ui/core'
import InputBase from '@mui/material/InputBase';
import useStyles from './Styles';

const Header = ({setCoordinates}) => {
    const classes = useStyles();
    const [autocomplete, setAutocomplete] = useState('')

    const onLoad = (autoC)=>setAutocomplete(autoC);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCoordinates({lat,lng});
    }

  return (
    <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
                <Typography variant='h5' className={classes.title}>
                    Travel Advisor
                </Typography>
            <Box>
                <Typography variant='h6' className={classes.title}>
                    Explore New Places 
                </Typography>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <div className={classes.search}>
                        <InputBase placeholder='Search...'classes={{root:classes.inputRoot,input:classes.inputInput}}/>
                    </div>
                </Autocomplete>
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header