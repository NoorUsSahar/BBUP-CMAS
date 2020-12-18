import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardAvatar from "../../../components/Card/CardAvatar.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import Spinner from "../../../layouts/Spinner";
import { getProfileById } from "../../../actions/adminEtc/studentprofile";
import avatar from "../../../assets/img/tim_80x80.png";
import styles from "../../../assets/jss/material-dashboard-react/layouts/adminStyle.js";
import ProfileTop from "./ProfileTop";
import EarlyEducation from "./EarlyEducation";
import TertiaryEducation from "./TertiaryEducation";


const useStyles = makeStyles(styles);

const Profile = ({ match, getProfileById, student_profile, auth, ...rest }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params]);

  const classes =useStyles ();
  return (
 
    
        <Fragment>
          {student_profile.profile === null || student_profile.loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card profile>
                    <CardHeader color="primary">
                      <CardAvatar profile>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img src={avatar} alt="..." />
                        </a>
                      </CardAvatar>
                      <h1 className={classes.cardTitle}>
                        {student_profile.profile.Name}
                      </h1>
                      <h3 className={classes.cardCategory}>
                        {student_profile.profile.registrationNo}
                        <br />
                        {student_profile.profile.semester}{" "}
                        {student_profile.profile.section}
                      </h3>
                    </CardHeader>

                    <CardBody profile>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <Card>
                            <CardHeader color="secondary">
                              <h2>Personal and contact Information</h2>
                            </CardHeader>
                            <CardBody>
                              <Fragment>
                                <div class="profile-grid my-1">
                                  <ProfileTop profile={student_profile} />
                                </div>
                              </Fragment>
                            </CardBody>
                          </Card>
                        </GridItem>
                      </GridContainer>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <Card>
                            <CardHeader color="secondary">
                              <h2>Early Education</h2>
                            </CardHeader>
                            <CardBody>
                              <Fragment>
                                <div class="profile-grid my-1">
                                  <EarlyEducation profile={student_profile} />
                                </div>
                              </Fragment>
                            </CardBody>
                          </Card>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <Card>
                            <CardHeader color="secondary">
                              <h2>Tertiary Education</h2>
                            </CardHeader>
                            <CardBody>
                              <Fragment>
                                <div class="profile-grid my-1">
                                  <TertiaryEducation
                                    profile={student_profile}
                                  />
                                </div>
                              </Fragment>
                            </CardBody>
                          </Card>
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                    <CardFooter>
                      {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user._id === student_profile.profile.user._id && (
                          <Button color="primary" round href="/edit-profile">
                            Edit Profile
                          </Button>
                        )}
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>
            </Fragment>
          )}
        </Fragment>
     
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  student_profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  student_profile: state.student_profile,
  auth: state.auth,
  //auth so , if the profile user is viewing is of himself then edit profile button
});

export default connect(mapStateToProps, { getProfileById })(Profile);
