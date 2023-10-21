import axios from "axios";
 
const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'
  
export const getPlacesData = async (sw, ne) => {
    try {
        //request
        const {data: { data }}= await axios.get(URL, {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
             
            },
            headers: {
              'X-RapidAPI-Key': '770c89fa98msh69b30806e590062p1ce4c1jsn8db7dd084555',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          });

        return data;
    } catch(error) {
        console.log(error)
    }
}