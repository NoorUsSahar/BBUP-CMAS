import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { loadUser } from '../../../actions/adminEtc/auth';
import { createEnrollmentSemester } from '../../../actions/adminEtc/enrollment';
import { getAllPrograms } from '../../../actions/adminEtc/program';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Card from '../../../components/Card/Card';
import CardHeader from '../../../components/Card/CardHeader';
import CardBody from '../../../components/Card/CardBody';
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
  cardCategoryBlack: {
    '&,& a, & a:hover, & a:focus': {
      color: 'rgba(0,0,0)',
      margin: '0',
      fontSize: '0.9rem',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#000000',
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

const CreateEnrollmentSemester = ({
  loadUser,
  createEnrollmentSemester,
  getAllPrograms,
  enrollment: { loading, semesters },
  program: { loading: programLoading, programs },
  auth: { user },
  history,
}) => {
  const classes = useStyles(styles);

  const getCurrentDate = () => {
    let d = new Date(Date.now());
    d = new Date(Date.now() + d.getTimezoneOffset() * 60000);

    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return `${year}-${month < 10 ? '0' : ''}${month}-${
      date < 10 ? '0' : ''
    }${date}`;
  };

  const getFormattedDate = (dateToFormat) => {
    let d = new Date(dateToFormat);

    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return `${year}-${month < 10 ? '0' : ''}${month}-${
      date < 10 ? '0' : ''
    }${date}`;
  };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name:
        !loading && user !== null && user.semesters
          ? user.semesters.name
          : null,
      description:
        !loading && user !== null && user.semesters
          ? user.semesters.description
          : null,
      maximumBatchStrength:
        !loading && user !== null && user.semesters
          ? user.semesters.maximumBatchStrength
          : null,
      startDate:
        !loading && user !== null && user.semesters
          ? getFormattedDate(user.semesters.startDate)
          : getCurrentDate(),
      endDate:
        !loading && user !== null && user.semester
          ? getFormattedDate(user.semesters.endDate)
          : getCurrentDate(),
      program:
        !loading && user !== null && user.semesters
          ? user.semesters.program
          : null,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      createEnrollmentSemester(values, history);
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      description: Yup.string().required('Description is required'),
      maximumBatchStrength: Yup.number()
        .typeError('maximumBatchStrength must be a number')
        .required('maximumBatchStrength is required')
        .min(1, 'maximumBatchStrength must be atleast 1'),
      startDate: Yup.date().min(
        new Date(Date.now() - 86400000),
        'Start date is required'
      ),
      endDate: Yup.date().min(
        Yup.ref('startDate'),
        'End date cannot be before start date'
      ),
    }),
  });

  // const [formData, setFormData] = useState({
  //   name: '',
  //   description: '',
  //   maximumBatchStrength: '',
  //   startDate: '',
  //   endDate: '',
  //   program: '',
  // });

  // const {
  //   name,
  //   description,
  //   maximumBatchStrength,
  //   startDate,
  //   endDate,
  //   program,
  // } = formData;

  // const [getCurrentUserCalled, setGetCurrentUserCalled] = useState(false);

  useEffect(
    () => {
      // if (!getCurrentUserCalled) {
      loadUser();
      // setGetCurrentUserCalled(true);
      // }

      // setFormData({
      //   name:
      //     !loading && user !== null && user.semesters
      //       ? user.semesters.name
      //       : null,
      //   description:
      //     !loading && user !== null && user.semesters
      //       ? user.semesters.description
      //       : null,
      //   maximumBatchStrength:
      //     !loading && user !== null && user.semesters
      //       ? user.semesters.maximumBatchStrength
      //       : null,
      //   startDate:
      //     !loading && user !== null && user.semesters
      //       ? getFormattedDate(user.semesters.startDate)
      //       : getCurrentDate(),
      //   endDate:
      //     !loading && user !== null && user.semester
      //       ? getFormattedDate(user.semesters.endDate)
      //       : getCurrentDate(),
      //   program:
      //     !loading && user !== null && user.semesters
      //       ? user.semesters.program
      //       : null,
      // });
    },
    [
      // user, semesters
    ]
  );

  // const [getAllProgramsCalled, getSetAllProgramsCalled] = useState(false);

  useEffect(() => {
    // if (!getAllProgramsCalled) {
    getAllPrograms();
    //   // getSetAllProgramsCalled(true);
    // }
  }, []);

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   createEnrollmentSemester(formData, history);
  // };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Enrollment Semester</h4>
            <p className={classes.cardCategoryWhite}>
              Create an enrollment semester for the applicants to apply
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Semester Name'
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
                    label='StartDate'
                    variant='outlined'
                    type='date'
                    name='startDate'
                    value={values.startDate}
                    onChange={handleChange}
                    error={errors.startDate && touched.startDate}
                    helperText={errors.startDate}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='End Date'
                    variant='outlined'
                    type='date'
                    name='endDate'
                    value={values.endDate}
                    onChange={handleChange}
                    error={errors.endDate && touched.endDate}
                    helperText={errors.endDate}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Maximum Batch Strength'
                    variant='outlined'
                    type='text'
                    name='maximumBatchStrength'
                    value={values.maximumBatchStrength}
                    onChange={handleChange}
                    error={
                      errors.maximumBatchStrength &&
                      touched.maximumBatchStrength
                    }
                    helperText={errors.maximumBatchStrength}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl variant='outlined' className='form-control'>
                    <InputLabel id='program-label'>Program</InputLabel>
                    <Select
                      labelId='program-label'
                      label='Program'
                      name='program'
                      value={values.program}
                      onChange={handleChange}
                      error={errors.program && touched.program}
                      helperText={errors.program}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {!programLoading &&
                        // semester !== null &&
                        programs.length > 0 &&
                        programs.map((program) => (
                          <MenuItem value={`${program._id}`}>
                            {program.name}
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
                    Create
                  </Button>
                  &nbsp;
                  <Link
                    to={'/coordinator/dashboard'}
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

CreateEnrollmentSemester.propTypes = {
  loadUser: PropTypes.func.isRequired,
  createEnrollmentSemester: PropTypes.func.isRequired,
  getAllPrograms: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  enrollment: PropTypes.object.isRequired,
  program: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  enrollment: state.enrollment,
  auth: state.auth,
  program: state.program,
});

export default connect(mapStateToProps, {
  loadUser,
  getAllPrograms,
  createEnrollmentSemester,
})(withRouter(CreateEnrollmentSemester));
