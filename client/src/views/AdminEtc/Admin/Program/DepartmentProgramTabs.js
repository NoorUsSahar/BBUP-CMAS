import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '../../../../components/Table/Table.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getDepartmentsAllUndergraduatePrograms,
  getDepartmentsAllGraduatePrograms
} from '../../../../actions/adminEtc/program';

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

const DepartmentProgramTabs = ({
  getDepartmentsAllUndergraduatePrograms,
  getDepartmentsAllGraduatePrograms,
  program: { loading, undergraduatePrograms, graduatePrograms },
  match
}) => {
  const classes = useStyles();

  const [undergraduateProgramsList, setUndergraduateProgramsList] = useState(
    []
  );

  const getUndergraduateProgramsList = () => {
    let res = [];
    let i = 1;

    undergraduateProgramsList.forEach(program => {
      res = [
        ...res,
        [
          `${i}`,
          program.name,
          program.department.name,
          program.description,
          program.duration.yearly
        ]
      ];
      i++;
    });
    return res;
  };

  const [graduateProgramsList, setGraduateProgramsList] = useState([]);

  const getGraduateProgramsList = () => {
    let res = [];
    let i = 1;

    graduateProgramsList.forEach(program => {
      res = [
        ...res,
        [
          `${i}`,
          program.name,
          program.department.name,
          program.description,
          program.duration.yearly
        ]
      ];
      i++;
    });
    return res;
  };

  const [
    getAllUndergraduatePrograms,
    setGetAllUndergraduatePrograms
  ] = useState(false);

  useEffect(() => {
    if (!getAllUndergraduatePrograms) {
      getDepartmentsAllUndergraduatePrograms(match.params.id);
      setGetAllUndergraduatePrograms(true);
    }

    setUndergraduateProgramsList(
      !loading && undergraduatePrograms.length > 0 ? undergraduatePrograms : []
    );
  }, [undergraduatePrograms]);

  const [getAllGraduatePrograms, setGetAllGraduatePrograms] = useState(false);

  useEffect(() => {
    if (!getAllGraduatePrograms) {
      getDepartmentsAllGraduatePrograms(match.params.id);
      setGetAllGraduatePrograms(true);
    }

    setGraduateProgramsList(
      !loading && graduatePrograms.length > 0 ? graduatePrograms : []
    );
  }, [graduatePrograms]);

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
          <Tab label='Undergraduate Programs' {...a11yProps(0)} />
          <Tab label='Graduate Programs' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {undergraduateProgramsList.length > 0 ? (
          <Table
            tableHeaderColor='primary'
            tableHead={[
              'S.No',
              'Name',
              'Department',
              'Description',
              'Duration (years)'
            ]}
            tableData={getUndergraduateProgramsList()}
          />
        ) : (
          <div className='text-center imp-message'>No programs found</div>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {graduateProgramsList.length > 0 ? (
          <Table
            tableHeaderColor='primary'
            tableHead={[
              'S.No',
              'Name',
              'Department',
              'Description',
              'Duration (years)'
            ]}
            tableData={getGraduateProgramsList()}
          />
        ) : (
          <div className='text-center imp-message'>No programs found</div>
        )}
      </TabPanel>
    </div>
  );
};

DepartmentProgramTabs.propTypes = {
  getDepartmentsAllUndergraduatePrograms: PropTypes.func.isRequired,
  getDepartmentsAllGraduatePrograms: PropTypes.func.isRequired,
  program: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  program: state.program
});

export default connect(mapStateToProps, {
  getDepartmentsAllGraduatePrograms,
  getDepartmentsAllUndergraduatePrograms
})(withRouter(DepartmentProgramTabs));
