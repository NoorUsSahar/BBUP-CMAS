import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { connect } from "react-redux";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { getCurrentEvents, getEvent, updateEvent } from "../../../actions/facultysc/event";
import { createEvent } from "../../../actions/facultysc/event";
import "../../../App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Event_Popup from "./Event-Popup";
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
import { TextField } from "@material-ui/core";
import Backdrop from '@material-ui/core/Backdrop';


// import { Button } from "@material-ui/core";
const localizer = momentLocalizer(moment);

const styles = makeStyles((theme) => (
  {
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
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }
));

const useStyles = makeStyles(styles);

const EventCalendar = ({ event: { event },
  getCurrentEvents,
  getEvent,
  history,
  createEvent,
  updateEvent }) => {

  // create event 
  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
  });

  const { title, start, end } = formData;

  //updateEvent
  const [UEventformData, setUEventFormData] = useState({
    id: "",
    Updatetitle: "",
    Updatestart: "",
    Updateend: "",
  });

  const { id, Updatetitle, Updatestart, Updateend } = UEventformData;

  //dialog open 
  const [eventOpen, setEventOpen] = React.useState(false);
  const [addEventOpen, setAddEventOpen] = React.useState(false);
  const [updateEventOpen, setUpdateEventOpen] = React.useState(false);
  const [eventStart, setEventStart] = React.useState(false);
  const [eventEnd, setEventEnd] = React.useState(false);
  const [eventName, setEventName] = React.useState(false);
  const [idEvent, setidEvent] = React.useState(false);

  const handleAddEventOpen = ({ startI, endI }) => {

    const startD = moment(startI).format("DD/MM/YYYY h:mm A");
    const endD = moment(endI).format("DD MM YYYY h:mm A")
    setEventStart(startD);
    setEventEnd(endD);
    setFormData({
      start: startD,
      end: endD
    })
    addEventOpenFunc();
  };

  const addEventOpenFunc = () => {
    setAddEventOpen(true);
  }


  const handleAddEventClose = () => {
    setAddEventOpen(false);
  };


  const handleClickOpen = (eventId, eventTitle, startE, endE) => {
    setEventOpen(true);
    const startD = moment(startE).format("DD MM YYYY h:mm:ss a");
    const endD = moment(endE).format("DD MM YYYY h:mm:ss a");
    setEventStart(startD);
    setEventEnd(endD);
    setEventName(eventTitle);
    setidEvent(idEvent);
    getEvent(eventId);
    setFormData({ ...formData, start: startD , end:endD });
  };

  const handleClose = () => {
    setEventOpen(false);
  };

  const handleUpdateEventClose = () => {
    setUpdateEventOpen(false);
  }
  const handleEdit = () => {
    setEventOpen(false);
    setUpdateEventOpen(true);
  };
  const handleDelete = () => {
    setEventOpen(false);
  };



  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createEvent(formData, history);
  };

  const onUpdateChange = (e) =>
  setUEventFormData({ ...UEventformData, [e.target.name]: e.target.value, id: idEvent });

  const onUpdateSubmit = (e) => {
    e.preventDefault();
    updateEvent(UEventformData, history);
  }

  useEffect(() => {
    getCurrentEvents();
  }, [getCurrentEvents]);

  let myEventList = [];

  if (event != null) {
    myEventList = event.event;
  }

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
                selectable='true'
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={myEventList}
                style={{ height: "100vh" }}
                onSelectEvent={event => handleClickOpen(event._id, event.title, event.start, event.end)}
                onSelectSlot={handleAddEventOpen}
              // {event => alert(event.title)}
              />
              {/* Event Dialog Box */}
              <Backdrop className={classes.backdrop} >
                <Dialog
                  open={eventOpen}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"This is your scheduled meeting"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <p>Event : {eventName} <br></br>
                  Start Date:  {eventStart}
                        <br></br>
                  End Date :{eventEnd}
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
              </Backdrop>

              {/* Update Event Dialog Box */}
              <Backdrop className={classes.backdrop} >
                <Dialog
                  open={updateEventOpen}
                  onClose={handleUpdateEventClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Update new Event"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                    </DialogContentText>
                    <form className='form' onSubmit={(e) => onUpdateSubmit(e)}>
                     
                    Title
                    <TextField
                        className='form-control'
                        label='Title'
                        variant='outlined'
                        type='text'
                        name='Updatetitle'
                        value={eventName}
                        onChange={(e) => onUpdateChange(e)}
                        required={true}
                      />
                Start Date
                <TextField
                        className='form-control'
                        variant='outlined'
                        type='datetime-local'
                        name='Updatestart'
                        value={eventStart}
                        onChange={(e) => onUpdateChange(e)}
                        required={true}
                      />
                 End Date
                <TextField
                        className='form-control'
                        variant='outlined'
                        type='datetime-local'
                        name='Updateend'
                        value={eventEnd}
                        onChange={(e) => onUpdateChange(e)}
                        required={true}
                      />
                      <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        type='submit'
                        className='form-control'
                      >
                        Submit
                </Button>
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleUpdateEventClose} color="primary" autoFocus>
                      Close
                     </Button>
                  </DialogActions>
                </Dialog>
              </Backdrop>

              {/* Add Event Dialog Box */}
              <Backdrop className={classes.backdrop} >
                <Dialog
                  open={addEventOpen}
                  onClose={handleAddEventClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Add a new Event"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                    </DialogContentText>
                    <form className='form' onSubmit={(e) => onSubmit(e)}>
                      {eventStart}
                    Title
                    <TextField
                        className='form-control'
                        label='Title'
                        variant='outlined'
                        type='text'
                        name='title'
                        value={title}
                        onChange={(e) => onChange(e)}
                        required={true}
                      />
                Start Date
                <TextField
                        className='form-control'
                        variant='outlined'
                        type='datetime-local'
                        name='start'
                        value={start}
                        onChange={(e) => onChange(e)}
                        required={true}
                      />
                 End Date
                <TextField
                        className='form-control'
                        variant='outlined'
                        type='datetime-local'
                        name='end'
                        value={end}
                        onChange={(e) => onChange(e)}
                        required={true}
                      />
                      <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        type='submit'
                        className='form-control'
                      >
                        Submit
                </Button>
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleAddEventClose} color="primary" autoFocus>
                      Close
                     </Button>
                  </DialogActions>
                </Dialog>
              </Backdrop>
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
  createEvent: PropTypes.func.isRequired,
  getEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  event: state.event,
  // auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentEvents,
  createEvent,
  getEvent,
  updateEvent
})(withRouter(EventCalendar));
