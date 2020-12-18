import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../../../layouts/Spinner";
import { getAllFaculties , deleteAccount } from "../../../../actions/adminEtc/profile";
//import ChartistGraph from "react-chartist";
// @material-ui/core
import { withStyles, makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../../../components/Grid/GridItem.js";
import GridContainer from "../../../../components/Grid/GridContainer.js";
import Card from "../../../../components/Card/Card.js";
import CardHeader from "../../../../components/Card/CardHeader.js";
import CardBody from "../../../../components/Card/CardBody.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonIcon from "@material-ui/icons/Person";
import ButtonGroup from "@material-ui/core/ButtonGroup";

// const useStyles = makeStyles(styles);
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const Profiles = ({ getAllFaculties, faculties, deleteAccount }) => {
  useEffect(() => {
    getAllFaculties();
  }, [getAllFaculties]);


  const classes = useStyles();

  return (
    <Fragment>
      <Card>
        <CardHeader color="primary">
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h2 className={classes.cardTitleWhite}>Manage Faculy</h2>
              <p className={classes.cardCategoryWhite}>
                Below is a list of all the faculty members
              </p>
            </GridItem>
            <GridItem xs={12} sm={12} md={6} align="right">
              <Button
                color="secondary"
                aria-label="Delete"
                variant="contained"
                //   className={classes.buttonLink}
                // onClick={}
                //  startIcon={<DeleteIcon />}
                href="/admin/faculty/register-faculty"
              >
                Add Faculty Member
              </Button>
            </GridItem>
          </GridContainer>
        </CardHeader>
        <CardBody>
          <Fragment>
            {faculties.loading ? (
              <Spinner />
            ) : (
              <Fragment>
                <div className="profiles">
                  <GridContainer xs={12} sm={12} md={12}>
                    <GridItem xs={12} sm={6} md={12}>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <TableContainer component={Paper}>
                            <Table
                              className={classes.table}
                              aria-label="customized table"
                            >
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell align="left">
                                    Name
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                    Email
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                    Designation
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {/*                                   
                                    <SearchField
                                    // placeholder="Search..."
                                    // // onChange={onChange}
                                    // // searchText="This is initial search text"
                                    // classNames="test-class"
                                  /> */}
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              {faculties.profile.length > 0 ? (
                                faculties.profile.map((profile, index) => (
                                  <TableBody>
                                    <StyledTableRow
                                      key={index}
                                      profile={profile}
                                    >
                                      <StyledTableCell align="left">
                                        {profile.name}
                                      </StyledTableCell>

                                      <StyledTableCell align="left">
                                        {profile.email}
                                      </StyledTableCell>
                                      <StyledTableCell align="left">
                                        {profile.email}
                                      </StyledTableCell>
                                      <StyledTableCell align="right">
                                        {/* <ButtonGroup
                                          variant="text"
                                          color="primary"
                                          aria-label="text primary button group"
                                        > */}
                                          <Button
                                            color="primary"
                                            aria-label="View"
                                            // variant="contained"
                                            //   className={classes.buttonLink}
                                            // onClick={}
                                            startIcon={<PersonIcon />}
                                            href={`/admin/faculty/profile/${profile._id}`}
                                          >
                                            View
                                          </Button>
                                          {/* <Button
                                            color="secondary"
                                            aria-label="Delete"
                                            // variant="contained"
                                            //   className={classes.buttonLink}
                                            // onClick={}
                                            startIcon={<DeleteIcon />}
                                            // onClick = {del(profile._id)}
                                          >
                                            Delete
                                          </Button> */}
                                        {/* </ButtonGroup> */}
                                        {/* {profile.designation} */}
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  </TableBody>
                                ))
                              ) : (
                                <h4>No Profiles Found</h4>
                              )}
                            </Table>
                          </TableContainer>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </div>
              </Fragment>
            )}
          </Fragment>
        </CardBody>
      </Card>
    </Fragment>
  );
};

Profiles.propTypes = {
  getAllFaculties: PropTypes.func.isRequired,
  faculties: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  faculties: state.faculties,
});

export default connect(mapStateToProps, { getAllFaculties, deleteAccount })(
  Profiles
);
