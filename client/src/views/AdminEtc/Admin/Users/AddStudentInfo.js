import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../../../components/Grid/GridItem.js';
import GridContainer from '../../../../components/Grid/GridContainer.js';
import Card from '../../../../components/Card/Card.js';
import CardHeader from '../../../../components/Card/CardHeader.js';
import CardBody from '../../../../components/Card/CardBody.js';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { addInfo } from '../../../../actions/adminEtc/studentprofile';
import { withRouter } from 'react-router-dom';
import { TextField } from '@material-ui/core';
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

const AddInfo = ({ addInfo, history }) => {
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
      Name: '',
      Program: '',
      fatherName: '',
      cnic: '',
      semester: '',
      dateOfBirth: '',
      phone_number: '',
      domicile: '',
      Nationality: '',
      registrationNo: '',
      gpa: '',
      cgpa: '',
      department: '',
      courses: '',
      area: '',
      city: '',
      District: '',
      school: '',
      college: '',
      Olevels_matricMarks: '',
      alevels_fscMarks: '',
      feildOfStudy: '',
      yearOfMariculatioin: '',
      yearOfIntermediate: '',
      overseasEducation: '',
    },
    // enableReinitialize: true,
    onSubmit: (values) => {
      addInfo(values, history);
    },
    validationSchema: Yup.object().shape({
      Name: Yup.string().required('Name is required'),
      Program: Yup.string().required('Program is required'),
      fatherName: Yup.string().required('Father name is required'),
      cnic: Yup.number()
        .typeError('CNIC must be a number')
        .required('CNIC is required')
        .min(1, 'CNIC must be atleast 1'),
      semester: Yup.string().required('Semester is required'),
      startDate: Yup.date().min(
        new Date(Date.now() - 86400000),
        'Start date is required'
      ),
      phone_number: Yup.number()
        .typeError('Phone number must be a number')
        .required('Phone number is required')
        .min(1, 'Phone number must be atleast 1'),
      domicile: Yup.string().required('Dmoicile is required'),
      Nationality: Yup.string().required('Nationality is required'),
      registrationNo: Yup.number()
        .typeError('Registration number must be a number')
        .required('Registration number is required')
        .min(40, 'Registration number must be atleast 40%'),
      gpa: Yup.string().required('GPA is required'),
      cgpa: Yup.string().required('CGPA is required'),
      department: Yup.string().required('Department is required'),
      courses: Yup.string().required('Courses is required'),
      area: Yup.string().required('Area is required'),
      city: Yup.string().required('City is required'),
      District: Yup.string().required('District is required'),
      school: Yup.string().required('School is required'),
      college: Yup.string().required('String is required'),
      Olevels_matricMarks: Yup.string().required('O-levels/Matric is required'),
      alevels_fscMarks: Yup.string().required('A-levels/Fsce is required'),
      feildOfStudy: Yup.string().required('Feild of study is required'),
      yearOfMariculatioin: Yup.string().required(
        'Year of metriculation is required'
      ),
      yearOfIntermediate: Yup.string().required(
        'Year of intermediate is required'
      ),
      overseasEducation: Yup.string().required(
        'Overseas education is required'
      ),
    }),
  });

  // const [formData, setFormData] = useState({
  //   Name: '',
  //   Program: '',
  //   fatherName: '',
  //   cnic: '',
  //   semester: '',
  //   dateOfBirth: '',
  //   phone_number: '',
  //   domicile: '',
  //   Nationality: '',
  //   registrationNo: '',
  //   gpa: '',
  //   cgpa: '',
  //   department: '',
  //   courses: '',
  //   area: '',
  //   city: '',
  //   District: '',
  //   school: '',
  //   college: '',
  //   Olevels_matricMarks: '',
  //   alevels_fscMarks: '',
  //   feildOfStudy: '',
  //   yearOfMariculatioin: '',
  //   yearOfIntermediate: '',
  //   overseasEducation: '',
  // });

  // const {
  //   Name,
  //   Program,
  //   fatherName,
  //   cnic,
  //   semester,
  //   dateOfBirth,
  //   phone_number,
  //   domicile,
  //   Nationality,
  //   registrationNo,
  //   gpa,
  //   cgpa,
  //   department,
  //   courses,
  //   area,
  //   city,
  //   District,
  //   school,
  //   college,
  //   Olevels_matricMarks,
  //   alevels_fscMarks,
  //   feildOfStudy,
  //   yearOfMariculatioin,
  //   yearOfIntermediate,
  //   overseasEducation,
  //   section,
  // } = formData;

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   addInfo(formData, history);
  // };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h3 className={classes.cardTitleWhite}>
                  Add Information to Student Profile
                </h3>
                <p className={classes.cardCategoryWhite}>Add the fields</p>
              </GridItem>
            </GridContainer>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <GridContainer>
                <GridItem xs={12} sm={6} md={12}>
                  <TextField
                    className='form-control'
                    label='Name'
                    variant='outlined'
                    type='text'
                    name='Name'
                    value={values.Name}
                    onChange={handleChange}
                    error={errors.name && touched.name}
                    helperText={errors.name}
                  />
                  <TextField
                    className='form-control'
                    label='Program'
                    variant='outlined'
                    type='text'
                    name='Program'
                    value={values.Program}
                    onChange={handleChange}
                    error={errors.Program && touched.Program}
                    helperText={errors.Program}
                  />
                  <TextField
                    className='form-control'
                    label="Father's Name"
                    variant='outlined'
                    type='text'
                    name='fatherName'
                    value={values.fatherName}
                    onChange={handleChange}
                    error={errors.fatherName && touched.fatherName}
                    helperText={errors.fatherName}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}></GridItem>
                <GridItem xs={12} sm={6} md={4}></GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='CNIC'
                    variant='outlined'
                    type='text'
                    name='cnic'
                    value={values.cnic}
                    onChange={handleChange}
                    error={errors.cnic && touched.cnic}
                    helperText={errors.cnic}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='Semester'
                    variant='outlined'
                    type='text'
                    name='semester'
                    value={values.semester}
                    onChange={handleChange}
                    error={errors.semester && touched.semester}
                    helperText={errors.semester}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='Section'
                    variant='outlined'
                    type='text'
                    name='section'
                    value={values.section}
                    onChange={handleChange}
                    error={errors.section && touched.section}
                    helperText={errors.section}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='Date of Birth'
                    variant='outlined'
                    type='text'
                    name='dateOfBirth'
                    value={values.dateOfBirth}
                    onChange={handleChange}
                    error={errors.dateOfBirth && touched.dateOfBirth}
                    helperText={errors.dateOfBirth}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='Phone Number'
                    variant='outlined'
                    type='text'
                    name='phone_number'
                    pattern='[0-9]{11}'
                    value={values.phone_number}
                    onChange={handleChange}
                    error={errors.phone_number && touched.phone_number}
                    helperText={errors.phone_number}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
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
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='Nationality'
                    variant='outlined'
                    type='text'
                    name='Nationality'
                    value={values.Nationality}
                    onChange={handleChange}
                    error={errors.Nationality && touched.Nationality}
                    helperText={errors.Nationality}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='Registration Number'
                    variant='outlined'
                    type='text'
                    name='registrationNo'
                    value={values.registrationNo}
                    onChange={handleChange}
                    error={errors.registrationNo && touched.registrationNo}
                    helperText={errors.registrationNo}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='gpa'
                    variant='outlined'
                    type='text'
                    name='gpa'
                    value={values.gpa}
                    onChange={handleChange}
                    error={errors.gpa && touched.gpa}
                    helperText={errors.gpa}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='cgpa'
                    variant='outlined'
                    type='text'
                    name='cgpa'
                    value={values.cgpa}
                    onChange={handleChange}
                    error={errors.cgpa && touched.cgpa}
                    helperText={errors.cgpa}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='Department'
                    variant='outlined'
                    type='text'
                    name='department'
                    value={values.department}
                    onChange={handleChange}
                    error={errors.department && touched.department}
                    helperText={errors.department}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='Address'
                    variant='outlined'
                    multiline
                    rows={2}
                    type='text'
                    name='area'
                    value={values.area}
                    onChange={handleChange}
                    error={errors.area && touched.area}
                    helperText={errors.area}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='City'
                    variant='outlined'
                    type='text'
                    name='city'
                    value={values.city}
                    onChange={handleChange}
                    error={errors.city && touched.city}
                    helperText={errors.city}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='District'
                    variant='outlined'
                    type='text'
                    name='District'
                    value={values.District}
                    onChange={handleChange}
                    error={errors.District && touched.District}
                    helperText={errors.District}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='Courses'
                    variant='outlined'
                    multiline
                    rows={2}
                    type='text'
                    name='courses'
                    value={values.courses}
                    onChange={handleChange}
                    error={errors.courses && touched.courses}
                    helperText={errors.courses}
                  />
                </GridItem>

                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='School'
                    variant='outlined'
                    type='text'
                    name='school'
                    value={values.school}
                    onChange={handleChange}
                    error={errors.school && touched.school}
                    helperText={errors.school}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='College'
                    variant='outlined'
                    type='text'
                    name='college'
                    value={values.college}
                    onChange={handleChange}
                    error={errors.college && touched.college}
                    helperText={errors.college}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='Olevels or Matric marks'
                    variant='outlined'
                    type='text'
                    name='Olevels_matricMarks'
                    value={values.Olevels_matricMarks}
                    onChange={handleChange}
                    error={
                      errors.Olevels_matricMarks && touched.Olevels_matricMarks
                    }
                    helperText={errors.Olevels_matricMarks}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='Alevels or Fsc marks'
                    variant='outlined'
                    type='text'
                    name='alevels_fscMarks'
                    value={values.alevels_fscMarks}
                    onChange={handleChange}
                    error={errors.alevels_fscMarks && touched.alevels_fscMarks}
                    helperText={errors.alevels_fscMarks}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='Feild of Study'
                    variant='outlined'
                    type='text'
                    name='feildOfStudy'
                    value={values.feildOfStudy}
                    onChange={handleChange}
                    error={errors.feildOfStudy && touched.feildOfStudy}
                    helperText={errors.feildOfStudy}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='Year of Matriculation'
                    variant='outlined'
                    type='text'
                    name='yearOfMariculatioin'
                    value={values.yearOfMariculatioin}
                    onChange={handleChange}
                    error={
                      errors.yearOfMetriculation && touched.yearOfMetriculation
                    }
                    helperText={errors.yearOfMetriculation}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='Year of Intermediate'
                    variant='outlined'
                    type='text'
                    name='yearOfIntermediate'
                    value={values.yearOfIntermediate}
                    onChange={handleChange}
                    error={
                      errors.yearOfIntermediate && touched.yearOfIntermediate
                    }
                    helperText={errors.yearOfIntermediate}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    className='form-control'
                    label='Over seas education if...'
                    variant='outlined'
                    type='text'
                    name='overseasEducation'
                    value={values.overseasEducation}
                    onChange={handleChange}
                    error={
                      errors.overseasEducation && touched.overseasEducation
                    }
                    helperText={errors.overseasEducation}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
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

AddInfo.propTypes = {
  addInfo: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(null, { addInfo })(withRouter(AddInfo));
