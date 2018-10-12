// This component is based on the Text Fields demo code at:
// https://material-ui.com/demos/text-fields/#outlined
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

export default class Filter extends Component {

    state = {
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    componentDidMount(){

    }

    render() {

        return (
            <form noValidate autoComplete="off">

                <TextField
                    fullwidth
                    style={{ width: '90%', margin: '6px 8px 2px 8px' }}
                    id="filter-field"
                    label="Filter"
                    margin="dense"
                    align="center"
                    placeholder="begin typing to filter results"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
        )
    }
}
