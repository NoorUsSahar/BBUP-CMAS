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

const CourseMarks = ({student_grade , getProfileById, auth, match, 
    }) => {
    const classes = useStyles();
    return (
      
      <div>
        
         <TableContainer component={Paper}>
         <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
     
            <StyledTableCell align="center">ECA</StyledTableCell>
            <StyledTableCell align="center">ICP</StyledTableCell>
            <StyledTableCell align="center">English</StyledTableCell>
            <StyledTableCell align="center">Calculus</StyledTableCell>
            <StyledTableCell align="center">Islamiat</StyledTableCell>
            

            </TableRow>
        </TableHead>
        <TableBody>
       
        <StyledTableRow profile>
              <StyledTableCell align="center">{student_grade.student_profile.ECA}</StyledTableCell>
              <StyledTableCell align="center">{student_grade.student_profile.ICP}</StyledTableCell>
              <StyledTableCell align="center">{student_grade.student_profile.ENG}</StyledTableCell>
              <StyledTableCell align="center">{student_grade.student_profile.Cal}</StyledTableCell>
              <StyledTableCell align="center">{student_grade.student_profile.ISL}</StyledTableCell>
             
             
            </StyledTableRow>
            </TableBody>
      </Table>
         </TableContainer>
        </div>
    );
};

CourseMarks.propTypes = {
    student_grade : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  // auth: state.auth,
  student_grade: state.student_grade
});
export default connect(mapStateToProps)(CourseMarks);

