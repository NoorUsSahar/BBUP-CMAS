import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../../../components/Grid/GridItem.js';
import GridContainer from '../../../../components/Grid/GridContainer.js';
import Card from '../../../../components/Card/Card.js';
import CardHeader from '../../../../components/Card/CardHeader.js';
import CardBody from '../../../../components/Card/CardBody.js';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { getAllDepartments } from '../../../../actions/adminEtc/department';
import { setAlert } from '../../../../actions/adminEtc/alert';
import {
  updateUndergraduateProgram,
  getProgramById,
} from '../../../../actions/adminEtc/program';
import { withRouter } from 'react-router-dom';
import {
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

const UpdateProgram = ({
  getAllDepartments,
  history,
  department: { loading, departments },
  setAlert,
  updateUndergraduateProgram,
  getProgramById,
  program: { loading: programLoading, program },
  match,
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
      name: !programLoading && program !== null ? program.name : '',
      description:
        !programLoading && program !== null ? program.description : '',
      yearly:
        !programLoading && program !== null ? program.duration.yearly : '',
      semester:
        !programLoading && program !== null ? program.duration.semester : '',
      feePerSemester:
        !programLoading && program !== null ? program.feePerSemester : '',
      minPercentageOfEquivalence:
        !programLoading && program !== null
          ? program.criteria.minPercentageOfEquivalence
          : '',
      categoryOfDegree:
        !programLoading && program !== null
          ? program.criteria.categoryOfDegree
          : '',
      department: !programLoading && program !== null ? program.department : '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.categoryOfDegree === '' || values.department === '') {
        setAlert('Please fill all the fields');
      } else {
        updateUndergraduateProgram(match.params.id, values, history);
      }
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      description: Yup.string().required('Description is required'),
      yearly: Yup.number()
        .typeError('Yearly duration must be a number')
        .required('Yearly duration is required')
        .min(1, 'Yearly duration must be atleast 1'),
      semester: Yup.number()
        .typeError('Semester duration must be a number')
        .required('Semester duration is required')
        .min(1, 'Semester duration must be atleast 1'),
      feePerSemester: Yup.number()
        .typeError('Fee per semester duration must be a number')
        .required('Fee per semester duration is required')
        .min(1, 'Fee per semester duration must be atleast 1'),
      minPercentageOfEquivalence: Yup.number()
        .typeError('Minimum percentage of equivalence must be a number')
        .required('Minimum percentage of equivalence is required')
        .min(1, 'Minimum percentage of equivalence must be atleast 1'),
      categoryOfDegree: Yup.number().required('Category of degree is required'),
      department: Yup.string().required('Description is required'),
    }),
  });

  // const [formData, setFormData] = useState({
  //   name: '',
  //   description: '',
  //   yearly: '',
  //   semester: '',
  //   feePerSemester: '',
  //   minPercentageOfEquivalence: '',
  //   categoryOfDegree: '',
  //   department: ''
  // });

  // const {
  //   name,
  //   description,
  //   yearly,
  //   semester,
  //   feePerSemester,
  //   minPercentageOfEquivalence,
  //   categoryOfDegree,
  //   department
  // } = formData;

  // const onChange = e => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (categoryOfDegree === '' || department === '') {
  //     setAlert('Please fill all the fields');
  //   } else {
  //     updateUndergraduateProgram(match.params.id, formData, history);
  //   }
  // };

  // const [getAllDepartmentsCalled, setGetAllDepartmentsCalled] = useState(false);
  // const [getProgramByIdCalled, setGetProgramByIdCalled] = useState(false);

  useEffect(
    () => {
      // if (!getAllDepartmentsCalled) {
      getAllDepartments();
      // setGetAllDepartmentsCalled(true);
      // }

      // if (!getProgramByIdCalled) {
      getProgramById(match.params.id);
      // setGetProgramByIdCalled(true);
      // }

      // setFormData({
      //   name: !programLoading && program !== null ? program.name : '',
      //   description:
      //     !programLoading && program !== null ? program.description : '',
      //   yearly:
      //     !programLoading && program !== null ? program.duration.yearly : '',
      //   semester:
      //     !programLoading && program !== null ? program.duration.semester : '',
      //   feePerSemester:
      //     !programLoading && program !== null ? program.feePerSemester : '',
      //   minPercentageOfEquivalence:
      //     !programLoading && program !== null
      //       ? program.criteria.minPercentageOfEquivalence
      //       : '',
      //   categoryOfDegree:
      //     !programLoading && program !== null
      //       ? program.criteria.categoryOfDegree
      //       : '',
      //   department: !programLoading && program !== null ? program.department : '',
      // });
    },
    [
      // program
    ]
  );

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Update Program</h4>
            <p className={classes.cardCategoryWhite}>
              Fill in the information below to update a program
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
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
                    label='Yearly duration'
                    variant='outlined'
                    type='number'
                    name='yearly'
                    value={values.yearly}
                    onChange={handleChange}
                    error={errors.yearly && touched.yearly}
                    helperText={errors.yearly}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Semester duration'
                    variant='outlined'
                    type='number'
                    name='semester'
                    value={values.semester}
                    onChange={handleChange}
                    error={errors.semester && touched.semester}
                    helperText={errors.semester}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Fee per semester (Rs.)'
                    variant='outlined'
                    type='number'
                    name='feePerSemester'
                    value={values.feePerSemester}
                    onChange={handleChange}
                    error={errors.feePerSemester && touched.feePerSemester}
                    helperText={errors.feePerSemester}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Minimum percentage of equivalence'
                    variant='outlined'
                    type='number'
                    name='minPercentageOfEquivalence'
                    value={values.minPercentageOfEquivalence}
                    onChange={handleChange}
                    error={
                      errors.minPercentageOfEquivalence &&
                      touched.minPercentageOfEquivalence
                    }
                    helperText={errors.minPercentageOfEquivalence}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl variant='outlined' className='form-control'>
                    <InputLabel id='cod-label'>Category of degree</InputLabel>
                    <Select
                      labelId='cod-label'
                      label='Category of degree'
                      name='categoryOfDegree'
                      value={values.categoryOfDegree}
                      onChange={handleChange}
                      error={
                        errors.categoryOfDegree && touched.categoryOfDegree
                      }
                      helperText={errors.categoryOfDegree}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={0}>
                        Intermediate with Mathematics
                      </MenuItem>
                      <MenuItem value={1}>Intermediate with Biology</MenuItem>
                      <MenuItem value={2}>
                        Intermediate with any subject
                      </MenuItem>
                    </Select>
                  </FormControl>
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
                      {!loading &&
                        departments.length > 0 &&
                        departments.map((department) => (
                          <MenuItem value={`${department._id}`}>
                            {department.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    className='form-control'
                    label='Description'
                    variant='outlined'
                    type='text'
                    rows={5}
                    multiline
                    name='description'
                    value={values.description}
                    onChange={handleChange}
                    error={errors.description && touched.description}
                    helperText={errors.description}
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

UpdateProgram.propTypes = {
  getAllDepartments: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  department: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  updateUndergraduateProgram: PropTypes.func.isRequired,
  getProgramById: PropTypes.func.isRequired,
  program: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  department: state.department,
  program: state.program,
});

export default connect(mapStateToProps, {
  getAllDepartments,
  setAlert,
  updateUndergraduateProgram,
  getProgramById,
})(withRouter(UpdateProgram));
