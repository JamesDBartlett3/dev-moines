// This component is based on the List demo code at:
// https://material-ui.com/demos/lists/#lists

import React, {Component} from 'react'
import ListItem from './ListItem'

// The List Class Component
export default class List extends Component {

    // listItem function takes a single job object as its argument,
    // and returns JSX code to build a container component that will
    // wrap around the job listing details in the app sidebar.
    listItem = (job) => {
        return(
            <ListItem
                {...this.props}
                key={job.id}
                job={job}
            />
        )
    }

    // A function to handle when the user types text into the input field.
    // This one takes no arguments. All it's doing is watching to see if the
    // character length is NOT zero.
    handleFilterJobs = () => {
        // If so, it searches the job listings for any that match the
        // string that is currently typed into the input field...
        if (this.props.filterInput.length !== 0) {
            const jobs = this.props.jobs.filter(job => job.company
                .toLowerCase()
                .includes(this.props.filterInput.toLowerCase()))
            // ...then returns all listings that match that criterion.
            return jobs.map(job => (
                this.listItem(job)
            ))
        } else {
            // If the input sring length IS zero, then that means the user
            // has either not typed anything, or has deleted their query,
            // so we just return the full list of jobs.
            return this.props.jobs.map(job => (
                this.listItem(job)
            ))
        }
    }

    render() {
        return (
            // Use handleFilterJobs to render the full list of jobs
            // that match the filter.
            <div>{this.handleFilterJobs()}</div>
        )
    }
}
