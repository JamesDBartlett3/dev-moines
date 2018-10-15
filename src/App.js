/*============================================================================\
| Dev Moines --- React-Based Job Search App for Devs & IT Pros in Des Moines  |
|-----------------------------------------------------------------------------|
| Acknowledgments:                                                            |
|                                                                             |
| Elharony for publishing the super-helpful video series on YouTube called    |
| "Udacity | Neighborhood Map". Thanks for making a complex task so simple!   |
| Reference: https://goo.gl/gA7U2E                                            |
|                                                                             |
| Forrest Walker on YouTube (https://goo.gl/XrrXg9) for the comprehensive     |
| walkthrough video series on P7. I finally learned how state & props work!   |
|                                                                             |
| Rodrick Bloomfield @GitHub (https://github.com/bloom305) for demonstrating  |
| many different ways to approach this project. Finding the commonalities     |
| between them made it a LOT easier to grasp how everything fits together.    |
| |
| |
\___________________________________________________________________________*/


/*============================ <Dependencies> ===============================\
\---------------------------------------------------------------------------*/

// External Theme & UI Libraries
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import ResponsiveDrawer from './components/ResponsiveDrawer'

// APIs
import * as gMapsAPI from './APIs/GoogleMapsAPI'
import * as myJsonAPI from './APIs/MyJsonAPI'

// 3rd Party JS Libraries
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

// Basic React Deps
import './App.css'
import React, {Component} from 'react'

/*---------------------------------------------------------------------------\
\============================== </Dependencies> ============================*/


/*================================== <App> ==================================\
\---------------------------------------------------------------------------*/

// set up easy access to the APIs used in this app
const APIs = {

    // Google Maps
    gMaps: {
        // using the `params` attribute allows us to string multiple query
        // parameters together later on without manual concatenation
        params: new URLSearchParams({
            /* To use your own API key, uncomment the line below this one... */
            // key: `${gMapsAPI.key}`,

            /* ...then comment out the line below this one...*/
            client: `${gMapsAPI.client}`,

            /* ...then open APIs/GoogleMapsApi.js & follow its instructions. */
        })
    },

    // MyJSON.com
    myJson: {
        id:`${myJsonAPI.id}`,
        url:`${myJsonAPI.url}`
    }
}

// Preemptively silence some annoying syntax deprecation warning messages
const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        suppressDeprecationWarnings: true
    }
})

// App Component
export default class App extends Component {
    constructor() {
        super()
        // Initialize state for the app
        this.state = {
            jobs: [],
            filterInput: '',
            markers: [],
            center: {
                lat: gMapsAPI.center.lat,
                lng: gMapsAPI.center.lng
            },
            zoom: 11,
            googleMapURL: `${gMapsAPI.url}${APIs.gMaps.params}`,
            selected: {
                id: '',
                company: '',
                position: '',
                photo: '',
                address:'',
                phone: '',
                website: ''
            },
            error: {

            }
        }
    }

    // Use `toastify` to render toast-style message dialogs
    handleError = (error) => toast.error(
        <div style={{color: 'black', fontWeight: 'bold'}}>
            <span role="img" aria-label="error">‼ </span>
            {error}
            <span role="img" aria-label="error"> ‼</span>
        </div>
    )
    handleOffline = () => toast.warning(
        <div style={{color: 'black', fontWeight: 'bold'}}>
            <span role="img" aria-label="offline">⦸ </span>
            Offline Message
            <span role="img" aria-label="offline"> ⦸</span>
        </div>
    )
    handleCached = () => toast.success(
        <div style={{color: 'black', fontWeight: 'bold'}}>
            <span role="img" aria-label="check">✓ </span>
            App successfully cached!
            <span role="img" aria-label="check"> ✓</span><br />
            <span role="img" aria-label="globe-western-hemisphere">🌎 </span>
             Offline mode now available.
            <span role="img" aria-label="globe-eastern-hemisphere"> 🌍</span>
        </div>
    )

    // Function to close all currently-open markers on the map
    closeAllMarkers = () => {
        // map through all of the markers in state and set as `markers`
        const markers = this.state.markers.map(marker => {
            // on each marker, change its `isOpen` to false
            marker.isOpen = false
            // then return it
            return marker
        })
        // Once all markers have been closed, update the state to match.
        this.setState({markers: Object.assign(this.state.markers, markers)})
    }

    // Function to handle when user clicks on a map marker.
    handleMarkerClick = marker => {

        // First, close any remaining open markers
        this.closeAllMarkers()

        // set the current marker's `isOpen` to true
        marker.isOpen = true

        // create `selected` variable and set it to the job object whose
        // id value matches that of the clicked marker
        const selected = this.state.jobs[marker.id]

        // update state of markers, selected, and center
        this.setState({
            markers: Object.assign(this.state.markers, marker),
            selected: Object.assign(selected),
            center: Object.assign({
                // Tell the map to center itself just a hair to the North
                // of the marker's actual coordinates, to ensure enough
                // screen space is left for the InfoWindow to display
                lat: (selected.latlng[0] + 0.0055),
                lng: selected.latlng[1]
            })})
        setTimeout(() => {
            this.setState({zoom: 15})
        },1)

    }

    // function to handle when a user clicks anywhere on the map
    // other than a marker
    handleMapClick = () => {
        // close any markers that are still open
        this.closeAllMarkers()
        // return state back to "nothing selected"
        this.setState({
            center: gMapsAPI.center,
            zoom: 11,
            selected: {id: ''}
        })
    }

    // Helper function for pulling state updates up from
    // child components, so that the updated state may be
    // used to update other components.
    liftState = (o) => {
        this.setState(o)
    }

    // Fire this event when the App mounts successfully
    componentDidMount() {
        // Use axios to get json data from MyJsonAPI
        axios.get(`${APIs.myJson.url}${APIs.myJson.id}`)
        // then feed the results into jobs variable
        .then(res => {
            const jobs = res.data.jobs
            const center = gMapsAPI.center
            // create complete list of map markers from json data
            const markers = jobs.map(job => {
                return {
                    lat: job.latlng[0],
                    lng: job.latlng[1],
                    isOpen: false,
                    isVisible: true,
                    id: job.id
                }
            })
            // set the App state to reflect all of
            // this freshly acquired data
            this.setState({jobs,markers,center})
        })

        // If an error occurred, collect the error message(s)
        .catch(error => {
            // and save it in this.state.error
            this.handleError(error)
        })

    }
    render() {
        return (
        <div className="App">
            {/*
            <button onClick={this.handleError}>Test Error</button>
            <button onClick={this.handleOffline}>Test Offline</button>
            <button onClick={this.handleCached}>Test Cached</button>
             */}

            {/* Render the ResponsiveDrawer component inside of
                a MuiThemeProvider component. Pass App state, handleX, and
                liftState functions down as props to children components */}
            <MuiThemeProvider theme={theme}>
                <ResponsiveDrawer
                    {...this.state}
                    handleFilterChange={this.handleFilterChange}
                    handleMarkerClick={this.handleMarkerClick}
                    // closeAllMarkers={this.closeAllMarkers}
                    handleMapClick={this.handleMapClick}
                    liftState={this.liftState}
                />
            </MuiThemeProvider>

            {/* Render the ToastContainer to display errors and other
                messages as graphical UI components rather than console  */}
            <ToastContainer
                position='bottom-center'
            />
        </div>
        )
    }
}

/*---------------------------------------------------------------------------\
\================================== </App> =================================*/
