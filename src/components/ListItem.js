// This component is based on the Card Component demo code at:
// https://material-ui.com/demos/cards/#simple-card

import React, {Component} from 'react'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'

// the ListItem Class Component
export default class ListItem extends Component {

    render() {

        // Split input into comma-delimited array
        const split = s => {
            return (s.split(','))
        }

        // jobCard is a function that will build a unique Card component
        // based on the data that is fed into it, referred to here as 'x'.
        const jobCard = x => {

            // handleEnterKey takes one argument as input, determines if
            // that input was keycode 13 (the Enter or Return key),
            // and if so, it borrows the handleMarkerClick function from
            // the App component in order to send the job id value of
            // the currently selected component all the way up to App.
            // Once there, handleMarkerClick uses the job id to locate the
            // map marker that goes with the currently selected job listing,
            // and changes its isOpen state to true, which in turn causes
            // the Map component to re-render with the selected job's marker
            // open and displaying its InfoWindow.
            const handleEnterKey = (key) => {
                if(key.charCode === 13) {
                    this.props.handleMarkerClick(this.props.markers[x.id])
                }
            }

            // use split() to break job address into a comma-delimited array
            const addressArray = split(x.address)

            return (
                // Render one instance of the Card component, using the 'x'
                // value from earlier to provide each instance with a single
                // job listing, including the company name, address, phone #,
                // job title, and website.
                <Card
                    style={{
                        cursor: 'pointer',
                        backgroundColor: 'rgb(149, 184, 175)',
                        borderRadius: '15px',
                        width: '95%',
                        marginLeft: '8px'
                    }}
                    // tabIndex=0 forces the browser to add this component
                    // to the tab order, for a11y reasons.
                    tabIndex={0}
                    // If the user presses a key while this component is
                    // selected, it gets sent to handleEnterKey and handled.
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
                            // when user clicks this component, also send
                            // a click to its matching map marker
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
        // return a single div for each instance, and add a
        // line break after each one. 
        return (<div>{jobCard(this.props.job)}<br /></div>)
    }

}
