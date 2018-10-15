// This component is based on the Text Fields demo code at:
// https://material-ui.com/demos/text-fields/#customized-inputs

import React, { Component } from 'react'
import InputBase from '@material-ui/core/InputBase'

// The Filter Class Component
export default class Filter extends Component {

    // Function to handle when user input changes the text that is in the
    // input field. We do this every time a character is added or removed
    // from the field, so we don't need a submit button. When the user is
    // finished typing their query, they simply stop typing, and the
    // results are already right there.
    handleChange = (e) => {
        // set filterInput state to current contents of the text field
        this.setState({filterInput: e.target.value})
        // map through all the job listings in props
        const markers = this.props.jobs.map(job => {
            // evaluate whether a match has been found
            const isMatched = job.company.toLowerCase()
                .includes(e.target.value.toLowerCase())
            // find the map marker for the currently selected job listing
            const marker = this.props.markers
                .find(marker => marker.id === job.id)
                // if isMatched is truthy
                if(isMatched) {
                    // make the marker visible
                    marker.isVisible = true
                }else{
                    // otherwise, make it invisible
                    marker.isVisible = false
                }
                // return the marker, visible or not.
                return marker
        })
        // lift the updated markers state up to App
        // so they can propagate to other components
        this.props.liftState({markers})
        this.props.liftState({filterInput: e.target.value})
    }

    render() {

        return (
            <form
                noValidate
                autoComplete="off"
                // If user presses the Enter key after they
                // finish typing their query, ignore it, so
                // that it doesn't interfere with the rest
                // of the app.
                onSubmit={e => { e.preventDefault(); }}
            >
                <InputBase
                    placeholder="filter by business name"
                    style={{
                        width: '90%',
                        height: '100%',
                        margin: '6px 8px 0 8px',
                        backgroundColor: 'rgb(149, 184, 175)',
                        color: 'rgb(21, 28, 42)',
                        fontSize: '20px',
                        justifyContent: 'center'
                    }}
                    // This input field's value is actually set by
                    // React. It's what's called a Controlled Component.
                    value={this.props.filterInput}
                    // when the user changes a character in the field,
                    // send the typed text as a string to handleChange
                    onChange={(e) => this.handleChange(e)}
                />
            </form>
        )
    }
}
