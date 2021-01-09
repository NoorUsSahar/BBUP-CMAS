import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardBody from '../../../components/Card/CardBody.js';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { connect } from 'react-redux';
import {
  getCurrentApplicant,
  updateEducationDetails,
  applicantForwarded,
} from '../../../actions/adminEtc/applicant';
import { setAlert } from '../../../actions/adminEtc/alert';
import { TextField } from '@material-ui/core';
import UndergraduateStatusStepper from './UndergraduateStatusStepper';
import FormImage from './FormImage';
import { Redirect } from 'react-router-dom';
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

const EducationDetails = ({
  getCurrentApplicant,
  applicantForwarded,
  applicant: { loading, applicant },
  updateEducationDetails,
  setAlert,
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
      secondaryEducationType:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.secondaryEducationDetails.type
          : '',
      secondaryEducationInstitute:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.secondaryEducationDetails.institute
          : '',
      secondaryEducationFieldOfStudy:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.secondaryEducationDetails.fieldOfStudy
          : '',
      secondaryEducationFrom:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.secondaryEducationDetails.from
          : '',
      secondaryEducationTo:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.secondaryEducationDetails.to
          : '',
      secondaryEducationObtainedMarks:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.secondaryEducationDetails.obtainedMarks
          : '',
      secondaryEducationTotalMarks:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.secondaryEducationDetails.totalMarks
          : '',
      secondaryEducationPicture:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.secondaryEducationDetails.picture
          : '',
      intermediateEducationType:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.intermediateEducationDetails.type
          : '',
      intermediateEducationInstitute:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.intermediateEducationDetails.institute
          : '',
      intermediateEducationFieldOfStudy:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.intermediateEducationDetails.fieldOfStudy
          : '',
      intermediateEducationFrom:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.intermediateEducationDetails.from
          : '',
      intermediateEducationTo:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.intermediateEducationDetails.to
          : '',
      intermediateEducationObtainedMarks:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.intermediateEducationDetails
              .obtainedMarks
          : '',
      intermediateEducationTotalMarks:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.intermediateEducationDetails.totalMarks
          : '',
      intermediateEducationPicture:
        !loading && applicant !== null && applicant.educationDetails
          ? applicant.educationDetails.intermediateEducationDetails.picture
          : '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (
        values.secondaryEducationType === '' ||
        values.intermediateEducationType === ''
      ) {
        setAlert('All fields are required');
      } else {
        updateEducationDetails(values).then((result) => {
          // Forward application here
          if (result) {
            applicantForwarded();
          }
        });
      }
    },
    validationSchema: Yup.object().shape({
      secondaryEducationType: Yup.string().required(
        'Secondary education type is required'
      ),
      secondaryEducationInstitute: Yup.string().required(
        'Secondary education type is required'
      ),
      secondaryEducationFieldOfStudy: Yup.string().required(
        'Secondary education feild of study is required'
      ),
      secondaryEducationFrom: Yup.number()
        .typeError('Secondary education from date must be a number')
        .required('Secondary education from date is required')
        .min(2000, 'Secondary education from date must be atleast 2000'),
      secondaryEducationTo: Yup.number()
        .typeError('Secondary education to date must be a number')
        .required('Secondary education to date is required')
        .min(2000, 'Secondary education to date must be atleast 2000'),
      secondaryEducationObtainedMarks: Yup.number()
        .typeError('Secondary education obtained marks must be a number')
        .required('Secondary education obtained marks is required')
        .min(1, 'Secondary education obtained marks must be atleast 1'),
      secondaryEducationTotalMarks: Yup.number()
        .typeError('Secondary education total marks must be a number')
        .required('Secondary education total marks is required')
        .min(1, 'Secondary education total marks must be atleast 1'),
      secondaryEducationPicture: Yup.string().required(
        'Secondary education certification picture is required'
      ),
      intermediateEducationType: Yup.string().required(
        'Intermediate education type is required'
      ),
      intermediateEducationInstitute: Yup.string().required(
        'Intermediate education institute is required'
      ),
      intermediateEducationFieldOfStudy: Yup.string().required(
        'Intermediate education field of study is required'
      ),
      intermediateEducationFrom: Yup.number()
        .typeError('Intermediate education from date must be a number')
        .required('Intermediate education from date is required')
        .min(2000, 'Intermediate education from date must be atleast 2000'),
      intermediateEducationTo: Yup.number()
        .typeError('Intermediate education to date must be a number')
        .required('Intermediate education to date is required')
        .min(2000, 'Intermediate education to date must be atleast 2000'),
      intermediateEducationObtainedMarks: Yup.number()
        .typeError('Intermediate education obtained marks must be a number')
        .required('Intermediate education obtained marks is required')
        .min(1, 'Intermediate education obtained marks must be atleast 1'),
      intermediateEducationTotalMarks: Yup.number()
        .typeError('Intermediate education total marks must be a number')
        .required('Intermediate education total marks is required')
        .min(1, 'Intermediate education total marks must be atleast 1'),
      intermediateEducationPicture: Yup.string().required(
        'Intermediate education certification picture is required'
      ),
    }),
  });

  // const [formData, setFormData] = useState({
  //   secondaryEducationType: '',
  //   secondaryEducationInstitute: '',
  //   secondaryEducationFieldOfStudy: '',
  //   secondaryEducationFrom: '',
  //   secondaryEducationTo: '',
  //   secondaryEducationObtainedMarks: '',
  //   secondaryEducationTotalMarks: '',
  //   secondaryEducationPicture: '',
  //   intermediateEducationType: '',
  //   intermediateEducationInstitute: '',
  //   intermediateEducationFieldOfStudy: '',
  //   intermediateEducationFrom: '',
  //   intermediateEducationTo: '',
  //   intermediateEducationObtainedMarks: '',
  //   intermediateEducationTotalMarks: '',
  //   intermediateEducationPicture: ''
  // });

  // const {
  //   secondaryEducationType,
  //   secondaryEducationInstitute,
  //   secondaryEducationFieldOfStudy,
  //   secondaryEducationFrom,
  //   secondaryEducationTo,
  //   secondaryEducationObtainedMarks,
  //   secondaryEducationTotalMarks,
  //   secondaryEducationPicture,
  //   intermediateEducationType,
  //   intermediateEducationInstitute,
  //   intermediateEducationFieldOfStudy,
  //   intermediateEducationFrom,
  //   intermediateEducationTo,
  //   intermediateEducationObtainedMarks,
  //   intermediateEducationTotalMarks,
  //   intermediateEducationPicture
  // } = formData;

  // const onChange = e => {
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

  // const onSubmit = e => {
  //   e.preventDefault();
  //   if (secondaryEducationType === '' || intermediateEducationType === '') {
  //     setAlert('All fields are required');
  //   } else {
  //     updateEducationDetails(formData).then(result => {
  //       // Forward application here
  //       if (result) {
  //         applicantForwarded();
  //       }
  //     });
  //   }
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

      // });
    },
    [
      // applicant
    ]
  );

  if (!loading && applicant !== null && applicant.status < 2) {
    return <Redirect to='/applicant/income-details' />;
  }

  if (!loading && applicant !== null && applicant.status === 3) {
    return <Redirect to='/applicant/dashboard' />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Education Details</h4>
            <p className={classes.cardCategoryWhite}>
              Fill in the information below update your education details
            </p>
          </CardHeader>
          <CardBody>
            <UndergraduateStatusStepper
              status={!loading && applicant !== null ? applicant.status : 0}
            />
            <form onSubmit={handleSubmit}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div className='heading-primary'>Secondary Education</div>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl variant='outlined' className='form-control'>
                    <InputLabel id='program-label'>Type</InputLabel>
                    <Select
                      labelId='program-label'
                      label='Type'
                      name='secondaryEducationType'
                      value={values.secondaryEducationType}
                      onChange={handleChange}
                      error={
                        errors.secondaryEducationType &&
                        touched.secondaryEducationType
                      }
                      helperText={errors.secondaryEducationType}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={0}>Matric</MenuItem>
                      <MenuItem value={1}>O Level</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    className='form-control'
                    label='Institute'
                    variant='outlined'
                    type='text'
                    name='secondaryEducationInstitute'
                    value={values.secondaryEducationInstitute}
                    onChange={handleChange}
                    error={
                      errors.secondaryEducationInstitute &&
                      touched.secondaryEducationInstitute
                    }
                    helperText={errors.secondaryEducationInstitute}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    className='form-control'
                    label='Field of Study'
                    variant='outlined'
                    type='text'
                    name='secondaryEducationFieldOfStudy'
                    value={values.secondaryEducationFieldOfStudy}
                    onChange={handleChange}
                    error={
                      errors.secondaryEducationFieldOfStudy &&
                      touched.secondaryEducationFieldOfStudy
                    }
                    helperText={errors.secondaryEducationFieldOfStudy}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    className='form-control'
                    label='From'
                    variant='outlined'
                    type='number'
                    name='secondaryEducationFrom'
                    value={values.secondaryEducationFrom}
                    onChange={handleChange}
                    error={
                      errors.secondaryEducationFrom &&
                      touched.secondaryEducationFrom
                    }
                    helperText={errors.secondaryEducationFrom}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    className='form-control'
                    label='To'
                    variant='outlined'
                    type='number'
                    name='secondaryEducationTo'
                    value={values.secondaryEducationTo}
                    onChange={handleChange}
                    error={
                      errors.secondaryEducationTo &&
                      touched.secondaryEducationTo
                    }
                    helperText={errors.secondaryEducationTo}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    className='form-control'
                    label='Obtained marks'
                    variant='outlined'
                    type='number'
                    name='secondaryEducationObtainedMarks'
                    value={values.secondaryEducationObtainedMarks}
                    onChange={handleChange}
                    error={
                      errors.secondaryEducationObtainedMarks &&
                      touched.secondaryEducationObtainedMarks
                    }
                    helperText={errors.secondaryEducationObtainedMarks}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    className='form-control'
                    label='Total marks'
                    variant='outlined'
                    type='number'
                    name='secondaryEducationTotalMarks'
                    value={values.secondaryEducationTotalMarks}
                    onChange={handleChange}
                    error={
                      errors.secondaryEducationTotalMarks &&
                      touched.secondaryEducationTotalMarks
                    }
                    helperText={errors.secondaryEducationTotalMarks}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <div className='file-input'>
                    <label forHtml='frontPicture'>Secondary Certificate</label>
                    <input
                      id='backPicture'
                      type='file'
                      name='secondaryEducationPicture'
                      onChange={(e) => onChangeImage(e)}
                    />
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormImage
                    title='Secondary Certificate'
                    picture={values.secondaryEducationPicture}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <div className='heading-primary'>Intermediate Education</div>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl variant='outlined' className='form-control'>
                    <InputLabel id='program-label'>Type</InputLabel>
                    <Select
                      labelId='program-label'
                      label='Type'
                      name='intermediateEducationType'
                      value={values.intermediateEducationType}
                      onChange={handleChange}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={0}>F.Sc. Pre-Engineering</MenuItem>
                      <MenuItem value={1}>F.Sc. Pre-Medical</MenuItem>
                      <MenuItem value={2}>A Levels</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    className='form-control'
                    label='Institute'
                    variant='outlined'
                    type='text'
                    name='intermediateEducationInstitute'
                    value={values.intermediateEducationInstitute}
                    onChange={handleChange}
                    error={
                      errors.intermediateEducationInstitute &&
                      touched.intermediateEducationInstitute
                    }
                    helperText={errors.intermediateEducationInstitute}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    className='form-control'
                    label='Field of Study'
                    variant='outlined'
                    type='text'
                    name='intermediateEducationFieldOfStudy'
                    value={values.intermediateEducationFieldOfStudy}
                    onChange={handleChange}
                    error={
                      errors.intermediateEducationFieldOfStudy &&
                      touched.intermediateEducationFieldOfStudy
                    }
                    helperText={errors.intermediateEducationFieldOfStudy}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    className='form-control'
                    label='From'
                    variant='outlined'
                    type='number'
                    name='intermediateEducationFrom'
                    value={values.intermediateEducationFrom}
                    onChange={handleChange}
                    error={
                      errors.intermediateEducationFrom &&
                      touched.intermediateEducationFrom
                    }
                    helperText={errors.intermediateEducationFrom}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    className='form-control'
                    label='To'
                    variant='outlined'
                    type='number'
                    name='intermediateEducationTo'
                    value={values.intermediateEducationTo}
                    onChange={handleChange}
                    error={
                      errors.intermediateEducationTo &&
                      touched.intermediateEducationTo
                    }
                    helperText={errors.intermediateEducationTo}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    className='form-control'
                    label='Obtained marks'
                    variant='outlined'
                    type='number'
                    name='intermediateEducationObtainedMarks'
                    value={values.intermediateEducationObtainedMarks}
                    onChange={handleChange}
                    error={
                      errors.intermediateEducationObtainedMarks &&
                      touched.intermediateEducationObtainedMarks
                    }
                    helperText={errors.intermediateEducationObtainedMarks}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    className='form-control'
                    label='Total marks'
                    variant='outlined'
                    type='number'
                    name='intermediateEducationTotalMarks'
                    value={values.intermediateEducationTotalMarks}
                    onChange={handleChange}
                    error={
                      errors.intermediateEducationTotalMarks &&
                      touched.intermediateEducationTotalMarks
                    }
                    helperText={errors.intermediateEducationTotalMarks}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <div className='file-input'>
                    <label forHtml='frontPicture'>
                      Intermediate Certificate
                    </label>
                    <input
                      id='backPicture'
                      type='file'
                      name='intermediateEducationPicture'
                      onChange={(e) => onChangeImage(e)}
                    />
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormImage
                    title='Intermediate Certificate'
                    picture={values.intermediateEducationPicture}
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

EducationDetails.propTypes = {
  getCurrentApplicant: PropTypes.func.isRequired,
  applicantForwarded: PropTypes.func.isRequired,
  applicant: PropTypes.object.isRequired,
  updateEducationDetails: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  applicant: state.applicant,
});

export default connect(mapStateToProps, {
  getCurrentApplicant,
  applicantForwarded,
  updateEducationDetails,
  setAlert,
})(EducationDetails);
