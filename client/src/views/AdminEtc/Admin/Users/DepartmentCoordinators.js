import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { loadDepartmentsAllCoordinator } from '../../../../actions/adminEtc/coordinator';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card } from '@material-ui/core';
import Table from '../../../../components/Table/Table.js';
import GridItem from '../../../../components/Grid/GridItem.js';
import GridContainer from '../../../../components/Grid/GridContainer.js';
import CardHeader from '../../../../components/Card/CardHeader.js';
import CardBody from '../../../../components/Card/CardBody.js';

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

const DepartmentCoordinators = ({
  loadDepartmentsAllCoordinator,
  coordinator: { loading: coordinatorLoading, coordinators },
  department: { loading, department },
  match
}) => {
  const classes = useStyles(styles);

  const [coordinatorList, setCoordinatorList] = useState([]);

  const getDepartmentCoordinators = () => {
    let res = [];
    let i = 1;

    coordinatorList.forEach(coordinator => {
      res = [
        ...res,
        [
          `${i}`,
          coordinator.name,
          coordinator.email,
          coordinator.description,
          coordinator.department.name,
          <Fragment>
            <Link
              to={`/admin/department/coordinators/profile/${coordinator._id}`}
              className='text-decoration-none'
            >
              <Button
                variant='contained'
                className='margin-left-right margin-top-bottom button-function'
              >
                View
              </Button>
            </Link>
          </Fragment>
        ]
      ];
      i++;
    });
    return res;
  };

  const [
    getDepartmentsAllCoordiantors,
    setGetDepartmentsAllCoordiantors
  ] = useState(false);

  useEffect(() => {
    if (!getDepartmentsAllCoordiantors) {
      loadDepartmentsAllCoordinator(match.params.id);
      setGetDepartmentsAllCoordiantors(true);
    }

    setCoordinatorList(
      !coordinatorLoading && coordinators.length > 0 ? coordinators : []
    );
  }, [coordinators]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Manage Departments</h4>
            <p className={classes.cardCategoryWhite}>
              Below is a list of all the deparmtents
            </p>
          </CardHeader>
          <CardBody>
            <GridItem xs={12} sm={12} md={12}>
              {coordinatorList.length > 0 ? (
                <Table
                  tableHeaderColor='primary'
                  tableHead={[
                    'S.No',
                    'Name',
                    'Email',
                    'Description',
                    'Department',
                    'Actions'
                  ]}
                  tableData={getDepartmentCoordinators()}
                />
              ) : (
                <div className='text-center imp-message'>
                  No Coordinators found for this department
                </div>
              )}
            </GridItem>
            &nbsp;
            <GridItem xs={12} sm={12} md={12}>
              <Link
                to={'/admin/manage-departments'}
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
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

DepartmentCoordinators.propTypes = {
  loadDepartmentsAllCoordinator: PropTypes.func.isRequired,
  coordinator: PropTypes.object.isRequired,
  department: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  coordinator: state.coordinator,
  department: state.department
});

export default connect(mapStateToProps, { loadDepartmentsAllCoordinator })(
  withRouter(DepartmentCoordinators)
);
