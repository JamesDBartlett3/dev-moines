// This component is modeled after the one Forrest Walker demonstrated in his
// tutorial video series on YouTube (https://goo.gl/XrrXg9). Thanks, Forrest!

import React, {Component} from 'react'
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

// Split input into comma-delimited array
const split = s => {
    return (s.split(','))
}

// Google Maps Custom Theme JSON
// courtesy of Google (https://mapstyle.withgoogle.com/)
const mapStyle = [
{
	"elementType": "geometry",
	"stylers": [
		{
			"color": "#1d2c4d"
		}
	]
}, {
	"elementType": "labels.text.fill",
	"stylers": [
		{
			"color": "#8ec3b9"
		}
	]
}, {
	"elementType": "labels.text.stroke",
	"stylers": [
		{
			"color": "#1a3646"
		}
	]
}, {
	"featureType": "administrative.country",
	"elementType": "geometry.stroke",
	"stylers": [
		{
			"color": "#4b6878"
		}
	]
}, {
	"featureType": "administrative.land_parcel",
	"elementType": "labels.text.fill",
	"stylers": [
		{
			"color": "#64779e"
		}
	]
}, {
	"featureType": "administrative.province",
	"elementType": "geometry.stroke",
	"stylers": [
		{
			"color": "#4b6878"
		}
	]
}, {
	"featureType": "landscape.man_made",
	"elementType": "geometry.stroke",
	"stylers": [
		{
			"color": "#334e87"
		}
	]
}, {
	"featureType": "landscape.natural",
	"elementType": "geometry",
	"stylers": [
		{
			"color": "#023e58"
		}
	]
}, {
	"featureType": "poi",
	"elementType": "geometry",
	"stylers": [
		{
			"color": "#283d6a"
		}
	]
}, {
	"featureType": "poi",
	"elementType": "labels.text",
	"stylers": [
		{
			"visibility": "off"
		}
	]
}, {
	"featureType": "poi",
	"elementType": "labels.text.fill",
	"stylers": [
		{
			"color": "#6f9ba5"
		}
	]
}, {
	"featureType": "poi",
	"elementType": "labels.text.stroke",
	"stylers": [
		{
			"color": "#1d2c4d"
		}
	]
}, {
	"featureType": "poi.business",
	"stylers": [
		{
			"visibility": "off"
		}
	]
}, {
	"featureType": "poi.park",
	"elementType": "geometry.fill",
	"stylers": [
		{
			"color": "#023e58"
		}
	]
}, {
	"featureType": "poi.park",
	"elementType": "labels.text.fill",
	"stylers": [
		{
			"color": "#3C7680"
		}
	]
}, {
	"featureType": "road",
	"elementType": "geometry",
	"stylers": [
		{
			"color": "#304a7d"
		}
	]
}, {
	"featureType": "road",
	"elementType": "labels.icon",
	"stylers": [
		{
			"visibility": "off"
		}
	]
}, {
	"featureType": "road",
	"elementType": "labels.text.fill",
	"stylers": [
		{
			"color": "#98a5be"
		}
	]
}, {
	"featureType": "road",
	"elementType": "labels.text.stroke",
	"stylers": [
		{
			"color": "#1d2c4d"
		}
	]
}, {
	"featureType": "road.highway",
	"elementType": "geometry",
	"stylers": [
		{
			"color": "#2c6675"
		}
	]
}, {
	"featureType": "road.highway",
	"elementType": "geometry.stroke",
	"stylers": [
		{
			"color": "#255763"
		}
	]
}, {
	"featureType": "road.highway",
	"elementType": "labels.text.fill",
	"stylers": [
		{
			"color": "#b0d5ce"
		}
	]
}, {
	"featureType": "road.highway",
	"elementType": "labels.text.stroke",
	"stylers": [
		{
			"color": "#023e58"
		}
	]
}, {
	"featureType": "transit",
	"stylers": [
		{
			"visibility": "off"
		}
	]
}, {
	"featureType": "transit",
	"elementType": "labels.text.fill",
	"stylers": [
		{
			"color": "#98a5be"
		}
	]
}, {
	"featureType": "transit",
	"elementType": "labels.text.stroke",
	"stylers": [
		{
			"color": "#1d2c4d"
		}
	]
}, {
	"featureType": "transit.line",
	"elementType": "geometry.fill",
	"stylers": [
		{
			"color": "#283d6a"
		}
	]
}, {
	"featureType": "transit.station",
	"elementType": "geometry",
	"stylers": [
		{
			"color": "#3a4762"
		}
	]
}, {
	"featureType": "water",
	"elementType": "geometry",
	"stylers": [
		{
			"color": "#0e1626"
		}
	]
}, {
	"featureType": "water",
	"elementType": "labels.text.fill",
	"stylers": [
		{
			"color": "#4e6d70"
		}
	]
}]


const MyMapComponent = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
            // a few custom UI options to enhance the UX
            options={{
                styles: mapStyle,
                scrollwheel: false,
                mapTypeControl: false,
                fullscreenControl: false,
                streetViewControl: false,
                backgroundColor: 'rgb(39, 48, 78)',
            }}
            // when user clicks anywhere on the map other than
            // a marker, fire the handleMapClick function from App
            onClick={props.handleMapClick}
            defaultZoom={11}
            zoom={props.zoom}
            defaultCenter={props.center}
            center={props.center}
        >
        {props.markers &&
            props.markers
                // map over all the markers, filtering for
                // those flagged as visible.
                .filter(marker => marker.isVisible)
                .map((marker, index) => (

                // Render the markers that are visible
                <Marker
                    key={index} {...props}
                    // set each marker's position to its latlng coordinates
                    position={{ lat: marker.lat, lng: marker.lng }}
                    // when user clicks a marker, fire the
                    // handleMarkerClick function from App
                    onClick={() => props.handleMarkerClick(marker)}
                    // Set animation style: The currently selected marker
                    // gets the bounce animation(1), and all others get
                    // the drop animation(2).
                    animation={marker.id === props.selected.id ? 1 : 2}
                >

                    {marker.isOpen && (
                        // If a marker is flagged as open, it should display
                        // its InfoWindow, containing additional information
                        // about the job listing.
                        <InfoWindow id='info-window'>
                            <div>
                                <img id='info-window-img'
                                    src={props.selected.photo}
                                    alt={props.selected.company}
                                />
                                <h2>{props.selected.position}</h2>
                                <h3>
                                    {/* use split() to break job address into
                                    a comma-delimited array, then display
                                    street address on first line, followed by
                                    city, state, and zip on second line */}
                                    {split(props.selected.address)[0]}
                                    <br/>
                                    {split(props.selected.address)[1]},
                                    {split(props.selected.address)[2]}
                                </h3>
                                <h3>{props.selected.phone}</h3>
                                <h3>
                                    <a
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        href={props.selected.website}
                                    >
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



// The Map Class Component
export default class Map extends Component {

    render() {

        return (
            <MyMapComponent
                {...this.props}
                isMarkerShown
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `calc(100vh - calc(18px + 5vmin))` }} />}
                mapElement={<div style={{ height: `100%`}} />}
            />
        )
    }
}
