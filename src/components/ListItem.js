import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

function jobListing (x) {
    return (
        <Card >
            <CardActions>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        <span>{x.company}</span>
                    </Typography>
                    <Typography color="textSecondary">
                        <span>{x.position}</span>
                    </Typography>
                    <Typography component="p">
                        <span>{x.address}</span>
                        <br />
                        <span>{x.phone}</span>
                    </Typography>
                </CardContent>
            </CardActions>

        </Card>
    )
}

export default class ListItem extends Component {

    render() {
        return (
            <div>{ jobListing(this.props.job) }</div>
        )
    }

}
