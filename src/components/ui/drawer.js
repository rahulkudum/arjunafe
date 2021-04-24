import React, { useContext } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import BusinessIcon from "@material-ui/icons/Business";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import { AdminName, AdminPhoto } from "../context/storage";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
 root: {
  display: "flex",
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

 drawerPaper: {
  width: drawerWidth,
 },
 title: {
  flexGrow: 1,
 },
}));

function ResponsiveDrawer(props) {
 let history = useHistory();
 let { path, url } = useRouteMatch();
 const { window } = props;
 const classes = useStyles();
 const theme = useTheme();
 const [mobileOpen, setMobileOpen] = React.useState(false);
 const [name, setName] = useContext(AdminName);
 const [photo, setPhoto] = useContext(AdminPhoto);

 const handleDrawerToggle = () => {
  setMobileOpen(!mobileOpen);
 };

 const drawer = (
  <div>
   <List>
    <ListItem>
     <ListItemText primary={"Arjuna Group"} />
    </ListItem>
   </List>
   <Divider />
   <List>
    <ListItem
     button
     onClick={() => {
      history.push("/student");
     }}
    >
     <ListItemIcon>
      <PeopleAltIcon />
     </ListItemIcon>
     <ListItemText primary={"Students"} />
    </ListItem>
    <ListItem
     button
     onClick={() => {
      history.push("/webinar");
     }}
    >
     <ListItemIcon>
      <VideoLabelIcon />
     </ListItemIcon>
     <ListItemText primary={"Webinars"} />
    </ListItem>
    <ListItem button>
     <ListItemIcon>
      <BusinessIcon />
     </ListItemIcon>
     <ListItemText primary={"Institutes"} />
    </ListItem>
    <ListItem button>
     <ListItemIcon>
      <LocalLibraryIcon />
     </ListItemIcon>
     <ListItemText primary={"Courses"} />
    </ListItem>
    <ListItem button>
     <ListItemIcon>
      <EmojiPeopleIcon />
     </ListItemIcon>
     <ListItemText primary={"Services"} />
    </ListItem>
   </List>
  </div>
 );

 const container = window !== undefined ? () => window().document.body : undefined;

 return (
  <>
   <CssBaseline />
   <AppBar position="fixed" className={classes.appBar}>
    <Toolbar>
     <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} className={classes.menuButton}>
      <MenuIcon />
     </IconButton>

     <Typography variant="h6" className={classes.title}>
      {path.slice(1, 2).toUpperCase() + path.slice(2, path.length) + "s"}
     </Typography>
     <Typography variant="h6" noWrap>
      {name}
     </Typography>
     <Tooltip title="Logout">
      <img
       src={photo}
       onClick={() => {
        setName("");
        setPhoto("");
       }}
       style={{ borderRadius: "50%", height: "50px", width: "50px", marginLeft: "10px" }}
      />
     </Tooltip>
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
  </>
 );
}

export default ResponsiveDrawer;
