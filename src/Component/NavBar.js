import React from 'react'
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    AppBar: {
        backgroundColor: 'black',
    },
    link: {
        textDecoration: 'none',
    },
    title: {
        cursor: 'pointer',
        color: '#ffffff',
    },
}))
export const NavBar = () => {
    const classes = useStyles();
    return (
        <AppBar position='fixed' className={classes.AppBar} variant='h6'>
            <Toolbar>
                <Link to='/' className={classes.link}>
                    <Typography className={classes.title}>Pokedex</Typography>
                </Link>
            </Toolbar>
        </AppBar>
    )
}
