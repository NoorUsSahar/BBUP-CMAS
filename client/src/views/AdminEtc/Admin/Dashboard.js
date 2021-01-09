import React, {  useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { loadUser } from "../../../actions/adminEtc/auth";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";

import Calendar from "react-calendar";
import Coordinator from '@material-ui/icons/People';
import Faculty from '@material-ui/icons/Person';
import Applicant from '@material-ui/icons/HowToReg';
import Student from '@material-ui/icons/PersonPin';

import {
 
  Button,

} from "@material-ui/core";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "0.9rem",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardCategoryBlack: {
    "&,& a, & a:hover, & a:focus": {
      color: "rgba(0,0,0)",
      margin: "0",
      fontSize: "0.9rem",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#000000",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    fontSize: "1.3rem",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

const Dashboard = ({
  loadUser,
  // admission: { loading: admissionSessionsLoading, session, sessions },
  auth: { loading, user },
  history,
}) => {
  const classes = useStyles(styles);

  useEffect(() => {
    loadUser();
  }, [loadUser()]);

  return (
    <GridContainer>
     
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}> Welcome</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <CardHeader color="warning" align = 'center' >
                  <h2 className={classes.cardTitleBlack}>Manage Users </h2>
                  </CardHeader>
                  <CardBody>
                  <GridContainer>
                      {" "}
                      <GridItem xs={12} sm={12} md={8}>
                        <Faculty/>
                        <h4 className={classes.cardTitleBlack}>
                          Manage faculty
                        </h4>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <Button
                           color="info"
                          round
                          variant="contained"
                          href="/admin/manage-faculty"
                        >
                          Click here
                        </Button>
                      </GridItem>
                    </GridContainer>
                    <br></br>
                    <GridContainer>
                      {" "}
                      <GridItem xs={12} sm={12} md={8}>
                        <Coordinator/>
                        <h4 className={classes.cardTitleBlack}>
                          Manage Coordinator
                        </h4>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <Button
                           color="info"
                          round
                          variant="contained"
                          href="/admin/manage-coordinators"
                        >
                          Click here
                        </Button>
                      </GridItem>
                    </GridContainer>
                    <br></br>
                    <GridContainer>
                      {" "}
                      <GridItem xs={12} sm={12} md={8}>
                        <Applicant/>
                        <h4 className={classes.cardTitleBlack}>
                          Manage applicant
                        </h4>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <Button
                          color="info"
                          round
                          variant="contained"
                          href="/admin/manage-applicants"
                        >
                          Click here
                        </Button>
                      </GridItem>
                    </GridContainer>
                    <br></br>
                    <GridContainer>
                      {" "}
                      <GridItem xs={12} sm={12} md={8}>
                        <Student/>
                        <h4 className={classes.cardTitleBlack}>
                          Manage Student
                        </h4>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <Button
                         color="info"
                          round
                          variant="contained"
                          href="/admin/manage-students"
                        >
                          Click here
                        </Button>
                      </GridItem>
                    </GridContainer>
                    <br></br>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <CardHeader  color="danger" align = 'center' >
                    <h2 className={classes.cardTitleBlack}>Calendar </h2>
                  </CardHeader>
                  <CardBody>
                    <Calendar></Calendar>
                  </CardBody>
                </Card>
              </GridItem>
           
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

Dashboard.propTypes = {
  loadUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  admission: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  admission: state.admission,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loadUser,
})(withRouter(Dashboard));
