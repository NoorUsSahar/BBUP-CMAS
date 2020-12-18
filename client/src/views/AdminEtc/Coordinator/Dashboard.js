import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  getAllEnrollmentSemesters,
  enableEnrollmentSemesterById,
  disableEnrollmentSemesterById,
  removeEnrollmentSemesterById,
  generateSectionList,
  generateCourseList
} from '../../../actions/adminEtc/enrollment';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Card from '../../../components/Card/Card';
import CardHeader from '../../../components/Card/CardHeader';
import CardBody from '../../../components/Card/CardBody';
import Table from '../../../components/Table/Table.js';
import { Button } from '@material-ui/core';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '0.9rem',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF'
    }
  },
  cardCategoryBlack: {
    '&,& a, & a:hover, & a:focus': {
      color: 'rgba(0,0,0)',
      margin: '0',
      fontSize: '0.9rem',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#000000'
    }
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    fontSize: '1.3rem',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1'
    }
  }
};

const useStyles = makeStyles(styles);

const Dashboard = ({
  getAllEnrollmentSemesters,
  enableEnrollmentSemesterById,
  disableEnrollmentSemesterById,
  removeEnrollmentSemesterById,
  generateSectionList,
  generateCourseList,
  auth,
  enrollment: { loading, semesters, semester },
  match
}) => {
  const classes = useStyles(styles);

  const [semesterList, setSemesterList] = useState([]);

  const getEnrollmentSemester = () => {
    let res = [];
    let i = 1;

    semesterList.forEach(semester => {
      res = [
        ...res,
        [
          `${i}`,
          semester.name,
          semester.maximumBatchStrength,
          <Moment format='DD-MMM-YYYY'>{semester.startDate}</Moment>,
          <Moment format='DD-MMM-YYYY'>{semester.endDate}</Moment>,
          semester.program.name,
          <Fragment>
            <Link
              to={`/coordinator/update-semester-details/${semester._id}`}
              className='text-decoration-none'
            >
              <Button
                color='secondary'
                variant='contained'
                className='margin-left-right margin-top-bottom'
              >
                Update
              </Button>
            </Link>
            <Link
              to={`/coordinator/semester-details/${semester._id}`}
              className='text-decoration-none'
            >
              <Button
                variant='contained'
                className='margin-left-right margin-top-bottom button-info'
              >
                View
              </Button>
            </Link>
            <Button
              color='primary'
              variant='contained'
              className='margin-left-right margin-top-bottom'
              onClick={() => generateCourseList(semester._id)}
            >
              Generate Course List
            </Button>
            <Button
              color='primary'
              variant='contained'
              className='margin-left-right margin-top-bottom'
              onClick={() => generateSectionList(semester._id)}
            >
              Generate Section List
            </Button>
            {semester.status ? (
              <Button
                variant='contained'
                className='margin-left-right margin-top-bottom button-function'
                onClick={() => disableEnrollmentSemesterById(semester._id)}
              >
                Disable
              </Button>
            ) : (
              <Button
                variant='contained'
                className='margin-left-right margin-top-bottom button-function'
                onClick={() => {
                  console.log('enable call hua');
                  enableEnrollmentSemesterById(semester._id);
                }}
              >
                Enable
              </Button>
            )}
            <Button
              variant='contained'
              className='margin-left-right margin-top-bottom button-danger'
              onClick={() => removeEnrollmentSemesterById(semester._id)}
            >
              Remove
            </Button>
          </Fragment>
        ]
      ];
      i++;
    });
    return res;
  };

  const [getAllSemesters, setGetAllSemesters] = useState(false);

  useEffect(() => {
    if (!getAllSemesters) {
      getAllEnrollmentSemesters();
      setGetAllSemesters(true);
    }

    setSemesterList(!loading && semesters.length > 0 ? semesters : []);
    // console.log(semesters);
  }, [semesters]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>
              Manage Enrollment Semester
            </h4>
            <p className={classes.cardCategoryWhite}>
              Create and enable/disable enrollment semesters
            </p>
          </CardHeader>
          <CardBody>
            <GridItem>
              <Link
                to='/coordinator/create-enrollment-semester'
                className='text-decoration-none'
              >
                <Button color='primary' variant='contained'>
                  Create Enrollment Semester
                </Button>
              </Link>
              &nbsp;
            </GridItem>
            {semesterList.length > 0 ? (
              <Table
                tableHeaderColor='primary'
                tableHead={[
                  'S.No',
                  'Session Name',
                  'Max Batch Strength',
                  'Start Date',
                  'End Date',
                  'Program',
                  'Actions'
                ]}
                tableData={getEnrollmentSemester()}
              />
            ) : (
              <div className='text-center imp-message'>No sessions found</div>
            )}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

Dashboard.propTypes = {
  getAllEnrollmentSemesters: PropTypes.func.isRequired,
  enableEnrollmentSemesterById: PropTypes.func.isRequired,
  disableEnrollmentSemesterById: PropTypes.func.isRequired,
  removeEnrollmentSemesterById: PropTypes.func.isRequired,
  generateSectionList: PropTypes.func.isRequired,
  generateCourseList: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  enrollment: state.enrollment
});

export default connect(mapStateToProps, {
  getAllEnrollmentSemesters,
  enableEnrollmentSemesterById,
  disableEnrollmentSemesterById,
  removeEnrollmentSemesterById,
  generateSectionList,
  generateCourseList
})(withRouter(Dashboard));
