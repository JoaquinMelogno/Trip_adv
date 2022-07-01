import axios from 'axios';


export const getPlacesData = async(type,bounds)=>{
  const {sw,ne} = bounds
    try {
        const {data:{data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            'X-RapidAPI-Key': 'c87c66824emsh1f70d177522a231p1b64f8jsn14fb6201d1c7',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }
        });

        return data;

    } catch (error) {
        console.log(error)
    }
}


export const getweather = async(lat,lng)=>{
  try {
    const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/weather',{
      params: {
        lat: lat,
        lon: lng,
      },
      headers: {
        'X-RapidAPI-Key': 'b6090934a7msh0a1f2e041367302p133c47jsn95c6c3b35ae7',
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
      }
    });

    return data;

} catch (error) {
    console.log(error)
}
}

