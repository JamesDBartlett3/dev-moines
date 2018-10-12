

import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

const MyMapComponent = withScriptjs(
    withGoogleMap(props => (

        <GoogleMap onClick={props.handleMapClick}
            defaultZoom={12}
            zoom={props.zoom}
            defaultCenter={props.center}
            center={props.center}
        >
        {props.markers &&
            props.markers
                .filter(marker => marker.isVisible)
                .map((marker,index) => (
                <Marker key={index}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => props.handleMarkerClick(marker)}
                >

                    {marker.isOpen && (

                        <InfoWindow>
                            <div>
                                <h1>{props.selected.company}</h1>
                                <img className='info-window-img'
                                    src={props.selected.photo}
                                    alt={props.selected.company}
                                />
                                <h2>{props.selected.position}</h2>
                                <h3>{props.selected.address.split(',')[0]}
                                    <br/>
                                    {props.selected.address.split(',')[1]},
                                    {props.selected.address.split(',')[2]}
                                </h3>
                                <h3>{props.selected.phone}</h3>
                                <h3>
                                    <a href={props.selected.website}>
                                        Website
                                    </a>
                                </h3>
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
            ))}
        </GoogleMap>
    ))
)




export default class Map extends Component {

    render() {

        return (
            <MyMapComponent
                {...this.props}
                isMarkerShown
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `calc(100vh - calc(18px + 5vmin))` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}
