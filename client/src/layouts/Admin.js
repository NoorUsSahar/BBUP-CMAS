import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Navbar from "../components/Navbars/Admin";
import Sidebar from "../components/Sidebar/Admin";
import Alert from "../components/Alert/Alert";
import ChatBot from "../components/ChatBot/ChatBot";

import CreateDepartment from "../views/AdminEtc/Admin/Department/CreateDepartment";
import UpdateDepartment from "../views/AdminEtc/Admin/Department/UpdateDepartment";
import CreateUndergraduateProgram from "../views/AdminEtc/Admin/Program/CreateUndergraduateProgram";
import CreateGraduateProgram from "../views/AdminEtc/Admin/Program/CreateGraduateProgram";
import UpdateProgram from "../views/AdminEtc/Admin/Program/UpdateProgram";
import CreateCoordinator from "../views/AdminEtc/Admin/Users/CreateCoordinator";
import PersonalDetails from "../views/AdminEtc/Admin/Admission/PersonalDetails";
import ExperienceDetails from "../views/AdminEtc/Admin/Admission/ExperienceDetails";
import EducationDetails from "../views/AdminEtc/Admin/Admission/EducationDetails";
import ManageApplicant from "../views/AdminEtc/Admin/Admission/ManageApplicant";
import ForwardApplicant from "../views/AdminEtc/Admin/Admission/ForwardApplicant";
import CreateAdmissionSession from "../views/AdminEtc/Admin/Admission/CreateAdmissionSession";
import Dashboard from "../views/AdminEtc/Admin/Dashboard";
import UpdateAdmissionSession from "../views/AdminEtc/Admin/Admission/UpdateAdmissionSession";
import ManageMeritList from "../views/AdminEtc/Admin/Admission/ManageMeritList";
import DepartmentCoordinators from "../views/AdminEtc/Admin/Users/DepartmentCoordinators";
import DepartmentCoordinatorProfile from "../views/AdminEtc/Admin/Users/DepartmentCoordinatorProfile";
import DepartmentPrograms from "../views/AdminEtc/Admin/Program/DepartmentPrograms";
import ManageAnnouncement from "../views/AdminEtc/Admin/Announcement/ManageAnnouncement";
import CreateAnnouncementFeed from "../views/AdminEtc/Admin/Announcement/CreateAnnouncementFeed";
import UpdateAnnouncementFeed from "../views/AdminEtc/Admin/Announcement/UpdateAnnouncementFeed";
import ManageAdmissions from "../views/AdminEtc/Admin/Admission/ManageAdmissions";
import Survey from "../views/AdminEtc/Admin/Survey/Survey";
import Survey_Reports from "../views/AdminEtc/Admin/Survey/Reports";
import ViewFaculty from "../views/AdminEtc/Admin/Users/ViewFaculty";
import RegisterFaculty from "../views/AdminEtc/Admin/Users/RegisterFaculty";
import AddStudentInfo from '../views/AdminEtc/Admin/Users/AddStudentInfo.js'
import StudentEditProfile from '../views/AdminEtc/Admin/Users/EditStudentProfile.js'
import Profile from '../views/AdminEtc/StudentProfile/StudentProfile'
import Profiles from '../views/AdminEtc/StudentProfiles/StudentProfiles.js'
import Schedule from '../views/AdminEtc/Admin/Schedule/Schedule.js'
import ManageCoordinators from '../views/AdminEtc/Admin/Users/ManageCoordinators';
import ManageFaculty from '../views/AdminEtc/Admin/Users/ManageFaculty';
import ManageStudent from '../views/AdminEtc/Admin/Users/StudentAcademicRecord'
import {  loadUser } from '../actions/adminEtc/auth';

import routes from "../routes/Admin";

import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/reactlogo.png";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Route path="/admin/manage-faculty" component={ManageFaculty} />
    <Route path="/admin/manage-coordinators" component={ManageCoordinators} />
    <Route path="/admin/manage-applicants" component={ManageApplicant} />
    <Route path="/admin/manage-students" component={ManageStudent} />
    <Route path="/admin/create-department" component={CreateDepartment} />
    <Route
      path="/admin/create-undergraduate-program"
      component={CreateUndergraduateProgram}
    />
    <Route
      path="/admin/create-graduate-program"
      component={CreateGraduateProgram}
    />
    <Route path="/admin/update-department/:id" component={UpdateDepartment} />
    <Route path="/admin/update-program/:id" component={UpdateProgram} />
    <Route path="/admin/add-coordinator" component={CreateCoordinator} />
    <Route path="/admin/create-profile" component={PersonalDetails} />
    <Route path="/admin/experience-details" component={ExperienceDetails} />
    <Route path="/admin/education-details" component={EducationDetails} />
    <Route path="/admin/manage-applicants" component={ManageApplicant} />
    <Route path="/admin/forward-applicant/:id" component={ForwardApplicant} />
    <Route
      path="/admin/create-admission-session"
      component={CreateAdmissionSession}
    />
    <Route path="/admin/manage-admission" component={ManageAdmissions} />
    <Route path="/admin/dashboard" component={Dashboard} />
    <Route path="/admin/manage-announcement" component={ManageAnnouncement} />
    <Route
      path="/admin/create-announcement-feed"
      component={CreateAnnouncementFeed}
    />
    <Route
      path="/admin/update-announcement-feeds/:id"
      component={UpdateAnnouncementFeed}
    />
    <Route
      path="/admin/update-session-details/:id"
      component={UpdateAdmissionSession}
    />
    <Route path="/admin/manage-merit-list" component={ManageMeritList} />
    <Route
      path="/admin/department-coordinators/:id"
      component={DepartmentCoordinators}
    />
    <Route
      path="/admin/department/coordinators/profile/:id"
      component={DepartmentCoordinatorProfile}
    />
    <Route
      path="/admin/department-programs/:id"
      component={DepartmentPrograms}
    />

    <Route path="/admin/survey_form/:id" component={Survey} />
    <Route path="/admin/survey_reports/:survey_id" component={Survey_Reports} />
    <Route path="/admin/faculty/profile/:id" component={ViewFaculty} />
    <Route path="/admin/faculty/register-faculty" component={RegisterFaculty} />


{/* Academic Record Routes */}
    <Route exact path="/admin/student-profiles" component={Profiles}></Route>
    <Route exact path="/admin/student-profile/:id" component={Profile}></Route>
    {/* <Route exact path='/admin/dashboard' component={Dashboard} /> */}
    <Route exact path="/admin/student-add-information" component={AddStudentInfo} ></Route>
    <Route
      exact
      path="/admin/student-edit-profile"
      component={StudentEditProfile}
    ></Route>

    <Route exact path="/admin/schedule" component={Schedule}></Route>

    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

const Admin = ({ loadUser , ...rest }) => {
  const classes = useStyles();

  const mainPanel = React.createRef();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
    loadUser();
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Admin Portal"}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={"blue"}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <Alert />
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>
        <div
          className="bot"
          style={{
            bottom: 0,
            right: 0,
            position: "fixed",
            width: "350px",
          }}
        >
          <div>
            <ChatBot user="admin"></ChatBot>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};



Admin.propTypes = {
  logout: PropTypes.func.isRequired,
  loadUser : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {  loadUser})(Admin);

