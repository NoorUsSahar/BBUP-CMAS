import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  getAllAnnouncementFeeds,
  updateAdminAnnouncementFeed,
  announcementFeedEnabled,
  announcementFeedDisabled,
  removeAnnouncementFeed
} from '../../../../actions/adminEtc/announcement';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from '../../../../components/Grid/GridContainer';
import GridItem from '../../../../components/Grid/GridItem';
import Card from '../../../../components/Card/Card';
import CardHeader from '../../../../components/Card/CardHeader';
import CardBody from '../../../../components/Card/CardBody';
import Table from '../../../../components/Table/Table.js';
import {
  Button
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

const ManageAnnouncement = ({
  getAllAnnouncementFeeds,
  updateAdminAnnouncementFeed,
  announcementFeedEnabled,
  announcementFeedDisabled,
  removeAnnouncementFeed,
  announcement: { feeds, loading }
}) => {
  const classes = useStyles(styles);

  const [feedList, setFeedList] = useState([]);

  const getAnnouncementFeeds = () => {
    let res = [];
    let i = 1;

    feedList.forEach(feed => {
      res = [
        ...res,
        [
          `${i}`,
          feed.name,
          feed.message,
          <Moment format='DD-MMM-YYYY'>{feed.startDate}</Moment>,
          <Moment format='DD-MMM-YYYY'>{feed.endDate}</Moment>,
          <Fragment>
            <Link
              to={`/admin/update-announcement-feeds/${feed._id}`}
              className='text-decoration-none'
            >
              <Button
                color='secondary'
                variant='contained'
                className='margin-left-right margin-top-bottom'
              >
                Update
              </Button>
            </Link>
            {feed.status ? (
              <Button
                variant='contained'
                className='margin-left-right margin-top-bottom button-function'
                onClick={() => announcementFeedDisabled(feed._id)}
              >
                Disable
              </Button>
            ) : (
              <Button
                variant='contained'
                className='margin-left-right margin-top-bottom button-function'
                onClick={() => {
                  announcementFeedEnabled(feed._id);
                }}
              >
                Enable
              </Button>
            )}
            <Button
              variant='contained'
              className='margin-left-right margin-top-bottom button-danger'
              onClick={() => removeAnnouncementFeed(feed._id)}
            >
              Remove
            </Button>
          </Fragment>
        ]
      ];
      i++;
    });
    return res;
  };

  const [
    getAllAnnouncementFeedsCalled,
    setGetAllAnnouncementFeedsCalled
  ] = useState(false);

  useEffect(() => {
    if (!getAllAnnouncementFeedsCalled) {
      getAllAnnouncementFeeds();
      setGetAllAnnouncementFeedsCalled(true);
    }

    setFeedList(!loading && feeds.length > 0 ? feeds : []);
  }, [feeds]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Manage Announcements</h4>
            <p className={classes.cardCategoryWhite}>
              Create and enable/disable announcement feeds
            </p>
          </CardHeader>
          <CardBody>
            <GridItem>
              <Link
                to='/admin/create-announcement-feed'
                className='text-decoration-none'
              >
                <Button color='primary' variant='contained'>
                  Create Announcement Feed
                </Button>
              </Link>
            </GridItem>
            <GridItem>
              {feedList.length > 0 ? (
                <Table
                  tableHeaderColor='primary'
                  tableHead={[
                    'S.No',
                    'Creator Name',
                    'Message',
                    'Start Date',
                    'End Date',
                    'Actions'
                  ]}
                  tableData={getAnnouncementFeeds()}
                />
              ) : (
                <div className='text-center imp-message'>No feeds found</div>
              )}
            </GridItem>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

ManageAnnouncement.propTypes = {
  getAllAnnouncementFeeds: PropTypes.func.isRequired,
  updateAdminAnnouncementFeed: PropTypes.func.isRequired,
  announcementFeedEnabled: PropTypes.func.isRequired,
  announcementFeedDisabled: PropTypes.func.isRequired,
  removeAnnouncementFeed: PropTypes.func.isRequired,
  announcement: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  announcement: state.announcement
});

export default connect(mapStateToProps, {
  getAllAnnouncementFeeds,
  updateAdminAnnouncementFeed,
  removeAnnouncementFeed,
  announcementFeedEnabled,
  announcementFeedDisabled
})(withRouter(ManageAnnouncement));
