import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { loadUser } from '../../../actions/adminEtc/auth';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Card from '../../../components/Card/Card';
import CardHeader from '../../../components/Card/CardHeader';
import CardBody from '../../../components/Card/CardBody';
import Table from '../../../components/Table/Table.js';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Checkbox
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

const Dashboard = ({
  loadUser,
  admission: { loading: admissionSessionsLoading, session, sessions },
  auth: { loading, user },
  history
}) => {
  const classes = useStyles(styles);


  useEffect(() => {
loadUser();
  }, [loadUser()]);

  return (
    <GridContainer>
      {/* <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Manage Admissions</h4>
            <p className={classes.cardCategoryWhite}>
              Create and enable/disable admission sessions
            </p>
          </CardHeader>
          <CardBody>
            <GridItem>
              <Link
                to='/admin/create-admission-session'
                className='text-decoration-none'
              >
                <Button color='primary' variant='contained'>
                  Create Admission Session
                </Button>
              </Link>

              <Button
                color='primary'
                variant='contained'
                className='margin-left-right margin-top-bottom'
                onClick={() => generateMeritList()}
              >
                Generate Merit List
              </Button>
            </GridItem>
            {sessionList.length > 0 ? (
              <Table
                tableHeaderColor='primary'
                tableHead={[
                  'S.No',
                  'Session Name',
                  'Start Date',
                  'End Date',
                  'Actions'
                ]}
                tableData={getAdmissionSession()}
              />
            ) : (
              <div className='text-center imp-message'>No sessions found</div>
            )}
          </CardBody>
        </Card>
      </GridItem> */}
    </GridContainer>
  );
};

Dashboard.propTypes = {
  loadUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  admission: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admission: state.admission,
  auth: state.auth
});

export default connect(mapStateToProps, {
  loadUser,
})(withRouter(Dashboard));
