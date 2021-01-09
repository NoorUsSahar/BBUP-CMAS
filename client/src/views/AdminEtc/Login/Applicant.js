import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import sbbu from '../sbbu.jpg';
import CardHeader from '../../../components/Card/CardHeader.js';
import { connect } from 'react-redux';
import { loginUser } from '../../../actions/adminEtc/auth';
import { Redirect } from 'react-router-dom';
import { getCurrentSession } from '../../../actions/adminEtc/admission';
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
  loginUser,
  auth: { loading, isAuthenticated, user },
  admission: { loading: sessionLoading, session },
  getCurrentSession,
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
      email: '',
      password: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      loginUser(values);
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        // .length(6, 'Password length must be 6 characters'),
    }),
  });

  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  // });

  const classes = useStyles();

  // const { email, password } = formData;

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   loginUser(formData);
  // };

  useEffect(() => {
    getCurrentSession();
  }, []);

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
            <CardHeader width='100%'>
              <h2>Shaheed Benazir Bhutto University, Peshawar</h2>
            </CardHeader>
            <p></p>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Grid>
              <a href='/login/logins'>Not an Applicant?</a>
            </Grid>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                type='email'
                value={values.email}
                onChange={handleChange}
                error={errors.email && touched.email}
                helperText={errors.email}
                autoComplete='email'
                autoFocus
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                type='password'
                value={values.password}
                onChange={handleChange}
                error={errors.password && touched.password}
                helperText={errors.password}
                autoComplete='current-password'
              />
              {/* <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              /> */}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Sign In
              </Button>
              {!sessionLoading && session !== null && session.status && (
                <Grid container>
                  {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
                  <Grid item>
                    <Link to='/register/applicant' variant='body2'>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              )}
            </form>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

Applicant.propTypes = {
  loginUser: PropTypes.func.isRequired,
  getCurrentSession: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admission: state.admission,
});

export default connect(mapStateToProps, { loginUser, getCurrentSession })(
  Applicant
);
