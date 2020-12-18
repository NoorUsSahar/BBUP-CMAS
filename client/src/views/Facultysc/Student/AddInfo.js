import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../../actions/adminEtc/studentprofile";
import Spinner from "../../../layouts/Spinner";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import { getProfiles } from "../../../actions/adminEtc/studentprofile";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import { Button } from "@material-ui/core";
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
const AddInfo = ({
  // getCurrentProfile,
  // auth: { users },
  // profile: { profile, profiles, loading },
  // getProfiles,
}) => {
  // useEffect(() => {
  //   // getCurrentProfile();
  //   // getProfiles();
  // }, [getCurrentProfile, getProfiles]);

  const classes = useStyles();
  return  (
   
    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4
                className={classes.cardTitleWhite}
                style={{ textAlign: "center" }}
              >
                {" "}
                Add Marks
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                    <CardHeader color="info">
                      <h4 className={classes.cardTitleBlack}>Quiz</h4>
                    </CardHeader>
                    <CardBody>
                      <GridContainer>
                        <GridItem>
                          <Button
                            color="primary"
                            variant="outlined"
                            round
                            href={"/faculty/select-course"}
                            size="medium"
                            onClick={() => "/faculty/select-course"}
                          >
                            Select courses
                          </Button>
                        </GridItem>
                      </GridContainer>
                    </CardBody>

                    <CardFooter stats></CardFooter>
                  </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                    <CardHeader color="info">
                      <h4 className={classes.cardTitleBlack}>Assignment</h4>
                    </CardHeader>
                    <CardBody></CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href={"/faculty/select-course"}
                        size="medium"
                        onClick={() => "/faculty/select-course"}
                      >
                        Select courses
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                    <CardHeader color="info">
                      <h4 className={classes.cardTitleBlack}>Mid Term</h4>
                    </CardHeader>
                    <CardBody></CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href={"/faculty/select-course"}
                        size="medium"
                        onClick={() => "/faculty/select-course"}
                      >
                        Select courses
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                    <CardHeader color="info">
                      <h4 className={classes.cardTitleBlack}>Project </h4>
                    </CardHeader>
                    <CardBody></CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href={"/faculty/select-course"}
                        size="medium"
                        onClick={() => "/faculty/select-course"}
                      >
                        Select courses
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                    <CardHeader color="success">
                      <h4 className={classes.cardTitleBlack}>Final</h4>
                    </CardHeader>
                    <CardBody></CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href={"/faculty/select-course"}
                        size="medium"
                        onClick={() => "/faculty/select-course"}
                      >
                        Select courses
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>
              <Button variant="contained" color="primary">
                Save
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Fragment>
  );
};

// AddInfo.propTypes = {
//   getCurrentProfile: PropTypes.func.isRequired,
//   getProfiles: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   profile: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   profile: state.profile,
// });

// export default connect(mapStateToProps, {
//   getCurrentProfile,
//   getProfiles,
// })(AddInfo);

export default AddInfo;