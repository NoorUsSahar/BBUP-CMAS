import DashboardIcon from '@material-ui/icons/Dashboard';
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
 import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
// import Unarchive from "@material-ui/icons/Unarchive";
// import Language from "@material-ui/icons/Language";
import ProfilesIcon from '@material-ui/icons/SupervisorAccountRounded';
import EditProfileIcon from '@material-ui/icons/PersonOutline';
import SurveyIcon from '@material-ui/icons/Description';
import Survey from '../views/Facultysc/Survey/Survey_Landing_Admin';
 import Dashboard from '../views/Facultysc/Dashboard/Dashboard';
 import StudentMarks from '../views/Facultysc/Student/Student'
 import StudentGrade from '../views/Facultysc/StudentGrade/StudentGradeDash'
 //  import Faculty from '../layouts/Dashboard'
import Profiles from '../views/Facultysc/Profiles/Profiles';
 import EditProfile from '../views/Facultysc/Faculty/EditProfile'
// import EditProfile from '../layouts/EditProfile'
import Calendar from '../views/Facultysc/Calendar/Calendar';
import UploadFile from '../views/Facultysc/UploadFile/UploadFile.js';
import UserProfile from '../views/Facultysc/UserProfile/UserProfile';
import GradeIcon from '@material-ui/icons/Grade';

const routes = [
  {
   path: '/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    
    href : '/dashboard',
    layout: '/faculty',
  },
  {
    path: '/upload-file',
    name: 'Upload File',
    icon: EditProfileIcon,
    component: UploadFile,
    layout: '/faculty',
  },
    //   {
    //   path: '/profile/:id',
    //   name: 'User Profile',
    //   // rtlName: 'ملف تعريفي للمستخدم',
    //   icon: Person,
    //   component: UserProfile,
    //   layout: '/faculty',
    // },
  {
    path: '/profiles',
    name: 'Faculty Profiles',
    icon: ProfilesIcon,
component: Profiles,
    
    layout: '/faculty',
  },
  {
    path: '/calendar',
    name: 'Calendar',
    icon: CalendarTodayIcon,
    component: Calendar,
  href : '/calendar',
    layout: '/faculty',
  },
  {
    path: '/student-marks',
    name: 'Grades',
    icon: GradeIcon,
    component: StudentGrade,
    layout: '/faculty',
  },
  // {
  //   path: '/notifications',
  //   name: 'Notifications',
  //   icon: Notifications,
  //   // component: NotificationsPage,
  //   layout: '/faculty',
  // },
  {
    path: '/survey',
    name: 'Survey',
    icon: SurveyIcon,
    component: Survey,
    layout: '/faculty',
  },

];

export default routes;
