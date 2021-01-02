import React, { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { connect } from "react-redux";
// import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { getCurrentEvents } from "../../../actions/facultysc/event";
import "../../../App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Event_Popup from "./Event-Popup";
import Moment from "react-moment";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card.js";
import CardBody from "../../../components/Card/CardBody.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import CardHeader from "../../../components/Card/CardHeader";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { Button } from "@material-ui/core";
const localizer = momentLocalizer(moment);

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
      margin: "0",
      fontSize: "0.9rem",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    fontSize: "2.3rem",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};
const useStyles = makeStyles(styles);
const EventCalendar = ({ event: { event }, getCurrentEvents }) => {
  useEffect(() => {
    getCurrentEvents();
  }, [getCurrentEvents]);

  let myEventList = [];

  if (event != null) {
    myEventList = event.event;
  }

  const handleSelect = (
    { start, end }
    ) => {
    const title = window.prompt('New Event name')
    if (title)
    window.prompt(title , start, end)
      // this.setState({
      //   events: [
      //     myEventList,
      //     {
      //       start,
      //       end,
      //       title,
      //     },
      //   ],
      // }
      // )
  }

  //dialog open 
  const [open, setOpen] = React.useState(false);
  const [eventStart, setEventStart] = React.useState(false);
  const [eventEnd, setEventEnd] = React.useState(false);
  const [eventName, setEventName] = React.useState(false);

  const handleClickOpen = (eventTitle , start , end) => {
    setOpen(true);
    setEventName(eventTitle);
    setEventStart(start);
    setEventEnd(end);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <div className="App">
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <GridItem xs={12} sm={12} md={9}>
                <h1 className={classes.cardTitleWhite}>Calendar</h1>

                <Event_Popup></Event_Popup>
              </GridItem>
            </CardHeader>

            <CardBody>
              <Calendar
              popup
              selectable = 'true'
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={myEventList}
                style={{ height: "100vh" }}
                onSelectEvent={event => handleClickOpen(event.title , event.start , event.end)}
                onSelectSlot={handleSelect}
              // {event => alert(event.title)}
              />
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"This is your scheduled meeting"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                   <p>Event : {eventName} <br></br>
                  Start Date:  <Moment format="YYYY/MM/D">{eventStart}</Moment>
                  <br></br>
                  End Date : <Moment format="YYYY/MM/D">{eventEnd}</Moment>
                    </p> 
                    
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleEdit} color="primary">
                    Edit
                     </Button>
                  <Button onClick={handleDelete} color="primary" >
                    Delete
                     </Button>
                     <Button onClick={handleClose} color="primary" autoFocus>
                    Close
                     </Button>
                </DialogActions>
              </Dialog>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

EventCalendar.propTypes = {
  getCurrentEvents: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
  // auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentEvents })(EventCalendar);
