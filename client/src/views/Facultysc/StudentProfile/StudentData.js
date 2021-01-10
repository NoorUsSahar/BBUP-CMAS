import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
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

const StudentData = ({student_grade  , getProfileById, auth, match, 
    }) => {
    const classes = useStyles();
    return (
      
      <div>
        <h3 className={classes.cardCategory}>
                  {student_grade.student_profile.Name}
              </h3>
              <h3 className={classes.cardCategory}>
                  {student_grade.student_profile.registrationNo}
              </h3>
              <h3 className={classes.cardCategory}>
                {student_grade.student_profile.semester} 
                {student_grade.student_profile.section}
              </h3>
                    
        
        </div>
    );
};

StudentData.propTypes = {
    student_grade : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  // auth: state.auth,
  student_grade: state.student_grade
});
export default connect(mapStateToProps)(StudentData);

