// This component is based on the ResponsiveDrawer demo code at:
// https://material-ui.com/demos/drawers/#responsive-drawer

// Import Remote Deps & Components
import React, {Component} from 'react'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Hidden from '@material-ui/core/Hidden'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import {withStyles} from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

// Import Local Sub-Components
import Filter from './Filter'
import List from './List'
import Map from './Map'

const drawerWidth = 'calc(5vw + 240px)'

const styles = theme => ({

    root: {
        flexGrow: 1,
        height: '100vh',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        color: 'rgb(122, 152, 152)',
        backgroundColor: 'rgb(21, 28, 42)',
        position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100vw - ${drawerWidth})`,
        },
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,

    drawerPaper: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    content: {
        flexGrow: 1,
        //backgroundColor: theme.palette.background.default,
        backgroundColor: 'rgba(39, 48, 78, 1)',
        padding: theme.spacing.unit * 0,
        position: 'relative'
    },
    title: {
        display: 'inline',
        textAlign: 'center',

    }
})

class ResponsiveDrawer extends Component {
    constructor() {
        super()
        this.state = {
            mobileOpen: false,
        }
    }


    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}))
    }

    render() {
        const {classes, theme} = this.props

        const drawer = (
            <div>
                <div
                    className={classes.toolbar}
                    style={{
                        backgroundColor: 'rgb(122, 152, 152)',
                        color: 'rgb(21, 28, 42)',
                        borderRadius: '15px',
                        width: '95%',
                        margin: '8px 0 -5px 8px',
                    }}
                >
                    <Filter
                        {...this.props}
                    />
                </div>
                <Divider />
                <br />
                <List {...this.props} />
            </div>
        )

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.navIconHide}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title}
                            variant="h6"
                            color="inherit"
                            noWrap
                            align="center"
                        >
                            Dev Moines
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Hidden mdUp>
                    <SwipeableDrawer
                        minFlingVelocity={350}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.mobileOpen}
                        onOpen={this.handleDrawerToggle}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </SwipeableDrawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        style={{
                            height: '100vh',
                            overflow: 'auto',
                            backgroundColor: 'rgb(21, 28, 42)'
                        }}
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Map
                        {...this.props}
                    />
                </main>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(ResponsiveDrawer)
