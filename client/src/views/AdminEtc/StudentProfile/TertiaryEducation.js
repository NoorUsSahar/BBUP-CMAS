import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";


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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TertiaryEducation = ({student_profile , getProfileById, auth, match, ...rest
    }) => {
    const classes = useStyles();
    return (
      
      <div>
        
         <TableContainer component={Paper}>
         <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
     
            <StyledTableCell align="right">Registration Number</StyledTableCell>
            <StyledTableCell align="right">Semester</StyledTableCell>
            <StyledTableCell align="right">Section</StyledTableCell>
            <StyledTableCell align="right">Department</StyledTableCell>
            <StyledTableCell align="right">GPA</StyledTableCell>
            <StyledTableCell align="right">CGPA</StyledTableCell>
 

            </TableRow>
        </TableHead>
        <TableBody>
       
        <StyledTableRow profile>
              <StyledTableCell align="right">{student_profile.profile.registrationNo}</StyledTableCell>
              <StyledTableCell align="right">{student_profile.profile.semester}</StyledTableCell>
              <StyledTableCell align="right">{student_profile.profile.section}</StyledTableCell>
              <StyledTableCell align="right">{student_profile.profile.department}</StyledTableCell>
              <StyledTableCell align="right">{student_profile.profile.feildOfStudy}</StyledTableCell>
              <StyledTableCell align="right">{student_profile.profile.yearOfMariculatioin}</StyledTableCell>
      
           
              <StyledTableCell align="right">
              </StyledTableCell>
            </StyledTableRow>
            </TableBody>
      </Table>
         </TableContainer>
        </div>
    );
};

TertiaryEducation.propTypes = {
  student_profile : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  // auth: state.auth,
  student_profile: state.student_profile
});
export default connect(mapStateToProps)( TertiaryEducation);

