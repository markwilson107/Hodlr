import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import MDLink from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Apps';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { useAuth } from '../../utils/use-auth';

const useStyles = makeStyles((theme) => ({
    appbar: {
        backgroundColor: theme.background.main,
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
        backgroundColor: theme.background.main,
        height: "25px",
        width: "25px",
        color: theme.palette.primary.yellow,
        padding: "20px",
        display: "inline-block",
        // transition: ".3s ease",
        "&:hover": {
            backgroundColor: "#e8e8e8",
            // width: "50px",
        },
    },
    toolbarButtonSelect: {
        backgroundColor: theme.background.dark,
    },
    toolbarButton2:
    {
        backgroundColor: theme.palette.primary.yellow,
        height: "25px",
        width: "25px",
        color: "white",
        padding: "20px",
        display: "inline-block",
        "&:hover": {
            backgroundColor: theme.palette.primary.dark
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
        <AppBar elevation={null} className={classes.appbar} position="static">
            <Toolbar className={classes.toolbar} >
                <NavLink to={{ pathname: "/" }} ><img src="./hodlr-logo-300.png" className={classes.logo}></img></NavLink>
                <div className={classes.toolbarButtonDiv}>
                    {isLoggedIn
                        ? (<>
                            <NavLink className={classes.toolbarButton1} to={{ pathname: "/wallet" }} activeClassName={classes.toolbarButtonSelect} >
                                <WalletIcon style={{ width: "auto", height: "auto" }} />
                            </NavLink>
                            <NavLink className={classes.toolbarButton1} to={{ pathname: "/dashboard" }} activeClassName={classes.toolbarButtonSelect} >
                                <DashboardIcon style={{ width: "auto", height: "auto" }} />
                            </NavLink>
                            <MDLink onClick={(e) => { e.preventDefault(); logout() }} href="/">
                                <div className={classes.toolbarButton2}>
                                    <LogoutIcon style={{ width: "auto", height: "auto" }} />
                                </div>
                            </MDLink>
                        </>)
                        : (<>
                            <NavLink className={`${classes.toolbarButton1} ${classes.toolbarButtonSelect}`} to={{ pathname: "/login" }}  >
                                <PersonIcon style={{ width: "auto", height: "auto" }} />
                            </NavLink>

                            <NavLink className={classes.toolbarButton2} to={{ pathname: "/register" }} >
                                <PersonAddIcon style={{ width: "auto", height: "auto" }} />
                            </NavLink>
                        </>)
                    }
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;