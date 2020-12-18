import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/Navbars/Admin';
import Footer from '../components/Footer/Footer.js';
import Sidebar from '../components/Sidebar/Admin';
import Alert from '../components/Alert/Alert';

import ManageApplicant from '../views/AdminEtc/Coordinator/ManageApplicant';
import ApplicantDetails from '../views/AdminEtc/Coordinator/ApplicantDetails';
import ManageAnnouncement from '../views/AdminEtc/Coordinator/ManageAnnouncement';
import CreateAnnouncementFeed from '../views/AdminEtc/Coordinator/CreateAnnouncementFeed';
import UpdateAnnouncementFeed from '../views/AdminEtc/Coordinator/UpdateAnnouncementFeed';
import ManageSections from '../views/AdminEtc/Coordinator/ManageSections';
import CreateSection from '../views/AdminEtc/Coordinator/CreateSection';
import UpdateSection from '../views/AdminEtc/Coordinator/UpdateSection';
import Dashboard from '../views/AdminEtc/Coordinator/Dashboard';
import CreateEnrollmentSemester from '../views/AdminEtc/Coordinator/CreateEnrollmentSemester';
import ManageCourses from '../views/AdminEtc/Coordinator/ManageCourses';
import CreateUndergraduateMajorCourse from '../views/AdminEtc/Coordinator/CreateUndergraduateMajorCourse';
import CreateUndergraduateMinorCourse from '../views/AdminEtc/Coordinator/CreateUndergraduateMinorCourse';
import RegisterUndergraduateStudent from '../views/AdminEtc/Coordinator/RegisterUndergraduateStudent';
import UndergraduateCourseList from '../views/AdminEtc/Coordinator/UndergraduateCourseList';
import UpdateUndergraduateCourse from '../views/AdminEtc/Coordinator/UpdateUndergraduateCourse';
import UpdateEnrollmentSemester from '../views/AdminEtc/Coordinator/UpdateEnrollmentSemester';
import SectionCourses from '../views/AdminEtc/Coordinator/SectionCourses';
import SemesterDetails from '../views/AdminEtc/Coordinator/SemesterDetails';

import routes from '../routes/Coordinator';

import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle.js';

import bgImage from '../assets/img/sidebar-2.jpg';
import logo from '../assets/img/reactlogo.png';

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/coordinator') {
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
    <Route path='/coordinator/manage-applicants' component={ManageApplicant} />
    <Route
      path='/coordinator/applicant-details/:id'
      component={ApplicantDetails}
    />
    <Route
      path='/coordinator/manage-announcements'
      component={ManageAnnouncement}
    />
    <Route path='/coordinator/manage-sections' component={ManageSections} />
    <Route path='/coordinator/create-section' component={CreateSection} />
    <Route path='/coordinator/update-section/:id' component={UpdateSection} />
    <Route path='/coordinator/manage-courses' component={ManageCourses} />
    <Route
      path='/coordinator/semester-details/:id'
      component={SemesterDetails}
    />
    <Route
      path='/coordinator/manage-student-courses/:id'
      component={UndergraduateCourseList}
    />
    <Route
      path='/coordinator/update-course/:id'
      component={UpdateUndergraduateCourse}
    />
    <Route
      path='/coordinator/register-student/:id'
      component={RegisterUndergraduateStudent}
    />
    <Route
      path='/coordinator/create-undergraduate-major-course'
      component={CreateUndergraduateMajorCourse}
    />
    <Route
      path='/coordinator/create-undergraduate-minor-course'
      component={CreateUndergraduateMinorCourse}
    />

    <Route
      path='/coordinator/create-announcement-feed'
      component={CreateAnnouncementFeed}
    />
    <Route
      path='/coordinator/create-enrollment-semester'
      component={CreateEnrollmentSemester}
    />
    <Route path='/coordinator/dashboard' component={Dashboard} />
    <Route
      path='/coordinator/update-announcement-feeds/:id'
      component={UpdateAnnouncementFeed}
    />
    <Route path='/coordinator/section-courses/:id' component={SectionCourses} />
    <Route
      path='/coordinator/update-semester-details/:id'
      component={UpdateEnrollmentSemester}
    />
    {/* <Route path='/admin/create-department' component={CreateDepartment} />
    <Route path='/admin/create-program' component={CreateProgram} />
    <Route path='/admin/update-department/:id' component={UpdateDepartment} />
    <Route path='/admin/update-program/:id' component={UpdateProgram} /> */}
    {/* <Redirect from='/admin' to='/admin/dashboard' /> */}
  </Switch>
);

const useStyles = makeStyles(styles);

const Coordinator = ({ ...rest }) => {
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
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={'Coordinator Portal'}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={'blue'}
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
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Coordinator;
