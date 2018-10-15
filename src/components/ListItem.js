

import React, {Component} from 'react'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'

export default class ListItem extends Component {

    render() {

        // Split input into comma-delimited array
        const split = s => {
            return (s.split(','))
        }

        const jobCard = x => {

            const handleEnterKey = (key) => {
                if(key.charCode === 13) {
                    this.props.handleMarkerClick(this.props.markers[x.id])
                }
            }

            // use split() to break job address into a comma-delimited array
            const addressArray = split(x.address)

            return (
                <Card
                    style={{
                        cursor: 'pointer',
                        backgroundColor: 'rgb(149, 184, 175)',
                        borderRadius: '15px',
                        width: '95%',
                        marginLeft: '8px'
                    }}
                    tabIndex={0}
                    onKeyPress={handleEnterKey}
                    >
                    <CardActions
                        style={{width:'100%'}}
                        >
                        <CardContent
                            style={{
                                width:'100%',
                                color: 'rgb(21, 28, 42)'
                            }}
                            onClick={() => this.props.handleMarkerClick(
                                this.props.markers[x.id]
                        )}>
                            <Typography variant='title'>
                                <span>{x.company}</span>
                            </Typography>
                            <Typography variant='subtitle1'>
                                <span>
                                    {x.position}
                                </span>
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

        return (
            <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0)'
            }}>
                {jobCard(this.props.job)}
                <br />
            </div>
        )
    }

}
