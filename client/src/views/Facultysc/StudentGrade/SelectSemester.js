import React from "react";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import { Button, TableContainer, TableHead } from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(Semester, Button) {
  return { Semester, Button };
}

const rows = [
  createData('First Semester', <Button
  color="primary"
  variant="contained"
  round
  href="/faculty/add-assessment"
  size="medium"
>
  Selcet Assessment
</Button> ),
  createData('Second Semester',  <Button
  color="primary"
  variant="contained"
  round
  href="/faculty/add-assessment"
  size="medium"
>
  Selcet Assessment
</Button>),
  createData('Third Semester',  <Button
  color="primary"
  variant="contained"
  round
  href="/faculty/add-assessment"
  size="medium"
>
  Selcet Assessment
</Button>),
  createData('Forth Semester',  <Button
  color="primary"
  variant="contained"
  round
  href="/faculty/add-assessment"
  size="medium"
>
  Selcet Assessment
</Button>),
  createData('Fifth Semester',  <Button
  color="primary"
  variant="contained"
  round
  href="/faculty/add-assessment"
  size="medium"
>
  Selcet Assessment
</Button>),
  createData('Sixth Semester',  <Button
  color="primary"
  variant="contained"
  round
  href="/faculty/add-assessment"
  size="medium"
>
  Selcet Assessment
</Button>),
  createData('Seventh Semester',  <Button
  color="primary"
  variant="contained"
  round
  href="/faculty/add-assessment"
  size="medium"
>
  Selcet Assessment
</Button>),
  createData('Eighth Semester',  <Button
  color="primary"
  variant="contained"
  round
  href="/faculty/add-assessment"
  size="medium"
>
  Selcet Assessment
</Button>),
];

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
    color: "#fff",
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

const useStyles = makeStyles

({
  table: {
    minWidth: 650,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  return (


    <GridContainer>
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h1
            className={classes.cardTitleWhite}
            style={{ textAlign: "center" }}
          >
            Select Semester
          </h1>
        </CardHeader>
        <CardBody>
          <GridContainer>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Semester</StyledTableCell>
            <StyledTableCell align="center">Add Marks</StyledTableCell>
           
           
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow >
              <StyledTableCell component="th" scope="row" align="center">
                {row.Semester}
              </StyledTableCell>
              <StyledTableCell align="center">{row.Button}</StyledTableCell>
           
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </GridContainer>

</CardBody>
</Card>
</GridItem>
</GridContainer>

  );
}





























/*


    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4
                className={classes.cardTitleWhite}
                style={{ textAlign: "center" }}
              >
                Select Semester
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
              
                     

                <GridItem xs={12} sm={12} md={3}>
                  <Card>
                    <CardHeader color="warning">
                      <h4 className={classes.cardTitleBlack}>First semester</h4>
                    </CardHeader>
                    <CardBody></CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        round
                        variant="outlined"
                        href="/add-assessment"
                        size="medium"
                      >
                        Selcet Assessment
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={2}>
                  <Card></Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <Card>
                    <CardHeader color="warning">
                      <h4 className={classes.cardTitleBlack}>
                        Second semester
                      </h4>
                    </CardHeader>
                    <CardBody></CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href="/add-assessment"
                        size="medium"
                      >
                        Selcet Assessment
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={2}>
                  <Card></Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={2}>
                  <Card></Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Card>
                    <CardHeader color="warning">
                      <h4 className={classes.cardTitleBlack}>Third semester</h4>
                    </CardHeader>
                    <CardBody></CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href="/add-assessment"
                        size="medium"
                      >
                        Selcet Assessment
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={2}>
                  <Card></Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <Card>
                    <CardHeader color="warning">
                      <h4 className={classes.cardTitleBlack}>Forth semester</h4>
                    </CardHeader>
                    <CardBody></CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href="/add-assessment"
                        size="medium"
                      >
                        Selcet Assessment
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={2}>
                  <Card></Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Card></Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <Card>
                    <CardHeader color="warning">
                      <h4 className={classes.cardTitleBlack}>Fifth semester</h4>
                    </CardHeader>
                    <CardBody></CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href="/add-assessment"
                        size="medium"
                      >
                        Selcet Assessment
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={2}>
                  <Card></Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <Card>
                    <CardHeader color="warning">
                      <h4 className={classes.cardTitleBlack}>Sixth semester</h4>
                    </CardHeader>
                    <CardBody></CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href="/add-assessment"
                        size="medium"
                      >
                        Selcet Assessment
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={2}>
                  <Card></Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Card></Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Card>
                    <CardHeader color="warning">
                      <h4 className={classes.cardTitleBlack}>
                        Seventh semester
                      </h4>
                    </CardHeader>
                    <CardBody></CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href="/add-assessment"
                        size="medium"
                      >
                        Selcet Assessment
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={2}>
                  <Card></Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <Card>
                    <CardHeader color="warning">
                      <h4 className={classes.cardTitleBlack}>
                        Eighth semester
                      </h4>
                    </CardHeader>
                    <CardBody></CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        variant="outlined"
                        round
                        href="/add-assessment"
                        size="medium"
                      >
                        Select Assessment
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
  


SelectSemester.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
 
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  
});

*/