import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { getCurrentSession } from '../../../../actions/adminEtc/admission';
import {
  applicantVerified,
  applicantPending,
  applicantDiscarded,
  applicantAcquired
} from '../../../../actions/adminEtc/applicant';
import { Button, Card } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
// import MeritList from './MeritList';
import Table from '../../../../components/Table/Table.js';
import GridItem from '../../../../components/Grid/GridItem.js';
import GridContainer from '../../../../components/Grid/GridContainer.js';
import CardHeader from '../../../../components/Card/CardHeader.js';
import CardBody from '../../../../components/Card/CardBody.js';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';

const useStylesIcon = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary
  }
}));

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

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

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

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

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

const ManageMeritList = ({
  getCurrentSession,
  applicantVerified,
  applicantPending,
  applicantDiscarded,
  applicantAcquired,
  admission: { loading, session },
  match
}) => {
  const classes = useStyles(customStyles);

  const classStyle = useStylesForTabs();

  const classIcon = useStylesIcon();

  const [sessionMeritList, setSessionMeritList] = useState([]);

  const getMeritData = () => {
    let res = [];
    let i = 1;

    sessionMeritList.forEach(item => {
      if (!item.applicantId.applicantDiscarded) {
        res = [
          ...res,
          [
            `${i}`,
            <img
              alt=''
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%'
              }}
              src={item.applicantId.personalDetails.avatar}
            />,
            item.applicantId.personalDetails.name,
            item.applicantId.personalDetails.email,
            item.applicantId.educationDetails.totalAggregate,
            item.applicantId.feeDetails.amountPaid,
            <Fragment>
              {/* <Button
              variant='contained'
              className='margin-left-right margin-top-bottom button-function'
            >
              Fee Status
            </Button> */}
              <div>
                <Button
                  // variant='outlined'
                  // color='primary'
                  onClick={handleClickOpen}
                  className='button-info'
                >
                  Status
                </Button>
                <Dialog
                  onClose={handleClose}
                  aria-labelledby='customized-dialog-title'
                  open={open}
                >
                  <DialogTitle
                    id='customized-dialog-title'
                    onClose={handleClose}
                  >
                    Submitted Challan Verification
                  </DialogTitle>
                  <DialogContent dividers>
                    <Typography gutterBottom>
                      <img
                        src={item.applicantId.feeDetails.challanPicture}
                        alt=''
                        style={{
                          width: '500px',
                          height: '500px'
                        }}
                      />
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClose} color='primary'>
                      Save changes
                    </Button>
                  </DialogActions>
                </Dialog>{' '}
                {item.applicantId.applicantVerified ? (
                  <Button
                    variant='contained'
                    className='margin-left-right margin-top-bottom button-function'
                    onClick={() => applicantPending(item.applicantId._id)}
                  >
                    Pending
                  </Button>
                ) : (
                  <Button
                    variant='contained'
                    className='margin-left-right margin-top-bottom button-function'
                    onClick={() => applicantVerified(item.applicantId._id)}
                  >
                    Verify
                  </Button>
                )}
                <Button
                  variant='contained'
                  className='margin-left-right margin-top-bottom button-danger'
                  onClick={() => applicantDiscarded(item.applicantId._id)}
                >
                  Discard
                </Button>
              </div>
            </Fragment>
          ]
        ];
        i++;
      }
    });
    return res;
    // let res = [];
    // session.meritList.map(listItem => {
    //   const name = listItem.applicantId.personalDetails.name;
    //   const email = listItem.applicantId.personalDetails.email;
    //   const totalAggregate =
    //     listItem.applicantId.educationDetails.totalAggregate;
    //   res = [...res, name, email, totalAggregate];
    // });
    // return res;
  };

  const getDiscardedMeritData = () => {
    let res = [];
    let i = 1;

    sessionMeritList.forEach(item => {
      if (item.applicantId.applicantDiscarded) {
        res = [
          ...res,
          [
            `${i}`,
            <img
              alt=''
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%'
              }}
              src={item.applicantId.personalDetails.avatar}
            />,
            item.applicantId.personalDetails.name,
            item.applicantId.personalDetails.email,
            item.applicantId.educationDetails.totalAggregate,
            item.applicantId.feeDetails.amountPaid,
            <Fragment>
              {/* <Button
              variant='contained'
              className='margin-left-right margin-top-bottom button-function'
            >
              Fee Status
            </Button> */}
              <div>
                <Button
                  // variant='outlined'
                  // color='primary'
                  onClick={handleClickOpen}
                  className='button-info'
                >
                  Status
                </Button>
                <Dialog
                  onClose={handleClose}
                  aria-labelledby='customized-dialog-title'
                  open={open}
                >
                  <DialogTitle
                    id='customized-dialog-title'
                    onClose={handleClose}
                  >
                    Submitted Challan Verification
                  </DialogTitle>
                  <DialogContent dividers>
                    <Typography gutterBottom>
                      <img
                        src={item.applicantId.feeDetails.challanPicture}
                        alt=''
                        style={{
                          width: '500px',
                          height: '500px'
                        }}
                      />
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClose} color='primary'>
                      Save changes
                    </Button>
                  </DialogActions>
                </Dialog>{' '}
                <Button
                  variant='contained'
                  className='margin-left-right margin-top-bottom'
                  color='primary'
                  onClick={() => applicantAcquired(item.applicantId._id)}
                >
                  Acquire
                </Button>
              </div>
            </Fragment>
          ]
        ];
        i++;
      }
    });
    return res;
  };

  const [getCurrentSessionCalled, setGetCurrentSessionCalled] = useState(false);

  useEffect(() => {
    if (!getCurrentSessionCalled) {
      getCurrentSession();
      setGetCurrentSessionCalled(true);
    }

    setSessionMeritList(
      !loading && session !== null && session.meritList.length > 0
        ? session.meritList
        : []
    );
  }, [session]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
              <h4 className={classes.cardTitleWhite}>Manage Merit List</h4>
              <p className={classes.cardCategoryWhite}>
                Below is the merit list of all applicants who qulaified for
                admission in this session. <br />
                Here you can view their fee status and vefiry them for
                enrollment.
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
                      <Tab label='Undergraduate List' {...a11yProps(0)} />
                      <Tab label='Graduate List' {...a11yProps(1)} />
                      <Tab
                        label={<DeleteIcon style={{ float: 'right' }} />}
                        {...a11yProps(2)}
                      />
                    </Tabs>
                  </AppBar>

                  <TabPanel value={value} index={0}>
                    {sessionMeritList.length > 0 ? (
                      // <MeritList
                      //   rows={
                      //     !loading &&
                      //     session !== null &&
                      //     session.meritList.length > 0
                      //       ? getMeritData()
                      //       : []
                      //   }
                      // />
                      <Table
                        tableHeaderColor='primary'
                        tableHead={[
                          'S.No',
                          'Avatar',
                          'Name',
                          'Email',
                          'Total Aggregate (%)',
                          'Amount Paid',
                          'Actions'
                        ]}
                        tableData={getMeritData()}
                      />
                    ) : (
                      <div className='text-center imp-message'>
                        No data found
                      </div>
                    )}
                  </TabPanel>

                  <TabPanel value={value} index={1}>
                    {/* <Link
          to='/admin/create-graduate-program'
          className='text-decoration-none'
        >
          <Button color='primary' variant='contained'>
            Add Graduate program
          </Button> */}
                    {/* {console.log('error')} */}
                    {/* </Link> */}

                    {sessionMeritList.length > 0 ? (
                      <Table
                        tableHeaderColor='primary'
                        tableHead={[
                          'S.No',
                          'Avatar',
                          'Name',
                          'Email',
                          'Total Aggregate (%)',
                          'Amount Paid',
                          'Actions'
                        ]}
                        tableData={getMeritData()}
                      />
                    ) : (
                      <div className='text-center imp-message'>
                        No data found
                      </div>
                    )}
                  </TabPanel>

                  <TabPanel value={value} index={2}>
                    {sessionMeritList.length > 0 ? (
                      <Table
                        tableHeaderColor='primary'
                        tableHead={[
                          'S.No',
                          'Avatar',
                          'Name',
                          'Email',
                          'Total Aggregate (%)',
                          'Amount Paid',
                          'Actions'
                        ]}
                        tableData={getDiscardedMeritData()}
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

ManageMeritList.propTypes = {
  getCurrentSession: PropTypes.func.isRequired,
  applicantVerified: PropTypes.func.isRequired,
  applicantPending: PropTypes.func.isRequired,
  applicantDiscarded: PropTypes.func.isRequired,
  applicantAcquired: PropTypes.func.isRequired,
  admission: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admission: state.admission
});

export default connect(mapStateToProps, {
  getCurrentSession,
  applicantPending,
  applicantVerified,
  applicantDiscarded,
  applicantAcquired
})(withRouter(ManageMeritList));
