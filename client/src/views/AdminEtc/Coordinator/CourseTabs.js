import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {
  getAllUndergraduateCourses,
  getAllGraduateCourses,
  enableUndergraduateCourse,
  disableUndergraduateCourse,
  enableGraduateCourse,
  disableGraduateCourse,
  disableAllUndergraduateCourses,
  disableAllGraduateCourses,
  removeCourseById
} from '../../../actions/adminEtc/course';
import { Doughnut } from 'react-chartjs-2';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '../../../components/Table/Table.js';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`
//   };
// }

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

const CourseTabs = ({
  getAllUndergraduateCourses,
  getAllGraduateCourses,
  enableUndergraduateCourse,
  disableUndergraduateCourse,
  enableGraduateCourse,
  disableGraduateCourse,
  disableAllUndergraduateCourses,
  disableAllGraduateCourses,
  removeCourseById,
  course: { loading, undergraduateCourses, graduateCourses }
}) => {
  const classes = useStyles();

  const [undergraduateCourseList, setUndergraduateCourseList] = useState([]);

  const getUndergraduateCourses = () => {
    let res = [];
    let i = 1;

    undergraduateCourseList.forEach(course => {
      const lectureData = {
        datasets: [
          {
            backgroundColor: [
              'rgba(255, 0, 0, 0.4)',
              'rgba(0, 255, 0, 0.4)',
              'rgba(0, 0, 255, 0.4)'
            ],
            data: [
              course.lectures.totalLectures,
              course.lectures.lecturesTakenFaculty,
              course.lectures.lecturesTakenStudent
            ]
          }
        ],

        labels: [
          'Total Lectures',
          'Lectures Taken Faculty',
          'Lectures Taken Student'
        ]
      };
      const lectureOptions = {
        title: {
          display: true,
          text: 'Lecture Data'
        }
      };

      const assignmentData = {
        datasets: [
          {
            backgroundColor: [
              'rgba(255, 0, 0, 0.4)',
              'rgba(0, 255, 0, 0.4)',
              'rgba(0, 0, 255, 0.4)'
            ],
            data: [
              course.assignments.totalAssignments,
              course.assignments.assignmentsTaken
            ]
          }
        ],

        labels: ['Total Assignments', 'Assignments Taken']
      };
      const assignmentOptions = {
        title: {
          display: true,
          text: 'Lecture Data'
        }
      };

      const quizData = {
        datasets: [
          {
            backgroundColor: [
              'rgba(255, 0, 0, 0.4)',
              'rgba(0, 255, 0, 0.4)',
              'rgba(0, 0, 255, 0.4)'
            ],
            data: [course.quizes.totalQuizes, course.quizes.quizesTaken]
          }
        ],

        labels: ['Total Quizes', 'Quizes Taken']
      };
      const quizOptions = {
        title: {
          display: true,
          text: 'Lecture Data'
        }
      };

      const midTermData = {
        datasets: [
          {
            backgroundColor: [
              'rgba(255, 0, 0, 0.4)',
              'rgba(0, 255, 0, 0.4)',
              'rgba(0, 0, 255, 0.4)'
            ],
            data: [course.midTerms.totalMidTerms, course.midTerms.midTermsTaken]
          }
        ],

        labels: ['Total Mid Terms', 'Mid Terms Taken']
      };
      const midTermOptions = {
        title: {
          display: true,
          text: 'Lecture Data'
        }
      };

      res = [
        ...res,
        [
          `${i}`,
          course.name,
          course.creditHours,
          course.program.name,
          course.category === 0 ? 'Undergraduate' : 'Graduate',
          <Fragment>
            <Button
              onClick={handleClickOpen}
              variant='contained'
              className='margin-left-right margin-top-bottom button-info'
            >
              View
            </Button>
            <Dialog
              onClose={handleClose}
              aria-labelledby='customized-dialog-title'
              open={open}
              maxWidth='lg'
              fullWidth
            >
              <DialogTitle id='customized-dialog-title' onClose={handleClose}>
                Course Data
              </DialogTitle>
              <DialogContent dividers>
                <Typography gutterBottom>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}>
                      <Doughnut
                        width={5}
                        height={5}
                        data={lectureData}
                        options={lectureOptions}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <Doughnut
                        width={5}
                        height={5}
                        data={assignmentData}
                        options={assignmentOptions}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <Doughnut
                        width={5}
                        height={5}
                        data={midTermData}
                        options={midTermOptions}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <Doughnut
                        width={5}
                        height={5}
                        data={quizData}
                        options={quizOptions}
                      />
                    </GridItem>
                  </GridContainer>
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose} color='primary'>
                  Save changes
                </Button>
              </DialogActions>
            </Dialog>

            <Link
              to={`/coordinator/update-course/${course._id}`}
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
            {course.isOffered ? (
              <Button
                variant='contained'
                className='margin-left-right margin-top-bottom button-function'
                onClick={() => disableUndergraduateCourse(course._id)}
              >
                Disable
              </Button>
            ) : (
              <Button
                variant='contained'
                className='margin-left-right margin-top-bottom button-function'
                onClick={() => enableUndergraduateCourse(course._id)}
              >
                Enable
              </Button>
            )}
            <Button
              variant='contained'
              className='margin-left-right margin-top-bottom button-danger'
              onClick={() => removeCourseById(course._id)}
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

  const [graduateCourseList, setGraduateCourseList] = useState([]);

  const getGraduateCourses = () => {
    let res = [];
    let i = 1;

    graduateCourseList.forEach(course => {
      res = [
        ...res,
        `${i}`,
        course.name,
        course.creditHours,
        course.program.name,
        course.category.toString(),
        <Fragment>
          <Link
            to={`/coordinator/update-course/${course._id}`}
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
          {course.isOffered ? (
            <Button
              variant='contained'
              className='margin-left-right margin-top-bottom button-function'
              onClick={() => disableGraduateCourse(course._id)}
            >
              Disable
            </Button>
          ) : (
            <Button
              variant='contained'
              className='margin-left-right margin-top-bottom button-function'
              onClick={() => enableGraduateCourse(course._id)}
            >
              Enable
            </Button>
          )}
          <Button
            variant='contained'
            className='margin-left-right margin-top-bottom button-danger'
            onClick={() => removeCourseById(course._id)}
          >
            Remove
          </Button>
        </Fragment>
      ];
      i++;
    });
    return res;
  };

  const [
    getAllUndergraduateCoursesCalled,
    setGetAllUndergraduateCoursesCalled
  ] = useState(false);

  useEffect(() => {
    if (!getAllUndergraduateCoursesCalled) {
      getAllUndergraduateCourses();
      setGetAllUndergraduateCoursesCalled(true);
    }

    setUndergraduateCourseList(
      !loading && undergraduateCourses.length > 0 ? undergraduateCourses : []
    );
  }, [undergraduateCourses]);

  const [
    getAllGraduateCoursesCalled,
    setGetAllGraduateCoursesCalled
  ] = useState(false);

  useEffect(() => {
    if (!getAllGraduateCoursesCalled) {
      getAllGraduateCourses();
      setGetAllGraduateCoursesCalled(true);
    }

    setGraduateCourseList(
      !loading && graduateCourses.length > 0 ? graduateCourses : []
    );
  }, [graduateCourses]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
          variant='fullWidth'
        >
          <Tab label='Undergraduate Courses' {...a11yProps(0)} />
          <Tab label='Graduate Courses' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Link
          to='/coordinator/create-undergraduate-major-course'
          className='text-decoration-none'
        >
          <Button color='primary' variant='contained'>
            Add Undergraduate Major Course
          </Button>
        </Link>
        &nbsp;
        <Link
          to='/coordinator/create-undergraduate-minor-course'
          className='text-decoration-none'
        >
          <Button color='primary' variant='contained'>
            Add Undergraduate Minor Course
          </Button>
        </Link>
        <Button
          variant='contained'
          className='margin-left-right margin-top-bottom button-function'
          onClick={() => disableAllUndergraduateCourses()}
        >
          Disable All Undergraduate Course
        </Button>
        {undergraduateCourseList.length > 0 ? (
          <Table
            tableHeaderColor='primary'
            tableHead={[
              'S.No',
              'Name',
              'Credit Hours',
              'Program',
              'Category',
              'Actions'
            ]}
            tableData={getUndergraduateCourses()}
            // tableData={[]}
          />
        ) : (
          <div className='text-center imp-message'>No courses found</div>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Link
          to='/coordinator/create-graduate-course'
          className='text-decoration-none'
        >
          <Button color='primary' variant='contained'>
            Add Graduate Course
          </Button>
          {/* {console.log('error')} */}
        </Link>
        <Button
          variant='contained'
          className='margin-left-right margin-top-bottom button-function'
          onClick={() => disableAllGraduateCourses()}
        >
          Disable All Graduate Course
        </Button>

        {graduateCourseList.length > 0 ? (
          <Table
            tableHeaderColor='primary'
            tableHead={[
              'S.No',
              'Name',
              'Credit Hours',
              'Program',
              'Category',
              'Actions'
            ]}
            tableData={getGraduateCourses()}
          />
        ) : (
          <div className='text-center imp-message'>No courses found</div>
        )}
      </TabPanel>
    </div>
  );
};

CourseTabs.propTypes = {
  getAllUndergraduateCourses: PropTypes.func.isRequired,
  getAllGraduateCourses: PropTypes.func.isRequired,
  enableUndergraduateCourse: PropTypes.func.isRequired,
  disableUndergraduateCourse: PropTypes.func.isRequired,
  enableGraduateCourse: PropTypes.func.isRequired,
  disableGraduateCourse: PropTypes.func.isRequired,
  disableAllUndergraduateCourses: PropTypes.func.isRequired,
  disableAllGraduateCourses: PropTypes.func.isRequired,
  removeCourseById: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  course: state.course
});

export default connect(mapStateToProps, {
  getAllUndergraduateCourses,
  getAllGraduateCourses,
  enableUndergraduateCourse,
  disableUndergraduateCourse,
  enableGraduateCourse,
  disableGraduateCourse,
  disableAllUndergraduateCourses,
  disableAllGraduateCourses,
  removeCourseById
})(withRouter(CourseTabs));
