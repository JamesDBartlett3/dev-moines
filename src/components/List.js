import React, {Component} from 'react'
import ListItem from './ListItem'



export default class List extends Component {

    listItem = (job) => {
        return(
            <ListItem key={job.id} job={job} />
        )
    }

    handleFilterJobs = () => {

        if (this.props.filterInput.length > 0) {
            const jobs = this.props.jobs.filter(job => job.company
                .toLowerCase()
                .includes(this.props.filterInput.toLowerCase()))
            return jobs.map(job => (
                this.listItem(job)
            ))
        } else {
            return this.props.jobs.map(job => (
                this.listItem(job)
            ))
        }
    }

    render() {

        return (
            <div>
                {this.handleFilterJobs()}
            </div>
        )
    }

}
