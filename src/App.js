import React,{useState,useEffect} from 'react'
import Header from './components/header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import {CssBaseline,Grid} from '@material-ui/core'
import {getPlacesData} from './api'
import { getweather } from './api'




const App = () => {

  const [places,setPlaces]=useState([]);

  const [coordinates,setCoordinates] = useState({});

  const [bounds, setBounds] = useState({});

  const [filteredplaces, setfilteredplaces] = useState([])

  const [child, setchild] = useState(null);

  const [loading, setloading] = useState(false);
  const [type,setType] = useState('restaurants');
  const [rating,setRating] = useState('');
  const [weatherdata, setweatherdata] = useState([])



  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude,longitude} })=>{
      setCoordinates({lat:latitude,lng:longitude});
    })
  },[]);

  useEffect(() => {
    const filteredplaces = places?.filter((places)=>places.rating > rating)

    setfilteredplaces(filteredplaces)
  

  }, [rating])
  


  useEffect(()=>{
    if(bounds){
        setloading(true)
        getweather(coordinates.lat,coordinates.lng)
          .then((data)=>setweatherdata(data))

        getPlacesData(type,bounds)
        .then((data)=>{
            setPlaces(data?.filter((places)=>places.name && places.num_reviews > 0));
            setfilteredplaces([])
            setloading(false)
        
      })
    }
  },[,type,coordinates,bounds]);


  return (
    <>
        <CssBaseline/>
        <Header setCoordinates={setCoordinates}/>
        <Grid container spacing={3} style={{width:'100%'}}>
            <Grid item xs={12} md={4}>
                <List places={filteredplaces.length ? filteredplaces : places}
                child={child}
                isloading={loading}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
                />
                

            </Grid>
            <Grid item xs={12} md={8}>
                <Map
                  setCoordinates={setCoordinates}
                  setBounds={setBounds}
                  coordinates={coordinates}
                  places={filteredplaces.length ? filteredplaces : places}
                  setchild={setchild}
                  weatherdata={weatherdata}
                />
            </Grid>
        </Grid>

    </>
  )
}

export default App