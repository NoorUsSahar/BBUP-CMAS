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
const Dashboard = ({
  getCurrentProfile,
  auth: { users },
  profile: { profile, profiles, loading },
  getProfiles,


}) => {
  useEffect(() => {
    getCurrentProfile();
    getProfiles();

  }, [getCurrentProfile, getProfiles]);

 

  const classes = useStyles();
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite} style={{textAlign: "center"}}>
                {" "}
                Student's Grades
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                  <CardHeader color="warning">
                  <h4 className={classes.cardTitleBlack}>
                    First semester
                     </h4>
                  </CardHeader>
                      <CardBody>
                        <GridContainer>
                          <GridItem>
                           
                            <Button
                              color="primary"
                              variant="outlined"
                              round
                              href={"/add-information"}
                              size="medium"
                            >
                              Add Marks
                            </Button>
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                    

                    <CardFooter stats></CardFooter>
                  </Card>
                </GridItem>
                




                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                    <CardHeader color="warning">
                      <h4 className={classes.cardTitleBlack}>Second semester</h4>
                    </CardHeader>
                    <CardBody>
                     
                    </CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href="/add-information"
                        size="medium"
                      >
                        Add Marks
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>



                
                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                    <CardHeader color="warning">
                      <h4 className={classes.cardTitleBlack}>Third semester</h4>
                    </CardHeader>
                    <CardBody>
                     
                    </CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href="/add-information"
                        size="medium"
                      >
                        Add Marks
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>



                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                    <CardHeader color="warning">
                      <h4 className={classes.cardTitleBlack}>Forth semester</h4>
                    </CardHeader>
                    <CardBody>
                     
                    </CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href="/add-information"
                        size="medium"
                      >
                        Add Marks
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>



                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                    <CardHeader color="warning">
                      <h4 className={classes.cardTitleBlack}>Fifth semester</h4>
                    </CardHeader>
                    <CardBody>
                     
                    </CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href="/add-information"
                        size="medium"
                      >
                        Add Marks
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>



                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                    <CardHeader color="warning">
                      <h4 className={classes.cardTitleBlack}>Sixth semester</h4>
                    </CardHeader>
                    <CardBody>
                     
                    </CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href="/add-information"
                        size="medium"
                      >
                        Add Marks
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>



                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                    <CardHeader color="warning">
                      <h4 className={classes.cardTitleBlack}>Seventh semester</h4>
                    </CardHeader>
                    <CardBody>
                     
                    </CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href="/add-information"
                        size="medium"
                      >
                        Add Marks
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>



                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                    <CardHeader color="warning">
                      <h4 className={classes.cardTitleBlack}>Eighth semester</h4>
                    </CardHeader>
                    <CardBody>
                     
                    </CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href="/add-information"
                        size="medium"
                      >
                        Add Marks
                      </Button>
                    </CardFooter>
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
  profile: PropTypes.object.isRequired,
 
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getProfiles
  
})(Dashboard);
