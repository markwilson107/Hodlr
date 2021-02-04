import React from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useAuth } from '../../utils/use-auth';

const useStyles = makeStyles((theme) => ({
    appbar: {
        backgroundColor: `#f9f9f9`,
        color: "black",
        zIndex: "7"
    },
    logo: {
        width: "110px"
    },
    button: {
        color: `white`,
        height: "65px",
        "&:hover": {
            backgroundColor: `rgb(55, 55, 55);`
        }
    },
    toolbar: {
        paddingRight: "0",
        paddingLeft: "10px",
        height: "65px"
    },
    toolbarButton1: {
        backgroundColor: "#efefef",
        height: "25px",
        width: "25px",
        color: "#ffce49",
        padding: "20px",
        display: "inline-block",
        // transition: ".3s ease",
        "&:hover": {
            backgroundColor: "#e8e8e8",
            // width: "50px",
        },
    },
    toolbarButton2:
    {
        backgroundColor: "#ffce49",
        height: "25px",
        width: "25px",
        color: "white",
        padding: "20px",
        display: "inline-block",
        "&:hover": {
            backgroundColor: "#f7c744"
        },
    },
    toolbarButtonDiv: {
        marginLeft: 'auto'
    }
}));

function Navbar(props) {
    const classes = useStyles();
    const {
        isLoggedIn,
        user,
        logout,
        updateJwt
    } = useAuth();

    return (
        <AppBar elevation={0} className={classes.appbar} position="static">
            <Toolbar className={classes.toolbar} >
                <Link href="/"><img src="./hodlr-logo-300.png" className={classes.logo}></img></Link>
                <div className={classes.toolbarButtonDiv}>

                    {isLoggedIn
                        ? (<>
                            <Link href="/dashboard">
                                <div className={classes.toolbarButton1}>
                                    <DashboardIcon style={{ width: "auto", height: "auto" }} />
                                </div>
                            </Link>

                            <Link onClick={() => { logout() }} href="/">
                                <div className={classes.toolbarButton2}>
                                    <LogoutIcon style={{ width: "auto", height: "auto" }} />
                                </div>
                            </Link>
                        </>)
                        : (<>
                            <Link href="/login">
                                <div className={classes.toolbarButton1}>
                                    <PersonIcon style={{ width: "auto", height: "auto" }} />
                                </div>
                            </Link>

                            <Link href="/register">
                                <div className={classes.toolbarButton2}>
                                    <PersonAddIcon style={{ width: "auto", height: "auto" }} />
                                </div>
                            </Link>
                        </>)
                    }
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;