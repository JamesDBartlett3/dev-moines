import React, { Component } from 'react'
import ListItem from './ListItem'

const jobsList = props => (
    props.jobs.map(job => (
        <ListItem job={job}>
        </ListItem>
    ))
)



export default class List extends Component {
    render() {
        console.log(jobsList)
        return (
            <div>
                {jobsList}
            </div>
        )
    }

}
