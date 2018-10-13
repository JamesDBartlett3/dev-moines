import React, { Component } from 'react'
import ListItem from './ListItem'

function jobsList (x) {
    return (
        x.map(job => (
        <ListItem key={job.id} job={job}>
        </ListItem>
    )))
}



export default class List extends Component {
    render() {
        return (
            <div>
                {jobsList(this.props.jobs)}
            </div>
        )
    }

}
