import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { createSection } from '../../../actions/adminEtc/section';
import { setAlert } from '../../../actions/adminEtc/alert';
import { getAllEnrollmentSemesters } from '../../../actions/adminEtc/enrollment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardBody from '../../../components/Card/CardBody.js';

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

const CreateSection = ({
  createSection,
  getAllEnrollmentSemesters,
  history,
  enrollment: { loading, semesters },
  setAlert
}) => {
  const classes = useStyles(styles);

  const [formData, setFormData] = useState({
    name: '',
    maximumStrength: '',
    currentNumberOfStudents: '',
    semester: ''
  });

  const { name, maximumStrength, currentNumberOfStudents, semester } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (semester === '') {
      setAlert('Please fill in all the fields in order to proceed');
    } else {
      console.log(formData);
      createSection(formData, history);
    }
  };

  const [getAllSemestersCalled, setGetAllSemestersCalled] = useState(false);

  useEffect(() => {
    if (!getAllSemestersCalled) {
      getAllEnrollmentSemesters();
      setGetAllSemestersCalled(true);
    }
  }, []);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Create Section</h4>
            <p className={classes.cardCategoryWhite}>
              Fill in the information below to create a section
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={e => onSubmit(e)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Name'
                    variant='outlined'
                    type='text'
                    name='name'
                    value={name}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl variant='outlined' className='form-control'>
                    <InputLabel id='semester-label'>Semester</InputLabel>
                    <Select
                      labelId='semester-label'
                      label='Semester'
                      name='semester'
                      value={semester}
                      onChange={e => onChange(e)}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {!loading &&
                        // semester !== null &&
                        semesters.length > 0 &&
                        semesters.map(semester => (
                          <MenuItem value={`${semester._id}`}>
                            {semester.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Max Strength Allowed'
                    variant='outlined'
                    type='text'
                    name='maximumStrength'
                    value={maximumStrength}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Current Students'
                    variant='outlined'
                    type='text'
                    name='currentNumberOfStudents'
                    value={currentNumberOfStudents}
                    onChange={e => onChange(e)}
                    required={true}
                  />
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
                    to={'/coordinator/manage-sections'}
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

CreateSection.propTypes = {
  createSection: PropTypes.func.isRequired,
  getAllEnrollmentSemesters: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  section: PropTypes.object.isRequired,
  enrollment: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  enrollment: state.enrollment,
  section: state.section
});

export default connect(mapStateToProps, {
  createSection,
  setAlert,
  getAllEnrollmentSemesters
})(withRouter(CreateSection));
