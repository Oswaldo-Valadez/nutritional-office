import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
} from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import styles from "../config/styles";

import clsx from "clsx";

import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
  Info as InfoIcon,
  NewReleases as NewReleasesIcon,
  Note as NoteIcon,
  Folder as FolderIcon,
  Home as HomeIcon
} from "@material-ui/icons";

function Drawer({ authState, children, title }) {
  const classes = useStyles();

  const theme = useTheme();

  const [isAuth, setIsAuth] = authState;

  const LogOut = () => {};

  const [openDrawer, setOpenDrawer] = useState(true);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: openDrawer,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {/* <IconButton
            styles={{}}
            onClick={() => {
              localStorage.setItem("auth", false);
              setIsAuth(false);
            }}
            color="inherit"
            aria-label="open drawer"
            edge="end"
          >
            <ExitToAppIcon
              style={{
                backgroundColor: "#fff",
                color: styles.primary,
                width: 32,
                height: 32,
                borderRadius: 6,
                padding: 4,
              }}
            />
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <MuiDrawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Typography variant="h6">
            <Avatar
              alt=""
              src="./imgs/logo.png"
              onClick={() => {
                localStorage.setItem("auth", false);
                setIsAuth(false);
              }}
            />
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon style={{ color: "#fff" }} />
            ) : (
              <ChevronLeftIcon style={{ color: "#fff" }} />
            )}
          </IconButton>
        </div>

        <Divider style={{ backgroundColor: "rgba(255,255,255,0.25)" }} />

        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <HomeIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>

          <ListItem button component={Link} to="/expedients">
            <ListItemIcon>
              <FolderIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Expedientes" />
          </ListItem>

          <ListItem button component={Link} to="/notas">
            <ListItemIcon>
              <NoteIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Notas de visita" />
          </ListItem>
        </List>
      </MuiDrawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: styles.primary,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: "#fff",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: styles.dark,
    color: "#fff",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
    backgroundColor: styles.dark,
    color: "#fff",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
  },
}));

export default Drawer;
