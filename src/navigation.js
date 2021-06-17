/* import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Addusers from "./users/add-users.component";
import usersList from "./users/users-list.component";
import Addchannel from "./channels/add-channels.component";
import channelsList from "./channels/channels-list.component";
const Navigation = () => {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/users" className="navbar-brand">
            Admin
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/adduser"} className="nav-link">
                Add user
              </Link>
            </li>
          </div>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/channels"} className="nav-link">
                Channel
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addchannel"} className="nav-link">
                Add channel
              </Link>
            </li>
          </div>
        </nav>

      
        </div>  
    )
}

export default Navigation;
 */
import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./navigation.css";
import AddIcon from "@material-ui/icons/AddCircle";
import Tooltip from "@material-ui/core/Tooltip";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PropTypes from "prop-types";
import {
  CssBaseline,
  AppBar,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItemText,
  ListItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Addusers from "./users/add-users.component";
import usersList from "./users/users-list.component";
import Addchannel from "./channels/add-channels.component";
import channelsList from "./channels/channels-list.component";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import firebase from "firebase";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Navigation(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const signOutUser = () => firebase.auth().signOut();
  const drawer = (
    <div>
      <List>
        <ListItem className="Admin-profile">
          <AccountCircleIcon fontSize="large" color="secondary" />
        </ListItem>
        <ListItem className="Admin-profile">
          <h3>Admin</h3>
        </ListItem>
      </List>
      <Divider />
      <List>
        <Link to={"/users"}>
          <ListItem button>
            <PersonIcon />
            <ListItemText>User</ListItemText>
            <Tooltip title="Add User" aria-label="add">
              <Link to={"/adduser"} className="nav-link">
                <AddIcon fontSize="large" />
              </Link>
            </Tooltip>
          </ListItem>
        </Link>
        <Link to={"/channels"}>
          <ListItem button>
            <GroupIcon />
            <ListItemText>Channel</ListItemText>
            <Tooltip title="Add Channel" aria-label="add">
              <Link to={"/addchannel"} className="nav-link">
                <AddIcon fontSize="large" />
              </Link>
            </Tooltip>
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Chat Application
          </Typography>
          <ExitToAppIcon onClick={signOutUser} className="logOut" />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/users"]} component={usersList} />
          <Route exact path={["/channels"]} component={channelsList} />
          <Route exact path={["/adduser"]} component={Addusers} />
          <Route exact path={["/addchannel"]} component={Addchannel} />
        </Switch>
      </div>
    </div>
  );
}

Navigation.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navigation;
