import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllSections, removeSection } from '../../../actions/adminEtc/section';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import Table from '../../../components/Table/Table.js';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardBody from '../../../components/Card/CardBody.js';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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

const stylesCustom = {
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

const useStyles = makeStyles(stylesCustom);

const ManageSections = ({
  getAllSections,
  removeSection,
  section: { loading, sections },
  course: { course, undergraduateCourses, graduateCourses }
}) => {
  const classes = useStyles(stylesCustom);

  const [sectionsList, setSectionsList] = useState([]);

  const getSections = () => {
    let res = [];
    let i = 1;

    sectionsList.forEach(section => {
      // const lectureData = {
      //   datasets: [
      //     {
      //       backgroundColor: [
      //         'rgba(255, 0, 0, 0.4)',
      //         'rgba(0, 255, 0, 0.4)',
      //         'rgba(0, 0, 255, 0.4)'
      //       ],
      //       data: [
      //         course.lectures.totalLectures,
      //         course.lectures.lecturesTakenFaculty,
      //         course.lectures.lecturesTakenStudent
      //       ]
      //     }
      //   ],

      //   labels: [
      //     'Total Lectures',
      //     'Lectures Taken Faculty',
      //     'Lectures Taken Student'
      //   ]
      // };
      // const lectureOptions = {
      //   title: {
      //     display: true,
      //     text: 'Lecture Data'
      //   }
      // };

      res = [
        ...res,
        [
          `${i}`,
          section.name,
          section.maximumStrength,
          section.currentNumberOfStudents,
          // section.semester.name,
          <Fragment>
            <Link
              to={`/coordinator/section-courses/${section._id}`}
              className='text-decoration-none'
            >
              <Button
                variant='contained'
                className='button-info margin-left-right margin-top-bottom'
                // onClick={handleClickOpen}
              >
                Courses
              </Button>
            </Link>
            {/* <Dialog
              onClose={handleClose}
              aria-labelledby='customized-dialog-title'
              open={open}
              maxWidth='lg'
              fullWidth
            >
              <DialogTitle id='customized-dialog-title' onClose={handleClose}>
                Section Courses
              </DialogTitle>
              <DialogContent dividers>
                <Typography gutterBottom>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}></GridItem>
                  </GridContainer>
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose} color='primary'>
                  Save changes
                </Button>
              </DialogActions>
            </Dialog> */}

            <Link
              to={`/coordinator/update-section/${section._id}`}
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
            {/* <Link
              to={`/coordinator/update-section/${section._id}`}
              className='text-decoration-none'
            > */}
            <Button
              variant='contained'
              className='margin-left-right margin-top-bottom button-danger'
              onClick={() => removeSection(section._id)}
            >
              Remove
            </Button>
            {/* </Link> */}
          </Fragment>
        ]
      ];
      i++;
    });
    return res;
  };

  const [getAllSectionsCalled, setGetAllSectionsCalled] = useState(false);

  useEffect(() => {
    if (!getAllSectionsCalled) {
      getAllSections();
      setGetAllSectionsCalled(true);
    }

    setSectionsList(
      !loading && sections !== null && sections.length > 0 ? sections : []
    );
  }, [sections]);

  // const [value, setValue] = React.useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Manage Sections</h4>
            <p className={classes.cardCategoryWhite}>
              Below is the list of all sections
            </p>
          </CardHeader>
          <CardBody>
            <Link
              to='/coordinator/create-section'
              className='text-decoration-none'
            >
              <Button color='primary' variant='contained'>
                Add Section
              </Button>
            </Link>
            {sectionsList.length > 0 ? (
              <Table
                tableHeaderColor='primary'
                tableHead={[
                  'S.No',
                  'Name',
                  'Maximum Strength',
                  'Current Students',
                  // 'Semester',
                  'Actions'
                ]}
                tableData={getSections()}
              />
            ) : (
              <div className='text-center imp-message'>No sections found</div>
            )}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

ManageSections.propTypes = {
  getAllSections: PropTypes.func.isRequired,
  removeSection: PropTypes.func.isRequired,
  section: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  section: state.section,
  course: state.course
});

export default connect(mapStateToProps, { getAllSections, removeSection })(
  ManageSections
);
