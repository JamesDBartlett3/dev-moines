// This component is based on the Text Fields demo code at:
// https://material-ui.com/demos/text-fields/#outlined

import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

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
            <form noValidate autoComplete="off">

                <TextField
                    fullwidth="true"
                    style={{ width: '90%', margin: '6px 8px 2px 8px' }}
                    id="filter-field"
                    label="Filter"
                    margin="dense"
                    align="center"
                    placeholder="begin typing to filter results"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.props.filterInput}
                    onChange={(e) => this.handleChange(e)}
                />
            </form>
        )
    }
}
