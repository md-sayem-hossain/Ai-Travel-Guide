import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles.js'
/*import { GoogleMap } from '@react-google-maps/api';*/

const Map = ({setCoordinates, setBounds, coordinates}) => {
    const classes = useStyles();
    const isMoblie = useMediaQuery('(min-width:600px)');

    return(
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key:'AIzaSyC_94BWWYHs2Y_0YRFBNmc8OU7mkrLIxFA'}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={(e) => {
                    
                    setCoordinates({lat: e.center.lat, lng: e.center.lng});
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                }} /* important when you change the map */
                onChildClick={''}
            >
            </GoogleMapReact>
        </div>
        );
}
export default Map;