import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import StatusStepper from './StatusStepper';
import {
  getCurrentApplicant,
  updatePersonalDetails,
} from '../../actions/applicant';
import FormImage from './FormImage';
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

const PersonalDetails = ({
  updatePersonalDetails,
  history,
  getCurrentApplicant,
  applicant: { loading, applicant },
}) => {
  const classes = useStyles();

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

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.name
          : '',
      fatherName:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.fatherName
          : '',
      cnicNumber:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.cnic.number
          : '',
      cnicFrontPicture:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.cnic.frontPicture
          : '',
      cnicBackPicture:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.cnic.backPicture
          : '',
      address:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.address
          : '',
      placeOfBirth:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.placeOfBirth
          : '',
      dateOfBirth:
        !loading && applicant !== null && applicant.personalDetails
          ? getFormattedDate(applicant.personalDetails.dateOfBirth)
          : getCurrentDate(),
      phoneNumber:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.phoneNumber
          : '',
      domicile:
        !loading && applicant !== null && applicant.personalDetails
          ? applicant.personalDetails.domicile
          : '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      updatePersonalDetails(values, history);
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      fatherName: Yup.string().required('Father name is required'),
      email: Yup.string().required('Email is required'),
      cnicNumber: Yup.number()
        .typeError('CNIC Number must be a number')
        .required('CNIC Number is required')
        .min(1, 'CNIC Number must be atleast 1'),
      // cnicFrontPicture: Yup.string().required('Front picture is required'),
      // cnicBackPicture: Yup.string().required('Back picture is required'),
      address: Yup.string().required('Address is required'),
      placeOfBirth: Yup.string().required('Place of birth is required'),
      dateOfBirth: Yup.date().min(
        Yup.ref('dateOfBirth'),
        'Date of birth is required'
      ),
      phoneNumber: Yup.number()
        .typeError('Phone number must be a number')
        .required('Phone number is required')
        .min(1, 'Phone number must be atleast 1'),
      domicile: Yup.string().required('Domicile is required'),
    }),
  });

  // const [formData, setFormData] = useState({
  //   name: '',
  //   fatherName: '',
  //   cnicNumber: '',
  //   cnicFrontPicture: '',
  //   cnicBackPicture: '',
  //   address: '',
  //   placeOfBirth: '',
  //   dateOfBirth: '',
  //   phoneNumber: '',
  //   domicile: '',
  // });

  // const {
  //   name,
  //   fatherName,
  //   cnicNumber,
  //   cnicFrontPicture,
  //   cnicBackPicture,
  //   address,
  //   placeOfBirth,
  //   dateOfBirth,
  //   phoneNumber,
  //   domicile,
  // } = formData;

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const onChangeImage = (e) => {
    const name = e.target.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      // setFormData({ ...formData, [name]: e.target.result });
      setFieldValue(name, e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   updatePersonalDetails(formData, history);
  // };

  // const [getCurrentApplicantCalled, setGetCurrentApplicantCalled] = useState(
  //   false
  // );

  useEffect(
    () => {
      // if (!getCurrentApplicantCalled) {
      getCurrentApplicant();
      // setGetCurrentApplicantCalled(true);
      // }

      // setFormData({
      //   name:
      //     !loading && applicant !== null && applicant.personalDetails
      //       ? applicant.personalDetails.name
      //       : '',
      //   fatherName:
      //     !loading && applicant !== null && applicant.personalDetails
      //       ? applicant.personalDetails.fatherName
      //       : '',
      //   cnicNumber:
      //     !loading && applicant !== null && applicant.personalDetails
      //       ? applicant.personalDetails.cnic.number
      //       : '',
      //   cnicFrontPicture:
      //     !loading && applicant !== null && applicant.personalDetails
      //       ? applicant.personalDetails.cnic.frontPicture
      //       : '',
      //   cnicBackPicture:
      //     !loading && applicant !== null && applicant.personalDetails
      //       ? applicant.personalDetails.cnic.backPicture
      //       : '',
      //   address:
      //     !loading && applicant !== null && applicant.personalDetails
      //       ? applicant.personalDetails.address
      //       : '',
      //   placeOfBirth:
      //     !loading && applicant !== null && applicant.personalDetails
      //       ? applicant.personalDetails.placeOfBirth
      //       : '',
      //   dateOfBirth:
      //     !loading && applicant !== null && applicant.personalDetails
      //       ? getFormattedDate(applicant.personalDetails.dateOfBirth)
      //       : getCurrentDate(),
      //   phoneNumber:
      //     !loading && applicant !== null && applicant.personalDetails
      //       ? applicant.personalDetails.phoneNumber
      //       : '',
      //   domicile:
      //     !loading && applicant !== null && applicant.personalDetails
      //       ? applicant.personalDetails.domicile
      //       : '',
      // });
    },
    [
      // applicant
    ]
  );

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Personal Details</h4>
            <p className={classes.cardCategoryWhite}>
              Fill in the information below update your personal details
            </p>
          </CardHeader>
          <CardBody>
            <StatusStepper
              status={!loading && applicant !== null ? applicant.status : 0}
            />
            <form onSubmit={handleSubmit}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
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
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    className='form-control'
                    label='Father name'
                    variant='outlined'
                    type='text'
                    name='fatherName'
                    value={values.fatherName}
                    onChange={handleChange}
                    error={errors.fatherName && touched.fatherName}
                    helperText={errors.fatherName}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    className='form-control'
                    label='Email (For updates enter a valid email address)'
                    variant='outlined'
                    type='text'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email && touched.email}
                    helperText={errors.email}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    className='form-control'
                    label='CNIC / B-Form number'
                    variant='outlined'
                    type='text'
                    name='cnicNumber'
                    value={values.cnicNumber}
                    onChange={handleChange}
                    error={errors.cnicNumber && touched.cnicNumber}
                    helperText={errors.cnicNumber}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <div className='file-input'>
                    <label forHtml='frontPicture'>
                      CNIC / B-Form Front Picture
                    </label>
                    <input
                      id='frontPicture'
                      type='file'
                      name='cnicFrontPicture'
                      onChange={(e) => onChangeImage(e)}
                    />
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <FormImage
                    title='CNIC Front Picture'
                    picture={values.cnicFrontPicture}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <div className='file-input'>
                    <label forHtml='backPicture'>
                      CNIC / B-Form Back Picture
                    </label>
                    <input
                      id='backPicture'
                      type='file'
                      name='cnicBackPicture'
                      onChange={(e) => onChangeImage(e)}
                    />
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <FormImage
                    title='CNIC Back Picture'
                    picture={values.cnicBackPicture}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='Address'
                    variant='outlined'
                    type='text'
                    name='address'
                    value={values.address}
                    onChange={handleChange}
                    error={errors.address && touched.address}
                    helperText={errors.address}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Contact No.'
                    variant='outlined'
                    type='text'
                    name='phoneNumber'
                    value={values.phoneNumber}
                    onChange={handleChange}
                    error={errors.phoneNumber && touched.phoneNumber}
                    helperText={errors.phoneNumber}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Date of Birth'
                    variant='outlined'
                    type='date'
                    name='dateOfBirth'
                    value={values.dateOfBirth}
                    onChange={handleChange}
                    error={errors.dateOfBirth && touched.dateOfBirth}
                    helperText={errors.dateOfBirth}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Place of Birth'
                    variant='outlined'
                    type='text'
                    name='placeOfBirth'
                    value={values.placeOfBirth}
                    onChange={handleChange}
                    error={errors.placeOfBirth && touched.placeOfBirth}
                    helperText={errors.placeOfBirth}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Domicile'
                    variant='outlined'
                    type='text'
                    name='domicile'
                    value={values.domicile}
                    onChange={handleChange}
                    error={errors.domicile && touched.domicile}
                    helperText={errors.domicile}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    color='primary'
                    variant='contained'
                    type='submit'
                    size='large'
                  >
                    Submit
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

PersonalDetails.propTypes = {
  updatePersonalDetails: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  getCurrentApplicant: PropTypes.func.isRequired,
  applicant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  applicant: state.applicant,
});

export default connect(mapStateToProps, {
  updatePersonalDetails,
  getCurrentApplicant,
})(withRouter(PersonalDetails));
