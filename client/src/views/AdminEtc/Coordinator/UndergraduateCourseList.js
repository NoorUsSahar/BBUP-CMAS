import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, Link } from 'react-router-dom';
import { getAllUndergraduateCourses } from '../../../actions/adminEtc/course';
import {
  getApplicantById,
  registeCourse,
  removeCourse
} from '../../../actions/adminEtc/applicant';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Card from '../../../components/Card/Card';
import CardHeader from '../../../components/Card/CardHeader';
import CardBody from '../../../components/Card/CardBody';
import Table from '../../../components/Table/Table.js';
import {
  Button,
  Checkbox
} from '@material-ui/core';

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

const UndergraudateCourseList = ({
  getApplicantById,
  registeCourse,
  removeCourse,
  getAllUndergraduateCourses,
  history,
  applicant: { applicant },
  course: { loading, undergraduateCourses },
  auth,
  match
}) => {
  const classes = useStyles(styles);

  const [undergraduateCoursesList, setUndergraduateCoursesList] = useState([]);

  const getUndergraduateCourses = () => {
    let res = [];
    let i = 1;

    undergraduateCoursesList.forEach(course => {
      if (course.isOffered) {
        res = [
          ...res,
          [
            `${i}`,
            course.name,
            course.description,
            course.creditHours,
            <Fragment>
              <Checkbox
                checked={
                  applicant &&
                  applicant.registeredCourses
                    .map(course => course.course)
                    .indexOf(course._id) !== -1
                }
                onChange={() =>
                  applicant.registeredCourses
                    .map(course => course.course)
                    .indexOf(course._id) !== -1
                    ? removeCourse(course._id, match.params.id)
                    : registeCourse(course._id, match.params.id)
                }
              />
            </Fragment>
          ]
        ];
        i++;
      }
    });
    return res;
  };

  const [getCurrentApplicantCalled, setGetCurrentApplicantCalled] = useState(
    false
  );

  useEffect(() => {
    if (!getCurrentApplicantCalled) {
      getApplicantById(match.params.id);
      setGetCurrentApplicantCalled(true);
    }
  }, []);

  const [
    getAllUndergraduateCoursesCalled,
    setgetAllUndergraduateCoursesCalled
  ] = useState(false);

  useEffect(() => {
    if (!getAllUndergraduateCoursesCalled) {
      getAllUndergraduateCourses();
      setgetAllUndergraduateCoursesCalled(true);
    }

    setUndergraduateCoursesList(
      !loading && undergraduateCourses.length > 0 ? undergraduateCourses : []
    );
  }, [undergraduateCourses]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>
              Undergraduate Course List
            </h4>
            <p className={classes.cardCategoryWhite}>
              Select from the list of all undergraduate courses offered for this
              student
            </p>
          </CardHeader>
          <CardBody>
            {undergraduateCoursesList.length > 0 &&
            getUndergraduateCourses().length > 0 ? (
              <Fragment>
                <Table
                  tableHeaderColor='primary'
                  tableHead={[
                    'S.No',
                    'Name',
                    'Description',
                    'Credit Hours',
                    'Select'
                  ]}
                  tableData={getUndergraduateCourses()}
                />
                &nbsp;
                <GridItem xs={12} sm={12} md={12}>
                  <Link
                    to='/coordinator/manage-students'
                    className='text-decoration-none'
                  >
                    <Button
                      color='secondary'
                      variant='contained'
                      type='submit'
                      size='large'
                    >
                      Save
                    </Button>
                  </Link>
                  &nbsp;
                  <Link
                    to={'/coordinator/manage-students'}
                    className='text-decoration-none'
                  >
                    <Button
                      color='primary'
                      variant='contained'
                      type='submit'
                      size='large'
                    >
                      Back
                    </Button>
                  </Link>
                </GridItem>
              </Fragment>
            ) : (
              <div className='text-center imp-message'>
                Admissions are currently closed
                <GridItem xs={12} sm={12} md={12}>
                  <Link
                    to={'/applicant/dashboard'}
                    className='text-decoration-none'
                  >
                    <Button
                      style={{ marginTop: '20px' }}
                      color='primary'
                      variant='contained'
                      type='submit'
                      size='large'
                    >
                      Back
                    </Button>
                  </Link>
                </GridItem>
              </div>
            )}
            &nbsp;
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

UndergraudateCourseList.propTypes = {
  getApplicantById: PropTypes.func.isRequired,
  registeCourse: PropTypes.func.isRequired,
  removeCourse: PropTypes.func.isRequired,
  getAllUndergraduateCourses: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  applicant: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  course: state.course,
  applicant: state.applicant,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getAllUndergraduateCourses,
  registeCourse,
  removeCourse,
  getApplicantById
})(withRouter(UndergraudateCourseList));
