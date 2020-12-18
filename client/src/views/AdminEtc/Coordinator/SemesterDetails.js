import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCurrentEnrollmentSemester } from '../../../actions/adminEtc/enrollment';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Table from '../../../components/Table/Table.js';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardBody from '../../../components/Card/CardBody.js';

import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const customStyles = {
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStylesForTabs = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

const useStyles = makeStyles(customStyles);

const SemesterDetails = ({
  getCurrentEnrollmentSemester,
  enrollment: { loading, semester },
  match
}) => {
  const classes = useStyles(customStyles);

  const classStyle = useStylesForTabs();

  const [semesterSectionList, setSemesterSectionList] = useState([]);

  const getSectionData = () => {
    let res = [];
    let i = 1;

    semesterSectionList.forEach(semester => {
      res = [
        ...res,
        [
          `${i}`,
          semester.sectionId.name,
          semester.sectionId.maximumStrength,
          semester.sectionId.currentNumberOfStudents
        ]
      ];
      i++;
    });
    return res;
  };

  const [semesterCourseList, setSemesterCourseList] = useState([]);

  const getCourseData = () => {
    let res = [];
    let i = 1;

    semesterCourseList.forEach(semester => {
      res = [
        ...res,
        [
          `${i}`,
          semester.courseId.name,
          semester.courseId.creditHours,
          semester.courseId.isOffered ? 'Offered' : 'Not Offered'
        ]
      ];
      i++;
    });
    return res;
  };

  const [
    getCurrentSemesterByIdCalled,
    setGetCurrentSemesterByIdCalled
  ] = useState(false);

  useEffect(() => {
    if (!getCurrentSemesterByIdCalled) {
      getCurrentEnrollmentSemester(match.params.id);
      setGetCurrentSemesterByIdCalled(true);
    }

    setSemesterSectionList(
      !loading && semester.sectionList.length > 0 ? semester.sectionList : []
    );
    setSemesterCourseList(
      !loading && semester.courseList.length > 0 ? semester.courseList : []
    );
  }, [semester]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>Semester Details</h4>
              <p className={classes.cardCategoryWhite}>
                Below is the list of current semester details
              </p>
            </CardHeader>
            <CardBody>
              <div className={classStyle}>
                <GridItem xs={12} sm={12} md={12}>
                  <AppBar position='static'>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label='simple tabs example'
                      variant='fullWidth'
                    >
                      <Tab label='Sections' {...a11yProps(0)} />
                      <Tab label='Courses' {...a11yProps(1)} />
                    </Tabs>
                  </AppBar>

                  <TabPanel value={value} index={0}>
                    {semesterSectionList.length > 0 ? (
                      <Table
                        tableHeaderColor='primary'
                        tableHead={[
                          'S.No',
                          'Name',
                          'Maximum Strength',
                          'Current Students '
                        ]}
                        tableData={getSectionData()}
                      />
                    ) : (
                      <div className='text-center imp-message'>
                        No data found
                      </div>
                    )}
                  </TabPanel>

                  <TabPanel value={value} index={1}>
                    {semesterCourseList.length > 0 ? (
                      <Table
                        tableHeaderColor='primary'
                        tableHead={['S.No', 'Name', 'Credit Hours', 'Status ']}
                        tableData={getCourseData()}
                      />
                    ) : (
                      <div className='text-center imp-message'>
                        No data found
                      </div>
                    )}
                  </TabPanel>
                </GridItem>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Fragment>
  );
};

SemesterDetails.propTypes = {
  getCurrentEnrollmentSemester: PropTypes.func.isRequired,
  enrollment: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  enrollment: state.enrollment
});

export default connect(mapStateToProps, { getCurrentEnrollmentSemester })(
  withRouter(SemesterDetails)
);
