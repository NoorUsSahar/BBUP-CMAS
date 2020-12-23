import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../../layouts/Spinner";
import { getProfiles } from "../../../actions/adminEtc/studentprofile";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Accessibility from "@material-ui/icons/Accessibility";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardIcon from "../../../components/Card/CardIcon.js";
import CardAvatar from "../../../components/Card/CardAvatar.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import styles from "../../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import avatar from "../../../assets/img/profile.png";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(styles);

const Profiles = ({ getProfiles, student_profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const classes = useStyles();

  return (
    <Fragment>
      {loading  ? (
           <CircularProgress color="inherit" align="center" />

      ) : (
        <Fragment>
          <div className="profiles">
            <GridContainer xs={12} sm={12} md={12}>
              <GridItem xs={12} sm={6} md={12}>
                <GridContainer>
                {profiles.length > 0 ? (
                  profiles.map((profile) => (
                    
                    <GridItem xs={12} sm={6} md={6}>
                    <Card>
                      <CardHeader color="primary" stats icon>
                        <CardIcon color="info">
                          <Icon>
                            <Accessibility />
                          </Icon>
                        </CardIcon>
                        <CardAvatar profile>
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img src={avatar} alt="..." />
                          </a>
                        </CardAvatar>
                        <h2 className={classes.cardCategory}>
                          Students
                        </h2>
                        <h3 className={classes.cardTitle}>
                          Profile of {profile.Name}
                        </h3>
                      </CardHeader>
                      <CardBody>
                        <GridContainer>
                          <GridItem>
                            <h3>{profile.Name}</h3>
                            {/* <ProfileItem key={profile._id} profile={profile} /> */}
                            <p>{profile.semester}</p><br/>
                          </GridItem>
                          <GridItem>
                            <Fragment></Fragment>
                            <Fragment></Fragment>
                            <Fragment></Fragment>
                          </GridItem>
                          <GridItem>
                          <p>{profile.registrationNo}</p>
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                      <CardFooter stats>
                        <Button
                          color="info"
                          round
                          href={`/profile/${profile.user._id}`}
                        >
                          View Profile
                        </Button>
                      </CardFooter>
                    </Card>
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
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  student_profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  student_profile: state.student_profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
