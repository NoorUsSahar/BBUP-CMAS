import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getAllDepartments } from '../../../../actions/adminEtc/department';
import { registerCoordinator } from '../../../../actions/adminEtc/auth';
import { setAlert } from '../../../../actions/adminEtc/alert';
import { Redirect, withRouter, Link } from 'react-router-dom';
import GridItem from '../../../../components/Grid/GridItem.js';
import GridContainer from '../../../../components/Grid/GridContainer.js';
import Card from '../../../../components/Card/Card.js';
import CardHeader from '../../../../components/Card/CardHeader.js';
import CardBody from '../../../../components/Card/CardBody.js';
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

const CreateCoordinator = ({
  history,
  department: deptReducer,
  getAllDepartments,
  auth: { loading, isAuthenticated, user },
  setAlert,
  registerCoordinator,
}) => {
  const classes = useStyles();

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
      email: '',
      password: '',
      cpassword: '',
      department: '',
      description: '',
    },
    // enableReinitialize: true,
    onSubmit: (values) => {
      if (
        values.name === '' ||
        values.email === '' ||
        values.password === '' ||
        values.cpassword === '' ||
        values.department === '' ||
        values.description === ''
      ) {
        setAlert('Please fill in all the feilds in order to proceed.');
      } else {
        registerCoordinator(values, history);
      }
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string().required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .length(6, 'Password length must be 6 characters'),
      cpassword: Yup.string()
        .required('Password is required')
        .length(6, 'Password length must be 6 characters'),
      department: Yup.string().required('Department is required'),
      description: Yup.string().required('Description is required'),
    }),
  });

  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   cpassword: '',
  //   department: '',
  //   description: '',
  // });

  // const {
  //   name,
  //   email,
  //   password,
  //   cpassword,
  //   department,
  //   description,
  // } = formData;

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (
  //     name === '' ||
  //     email === '' ||
  //     password === '' ||
  //     cpassword === '' ||
  //     department === '' ||
  //     description === ''
  //   ) {
  //     setAlert('Please fill in all the feilds in order to proceed.');
  //   } else {
  //     registerCoordinator(formData, history);
  //   }
  // };

  // const [getAllDepartmentsCalled, setGetAllDepartmentsCalled] = useState(false);

  useEffect(
    () => {
      // if (!getAllDepartmentsCalled) {
      getAllDepartments();
      // setGetAllDepartmentsCalled(true);
      // }
      getAllDepartments();
    },
    [
      // getAllDepartments
    ]
  );

  if (!loading && isAuthenticated && user !== null && user.type === 1) {
    return <Redirect to='/manage-coordinator' />;
  }

  return (
    <GridContainer>
      <GridItem>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Create Coordinator</h4>
            <p className={classes.cardCategoryWhite}>
              Fill in the information below to register the coordinator
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
                    label='Email'
                    variant='outlined'
                    type='text'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email && touched.email}
                    helperText={errors.email}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Password'
                    variant='outlined'
                    type='password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    error={errors.password && touched.password}
                    helperText={errors.password}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Confirm Password'
                    variant='outlined'
                    type='password'
                    name='cpassword'
                    value={values.cpassword}
                    onChange={handleChange}
                    error={errors.cpassword && touched.cpassword}
                    helperText={errors.cpassword}
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
                  <FormControl variant='outlined' className='form-control'>
                    <InputLabel id='department-label'>Department</InputLabel>
                    <Select
                      labelId='department-label'
                      label='Department'
                      name='department'
                      value={values.department}
                      onChange={handleChange}
                      error={errors.department && touched.department}
                      helperText={errors.department}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {!deptReducer.loading &&
                        deptReducer.departments.length > 0 &&
                        deptReducer.departments.map((department) => (
                          <MenuItem value={`${department._id}`}>
                            {department.name}
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
                    to={'/admin/manage-coordinators'}
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

CreateCoordinator.propTypes = {
  getAllDepartments: PropTypes.func.isRequired,
  registerCoordinator: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  department: state.department,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getAllDepartments,
  registerCoordinator,
  setAlert,
})(withRouter(CreateCoordinator));
