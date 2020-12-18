import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";

import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import GridItem from "../../../../components/Grid/GridItem.js";
import GridContainer from "../../../../components/Grid/GridContainer.js";
import Button from "../../../../components/CustomButtons/Button.js";
import Card from "../../../../components/Card/Card.js";
import CardHeader from "../../../../components/Card/CardHeader.js";
import CardAvatar from "../../../../components/Card/CardAvatar.js";
import CardBody from "../../../../components/Card/CardBody.js";
import CardFooter from "../../../../components/Card/CardFooter.js";

import Spinner from "../../../../layouts/Spinner";
import {
  getFacultyById,
  getCurrentFacultyAccountById,
  deleteAccount,
} from "../../../../actions/adminEtc/profile";
import ProfileResearchPapers from "../../Faculty/UserProfile/ProfileResearchPapers";
import ProfileEducation from "../../Faculty/UserProfile/ProfileEducation";
import ProfileExperience from "../../Faculty/UserProfile/ProfileExperience";
import avatar from "../../../../assets/img/profile.png";
import styles from "../../../../assets/jss/material-dashboard-react/layouts/adminStyle.js";

const useStyles = makeStyles(styles);
var pathArray = window.location.pathname.split("/");

const Profile = ({
  match,
  getFacultyById,
  profile,
  auth,
  getCurrentFacultyAccountById,
  profile: { facultyAccount },
}) => {
  useEffect(() => {
    getFacultyById(match.params.id);
    getCurrentFacultyAccountById(match.params.id);
  }, [getFacultyById, getCurrentFacultyAccountById, match.params.id]);

  const classes = useStyles();
  return (
    <Fragment>
      {profile.loading ? (
        <Spinner />
      ) : (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card profile>
              <CardHeader color="primary">
                <CardAvatar profile>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img src={avatar} alt="..." />
                  </a>
                </CardAvatar>
                <h3 className={classes.cardTitle}>
                  {facultyAccount !== null ? (
                    <h3> {facultyAccount.name}</h3>
                  ) : (
                    <h3>No faculty loaded</h3>
                  )}
                </h3>
              </CardHeader>
              <CardBody profile>
                {profile.profile == null ? (
                  <h1>No profile created yet</h1>
                ) : (
                  <Fragment>
                    <h2 className={classes.cardCategory}>
                      {profile.profile.designation}
                    </h2>
                    <h2 className={classes.cardTitle}>{profile.profile.bio}</h2>
                    {profile.profile.website && (
                      <a
                        href={profile.profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i class="fas fa-globe fa-2x"></i>
                      </a>
                    )}

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Card>
                          <CardHeader color="secondary">
                            <h2 className={classes.cardTitle}>Experience</h2>
                          </CardHeader>
                          <CardBody>
                            {profile.profile.experience.length > 0 ? (
                              <Fragment>
                                <ProfileExperience
                                // profile={profile.profile}
                                ></ProfileExperience>
                              </Fragment>
                            ) : (
                              <h4 className={classes.cardTitle}>
                                No Experience
                              </h4>
                            )}
                          </CardBody>
                        </Card>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <Card>
                          <CardHeader color="secondary">
                            <h2 className={classes.cardTitle}>
                              Research Papers
                            </h2>
                          </CardHeader>
                          <CardBody>
                            {profile.profile.research_papers.length > 0 ? (
                              <Fragment>
                                <ProfileResearchPapers
                                // profile={profile.profile}
                                ></ProfileResearchPapers>
                              </Fragment>
                            ) : (
                              <h4 className={classes.cardTitle}>
                                No Resarch Papers
                              </h4>
                            )}
                          </CardBody>
                        </Card>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={12}>
                        <Card>
                          <CardHeader>
                            <h2 className={classes.cardTitle}>Education </h2>
                          </CardHeader>
                          <CardBody>
                            {profile.profile.education.length > 0 ? (
                              <Fragment>
                                <ProfileEducation
                                // profile={profile.profile}
                                ></ProfileEducation>
                              </Fragment>
                            ) : (
                              <h4 className={classes.cardTitle}>
                                No Education
                              </h4>
                            )}
                          </CardBody>
                        </Card>
                      </GridItem>
                    </GridContainer>
                  </Fragment>
                )}
              </CardBody>
              <CardFooter>
                {/* {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.faculty._id === profile.profile.faculty._id && (
                          <Button color="primary" round href="/faculty/edit-profile">
                            Edit Profile
                          </Button>
                        )} */}
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      )}
    </Fragment>
    //   </div>
    // </div>
  );
};

Profile.propTypes = {
  getFacultyById: PropTypes.func.isRequired,
  getCurrentFacultyAccountById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  //auth so , if the profile user is viewing is of himself then edit profile button
});

export default connect(mapStateToProps, {
  getFacultyById,
  getCurrentFacultyAccountById,
})(Profile);
