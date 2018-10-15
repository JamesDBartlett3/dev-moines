

import React, {Component} from 'react'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'

// Split input into comma-delimited array
const split = s => {
    return (s.split(','))
}

const jobCard = x => {

    // use split() to break job address into a comma-delimited array
    const addressArray = split(x.address)

    return (
        <Card>
            <CardActions>
                <CardContent>
                    <Typography variant="h6">
                        <span>{x.company}</span>
                    </Typography>
                    <Typography color="textSecondary">
                        <span>{x.position}</span>
                    </Typography>
                    <Typography component="p">

                        <span>
                            {/* Using addressArray, display job address
                            with a line break after the first comma */}
                            {addressArray[0]}
                            <br/>
                            {addressArray[1]},{addressArray[2]}
                        </span>
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
            <div>{jobCard(this.props.job)}</div>
        )
    }

}
