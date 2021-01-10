import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardAvatar from "../../../components/Card/CardAvatar.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import Spinner from "../../../layouts/Spinner";
import { getProfileById } from "../../../actions/facultysc/studentgrade";
import avatar from "../../../assets/img/tim_80x80.png";
import styles from "../../../assets/jss/material-dashboard-react/layouts/adminStyle.js";
import StudentData from "./StudentData";
import StudentGPA from "./StudentGPA";
import CourseMarks from "./CourseMarks";


const useStyles = makeStyles(styles);
var pathArray = window.location.pathname.split('/');

const Profile = ({ match, getProfileById, student_grade, auth }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params]);

  const classes = useStyles();


  return (

    <Fragment>
      {student_grade.student_profile === null || student_grade.loading ? (
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
                      {student_grade.student_profile}
                    </h1>
                    <StudentData profile={student_grade.student_profile} />

                  </CardHeader>

                  <CardBody profile>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Card>
                          <CardHeader color="secondary">
                            <h2>Course Marks</h2>
                          </CardHeader>
                          <CardBody>
                            <CourseMarks profile={student_grade.student_profile} />
                          </CardBody>
                        </Card>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Card>
                          <CardHeader color="secondary">
                            <h2>GPA</h2>
                          </CardHeader>
                          <CardBody>
                            <StudentGPA profile={student_grade.student_profile} />
                          </CardBody>
                        </Card>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    {/* {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user._id === profile.profile.user._id && (
                          <Button color="primary" round href="/edit-profile">
                            Edit Profile
                          </Button>
                        )} */}
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
  student_grade: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  student_grade: state.profile,
  auth: state.auth,
  //auth so , if the profile user is viewing is of himself then edit profile button
});

export default connect(mapStateToProps, { getProfileById })(Profile);
