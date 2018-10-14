/*============================================================================\
| Dev Moines --- React-Based Job Search App for Devs & IT Pros in Des Moines  |
|-----------------------------------------------------------------------------|
| Acknowledgments:                                                            |
|                                                                             |
| Elharony for publishing the super-helpful video series on YouTube called    |
| "Udacity | Neighborhood Map". Thanks for making a complex task so simple!   |
| Reference: https://goo.gl/gA7U2E                                            |
|                                                                             |
| RASG on JSFiddle (http://jsfiddle.net/RASG/X5mhL/) for demonstrating how    |
| to simulate a mouse click on a map marker                                   |
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
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import ResponsiveDrawer from './components/ResponsiveDrawer'

// APIs
import * as gMapsAPI from './APIs/GoogleMapsAPI'
import * as myJsonAPI from './APIs/MyJsonAPI'

// 3rd Party JS Libraries
import axios from 'axios'

// Basic React Deps
import './App.css'
import React, { Component } from 'react'

/*---------------------------------------------------------------------------\
\============================== </Dependencies> ============================*/


/*================================== <App> ==================================\
\---------------------------------------------------------------------------*/

const APIs = {
    gMaps: {
        params: new URLSearchParams({
            /* To use your own API key, uncomment the line below this one... */
            // key: `${gMapsAPI.key}`,

            /* ...then comment out the line below this one...*/
            client: `${gMapsAPI.client}`,

            /* ...then open APIs/GoogleMapsApi.js & follow its instructions. */
        })
    },
    myJson: {
        id:`${myJsonAPI.id}`,
        url:`${myJsonAPI.url}`
    }
}

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        suppressDeprecationWarnings: true
    }
})

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            jobs: [],
            markers: [],
            center: {
                lat: gMapsAPI.center.lat,
                lng: gMapsAPI.center.lng
            },
            zoom: 12,
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

            },
            liftState: object => {
                this.setState(object)
            }
        }
    }

    closeAllMarkers = () => {
        const markers = this.state.markers.map(marker => {
            marker.isOpen = false
            return marker
        })
        this.setState({markers: Object.assign(this.state.markers, markers)})
    }

    handleFilterChange = s => {
        this.setState({s})
    }

    handleMarkerClick = marker => {
        this.closeAllMarkers()
        marker.isOpen = true
        const selected = this.state.jobs[marker.id]
        this.setState({
            markers: Object.assign(this.state.markers, marker),
            selected: Object.assign(selected),
            center: Object.assign({
                // Tell the map to center itself just a hair to the North
                // of the marker's actual coordinates, to ensure enough
                // screen space is left for the InfoWindow to display
                lat: (selected.latlng[0] + 0.0055),
                lng: selected.latlng[1]
            }),
            zoom: 15
        })
    }

    handleMapClick = () => {
        this.closeAllMarkers()
        this.setState({
            center: gMapsAPI.center,
            zoom: 12
        })
    }


    componentDidMount() {
        // Use axios to get json data from MyJsonAPI
        axios.get(`${APIs.myJson.url}${APIs.myJson.id}`)
        // then feed the results into initJobs variable
        .then(res => {
            const jobs = res.data.jobs
            const center = gMapsAPI.center
            const markers = jobs.map(job => {
                return {
                    lat: job.latlng[0],
                    lng: job.latlng[1],
                    isOpen: false,
                    isVisible: true,
                    id: job.id
                }
            })
            this.setState({jobs,markers,center})
        })

        // If an error occurred, collect the error message(s)
        .catch(error => {
            // and save it in this.state.error
            this.setState({error})
            console.log(this.state.error)
        })

    }
    render() {
        return (
        <div className="App">
            <MuiThemeProvider theme={theme}>
                <ResponsiveDrawer
                    {...this.state}
                    handleFilterChange={this.handleFilterChange}
                    handleMarkerClick={this.handleMarkerClick}
                    handleMapClick={this.handleMapClick}/>
            </MuiThemeProvider>
        </div>
        )
    }
}

/*---------------------------------------------------------------------------\
\================================== </App> =================================*/
