import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import CardHeader from '../../../components/Card/CardHeader.js';
import sbbu from '../sbbu.jpg';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../../actions/adminEtc/alert';
import { registerApplicant } from '../../../actions/adminEtc/auth';
import Announcement from '../Announcement/Announcement.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${sbbu})`,
    // backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginTop: theme.spacing(1),
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  photo: {
    height: '100%',
    width: '100%',
  },
  centered: {
    // position: absolute,
    top: '50%',
    left: '50%',
    // transform: translate('-50%',' -50%'),
  },
}));

const Applicant = ({
  registerApplicant,
  auth: { loading, isAuthenticated, user },
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
      type: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.ype === '') {
        setAlert('Please fill in all the feilds in order to proceed.');
      } else {
        registerApplicant(values);
      }
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string().required('Email is required'),
      password: Yup.string()
        .required('Password is required'),
        // .length(6, 'Password length must be 6 characters'),
      type: Yup.string().required('Type is required'),
    }),
  });

  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   type: ''
  // });

  // const { name, email, password, type } = formData;
  const classes = useStyles();

  // const onChange = e => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const onSubmit = e => {
  //   e.preventDefault();
  //   if (type === '') {
  //     setAlert('Please fill in all the feilds in order to proceed.');
  //   } else {
  //     registerApplicant(formData);
  //   }
  // };

  if (!loading && isAuthenticated && user !== null && user.type === 3) {
    return <Redirect to='/applicant' />;
  }

  return (
    <Fragment>
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={8} className={classes.image}>
          <Announcement />
        </Grid>
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <h2>Shaheed Benazir Bhutto University, Peshawar</h2>
            {/* <CardHeader  width = '100%'>
            <h2>Shaheed Benazir Bhutto University, Peshawar</h2>
          </CardHeader> */}
            <p></p>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign Up
            </Typography>
            <Grid>
              <a href='/login/logins'>Not an Applicant?</a>
            </Grid>
            <form className={classes.form} onSubmit={handleSubmit}>
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
              <FormControl variant='outlined' className='form-control'>
                <InputLabel id='program-label'>Program applying for</InputLabel>
                <Select
                  labelId='program-label'
                  label='Program applying for'
                  name='type'
                  value={values.type}
                  onChange={handleChange}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={0}>Undergraduate</MenuItem>
                  <MenuItem value={1}>Graduate</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant='contained'
                color='primary'
                size='large'
                type='submit'
                className='form-control'
              >
                Register
              </Button>
              <Grid container>
                {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
                <Grid item>
                  <Link href='/login/applicant' variant='body2'>
                    {'Already have an account? Sign In'}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

Applicant.propTypes = {
  registerApplicant: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { registerApplicant, setAlert })(
  Applicant
);
