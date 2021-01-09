import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  createUndergraduateMinorCourse,
  getAllUndergraduateCourses,
} from '../../../actions/adminEtc/course';
import { getAllDepartments } from '../../../actions/adminEtc/department';
import { getAllUndergraduatePrograms } from '../../../actions/adminEtc/program';
import { getAllSections } from '../../../actions/adminEtc/section';
import { setAlert } from '../../../actions/adminEtc/alert';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardBody from '../../../components/Card/CardBody.js';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '0.9rem',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
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
      lineHeight: '1',
    },
  },
};

const useStyles = makeStyles(styles);

const CreateUndergraduateMinorCourse = ({
  createUndergraduateMinorCourse,
  getAllUndergraduateCourses,
  getAllUndergraduatePrograms,
  getAllDepartments,
  getAllSections,
  history,
  course: { loading: courseLoading, undergraduateCourses },
  program: { loading: programLoading, undergraduatePrograms },
  department: { loading: departmentLoading, departments },
  section: { loading: sectionLoading, sections },
  setAlert,
}) => {
  const classes = useStyles(styles);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
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
      section: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (
        values.program === '' ||
        values.department === '' ||
        values.section === ''
      ) {
        setAlert('Please fill all the fields in order to proceed.');
      } else {
        createUndergraduateMinorCourse(values, history);
      }
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      description: Yup.string().required('Name is required'),
      creditHours: Yup.number()
        .typeError('Credit hours must be a number')
        .required('Credit hours is required')
        .min(3, 'Credit hours must be atleast 3')
        .max(4, 'Credit hours must be atmost 4'),
      fee: Yup.number()
        .typeError('Fee must be a number')
        .required('Fee is required')
        .min(0, 'Fee must be atleast 0'),
      preRequisite: Yup.string().required('Pre-requisite is required'),
      minimumAttendanceRequiredForTerminals: Yup.number()
        .typeError('Minimum attendance must be a number')
        .required('Minimum attendance is required')
        .min(0, 'Minimum attendance must be atleast 0'),
      courseLearningOutcomes: Yup.string().required(
        'Course learning outcome is required'
      ),
      programLearningOutcomes: Yup.string().required(
        'Program learning outcome is required'
      ),
      totalLectures: Yup.number()
        .typeError('Total lectures must be a number')
        .required('Total lectures is required')
        .min(0, 'Total lectures must be atleast 0'),
      lecturesTakenFaculty: Yup.number()
        .typeError('Lectures taken by faculty must be a number')
        .required('Lectures taken by faculty is required')
        .min(0, 'Lectures taken by faculty must be atleast 0'),
      lecturesTakenStudent: Yup.number()
        .typeError('Lectures taken by student must be a number')
        .required('Lectures taken by student is required')
        .min(0, 'Lectures taken by student must be atleast 0'),
      totalAssignments: Yup.number()
        .typeError('Total assignments by faculty must be a number')
        .required('Total assignments by faculty is required')
        .min(0, 'Total assignments by faculty must be atleast 0'),
      assignmentsTaken: Yup.number()
        .typeError('Assignments taken must be a number')
        .required('Assignments taken is required')
        .min(0, 'Assignments taken must be atleast 0'),
      totalQuizes: Yup.number()
        .typeError('Total quizes must be a number')
        .required('Total quizes is required')
        .min(0, 'Total quizes must be atleast 0'),
      quizesTaken: Yup.number()
        .typeError('Total quizes taken must be a number')
        .required('Total quizes taken is required')
        .min(0, 'Total quizes taken must be atleast 0'),
      totalMidTerms: Yup.number()
        .typeError('Total mid terms must be a number')
        .required('Total mid terms is required')
        .min(0, 'Total mid terms must be atleast 0'),
      midTermsTaken: Yup.number()
        .typeError('Total mid terms taken must be a number')
        .required('Total mid terms taken is required')
        .min(0, 'Total mid terms taken must be atleast 0'),
      totalLabs: Yup.number()
        .typeError('Total labs must be a number')
        .required('Total labs is required')
        .min(0, 'Total labs must be atleast 0'),
      labsTakenFaculty: Yup.number()
        .typeError('Total labs taken by faculty must be a number')
        .required('Total labs taken by faculty is required')
        .min(0, 'Total labs taken by faculty must be atleast 0'),
      labsTakenStudent: Yup.number()
        .typeError('Total labs taken by students must be a number')
        .required('Total labs taken by students is required')
        .min(0, 'Total labs taken by students must be atleast 0'),
      labManual: Yup.string().required('Lab manual is required'),
      labProjectTotalMarks: Yup.number()
        .typeError('Lab project total marks must be a number')
        .required('Lab project total marks is required')
        .min(0, 'Lab project total marks must be atleast 0'),
      labTerminalTotalMarks: Yup.number()
        .typeError('Lab terminal total marks must be a number')
        .required('Lab terminal total marks is required')
        .min(0, 'Lab terminal total marks must be atleast 0'),
      program: Yup.string().required('Program is required'),
      department: Yup.string().required('Department is required'),
      section: Yup.string().required('Section is required'),
    }),
  });

  // const [formData, setFormData] = useState({
  //   name: '',
  //   description: '',
  //   creditHours: '',
  //   fee: '',
  //   preRequisite: '',
  //   minimumAttendanceRequiredForTerminals: '',
  //   courseLearningOutcomes: '',
  //   programLearningOutcomes: '',
  //   totalLectures: '',
  //   lecturesTakenFaculty: '',
  //   lecturesTakenStudent: '',
  //   totalAssignments: '',
  //   assignmentsTaken: '',
  //   totalQuizes: '',
  //   quizesTaken: '',
  //   totalMidTerms: '',
  //   midTermsTaken: '',
  //   totalLabs: '',
  //   labsTakenFaculty: '',
  //   labsTakenStudent: '',
  //   labManual: '',
  //   labProjectTotalMarks: '',
  //   labTerminalTotalMarks: '',
  //   program: '',
  //   department: '',
  //   section: '',
  // });

  // const {
  //   name,
  //   description,
  //   creditHours,
  //   fee,
  //   preRequisite,
  //   minimumAttendanceRequiredForTerminals,
  //   courseLearningOutcomes,
  //   programLearningOutcomes,
  //   totalLectures,
  //   lecturesTakenFaculty,
  //   lecturesTakenStudent,
  //   totalAssignments,
  //   assignmentsTaken,
  //   totalQuizes,
  //   quizesTaken,
  //   totalMidTerms,
  //   midTermsTaken,
  //   totalLabs,
  //   labsTakenFaculty,
  //   labsTakenStudent,
  //   labManual,
  //   labProjectTotalMarks,
  //   labTerminalTotalMarks,
  //   program,
  //   department,
  //   section,
  // } = formData;

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (program === '' || department === '' || section === '') {
  //     setAlert('Please fill all the fields in order to proceed.');
  //   } else {
  //     createUndergraduateMinorCourse(formData, history);
  //   }
  // };

  // const [getAllDepartmentsCalled, setGetAllDepartmentsCalled] = useState(false);

  useEffect(() => {
    // if (!getAllDepartmentsCalled) {
    getAllDepartments();
    // setGetAllDepartmentsCalled(true);
    // }
  }, []);

  // const [
  //   getAllUndergraduateCoursesCalled,
  //   setGetAllUndergraduateCoursesCalled,
  // ] = useState(false);

  useEffect(() => {
    // if (!getAllUndergraduateCoursesCalled) {
    getAllUndergraduateCourses();
    // setGetAllUndergraduateCoursesCalled(true);
    // }
  }, []);

  // const [
  //   getAllUndergraduateProgramsCalled,
  //   setGetAllUndergraduateProgramsCalled,
  // ] = useState(false);

  useEffect(() => {
    // if (!getAllUndergraduateProgramsCalled) {
    getAllUndergraduatePrograms();
    // setGetAllUndergraduateProgramsCalled(true);
    // }
  }, []);

  // const [getAllSectionsCalled, setGetAllSectionsCalled] = useState(false);

  useEffect(() => {
    // if (!getAllSectionsCalled) {
    getAllSections();
    // setGetAllSectionsCalled(true);
    // }
  }, []);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>
              Create an Undergraduate Minor Course
            </h4>
            <p className={classes.cardCategoryWhite}>
              Fill in the information below to create an undergraduate minor
              course
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Name'
                    variant='outlined'
                    type='text'
                    name='name'
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name && touched.name}
                    helperText={errors.name}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Description'
                    variant='outlined'
                    type='text'
                    name='description'
                    value={values.description}
                    onChange={handleChange}
                    error={errors.description && touched.description}
                    helperText={errors.description}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Credit Hours'
                    variant='outlined'
                    type='number'
                    name='creditHours'
                    value={values.creditHours}
                    onChange={handleChange}
                    error={errors.creditHours && touched.creditHours}
                    helperText={errors.creditHours}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Fee per Semester (Rs.)'
                    variant='outlined'
                    type='number'
                    name='fee'
                    value={values.fee}
                    onChange={handleChange}
                    error={errors.fee && touched.fee}
                    helperText={errors.fee}
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
                      value={values.preRequisite}
                      onChange={handleChange}
                      required={true}
                    >
                      <MenuItem value='values.'>
                        <em>None</em>
                      </MenuItem>
                      {!courseLoading &&
                        // semester !== null &&
                        undergraduateCourses.length > 0 &&
                        undergraduateCourses.map((course) => (
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
                    value={values.minimumAttendanceRequiredForTerminals}
                    onChange={handleChange}
                    error={
                      errors.minimumAttendanceRequiredForTerminals &&
                      touched.minimumAttendanceRequiredForTerminals
                    }
                    helperText={errors.minimumAttendanceRequiredForTerminals}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Course Learning Outcomes'
                    variant='outlined'
                    type='text'
                    name='courseLearningOutcomes'
                    value={values.courseLearningOutcomes}
                    onChange={handleChange}
                    error={
                      errors.courseLearningOutcomes &&
                      touched.courseLearningOutcomes
                    }
                    helperText={errors.courseLearningOutcomes}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Program Learning Outcomes'
                    variant='outlined'
                    type='text'
                    name='programLearningOutcomes'
                    value={values.programLearningOutcomes}
                    onChange={handleChange}
                    error={
                      errors.programLearningOutcomes &&
                      touched.programLearningOutcomes
                    }
                    helperText={errors.programLearningOutcomes}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Total Lectures'
                    variant='outlined'
                    type='number'
                    name='totalLectures'
                    value={values.totalLectures}
                    onChange={handleChange}
                    error={errors.totalLectures && touched.totalLectures}
                    helperText={errors.totalLectures}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Lectures Taken By Faculty'
                    variant='outlined'
                    type='number'
                    name='lecturesTakenFaculty'
                    value={values.lecturesTakenFaculty}
                    onChange={handleChange}
                    error={
                      errors.lecturesTakenFaculty &&
                      touched.lecturesTakenFaculty
                    }
                    helperText={errors.lecturesTakenFaculty}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Lectures Taken By Students'
                    variant='outlined'
                    type='number'
                    name='lecturesTakenStudent'
                    value={values.lecturesTakenStudent}
                    onChange={handleChange}
                    error={
                      errors.lecturesTakenStudent &&
                      touched.lecturesTakenStudent
                    }
                    helperText={errors.lecturesTakenStudent}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Total Assignments'
                    variant='outlined'
                    type='number'
                    name='totalAssignments'
                    value={values.totalAssignments}
                    onChange={handleChange}
                    error={errors.totalAssignments && touched.totalAssignments}
                    helperText={errors.totalAssignments}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Assignments Taken'
                    variant='outlined'
                    type='number'
                    name='assignmentsTaken'
                    value={values.assignmentsTaken}
                    onChange={handleChange}
                    error={errors.assignmentsTaken && touched.assignmentsTaken}
                    helperText={errors.assignmentsTaken}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Total Quizes'
                    variant='outlined'
                    type='number'
                    name='totalQuizes'
                    value={values.totalQuizes}
                    onChange={handleChange}
                    error={errors.totalQuizes && touched.totalQuizes}
                    helperText={errors.totalQuizes}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Quizes Taken'
                    variant='outlined'
                    type='number'
                    name='quizesTaken'
                    value={values.quizesTaken}
                    onChange={handleChange}
                    error={errors.quizesTaken && touched.quizesTaken}
                    helperText={errors.name}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Total Mid Terms'
                    variant='outlined'
                    type='number'
                    name='totalMidTerms'
                    value={values.totalMidTerms}
                    onChange={handleChange}
                    error={errors.totalMidTerms && touched.totalMidTerms}
                    helperText={errors.totalMidTerms}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Mid Terms Taken'
                    variant='outlined'
                    type='number'
                    name='midTermsTaken'
                    value={values.midTermsTaken}
                    onChange={handleChange}
                    error={errors.midTermsTaken && touched.midTermsTaken}
                    helperText={errors.midTermsTaken}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Total Labs'
                    variant='outlined'
                    type='number'
                    name='totalLabs'
                    value={values.totalLabs}
                    onChange={handleChange}
                    error={errors.totalLabs && touched.totalLabs}
                    helperText={errors.totalLabs}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Labs Taken By Faculty'
                    variant='outlined'
                    type='number'
                    name='labsTakenFaculty'
                    value={values.labsTakenFaculty}
                    onChange={handleChange}
                    error={errors.labsTakenFaculty && touched.labsTakenFaculty}
                    helperText={errors.labsTakenFaculty}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Labs Taken By Student'
                    variant='outlined'
                    type='number'
                    name='labsTakenStudent'
                    value={values.labsTakenStudent}
                    onChange={handleChange}
                    error={errors.labsTakenStudent && touched.labsTakenStudent}
                    helperText={errors.labsTakenStudent}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Labs Manual'
                    variant='outlined'
                    type='text'
                    name='labManual'
                    value={values.labManual}
                    onChange={handleChange}
                    error={errors.labManual && touched.labManual}
                    helperText={errors.labManual}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Lab Projects Total Marks'
                    variant='outlined'
                    type='number'
                    name='labProjectTotalMarks'
                    value={values.labProjectTotalMarks}
                    onChange={handleChange}
                    error={
                      errors.labProjectTotalMarks &&
                      touched.labProjectTotalMarks
                    }
                    helperText={errors.labProjectTotalMarks}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Lab Terminal Total Marks'
                    variant='outlined'
                    type='number'
                    name='labTerminalTotalMarks'
                    value={values.labTerminalTotalMarks}
                    onChange={handleChange}
                    error={
                      errors.labTerminalTotalMarks &&
                      touched.labTerminalTotalMarks
                    }
                    helperText={errors.labTerminalTotalMarks}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl variant='outlined' className='form-control'>
                    <InputLabel id='program-label'>Program</InputLabel>
                    <Select
                      labelId='program-label'
                      label='program'
                      name='program'
                      value={values.program}
                      onChange={handleChange}
                      required={true}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {!programLoading &&
                        // semester !== null &&
                        undergraduatePrograms.length > 0 &&
                        undergraduatePrograms.map((program) => (
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
                      value={values.department}
                      onChange={handleChange}
                      required={true}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {!departmentLoading &&
                        // semester !== null &&
                        departments.length > 0 &&
                        departments.map((department) => (
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
                      value={values.section}
                      onChange={handleChange}
                      required={true}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {!sectionLoading &&
                        // semester !== null &&
                        sections.length > 0 &&
                        sections.map((section) => (
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

CreateUndergraduateMinorCourse.propTypes = {
  createUndergraduateMinorCourse: PropTypes.func.isRequired,
  getAllUndergraduatePrograms: PropTypes.func.isRequired,
  getAllUndergraduateCourses: PropTypes.func.isRequired,
  getAllDepartments: PropTypes.func.isRequired,
  getAllSections: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  program: PropTypes.object.isRequired,
  department: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  department: state.department,
  section: state.section,
  program: state.program,
  course: state.course,
});

export default connect(mapStateToProps, {
  getAllUndergraduateCourses,
  createUndergraduateMinorCourse,
  getAllUndergraduatePrograms,
  getAllDepartments,
  getAllSections,
  setAlert,
})(withRouter(CreateUndergraduateMinorCourse));
