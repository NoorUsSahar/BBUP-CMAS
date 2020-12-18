import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { getAllDepartments } from '../../../actions/adminEtc/department';
import { getAllUndergraduatePrograms } from '../../../actions/adminEtc/program';
import { getAllSections } from '../../../actions/adminEtc/section';
import { setAlert } from '../../../actions/adminEtc/alert';
import {
  updateUndergraduateCourse,
  getAllUndergraduateCourses,
  getCourseById
} from '../../../actions/adminEtc/course';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardBody from '../../../components/Card/CardBody.js';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
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

const UpdateUndergraduateCourse = ({
  updateUndergraduateCourse,
  getAllUndergraduateCourses,
  getAllUndergraduatePrograms,
  getAllDepartments,
  getAllSections,
  getCourseById,
  setAlert,
  history,
  course: { loading: courseLoading, undergraduateCourses, course },
  program: { loading: programLoading, undergraduatePrograms },
  department: { loading: departmentLoading, departments },
  section: { loading: sectionLoading, sections },
  match
}) => {
  const classes = useStyles(styles);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    creditHours: '',
    fee: '',
    preRequisite: '',
    minimumAttendanceRequiredForTerminals: '',
    courseLearningOutcomes: '',
    programLearningOutcomes: '',
    totalLectures: '',
    lecturesTakenFaculty: '',
    lecturesTakenStudent: '',
    totalAssignments: '',
    assignmentsTaken: '',
    totalQuizes: '',
    quizesTaken: '',
    totalMidTerms: '',
    midTermsTaken: '',
    totalLabs: '',
    labsTakenFaculty: '',
    labsTakenStudent: '',
    labManual: '',
    labProjectTotalMarks: '',
    labTerminalTotalMarks: '',
    program: '',
    department: '',
    section: ''
  });

  const {
    name,
    description,
    creditHours,
    fee,
    preRequisite,
    minimumAttendanceRequiredForTerminals,
    courseLearningOutcomes,
    programLearningOutcomes,
    totalLectures,
    lecturesTakenFaculty,
    lecturesTakenStudent,
    totalAssignments,
    assignmentsTaken,
    totalQuizes,
    quizesTaken,
    totalMidTerms,
    midTermsTaken,
    totalLabs,
    labsTakenFaculty,
    labsTakenStudent,
    labManual,
    labProjectTotalMarks,
    labTerminalTotalMarks,
    program,
    department,
    section
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (program === '' || department === '' || section === '') {
      setAlert('Please fill all the fields in order to proceed.');
    } else {
      updateUndergraduateCourse(match.params.id, formData, history);
    }
  };

  const [getAllDepartmentsCalled, setGetAllDepartmentsCalled] = useState(false);

  useEffect(() => {
    if (!getAllDepartmentsCalled) {
      getAllDepartments();
      setGetAllDepartmentsCalled(true);
    }
  }, []);

  const [
    getAllUndergraduateCoursesCalled,
    setGetAllUndergraduateCoursesCalled
  ] = useState(false);

  useEffect(() => {
    if (!getAllUndergraduateCoursesCalled) {
      getAllUndergraduateCourses();
      setGetAllUndergraduateCoursesCalled(true);
    }
  }, []);

  const [
    getAllUndergraduateProgramsCalled,
    setGetAllUndergraduateProgramsCalled
  ] = useState(false);

  useEffect(() => {
    if (!getAllUndergraduateProgramsCalled) {
      getAllUndergraduatePrograms();
      setGetAllUndergraduateProgramsCalled(true);
    }
  }, []);

  const [getAllSectionsCalled, setGetAllSectionsCalled] = useState(false);

  useEffect(() => {
    if (!getAllSectionsCalled) {
      getAllSections();
      setGetAllSectionsCalled(true);
    }
  }, []);

  const [getCourseByIdCalled, setGetCourseByIdCalled] = useState(false);

  useEffect(() => {
    if (!getCourseByIdCalled) {
      getCourseById(match.params.id);
      setGetCourseByIdCalled(true);
    }

    setFormData({
      name: !courseLoading && course !== null ? course.name : '',
      description: !courseLoading && course !== null ? course.description : '',
      creditHours: !courseLoading && course !== null ? course.creditHours : '',
      fee: !courseLoading && course !== null ? course.fee : '',
      preRequisite:
        !courseLoading && course !== null ? course.preRequisite : '',
      minimumAttendanceRequiredForTerminals:
        !courseLoading && course !== null
          ? course.minimumAttendanceRequiredForTerminals
          : '',
      courseLearningOutcomes:
        !courseLoading && course !== null ? course.courseLearningOutcomes : '',
      programLearningOutcomes:
        !courseLoading && course !== null ? course.programLearningOutcomes : '',
      totalLectures:
        !courseLoading && course !== null ? course.lectures.totalLectures : '',
      lecturesTakenFaculty:
        !courseLoading && course !== null
          ? course.lectures.lecturesTakenFaculty
          : '',
      lecturesTakenStudent:
        !courseLoading && course !== null
          ? course.lectures.lecturesTakenStudent
          : '',
      totalAssignments:
        !courseLoading && course !== null
          ? course.assignments.totalAssignments
          : '',
      assignmentsTaken:
        !courseLoading && course !== null
          ? course.assignments.assignmentsTaken
          : '',
      totalQuizes:
        !courseLoading && course !== null ? course.quizes.totalQuizes : '',
      quizesTaken:
        !courseLoading && course !== null ? course.quizes.quizesTaken : '',
      totalMidTerms:
        !courseLoading && course !== null ? course.midTerms.totalMidTerms : '',
      midTermsTaken:
        !courseLoading && course !== null ? course.midTerms.midTermsTaken : '',
      totalLabs: !courseLoading && course !== null ? course.labs.totalLabs : '',
      labsTakenFaculty:
        !courseLoading && course !== null ? course.labs.labsTakenFaculty : '',
      labsTakenStudent:
        !courseLoading && course !== null ? course.labs.labsTakenStudent : '',
      labManual: !courseLoading && course !== null ? course.labs.labManual : '',
      labProjectTotalMarks:
        !courseLoading && course !== null
          ? course.labs.labProjectTotalMarks
          : '',
      labTerminalTotalMarks:
        !courseLoading && course !== null
          ? course.labs.labTerminalTotalMarks
          : '',
      program: !courseLoading && course !== null ? course.program : '',
      department: !courseLoading && course !== null ? course.department : '',
      section: !courseLoading && course !== null ? course.section : ''
    });
  }, [course]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>
              Update an Undergraduate Major Course
            </h4>
            <p className={classes.cardCategoryWhite}>
              Fill in the information below to update an undergraduate major
              course
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={e => onSubmit(e)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Name'
                    variant='outlined'
                    type='text'
                    name='name'
                    value={name}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Description'
                    variant='outlined'
                    type='text'
                    name='description'
                    value={description}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Credit Hours'
                    variant='outlined'
                    type='number'
                    name='creditHours'
                    value={creditHours}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Fee per Semester (Rs.)'
                    variant='outlined'
                    type='number'
                    name='fee'
                    value={fee}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl variant='outlined' className='form-control'>
                    <InputLabel id='preRequisite-label'>
                      Pre-requisite
                    </InputLabel>
                    <Select
                      labelId='preRequisite-label'
                      label='preRequisite'
                      name='preRequisite'
                      value={preRequisite}
                      onChange={e => onChange(e)}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {!courseLoading &&
                        // semester !== null &&
                        undergraduateCourses.length > 0 &&
                        undergraduateCourses.map(course => (
                          <MenuItem value={`${course._id}`}>
                            {course.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Min Attendance Required'
                    variant='outlined'
                    type='number'
                    name='minimumAttendanceRequiredForTerminals'
                    value={minimumAttendanceRequiredForTerminals}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Course Learning Outcomes'
                    variant='outlined'
                    type='text'
                    name='courseLearningOutcomes'
                    value={courseLearningOutcomes}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Program Learning Outcomes'
                    variant='outlined'
                    type='text'
                    name='programLearningOutcomes'
                    value={programLearningOutcomes}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Total Lectures'
                    variant='outlined'
                    type='number'
                    name='totalLectures'
                    value={totalLectures}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Lectures Taken By Faculty'
                    variant='outlined'
                    type='number'
                    name='lecturesTakenFaculty'
                    value={lecturesTakenFaculty}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Lectures Taken By Students'
                    variant='outlined'
                    type='number'
                    name='lecturesTakenStudent'
                    value={lecturesTakenStudent}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Total Assignments'
                    variant='outlined'
                    type='number'
                    name='totalAssignments'
                    value={totalAssignments}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Assignments Taken'
                    variant='outlined'
                    type='number'
                    name='assignmentsTaken'
                    value={assignmentsTaken}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Total Quizes'
                    variant='outlined'
                    type='number'
                    name='totalQuizes'
                    value={totalQuizes}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Quizes Taken'
                    variant='outlined'
                    type='number'
                    name='quizesTaken'
                    value={quizesTaken}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Total Mid Terms'
                    variant='outlined'
                    type='number'
                    name='totalMidTerms'
                    value={totalMidTerms}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Mid Terms Taken'
                    variant='outlined'
                    type='number'
                    name='midTermsTaken'
                    value={midTermsTaken}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Total Labs'
                    variant='outlined'
                    type='number'
                    name='totalLabs'
                    value={totalLabs}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Labs Taken By Faculty'
                    variant='outlined'
                    type='number'
                    name='labsTakenFaculty'
                    value={labsTakenFaculty}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Labs Taken By Student'
                    variant='outlined'
                    type='number'
                    name='labsTakenStudent'
                    value={labsTakenStudent}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Labs Manual'
                    variant='outlined'
                    type='text'
                    name='labManual'
                    value={labManual}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Lab Projects Total Marks'
                    variant='outlined'
                    type='number'
                    name='labProjectTotalMarks'
                    value={labProjectTotalMarks}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Lab Terminal Total Marks'
                    variant='outlined'
                    type='number'
                    name='labTerminalTotalMarks'
                    value={labTerminalTotalMarks}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl variant='outlined' className='form-control'>
                    <InputLabel id='program-label'>Program</InputLabel>
                    <Select
                      labelId='program-label'
                      label='program'
                      name='program'
                      value={program}
                      onChange={e => onChange(e)}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {!programLoading &&
                        // semester !== null &&
                        undergraduatePrograms.length > 0 &&
                        undergraduatePrograms.map(program => (
                          <MenuItem value={`${program._id}`}>
                            {program.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl variant='outlined' className='form-control'>
                    <InputLabel id='department-label'>Department</InputLabel>
                    <Select
                      labelId='department-label'
                      label='department'
                      name='department'
                      value={department}
                      onChange={e => onChange(e)}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {!departmentLoading &&
                        // semester !== null &&
                        departments.length > 0 &&
                        departments.map(department => (
                          <MenuItem value={`${department._id}`}>
                            {department.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl variant='outlined' className='form-control'>
                    <InputLabel id='section-label'>Section</InputLabel>
                    <Select
                      labelId='section-label'
                      label='section'
                      name='section'
                      value={section}
                      onChange={e => onChange(e)}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {!sectionLoading &&
                        // semester !== null &&
                        sections.length > 0 &&
                        sections.map(section => (
                          <MenuItem value={`${section._id}`}>
                            {section.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    color='secondary'
                    variant='contained'
                    type='submit'
                    size='large'
                  >
                    Submit
                  </Button>
                  &nbsp;
                  <Link
                    to={'/coordinator/manage-courses'}
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
              </GridContainer>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

UpdateUndergraduateCourse.propTypes = {
  updateUndergraduateCourse: PropTypes.func.isRequired,
  getAllUndergraduateCourses: PropTypes.func.isRequired,
  getAllUndergraduatePrograms: PropTypes.func.isRequired,
  getAllDepartments: PropTypes.func.isRequired,
  getAllSections: PropTypes.func.isRequired,
  getCourseById: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  department: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
  program: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  department: state.department,
  section: state.section,
  program: state.program,
  course: state.course
});

export default connect(mapStateToProps, {
  updateUndergraduateCourse,
  getAllUndergraduateCourses,
  getAllUndergraduatePrograms,
  getAllDepartments,
  getAllSections,
  getCourseById,
  setAlert
})(withRouter(UpdateUndergraduateCourse));
