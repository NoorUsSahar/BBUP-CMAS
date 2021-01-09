import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  // FormControl,
  // InputLabel,
  // Select,
  // MenuItem,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { register } from '../../../actions/facultysc/auth';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../../actions/facultysc/alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Faculty = ({
  register,
  auth: { loading, isAuthenticated },
  setAlert,
}) => {
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
      password2: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.password !== values.password2) {
        //console.log('Password donot match');
        setAlert('Passwords do not match', 'danger');
      } else {
        // console.log("SUCCESS");
        register(values.name, values.email, values.password);
      }
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string().required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .length(6, 'Password length must be 6 characters'),
      password2: Yup.string()
        .required('Password is required')
        .length(6, 'Password length must be 6 characters'),
    }),
  });

  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   password2: '',
  // });

  // const { name, email, password, password2 } = formData;

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (password !== password2) {
  //     //console.log('Password donot match');
  //     setAlert("Passwords do not match", "danger");
  //   } else {
  //     // console.log("SUCCESS");
  //     register({ name, email, password });
  //        }
  // };

  if (!loading && isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Container className='container-primary'>
        <Paper elevation={4} className='paper-primary'>
          <Grid container>
            <Grid
              xs={12}
              sm={12}
              md={12}
              item
              className='text-center-horizontal'
            >
              <Typography
                align='center'
                className='title-secondary'
                color='primary'
              >
                Faculty Registeration
              </Typography>
              <div className='description-secondary text-center'>
                Please fill in the form
              </div>
            </Grid>
            <Grid xs={12} sm={12} md={12} item>
              <form className='form' onSubmit={handleSubmit}>
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
                <TextField
                  className='form-control'
                  label='Email'
                  variant='outlined'
                  type='email'
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email && touched.email}
                  helperText={errors.email}
                />
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
                <TextField
                  className='form-control'
                  label='Password2'
                  variant='outlined'
                  type='password'
                  name='password2'
                  value={values.password2}
                  onChange={handleChange}
                  error={errors.password2 && touched.password2}
                  helperText={errors.password2}
                />
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  type='submit'
                  className='form-control'
                >
                  Login
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
};

Faculty.propTypes = {
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register, setAlert })(Faculty);
