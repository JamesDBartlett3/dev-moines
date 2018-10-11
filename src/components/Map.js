import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import * as gMapsAPI from '../APIs/GoogleMapsAPI'

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))


export default class Map extends Component {

    render() {
        return (
            <MyMapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&client=gme-nianticinc"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `calc(100vh - calc(18px + 2vmin))` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}
