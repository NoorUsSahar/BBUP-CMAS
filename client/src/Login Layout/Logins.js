import React, { Fragment } from "react";
import {
  Grid,
  Paper,
  Fab,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from '../components/Card/CardHeader.js';
import Admin from "@material-ui/icons/SupervisorAccount";
import sbbu from "./sbbu.jpg";
import logo from "./logo.jpg";
import Announcement from '../views/AdminEtc/Announcement/Announcement.js';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${sbbu})`,
    // backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    height: "30%",
    width: "30%",
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  photo: {
    height: "100%",
    width: "100%",
  },
 
  fab : {
    marginTop: theme.spacing(3),
  } ,
 

}));

const Logins = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={8} className = {classes.image}>
          <Announcement/>
        </Grid>
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <div className={classes.paper}>
          <CardHeader  width = '100%'>
              <h2>Shaheed Benazir Bhutto University, Peshawar</h2>
            </CardHeader>
            <Avatar className={classes.avatar}>
              <img src={logo}></img>
            </Avatar>
        
            
              <Fab variant="extended" className={classes.fab}  color="primary"  href='/login/applicant' >
                <Admin />
                Applicant Portal
              </Fab>
            
              <Fab variant="extended"  color="primary" className={classes.fab} href='/login/faculty'>
                <Admin />
                Faculty Portal
              </Fab>
              <Fab variant="extended"  color="secondary" className={classes.fab} href='/login/coordinator'>
                <Admin />
               Coordinator Portal
              </Fab>
              <Fab variant="extended"  color="primary" className={classes.fab} href='/login/admin'>
                <Admin />
                Admin Portal
              </Fab>
          </div>
        </Grid>
       
      </Grid>
    </Fragment>
  );
};

export default Logins;
