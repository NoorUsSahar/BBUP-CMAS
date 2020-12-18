import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { getAllAnnouncementFeeds } from "../../../actions/adminEtc/announcement";
import GridItem from "../../../components/Grid/GridItem";
import GridContainer from "../../../components/Grid/GridContainer";
import notice from "../../../notice-image.jpg";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
      background: "#2C3E50 ",
      margin: "0",
      fontSize: "1rem",
      fontWeight: "200",
      marginTop: "5px",
      marginLeft: "20px",
      marginBottom: "0",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardCategoryBlack: {
    "&,& a, & a:hover, & a:focus": {
      color: "rgba(0,0,0)",
      margin: "0",
      fontSize: "1.2rem",
      marginTop: "0",
      fontWeight: "300",
      marginLeft: "30%",
      marginBottom: "20px",
    },
    "& a,& a:hover,& a:focus": {
      color: "#000000",
    },
  },
  cardTitleWhite: {
    // position : 'center',
    background: "#000000",
    color: "#FFFFFF",
    fontSize: "2rem",
    marginTop: "20px",
    // marginLeft : '30%',
    // marginRight : '30%',
    marginBottom: "20px",
    align: "center",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    // marginBottom: '3px',
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  paperContainer: {
    top: "40%",

    left: "8%",
    position: "absolute",
    height: "50%",
    width: "50%",
    backgroundImage: `url(${notice})`,
  },
};

const useStyles = makeStyles(styles);

const Announcement = ({
  getAllAnnouncementFeeds,
  announcement: { loading, feeds },
}) => {
  const classes = useStyles(styles);

  const [feedList, setFeedList] = useState([]);

  const getAnnouncementFeeds = () => {
    let res = [];
    let i = 1;

    feedList.forEach((feed) => {
      res = [...res, [`${i}`, feed.name, feed.message]];
      i++;
    });
    return res;
  };

  const [
    getAllAnnouncementFeedsCalled,
    setGetAllAnnouncementFeedsCalled,
  ] = useState(false);

  useEffect(() => {
    if (!getAllAnnouncementFeedsCalled) {
      getAllAnnouncementFeeds();
      setGetAllAnnouncementFeedsCalled(true);
    }

    setFeedList(!loading && feeds.length > 0 ? feeds : []);
  }, [feeds]);

  return (
    <Fragment>
      <Paper className={classes.paperContainer}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <h4 className={classes.cardTitleWhite} align="center">
              Announcements
            </h4>
            {/* <p className={classes.cardCategoryBlack} >
              Daily announcement feeds
            </p> */}

            {feedList.length > 0 ? (
              <ul>
                {feedList.map((feed) => (
                  <li className={classes.cardCategoryWhite}> {feed.message}</li>
                ))}
              </ul>
            ) : (
              <div className="text-center imp-message">No feeds yet</div>
            )}
            {/* <GridItem>
              {feedList.length > 0 ? (
                <Table className={classes.cardCategoryWhite}
                  tableHeaderColor='primary'
                  tableHead={['S.No', 'By', 'Message']}
                  tableData={getAnnouncementFeeds()}
                />
              ) : (
                <div className='text-center imp-message'>No feeds yet</div>
              )}
            </GridItem> */}
          </GridItem>
        </GridContainer>
      </Paper>
    </Fragment>
  );
};

Announcement.propTypes = {
  getAllAnnouncementFeeds: PropTypes.func.isRequired,
  announcement: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  announcement: state.announcement,
});

export default connect(mapStateToProps, { getAllAnnouncementFeeds })(
  withRouter(Announcement)
);
