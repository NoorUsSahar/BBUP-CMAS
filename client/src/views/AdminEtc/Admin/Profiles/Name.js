import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { changeName } from '../../../../actions/adminEtc/auth';
import GridContainer from '../../../../components/Grid/GridContainer';
import GridItem from '../../../../components/Grid/GridItem';
import Card from '../../../../components/Card/Card';
import CardHeader from '../../../../components/Card/CardHeader.js';
import CardBody from '../../../../components/Card/CardBody.js';
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
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const useStyles = makeStyles(styles);

const Name = ({ changeName }) => {
  const classes = useStyles(styles);

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
    },
    // enableReinitialize: true,
    onSubmit: (values) => {
      changeName(values);
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
    }),
  });

  // const [formData, setFormData] = useState(false);

  // const { name } = formData;

  // const onChange = e => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const onSubmit = e => {
  //   e.preventDefault();
  //   changeName(formData);
  // };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Change Name</h4>
            <p className={classes.cardCategoryWhite}>Update your name</p>
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
                <GridItem xs={12} sm={12} md={4}>
                  <Button color='secondary' variant='contained' type='submit'>
                    Update
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

Name.propTypes = {};

const mapStateToProps = (state) => ({
  changeName: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { changeName })(Name);
