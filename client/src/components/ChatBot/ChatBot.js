import React, { useState, Component } from "react";
import ChatBot from "react-simple-chatbot";
import Review from "./Review";
import SendMails from "./SendMails.js";
import { ThemeProvider } from "styled-components";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// all available props
const theme = {
  background: "#F9F9FC",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#242549",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#242549",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const FindPage = (props) => {
  return (
    <div>
      {props.user == 'admin' ? (<Redirect to={`/admin/${props.category}`} /> ) : (
        <div>{props.user == 'faculty' ? (<Redirect to={`/faculty/${props.category}`} /> ) : (
          <div>
            { props.user == 'applicant' ? (<Redirect to={`/applicant/${props.category}`} />) : (
              <Redirect to={`/coordinator/${props.category}`}/>
            )}
          </div>
        )}</div>
      )}
      </div>

  )
};

const EmailCategory = (props) => {
  //TODO :
  //set the category of the email i.e.,complain/ suggestion

  // const [state, setState] = useState({ emailCategory : ''});
  // const category = props.category
  // {setState({emailCategory: category})}
  // const {emailCategory} = state;
  return <p></p>;
};

const stepsForAdmin = [
  {
    id: "start-message",
    message: "Hi Admin! Do you need some help?",
    trigger: "start-option",
  },
  {
    id: "start-option",
    options: [{ value: "yes", label: "Yes", trigger: "1" }],
  },
  {
    id: "1",
    message: "How can I help you?",
    trigger: "help-options",
  },
  {
    id: "help-options",
    options: [
      {
        value: "complain",
        label: "Complain",
        trigger: "2",
        component: <EmailCategory category="Complain" />,
      },
      { value: "suggestion", label: "Suggestion", trigger: "2" },
      { value: "find-a-page", label: "Find a Page", trigger: "find-page" },
      // { value: 'other', label: 'Other', trigger: 'other-options' },
    ],
  },
  {
    id: "2",
    message: "What is your name?",
    trigger: "name",
  },
  {
    id: "name",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: "{previousValue}, what is your email?",
    trigger: "email",
  },
  {
    id: "email",
    user: true,
    validator: (value) => {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true;
      } else {
        return "Please enter a valid email.";
      }
    },
    trigger: "4",
  },
  {
    id: "4",
    message: "What is your complain/suggestion?",
    trigger: "body",
  },
  {
    id: "body",
    user: true,
    trigger: "7",
  },
  {
    id: "7",
    message: "Great! Check out your summary",
    trigger: "review",
  },
  {
    id: "review",
    component: <Review />,
    asMessage: true,
    trigger: "update",
  },
  {
    id: "update",
    message: "Would you like to update some field?",
    trigger: "update-question",
  },
  {
    id: "update-question",
    options: [
      { value: "yes", label: "Yes", trigger: "update-yes" },
      { value: "no", label: "No", trigger: "do-send-mail" },
    ],
  },
  {
    id: "update-yes",
    message: "What field would you like to update?",
    trigger: "update-fields",
  },
  {
    id: "update-fields",
    options: [
      { value: "name", label: "Name", trigger: "update-name" },
      { value: "email", label: "Email", trigger: "update-email" },
      { value: "body", label: "Query", trigger: "update-body" },
    ],
  },
  {
    id: "update-name",
    update: "name",
    trigger: "7",
  },
  {
    id: "update-email",
    update: "email",
    trigger: "7",
  },
  {
    id: "update-body",
    update: "body",
    trigger: "7",
  },
  {
    id: "find-page",
    message: "Select a category",
    trigger: "category-pages",
  },
  {
    id: "category-pages",
    options: [
      {
        value: "faculty",
        label: "Faculty",
        component: <FindPage category="manage-faculty" user='admin'/>,
        trigger: "8",
      },
      {
        value: "coordinators",
        label: "Coordinators",
        component: <FindPage category="manage-coordinators" user='admin' />,
        trigger: "8",
      },
      {
        value: "applicant",
        label: "Applicant",
        component: <FindPage category="manage-applicants" user='admin' />,
        trigger: "8",
      },
      {
        value: "admission",
        label: "Admission",
        component: <FindPage category="manage-admission" user='admin' />,
        trigger: "8",
      },
      {
        value: "department",
        label: "Department",
        component: <FindPage category="manage-departments"  user='admin'/>,
        trigger: "8",
      },
      {
        value: "programs",
        label: "Program",
        component: <FindPage category="manage-programs" user='admin'/>,
        trigger: "8",
      },
      {
        value: "announcement",
        label: "Announcement",
        component: <FindPage category="manage-announcements" user='admin'/>,
        trigger: "8",
      },
      {
        value: "survey",
        label: "Survey",
        component: <FindPage category="survey" user='admin' />,
        trigger: "8",
      },
      // {value : 'student', label: 'Student', component:<Redirect to='admin/dashboard'></Redirect> , trigger : '8'}
    ],
  },
  {
    id: "8",
    message: "Do you want to see another page?",
    trigger: "another-page",
  },
  {
    id: "another-page",
    options: [
      { value: "yes", label: "Yes", trigger: "find-page" },
      { value: "no", label: "No", trigger: "9" },
    ],
  },
  {
    id: "9",
    message: "Okay!!",
    trigger: "10",
  },
  {
    id: "10",
    message: "Do you need help with something else?",
    trigger: "help-something-else",
  },
  {
    id: "help-something-else",
    options: [
      { value: "yes", label: "Yes", trigger: "1" },
      { value: "no", label: "No", trigger: "end-message" },
    ],
  },
  {
    id: "do-send-mail",
    message: "Do you want to send an email?",
    trigger: "send-mail-options",
  },
  {
    id: "send-mail-options",
    options: [
      { value: "yes", label: "Yes", trigger: "send-mail" },
      { value: "no", label: "No", trigger: "no-send-mail" },
    ],
  },
  {
    id: "send-mail",
    component: <SendMails />,
    asMessage: true,
    trigger: "10",
  },
  {
    id: "no-send-mail",
    message: "Your mail was not sent",
    trigger: "1",
  },
  {
    id: "end-message",
    message: "Thanks!",

    trigger: "the-end",
  },
  {
    id: "the-end",
    message: "Bye!!",
    end: true,
  },
];

const stepsForFaculty = [
  {
    id: "start-message",
    message: "Hi Faculty! Do you need some help?",
    trigger: "start-option",
  },
  {
    id: "start-option",
    options: [{ value: "yes", label: "Yes", trigger: "1" }],
  },
  {
    id: "1",
    message: "How can I help you?",
    trigger: "help-options",
  },
  {
    id: "help-options",
    options: [
      {
        value: "complain",
        label: "Complain",
        trigger: "2",
        component: <EmailCategory category="Complain" />,
      },
      { value: "suggestion", label: "Suggestion", trigger: "2" },
      { value: "find-a-page", label: "Find a Page", trigger: "find-page" },
      // { value: 'other', label: 'Other', trigger: 'other-options' },
    ],
  },
  {
    id: "2",
    message: "What is your name?",
    trigger: "name",
  },
  {
    id: "name",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: "{previousValue}, what is your email?",
    trigger: "email",
  },
  {
    id: "email",
    user: true,
    validator: (value) => {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true;
      } else {
        return "Please enter a valid email.";
      }
    },
    trigger: "4",
  },
  {
    id: "4",
    message: "What is your complain/suggestion?",
    trigger: "body",
  },
  {
    id: "body",
    user: true,
    trigger: "7",
  },
  {
    id: "7",
    message: "Great! Check out your summary",
    trigger: "review",
  },
  {
    id: "review",
    component: <Review />,
    asMessage: true,
    trigger: "update",
  },
  {
    id: "update",
    message: "Would you like to update some field?",
    trigger: "update-question",
  },
  {
    id: "update-question",
    options: [
      { value: "yes", label: "Yes", trigger: "update-yes" },
      { value: "no", label: "No", trigger: "do-send-mail" },
    ],
  },
  {
    id: "update-yes",
    message: "What field would you like to update?",
    trigger: "update-fields",
  },
  {
    id: "update-fields",
    options: [
      { value: "name", label: "Name", trigger: "update-name" },
      { value: "email", label: "Email", trigger: "update-email" },
      { value: "body", label: "Query", trigger: "update-body" },
    ],
  },
  {
    id: "update-name",
    update: "name",
    trigger: "7",
  },
  {
    id: "update-email",
    update: "email",
    trigger: "7",
  },
  {
    id: "update-body",
    update: "body",
    trigger: "7",
  },
  {
    id: "find-page",
    message: "Select a category",
    trigger: "category-pages",
  },
  {
    id: "category-pages",
    options: [
      {
        value: "profile",
        label: "Profile",
        component: <FindPage category="profiles" user='faculty'/>,
        trigger: "8",
      },
      {
        value: "calendar",
        label: "Calendar",
        component: <FindPage category="calendar" user='faculty'/>,
        trigger: "8",
      },
      {
        value: "edit-profile",
        label: "Edit Profile",
        component: <FindPage category="edit-profile" user='faculty'/>,
        trigger: "8",
      },
      {
        value: "create-profile",
        label: "Create Profile",
        component: <FindPage category="create-profile" user='faculty'/>,
        trigger: "8",
      },
      {
        value: "add-education",
        label: "Add Education",
        component: <FindPage category="add-education" user='faculty'/>,
        trigger: "8",
      },
      {
        value: "add-research-paper",
        label: "Add research paper",
        component: <FindPage category="add-research-paper" user='faculty' />,
        trigger: "8",
      },
      {
        value: "add-experience",
        label: "Add experience",
        component: <FindPage category="add-experience" user='faculty'/>,
        trigger: "8",
      },
      {
        value: "survey",
        label: "Survey",
        component: <FindPage category="survey" user='faculty'/>,
        trigger: "8",
      },
      // {value : 'student', label: 'Student', component:<Redirect to='admin/dashboard'></Redirect> , trigger : '8'}
    ],
  },
  {
    id: "8",
    message: "Do you want to see another page?",
    trigger: "another-page",
  },
  {
    id: "another-page",
    options: [
      { value: "yes", label: "Yes", trigger: "find-page" },
      { value: "no", label: "No", trigger: "9" },
    ],
  },
  {
    id: "9",
    message: "Okay!!",
    trigger: "10",
  },
  {
    id: "10",
    message: "Do you need help with something else?",
    trigger: "help-something-else",
  },
  {
    id: "help-something-else",
    options: [
      { value: "yes", label: "Yes", trigger: "1" },
      { value: "no", label: "No", trigger: "end-message" },
    ],
  },
  {
    id: "do-send-mail",
    message: "Do you want to send an email?",
    trigger: "send-mail-options",
  },
  {
    id: "send-mail-options",
    options: [
      { value: "yes", label: "Yes", trigger: "send-mail" },
      { value: "no", label: "No", trigger: "no-send-mail" },
    ],
  },
  {
    id: "send-mail",
    component: <SendMails />,
    asMessage: true,
    trigger: "10",
  },
  {
    id: "no-send-mail",
    message: "Your mail was not sent",
    trigger: "1",
  },
  {
    id: "end-message",
    message: "Thanks!",

    trigger: "the-end",
  },
  {
    id: "the-end",
    message: "Bye!!",
    end: true,
  },
];

const stepsForCoordinator = [
  {
    id: "start-message",
    message: "Hi Coordinator! Do you need some help?",
    trigger: "start-option",
  },
  {
    id: "start-option",
    options: [{ value: "yes", label: "Yes", trigger: "1" }],
  },
  {
    id: "1",
    message: "How can I help you?",
    trigger: "help-options",
  },
  {
    id: "help-options",
    options: [
      {
        value: "complain",
        label: "Complain",
        trigger: "2",
        component: <EmailCategory category="Complain" />,
      },
      { value: "suggestion", label: "Suggestion", trigger: "2" },
      { value: "find-a-page", label: "Find a Page", trigger: "find-page" },
      // { value: 'other', label: 'Other', trigger: 'other-options' },
    ],
  },
  {
    id: "2",
    message: "What is your name?",
    trigger: "name",
  },
  {
    id: "name",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: "{previousValue}, what is your email?",
    trigger: "email",
  },
  {
    id: "email",
    user: true,
    validator: (value) => {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true;
      } else {
        return "Please enter a valid email.";
      }
    },
    trigger: "4",
  },
  {
    id: "4",
    message: "What is your complain/suggestion?",
    trigger: "body",
  },
  {
    id: "body",
    user: true,
    trigger: "7",
  },
  {
    id: "7",
    message: "Great! Check out your summary",
    trigger: "review",
  },
  {
    id: "review",
    component: <Review />,
    asMessage: true,
    trigger: "update",
  },
  {
    id: "update",
    message: "Would you like to update some field?",
    trigger: "update-question",
  },
  {
    id: "update-question",
    options: [
      { value: "yes", label: "Yes", trigger: "update-yes" },
      { value: "no", label: "No", trigger: "do-send-mail" },
    ],
  },
  {
    id: "update-yes",
    message: "What field would you like to update?",
    trigger: "update-fields",
  },
  {
    id: "update-fields",
    options: [
      { value: "name", label: "Name", trigger: "update-name" },
      { value: "email", label: "Email", trigger: "update-email" },
      { value: "body", label: "Query", trigger: "update-body" },
    ],
  },
  {
    id: "update-name",
    update: "name",
    trigger: "7",
  },
  {
    id: "update-email",
    update: "email",
    trigger: "7",
  },
  {
    id: "update-body",
    update: "body",
    trigger: "7",
  },
  {
    id: "find-page",
    message: "Select a category",
    trigger: "category-pages",
  },
  {
    id: "category-pages",
    options: [
     
      {
        value: "applicant",
        label: "Applicant",
        component: <FindPage category="manage-applicants" user='coordinator' />,
        trigger: "8",
      },
      {
        value: "sections",
        label: "Sections",
        component: <FindPage category="manage-sections" user='coordinator'/>,
        trigger: "8",
      },
      {
        value: "courses",
        label: "Courses",
        component: <FindPage category="manage-courses" user='coordinator'/>,
        trigger: "8",
      },
      {
        value: "undergraduate-major-course",
        label: "Major Course",
        component: <FindPage category="/create-undergraduate-major-course" user='coordinator'/>,
        trigger: "8",
      },
      {
        value: "undergraduate-minor-course",
        label: "Minor Course",
        component: <FindPage category="create-undergraduate-minor-course" user='coordinator'/>,
        trigger: "8",
      },
      // {value : 'student', label: 'Student', component:<Redirect to='admin/dashboard'></Redirect> , trigger : '8'}
    ],
  },
  {
    id: "8",
    message: "Do you want to see another page?",
    trigger: "another-page",
  },
  {
    id: "another-page",
    options: [
      { value: "yes", label: "Yes", trigger: "find-page" },
      { value: "no", label: "No", trigger: "9" },
    ],
  },
  {
    id: "9",
    message: "Okay!!",
    trigger: "10",
  },
  {
    id: "10",
    message: "Do you need help with something else?",
    trigger: "help-something-else",
  },
  {
    id: "help-something-else",
    options: [
      { value: "yes", label: "Yes", trigger: "1" },
      { value: "no", label: "No", trigger: "end-message" },
    ],
  },
  {
    id: "do-send-mail",
    message: "Do you want to send an email?",
    trigger: "send-mail-options",
  },
  {
    id: "send-mail-options",
    options: [
      { value: "yes", label: "Yes", trigger: "send-mail" },
      { value: "no", label: "No", trigger: "no-send-mail" },
    ],
  },
  {
    id: "send-mail",
    component: <SendMails />,
    asMessage: true,
    trigger: "10",
  },
  {
    id: "no-send-mail",
    message: "Your mail was not sent",
    trigger: "1",
  },
  {
    id: "end-message",
    message: "Thanks!",

    trigger: "the-end",
  },
  {
    id: "the-end",
    message: "Bye!!",
    end: true,
  },
];

const stepsForApplicant = [
  {
    id: "start-message",
    message: "Hi Applicant! Do you need some help?",
    trigger: "start-option",
  },
  {
    id: "start-option",
    options: [{ value: "yes", label: "Yes", trigger: "1" }],
  },
  {
    id: "1",
    message: "How can I help you?",
    trigger: "help-options",
  },
  {
    id: "help-options",
    options: [
      {
        value: "complain",
        label: "Complain",
        trigger: "2",
        component: <EmailCategory category="Complain" />,
      },
      { value: "suggestion", label: "Suggestion", trigger: "2" },
      { value: "find-a-page", label: "Find a Page", trigger: "find-page" },
      // { value: 'other', label: 'Other', trigger: 'other-options' },
    ],
  },
  {
    id: "2",
    message: "What is your name?",
    trigger: "name",
  },
  {
    id: "name",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: "{previousValue}, what is your email?",
    trigger: "email",
  },
  {
    id: "email",
    user: true,
    validator: (value) => {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true;
      } else {
        return "Please enter a valid email.";
      }
    },
    trigger: "4",
  },
  {
    id: "4",
    message: "What is your complain/suggestion?",
    trigger: "body",
  },
  {
    id: "body",
    user: true,
    trigger: "7",
  },
  {
    id: "7",
    message: "Great! Check out your summary",
    trigger: "review",
  },
  {
    id: "review",
    component: <Review />,
    asMessage: true,
    trigger: "update",
  },
  {
    id: "update",
    message: "Would you like to update some field?",
    trigger: "update-question",
  },
  {
    id: "update-question",
    options: [
      { value: "yes", label: "Yes", trigger: "update-yes" },
      { value: "no", label: "No", trigger: "do-send-mail" },
    ],
  },
  {
    id: "update-yes",
    message: "What field would you like to update?",
    trigger: "update-fields",
  },
  {
    id: "update-fields",
    options: [
      { value: "name", label: "Name", trigger: "update-name" },
      { value: "email", label: "Email", trigger: "update-email" },
      { value: "body", label: "Query", trigger: "update-body" },
    ],
  },
  {
    id: "update-name",
    update: "name",
    trigger: "7",
  },
  {
    id: "update-email",
    update: "email",
    trigger: "7",
  },
  {
    id: "update-body",
    update: "body",
    trigger: "7",
  },
  {
    id: "find-page",
    message: "Select a category",
    trigger: "category-pages",
  },
  {
    id: "category-pages",
    options: [
      {
        value: "undergraduate-program-selection-list",
        label: "UnderGrad programs",
        component: <FindPage category="undergraduate-program-selection-list" user='applicant'/>,
        trigger: "8",
      },
      {
        value: "settings",
        label: "Settings",
        component: <FindPage category="settings" user='applicant'/>,
        trigger: "8",
      },
      {
        value: "dashboard",
        label: "Dashboard",
        component: <FindPage category="dashboard" user='applicant'/>,
        trigger: "8",
      },
     
      // {value : 'student', label: 'Student', component:<Redirect to='admin/dashboard'></Redirect> , trigger : '8'}
    ],
  },
  {
    id: "8",
    message: "Do you want to see another page?",
    trigger: "another-page",
  },
  {
    id: "another-page",
    options: [
      { value: "yes", label: "Yes", trigger: "find-page" },
      { value: "no", label: "No", trigger: "9" },
    ],
  },
  {
    id: "9",
    message: "Okay!!",
    trigger: "10",
  },
  {
    id: "10",
    message: "Do you need help with something else?",
    trigger: "help-something-else",
  },
  {
    id: "help-something-else",
    options: [
      { value: "yes", label: "Yes", trigger: "1" },
      { value: "no", label: "No", trigger: "end-message" },
    ],
  },
  {
    id: "do-send-mail",
    message: "Do you want to send an email?",
    trigger: "send-mail-options",
  },
  {
    id: "send-mail-options",
    options: [
      { value: "yes", label: "Yes", trigger: "send-mail" },
      { value: "no", label: "No", trigger: "no-send-mail" },
    ],
  },
  {
    id: "send-mail",
    component: <SendMails />,
    asMessage: true,
    trigger: "10",
  },
  {
    id: "no-send-mail",
    message: "Your mail was not sent",
    trigger: "1",
  },
  {
    id: "end-message",
    message: "Thanks!",

    trigger: "the-end",
  },
  {
    id: "the-end",
    message: "Bye!!",
    end: true,
  },
];
// const cache = store('rsc_cache');

class Chat extends Component {
  state = {
    clear: false,
  };

  componentDidMount() {
    this.handleEnd = this.handleEnd.bind(this);
  }
  handleClear = () => {
    this.setState({ clear: true }, () => {
      this.setState({ clear: false });
      console.log("Handle clear");
    });
  };

  handleEnd() {
    this.handleClear();
  }

  render() {
    return this.state.clear ? (
      <div />
    ) : (
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="BBWU Peshawar"
          bubbleStyle={{ fontSize: "14px" }}
          width="300px"
          height="300px"
          hideBotAvatar="true"
          floating="true"
          enableMobileAutoFocus="true"
          steps={
            this.props.user == "admin"
              ? stepsForAdmin
              : this.props.user == "faculty"
              ? stepsForFaculty
              : this.props.user == "applicant"
              ? stepsForApplicant
              : stepsForCoordinator
          }
          handleEnd={this.handleEnd}
        />
      </ThemeProvider>
    );
  }
}

Chat.propTypes = {
  user: PropTypes.string.isRequired,
};

export default Chat;
