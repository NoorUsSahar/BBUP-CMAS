import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { loadUser } from '../../../actions/adminEtc/auth';
import {
  getEnrollmentSemesterById,
  updateEnrollmentSemesterById
} from '../../../actions/adminEtc/enrollment';
import { getAllPrograms } from '../../../actions/adminEtc/program';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Card from '../../../components/Card/Card';
import CardHeader from '../../../components/Card/CardHeader';
import CardBody from '../../../components/Card/CardBody';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '0.9rem',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF'
    }
  },
  cardCategoryBlack: {
    '&,& a, & a:hover, & a:focus': {
      color: 'rgba(0,0,0)',
      margin: '0',
      fontSize: '0.9rem',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#000000'
    }
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
      lineHeight: '1'
    }
  }
};

const useStyles = makeStyles(styles);

const UpdateEnrollmentSemester = ({
  loadUser,
  updateEnrollmentSemesterById,
  getEnrollmentSemesterById,
  getAllPrograms,
  enrollment: { loading, semesters, semester },
  program: { loading: programLoading, programs },
  auth: { user },
  history,
  match
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

  const getFormattedDate = dateToFormat => {
    let d = new Date(dateToFormat);

    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return `${year}-${month < 10 ? '0' : ''}${month}-${
      date < 10 ? '0' : ''
    }${date}`;
  };

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    maximumBatchStrength: '',
    startDate: '',
    endDate: '',
    program: ''
  });

  const {
    name,
    description,
    maximumBatchStrength,
    startDate,
    endDate,
    program
  } = formData;

  // const [getCurrentUserCalled, setGetCurrentUserCalled] = useState(false);

  // useEffect(() => {
  //   if (!getCurrentUserCalled) {
  //     loadUser();
  //     setGetCurrentUserCalled(true);
  //   }

  //   setFormData({
  //     name:
  //       !loading && user !== null && user.semesters
  //         ? user.semesters.name
  //         : null,
  //     description:
  //       !loading && user !== null && user.semesters
  //         ? user.semesters.description
  //         : null,
  //     maximumBatchStrength:
  //       !loading && user !== null && user.semesters
  //         ? user.semesters.maximumBatchStrength
  //         : null,
  //     startDate:
  //       !loading && user !== null && user.semesters
  //         ? getFormattedDate(user.semesters.startDate)
  //         : getCurrentDate(),
  //     endDate:
  //       !loading && user !== null && user.semester
  //         ? getFormattedDate(user.semesters.endDate)
  //         : getCurrentDate(),
  //     program:
  //       !loading && user !== null && user.semesters
  //         ? user.semesters.program
  //         : null
  //   });
  // }, [user, semesters]);

  const [getAllProgramsCalled, getSetAllProgramsCalled] = useState(false);

  useEffect(() => {
    if (!getAllProgramsCalled) {
      getAllPrograms();
      getSetAllProgramsCalled(true);
    }
  }, []);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateEnrollmentSemesterById(match.params.id, formData, history);
  };

  const [
    getEnrollmentSemesterByIdCalled,
    setGetEnrollmentByIdCalled
  ] = useState(false);

  useEffect(() => {
    if (!getEnrollmentSemesterByIdCalled) {
      getEnrollmentSemesterById(match.params.id);
      setGetEnrollmentByIdCalled(true);
    }

    setFormData({
      name: !loading && semester !== null ? semester.name : '',
      description: !loading && semester !== null ? semester.description : '',
      maximumBatchStrength:
        !loading && semester !== null ? semester.maximumBatchStrength : '',
      startDate: !loading && semester !== null ? semester.startDate : '',
      endDate: !loading && semester !== null ? semester.endDate : '',
      program: !loading && semester !== null ? semester.program : ''
    });
  }, [semester]);

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
            <form onSubmit={e => onSubmit(e)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Semester Name'
                    variant='outlined'
                    type='text'
                    name='name'
                    value={name}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Description'
                    variant='outlined'
                    type='text'
                    name='description'
                    value={description}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='StartDate'
                    variant='outlined'
                    type='date'
                    name='startDate'
                    value={startDate}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='End Date'
                    variant='outlined'
                    type='date'
                    name='endDate'
                    value={endDate}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Maximum Batch Strength'
                    variant='outlined'
                    type='text'
                    name='maximumBatchStrength'
                    value={maximumBatchStrength}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl variant='outlined' className='form-control'>
                    <InputLabel id='program-label'>Program</InputLabel>
                    <Select
                      labelId='program-label'
                      label='Program'
                      name='program'
                      value={program}
                      onChange={e => onChange(e)}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {!programLoading &&
                        // semester !== null &&
                        programs.length > 0 &&
                        programs.map(program => (
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

UpdateEnrollmentSemester.propTypes = {
  loadUser: PropTypes.func.isRequired,
  updateEnrollmentSemesterById: PropTypes.func.isRequired,
  getEnrollmentSemesterById: PropTypes.func.isRequired,
  getAllPrograms: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  enrollment: PropTypes.object.isRequired,
  program: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  enrollment: state.enrollment,
  auth: state.auth,
  program: state.program
});

export default connect(mapStateToProps, {
  loadUser,
  getAllPrograms,
  getEnrollmentSemesterById,
  updateEnrollmentSemesterById
})(withRouter(UpdateEnrollmentSemester));
