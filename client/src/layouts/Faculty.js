import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbars/Faculty";
import Sidebar from "../components/Sidebar/Faculty";
import Alert from "../components/Alert/Alert";
import ChatBot from "../components/ChatBot/ChatBot";

import AddResearchPapers from "../views/Facultysc/Faculty/AddResearchPapers.js";
import AddEducation from "../views/Facultysc/Faculty/AddEducation";
import AddExperience from "../views/Facultysc/Faculty/AddExperience";
import CreateProfile from "../views/Facultysc/Faculty/CreateProfile";
import EditProfile from "../views/Facultysc/Faculty/EditProfile";
import Calendar from "../views/Facultysc/Calendar/Calendar";
import Profile from "../views/Facultysc/UserProfile/UserProfile";
import Survey from "../views/Facultysc/Survey/Survey";
import SelectCourses from '../views/Facultysc/Student/SelectCourses';
import AddMarks from '../views/Facultysc/Student/AddMarks.js'
import AddInfo from '../views/Facultysc/Student/AddInfo.js'

import routes from "../routes/Faculty";
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle.js";
import bgImage from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/reactlogo.png";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/faculty") {
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
    {/* <Route path='/faculty/create-department' component={CreateDepartment} /> */}

    <Route path="/faculty/profile/:id" component={Profile}></Route>

    <Route path="/faculty/add-marks" component={AddMarks} />
   <Route path="/faculty/select-course" component={SelectCourses} />
   <Route path="/faculty/add-information" component={AddInfo}/>

    <Route
      path="/faculty/create-profile"
      component={CreateProfile}
    ></Route>
    <Route exact path="/faculty/edit-profile" component={EditProfile}></Route>
    <Route
      path="/faculty/add-research-papers"
      component={AddResearchPapers}
    ></Route>
    <Route path="/faculty/add-education" component={AddEducation}></Route>
    <Route
      path="/faculty/add-experience"
      component={AddExperience}
    ></Route>
    <Route path="/faculty/calendar" component={Calendar}></Route>
    <Route path="/faculty/survey_form/:id" component={Survey} />

    <Redirect from="/faculty" to="/faculty/dashboard" />
   
  </Switch>
);

const useStyles = makeStyles(styles);

const Faculty = ({ ...rest }) => {
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
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      
      <Sidebar
        routes={routes}
        logoText={"Faculty Portal"}
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
        <div>
            <ChatBot user="faculty"></ChatBot>
          </div>
      
      </div>
    </div>
  );
};

export default Faculty;
