// This component is based on the Text Fields demo code at:
// https://material-ui.com/demos/text-fields/#outlined

import React, { Component } from 'react'
import InputBase from '@material-ui/core/InputBase'

export default class Filter extends Component {

    handleChange = (e) => {
        this.setState({filterInput: e.target.value})
        const markers = this.props.jobs.map(job => {
            const isMatched = job.company.toLowerCase().includes(e.target.value.toLowerCase())
            const marker = this.props.markers.find(marker => marker.id === job.id)
            if(isMatched) {
                marker.isVisible = true
            }else{
                marker.isVisible = false
            }
            return marker
        })
        this.props.liftState({markers})
        this.props.liftState({filterInput: e.target.value})
    }

    render() {

        return (
            <form
                noValidate
                autoComplete="off"
                onSubmit={e => { e.preventDefault(); }}
            >
                <InputBase
                    placeholder="filter by business name"
                    style={{
                        width: '90%',
                        height: '100%',
                        margin: '6px 8px 0 8px',
                        backgroundColor: 'rgb(122, 152, 152)',
                        color: 'rgb(21, 28, 42)',
                        fontSize: '20px',
                        justifyContent: 'center'
                    }}
                    value={this.props.filterInput}
                    onChange={(e) => this.handleChange(e)}
                />
            </form>
        )
    }
}
