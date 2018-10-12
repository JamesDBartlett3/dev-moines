/*============================================================================\
| Dev Moines --- React-Based Job Search App for Devs & IT Pros in Des Moines  |
|-----------------------------------------------------------------------------|
| Acknowledgments:                                                            |
|                                                                             |
| @Elharony for publishing the super-helpful video series on YouTube called   |
| "Udacity | Neighborhood Map". Thanks for making a complex task so simple!   |
| Reference: https://goo.gl/gA7U2E                                            |
|                                                                             |
| @RASG on JSFiddle (http://jsfiddle.net/RASG/X5mhL/) for demonstrating how   |
| to simulate a mouse click on a map marker                                   |
|                                                                             |
| @Forrest Walker on YouTube (https://goo.gl/XrrXg9) for the comprehensive    |
| walkthrough video series on P7. I finally learned how state & props work!   |
| |
| |
| |
\___________________________________________________________________________*/


/*============================ <Dependencies> ===============================\
\---------------------------------------------------------------------------*/

import React, { Component } from 'react'
import './App.css'
import ResponsiveDrawer from './components/ResponsiveDrawer'
import * as gMapsAPI from './APIs/GoogleMapsAPI'
import * as myJsonAPI from './APIs/MyJsonAPI'
import axios from 'axios'

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

            /* ...then open APIs/GoogleMapsApi.js & follow the instructions. */
        }),
    },
    myJson: {
        id:`${myJsonAPI.id}`,
        url:`${myJsonAPI.url}`
    }
}


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
                website: '',
            },
            error: {

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


    handleMarkerClick = marker => {
        this.closeAllMarkers()
        marker.isOpen = true
        const selected = this.state.jobs[marker.id]
        //console.log(selected)
        this.setState({
            markers: Object.assign(this.state.markers, marker),
            selected: Object.assign(selected),
            center: Object.assign({
                lat: selected.latlng[0],
                lng: selected.latlng[1]
            }),
            zoom: 16
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

            <div className="App-body">
                <ResponsiveDrawer
                    {...this.state}
                    handleMarkerClick={this.handleMarkerClick}
                    handleMapClick={this.handleMapClick}/>
            </div>
        </div>
        )
    }
}

/*---------------------------------------------------------------------------\
\================================== </App> =================================*/
