import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadUser } from '../../../../actions/adminEtc/auth';
import { createAdmissionSession } from '../../../../actions/adminEtc/admission';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from '../../../../components/Grid/GridContainer';
import GridItem from '../../../../components/Grid/GridItem';
import Card from '../../../../components/Card/Card';
import CardHeader from '../../../../components/Card/CardHeader';
import CardBody from '../../../../components/Card/CardBody';
import { TextField, Button } from '@material-ui/core';
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

const CreateAdmissionSession = ({
  loadUser,
  createAdmissionSession,
  admission: { loading: admissionSessionsLoading, sessions },
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
      name: '',
      startDate: getCurrentDate(),
      endDate: getCurrentDate(),
      notification: '',
    },

    onSubmit: (values) => {
      createAdmissionSession(values, history);
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      startDate: Yup.date().min(
        new Date(Date.now() - 86400000),
        'Start date is required'
      ),
      endDate: Yup.date().min(
        Yup.ref('startDate'),
        'End date cannot be before start date'
      ),
      notification: Yup.string().required('Notification is required'),
    }),
  });

  // const [formData, setFormData] = useState({
  //   name: '',
  //   startDate: '',
  //   endDate: '',
  //   notification: '',
  // });

  // const { name, startDate, endDate, notification } = formData;

  // const [getCurrentUserCalled, setGetCurrentUserCalled] = useState(false);

  useEffect(() => {
    // if (!getCurrentUserCalled) {
    loadUser();
    // setGetCurrentUserCalled(true);
    // }

    // setFormData({
    //   name:
    //     !admissionSessionsLoading && user !== null && user.sessions
    //       ? user.sessions.name
    //       : null,
    //   startDate:
    //     !admissionSessionsLoading && user !== null && user.sessions
    //       ? getFormattedDate(user.sessions.startDate)
    //       : getCurrentDate(),
    //   endDate:
    //     !admissionSessionsLoading && user !== null && user.sessions
    //       ? getFormattedDate(user.sessions.endDate)
    //       : getCurrentDate(),
    //   notification:
    //     !admissionSessionsLoading && user !== null && user.sessions
    //       ? user.sessions.notification
    //       : null,
    // });
  }, []);

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   createAdmissionSession(formData, history);
  // };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Admission Session</h4>
            <p className={classes.cardCategoryWhite}>
              Create an admission session for the applicants to apply
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    error={errors.name && touched.name}
                    helperText={errors.name}
                    className='form-control'
                    label='Session Name'
                    variant='outlined'
                    type='text'
                    name='name'
                    value={values.name}
                    onChange={handleChange}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    error={errors.startDate && touched.startDate}
                    helperText={errors.startDate}
                    className='form-control'
                    label='StartDate'
                    variant='outlined'
                    type='date'
                    name='startDate'
                    value={values.startDate}
                    onChange={handleChange}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    error={errors.endDate && touched.endDate}
                    helperText={errors.endDate}
                    className='form-control'
                    label='End Date'
                    variant='outlined'
                    type='date'
                    name='endDate'
                    value={values.endDate}
                    onChange={handleChange}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    error={errors.notification && touched.notification}
                    helperText={errors.notification}
                    className='form-control'
                    label='Notification'
                    variant='outlined'
                    type='text'
                    name='notification'
                    value={values.notification}
                    onChange={handleChange}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    color='primary'
                    variant='contained'
                    type='submit'
                    size='large'
                  >
                    Create
                  </Button>
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

CreateAdmissionSession.propTypes = {
  loadUser: PropTypes.func.isRequired,
  createAdmissionSession: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  admission: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  admission: state.admission,
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser, createAdmissionSession })(
  CreateAdmissionSession
);
