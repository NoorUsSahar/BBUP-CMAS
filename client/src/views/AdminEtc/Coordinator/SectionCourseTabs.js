import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '../../../components/Table/Table.js';
import {
  getSectionsAllUndergraduateCourses,
  getSectionsAllGraduateCourses
} from '../../../actions/adminEtc/course';

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

const SectionCourseTabs = ({
  getSectionsAllUndergraduateCourses,
  getSectionsAllGraduateCourses,
  course: { loading, undergraduateCourses, graduateCourses },
  match
}) => {
  const classes = useStyles();

  const [undergraduateCoursesList, setUndergraduateCoursesList] = useState([]);

  const getUndergraduateCoursesList = () => {
    let res = [];
    let i = 1;

    undergraduateCoursesList.forEach(course => {
      res = [
        ...res,
        [
          `${i}`,
          course.name,
          course.creditHours,
          course.program.name,
          course.category === 0 ? 'Undergraduate' : 'Graduate'
        ]
      ];
      i++;
    });
    return res;
  };

  const [graduateCoursesList, setGraduateCoursesList] = useState([]);

  const getGraduateCoursesList = () => {
    let res = [];
    let i = 1;

    graduateCoursesList.forEach(course => {
      res = [
        ...res,
        [
          `${i}`,
          course.name,
          course.creditHours,
          course.program.name,
          course.category === 0 ? 'Undergraduate' : 'Graduate'
        ]
      ];
      i++;
    });
    return res;
  };

  const [getAllUndergraduateCourses, setGetAllUndergraduateCourses] = useState(
    false
  );

  useEffect(() => {
    if (!getAllUndergraduateCourses) {
      getSectionsAllUndergraduateCourses(match.params.id);
      setGetAllUndergraduateCourses(true);
    }

    setUndergraduateCoursesList(
      !loading && undergraduateCourses.length > 0 ? undergraduateCourses : []
    );
  }, [undergraduateCourses]);

  const [getAllGraduateCourses, setGetAllGraduateCourses] = useState(false);

  useEffect(() => {
    if (!getAllGraduateCourses) {
      getSectionsAllGraduateCourses(match.params.id);
      setGetAllGraduateCourses(true);
    }

    setGraduateCoursesList(
      !loading && graduateCourses.length > 0 ? graduateCourses : []
    );
  }, [graduateCourses]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
          variant='fullWidth'
        >
          <Tab label='Undergraduate Courses' {...a11yProps(0)} />
          <Tab label='Graduate Courses' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {undergraduateCoursesList.length > 0 ? (
          <Table
            tableHeaderColor='primary'
            tableHead={['S.No', 'Name', 'Credit Hours', 'Programs', 'Category']}
            tableData={getUndergraduateCoursesList()}
          />
        ) : (
          <div className='text-center imp-message'>No courses found</div>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {graduateCoursesList.length > 0 ? (
          <Table
            tableHeaderColor='primary'
            tableHead={['S.No', 'Name', 'Credit Hours', 'Programs', 'Category']}
            tableData={getGraduateCoursesList()}
          />
        ) : (
          <div className='text-center imp-message'>No courses found</div>
        )}
      </TabPanel>
    </div>
  );
};

SectionCourseTabs.propTypes = {
  getSectionsAllUndergraduateCourses: PropTypes.func.isRequired,
  getSectionsAllGraduateCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  course: state.course
});

export default connect(mapStateToProps, {
  getSectionsAllUndergraduateCourses,
  getSectionsAllGraduateCourses
})(withRouter(SectionCourseTabs));
