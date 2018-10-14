import React, {Component} from 'react'
import ListItem from './ListItem'

export default class List extends Component {
    handleFilterJobs = () => {
        if (this.props.filterInput.length > 0) {
            const jobs = this.props.jobs.filter(job => job.company
                .toLowerCase()
                .includes(this.props.filterInput.toLowerCase()))
            return jobs.map(job => (
                <ListItem key={job.id} job={job} />
            ))
        } else {
            return this.props.jobs.map(job => (
                <ListItem key={job.id} job={job} />
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
