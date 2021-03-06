import * as React from "react";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import { appointments } from "./demo-data/appointments";
import Card from "../../../../components/Card/Card.js";
import CardHeader from "../../../../components/Card/CardHeader.js";
import CardBody from "../../../../components/Card/CardBody.js";
import GridItem from "../../../../components/Grid/GridItem.js";
import GridContainer from "../../../../components/Grid/GridContainer.js";

const views = ["week", "month"];

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: "2018-06-27",
      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }

  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const {
      currentDate,
      data,
      addedAppointment,
      appointmentChanges,
      editingAppointment,
    } = this.state;

    return (
      <GridContainer>
        <Card>
          <CardHeader color="primary">
            <h1>Semester 1</h1>
          </CardHeader>
          <CardBody>
            <Scheduler
              data={data}
              height={660}
              views={views}
              defaultCurrentView="week"
              defaultCurrentDate={currentDate}
            >
              <ViewState currentDate={currentDate} />
              <EditingState
                onCommitChanges={this.commitChanges}
                addedAppointment={addedAppointment}
                onAddedAppointmentChange={this.changeAddedAppointment}
                appointmentChanges={appointmentChanges}
                onAppointmentChangesChange={this.changeAppointmentChanges}
                editingAppointment={editingAppointment}
                onEditingAppointmentChange={this.changeEditingAppointment}
              />
              <WeekView startDayHour={9} endDayHour={17} />
              <AllDayPanel />
              <EditRecurrenceMenu />
              <ConfirmationDialog />
              <Appointments />
              <AppointmentTooltip showOpenButton showDeleteButton />
              <AppointmentForm />
            </Scheduler>
          </CardBody>
        </Card>
        <Card>
          <CardHeader color="primary">
            <h1>Semester 2</h1>
          </CardHeader>
          <CardBody>
            <Scheduler data={data} height={660}>
              <ViewState currentDate={currentDate} />
              <EditingState
                onCommitChanges={this.commitChanges}
                addedAppointment={addedAppointment}
                onAddedAppointmentChange={this.changeAddedAppointment}
                appointmentChanges={appointmentChanges}
                onAppointmentChangesChange={this.changeAppointmentChanges}
                editingAppointment={editingAppointment}
                onEditingAppointmentChange={this.changeEditingAppointment}
              />
              <WeekView startDayHour={9} endDayHour={17} />
              <AllDayPanel />
              <EditRecurrenceMenu />
              <ConfirmationDialog />
              <Appointments />
              <AppointmentTooltip showOpenButton showDeleteButton />
              <AppointmentForm />
            </Scheduler>
          </CardBody>
        </Card>

        <Card>
          <CardHeader color="primary">
            <h1>Semester 3</h1>
          </CardHeader>
          <CardBody>
            <Scheduler data={data} height={660}>
              <ViewState currentDate={currentDate} />
              <EditingState
                onCommitChanges={this.commitChanges}
                addedAppointment={addedAppointment}
                onAddedAppointmentChange={this.changeAddedAppointment}
                appointmentChanges={appointmentChanges}
                onAppointmentChangesChange={this.changeAppointmentChanges}
                editingAppointment={editingAppointment}
                onEditingAppointmentChange={this.changeEditingAppointment}
              />
              <WeekView startDayHour={9} endDayHour={17} />
              <AllDayPanel />
              <EditRecurrenceMenu />
              <ConfirmationDialog />
              <Appointments />
              <AppointmentTooltip showOpenButton showDeleteButton />
              <AppointmentForm />
            </Scheduler>
          </CardBody>
        </Card>

        <Card>
          <CardHeader color="primary">
            <h1>Semester 4</h1>
          </CardHeader>
          <CardBody>
            <Scheduler data={data} height={660}>
              <ViewState currentDate={currentDate} />
              <EditingState
                onCommitChanges={this.commitChanges}
                addedAppointment={addedAppointment}
                onAddedAppointmentChange={this.changeAddedAppointment}
                appointmentChanges={appointmentChanges}
                onAppointmentChangesChange={this.changeAppointmentChanges}
                editingAppointment={editingAppointment}
                onEditingAppointmentChange={this.changeEditingAppointment}
              />
              <WeekView startDayHour={9} endDayHour={17} />
              <AllDayPanel />
              <EditRecurrenceMenu />
              <ConfirmationDialog />
              <Appointments />
              <AppointmentTooltip showOpenButton showDeleteButton />
              <AppointmentForm />
            </Scheduler>
          </CardBody>
        </Card>

        <Card>
          <CardHeader color="primary">
            <h1>Semester 5</h1>
          </CardHeader>
          <CardBody>
            <Scheduler data={data} height={660}>
              <ViewState currentDate={currentDate} />
              <EditingState
                onCommitChanges={this.commitChanges}
                addedAppointment={addedAppointment}
                onAddedAppointmentChange={this.changeAddedAppointment}
                appointmentChanges={appointmentChanges}
                onAppointmentChangesChange={this.changeAppointmentChanges}
                editingAppointment={editingAppointment}
                onEditingAppointmentChange={this.changeEditingAppointment}
              />
              <WeekView startDayHour={9} endDayHour={17} />
              <AllDayPanel />
              <EditRecurrenceMenu />
              <ConfirmationDialog />
              <Appointments />
              <AppointmentTooltip showOpenButton showDeleteButton />
              <AppointmentForm />
            </Scheduler>
          </CardBody>
        </Card>

        <Card>
          <CardHeader color="primary">
            <h1>Semester 6</h1>
          </CardHeader>
          <CardBody>
            <Scheduler data={data} height={660}>
              <ViewState currentDate={currentDate} />
              <EditingState
                onCommitChanges={this.commitChanges}
                addedAppointment={addedAppointment}
                onAddedAppointmentChange={this.changeAddedAppointment}
                appointmentChanges={appointmentChanges}
                onAppointmentChangesChange={this.changeAppointmentChanges}
                editingAppointment={editingAppointment}
                onEditingAppointmentChange={this.changeEditingAppointment}
              />
              <WeekView startDayHour={9} endDayHour={17} />
              <AllDayPanel />
              <EditRecurrenceMenu />
              <ConfirmationDialog />
              <Appointments />
              <AppointmentTooltip showOpenButton showDeleteButton />
              <AppointmentForm />
            </Scheduler>
          </CardBody>
        </Card>

        <Card>
          <CardHeader color="primary">
            <h1>Semester 7</h1>
          </CardHeader>
          <CardBody>
            <Scheduler data={data} height={660}>
              <ViewState currentDate={currentDate} />
              <EditingState
                onCommitChanges={this.commitChanges}
                addedAppointment={addedAppointment}
                onAddedAppointmentChange={this.changeAddedAppointment}
                appointmentChanges={appointmentChanges}
                onAppointmentChangesChange={this.changeAppointmentChanges}
                editingAppointment={editingAppointment}
                onEditingAppointmentChange={this.changeEditingAppointment}
              />
              <WeekView startDayHour={9} endDayHour={17} />
              <AllDayPanel />
              <EditRecurrenceMenu />
              <ConfirmationDialog />
              <Appointments />
              <AppointmentTooltip showOpenButton showDeleteButton />
              <AppointmentForm />
            </Scheduler>
          </CardBody>
        </Card>

        <Card>
          <CardHeader color="primary">
            <h1>Semester 8</h1>
          </CardHeader>
          <CardBody>
            <Scheduler data={data} height={660}>
              <ViewState currentDate={currentDate} />
              <EditingState
                onCommitChanges={this.commitChanges}
                addedAppointment={addedAppointment}
                onAddedAppointmentChange={this.changeAddedAppointment}
                appointmentChanges={appointmentChanges}
                onAppointmentChangesChange={this.changeAppointmentChanges}
                editingAppointment={editingAppointment}
                onEditingAppointmentChange={this.changeEditingAppointment}
              />
              <WeekView startDayHour={9} endDayHour={17} />
              <AllDayPanel />
              <EditRecurrenceMenu />
              <ConfirmationDialog />
              <Appointments />
              <AppointmentTooltip showOpenButton showDeleteButton />
              <AppointmentForm />
            </Scheduler>
          </CardBody>
        </Card>
      </GridContainer>
    );
  }
}
