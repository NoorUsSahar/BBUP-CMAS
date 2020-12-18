import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../../../components/Grid/GridItem.js';
import GridContainer from '../../../../components/Grid/GridContainer.js';
import Card from '../../../../components/Card/Card.js';
import CardHeader from '../../../../components/Card/CardHeader.js';
import CardBody from '../../../../components/Card/CardBody.js';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { registerFaculty } from '../../../../actions/adminEtc/auth';
import { setAlert } from '../../../../actions/adminEtc/alert';
// import { createProgram } from '../../actions/program';
import { withRouter } from 'react-router-dom';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';

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

const RegisterFaculty = ({
  registerFaculty,
  history,
//   department: { loading, departments },
  setAlert,
//   createProgram
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2 : ''
  });

  const {
    name,
    email,
    password,
    password2
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    // if (categoryOfDegree === '' || department === '') {
    //   setAlert('Please fill all the fields');
    // } else {
    //   createProgram(formData, history);
    // }
    registerFaculty(formData , history)
  };

//   const [getAllDepartmentsCalled, setGetAllDepartmentsCalled] = useState(false);

//   useEffect(() => {
//     if (!getAllDepartmentsCalled) {
//       getAllDepartments();
//       setGetAllDepartmentsCalled(true);
//     }
//   }, []);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Register Faculty</h4>
            <p className={classes.cardCategoryWhite}>
              Fill in the information below to register a new Faculty member
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={e => onSubmit(e)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
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
                  <TextField
                    className='form-control'
                    label='Email'
                    variant='outlined'
                    type='email'
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Password'
                    variant='outlined'
                    type='password'
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}
                    required={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    className='form-control'
                    label='Password'
                    variant='outlined'
                    type='password'
                    name='password2'
                    value={password2}
                    onChange={e => onChange(e)}
                    required={true}
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

RegisterFaculty.propTypes = {
  registerFaculty: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
//   department: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
//   createProgram: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  department: state.department
});

export default connect(mapStateToProps, {
  registerFaculty,
  setAlert,
  
})(withRouter(RegisterFaculty));
