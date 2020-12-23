import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../../../actions/adminEtc/studentprofile";
import Spinner from "../../../../layouts/Spinner";
import GridItem from "../../../../components/Grid/GridItem.js";
import GridContainer from "../../../../components/Grid/GridContainer.js";
import { getProfiles } from "../../../../actions/adminEtc/studentprofile";
import Card from "../../../../components/Card/Card.js";
import CardHeader from "../../../../components/Card/CardHeader.js";
import CardFooter from "../../../../components/Card/CardFooter.js";
import CardBody from "../../../../components/Card/CardBody.js";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { makeStyles } from "@material-ui/core";
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
  cardTitleBlack: {
    color: "#0c0c0d",
    fontSize: "1rem",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "500",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "500",
      lineHeight: "1",
    },
  },
  cardCategoryBlack: {
    "&,& a,& a:hover,& a:focus": {
      color: "#0c0c0d",
      margin: "0",
      fontSize: "0.9rem",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#0c0c0d",
    },
  },
};

const useStyles = makeStyles(styles);
const Dashboard = ({
  getCurrentProfile,
  // auth: { users },
  student_profile: { profile, profiles, loading },
  getProfiles,
}) => {
  
  useEffect(() => {
    getCurrentProfile();
    getProfiles();
  }, [getCurrentProfile, getProfiles]);

  const classes = useStyles();
  return loading && profile ===null ? (
    <CircularProgress color="inherit" align="center" />
  ) : (
    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {" "}
                Student's Acedemic Records
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                    <CardHeader color="danger">
                      <h4 className={classes.cardTitleBlack}>
                        Add Records in Student's Profiles
                      </h4>
                    </CardHeader>
                    <CardBody>
                      <GridContainer>
                        <GridItem>
                          <Button
                            color="primary"
                            variant="outlined"
                            round
                            href={"/admin/student-add-information"}
                          >
                            Add Information
                          </Button>
                        </GridItem>
                      </GridContainer>
                    </CardBody>

                    {/* <CardFooter stats></CardFooter> */}
                  </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                    <CardHeader color="warning">
                      <h4 className={classes.cardTitleBlack}>Schedule </h4>
                    </CardHeader>
                    <CardBody></CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href="/admin/schedule"
                        size="medium"
                      >
                        Schedule
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                    <CardHeader color="danger">
                      <GridContainer>
                        {" "}
                        <GridItem xs={12} sm={12} md={6}>
                          <h4 className={classes.cardTitleBlack}>Students</h4>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <Button
                            // color="info"
                            round
                            variant="contained"
                            href="/admin/student-profiles"
                          >
                            View All Profiles
                          </Button>
                        </GridItem>
                      </GridContainer>
                    </CardHeader>
                    <CardBody>
                      <Fragment>
                        {profiles == [] ? (
                         <CircularProgress color="inherit" align="center" />
                        ) : (
                          <Fragment>
                            <div className="profiles">
                              <GridContainer xs={12} sm={12} md={12}>
                                <GridItem xs={12} sm={6} md={12}>
                                  <GridContainer>
                                    {profiles.length > 0 ? (
                                      profiles.map((profile, index) => (
                                        <GridItem xs={12} sm={6} md={12}>
                                          {index < 2 ? (
                                            <Card>
                                              <CardBody>
                                                <GridContainer>
                                                  <GridItem
                                                    xs={12}
                                                    sm={6}
                                                    md={6}
                                                  >
                                                    <h3>{profile.Name}</h3>
                                                    {/* <ProfileItem key={profile._id} profile={profile} /> */}
                                                    <p>
                                                      {profile.registrationNo}
                                                    </p>
                                                    <br />
                                                    <p>
                                                      {profile.semester}
                                                      {profile.section}
                                                    </p>
                                                  </GridItem>
                                                  <GridItem
                                                    xs={12}
                                                    sm={6}
                                                    md={6}
                                                  >
                                                    <Button
                                                      color="primary"
                                                      round
                                                      variant="outlined"
                                                      href={`/admin/student-profile/${profile.user._id}`}
                                                    >
                                                      View Profile
                                                    </Button>
                                                  </GridItem>
                                                </GridContainer>
                                              </CardBody>
                                            </Card>
                                          ) : (
                                            <br></br>
                                          )}
                                        </GridItem>
                                      ))
                                    ) : (
            <CircularProgress color="inherit" align="center" />
                                     
                                    )}
                                  </GridContainer>
                                </GridItem>
                              </GridContainer>
                            </div>
                          </Fragment>
                        )}
                      </Fragment>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  student_profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  student_profile: state.student_profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getProfiles,
})(Dashboard);
