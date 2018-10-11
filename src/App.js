import React, { Component } from 'react'
import './App.css'
import Map from './components/Map'

import * as myJsonAPI from './APIs/MyJsonAPI'
import axios from 'axios'



export default class App extends Component {
    componentDidMount() {

    }
    render() {
        return (
        <div className="App">
        <header className="App-header">
            <p>
                Dev Moines
            </p>
        </header>
            <body className="App-body">
                <Map/>
            </body>
        </div>
        )
    }
}
