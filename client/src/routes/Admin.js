import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessIcon from '@material-ui/icons/Business';
import ViewListIcon from '@material-ui/icons/ViewList';
import SurroundSoundRoundedIcon from '@material-ui/icons/SurroundSoundRounded';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import FaceIcon from '@material-ui/icons/Face';
import SettingsIcon from '@material-ui/icons/Settings';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import Dashboard from '../views/AdminEtc/Dashboard/Dashboard';
import ManageDepartments from '../views/AdminEtc/Admin/Department/ManageDepartments';
import ManagePrograms from '../views/AdminEtc/Admin/Program/ManagePrograms';
import ManageCoordinators from '../views/AdminEtc/Admin/Users/ManageCoordinators';
import ManageApplicant from '../views/AdminEtc/Admin/Admission/ManageApplicant';
import ManageAnnouncement from '../views/AdminEtc/Admin/Announcement/ManageAnnouncement';
import ManageMeritList from '../views/AdminEtc/Admin/Admission/ManageMeritList';
import ManageAdmissions from '../views/AdminEtc/Admin/Admission/ManageAdmissions';
import ManagePayroll from '../views/AdminEtc/Admin/Admission/ManagePayroll';
import ManageFaculty from '../views/AdminEtc/Admin/Users/ManageFaculty';
import ManageStudent from '../views/AdminEtc/Admin/Users/StudentAcademicRecord'
import Settings from '../views/AdminEtc/Admin/Profiles/Settings';
import Survey from '../views/AdminEtc/Admin/Survey/Survey_Landing_Admin.js'
import Schedule from '../views/AdminEtc/Admin/Schedule/Schedule';

const routes = [
  // {
  //   path: '/manage-faculty',
  //   name: 'Faculty',
  //   icon: FaceIcon,
  //   component: ManageFaculty,
  //   layout: '/admin',
  // },
  // {
  //   path: '/manage-coordinators',
  //   name: 'Coordinators',
  //   icon: SupervisedUserCircleIcon,
  //   component: ManageCoordinators,
  //   layout: '/admin'
  // },
  // {
  //   path: '/manage-applicants',
  //   name: 'Applicants',
  //   icon: AssignmentIndRoundedIcon,
  //   component: ManageApplicant,
  //   layout: '/admin'
  // },
  // {
  //   path: '/manage-students',
  //   name: 'Students',
  //   icon: AssignmentIndRoundedIcon,
  //   component: ManageStudent,
  //   layout: '/admin'
  // },
  {
    path: '/scheule',
    name: 'Schedule',
    icon: DashboardIcon,
    component: Schedule,
    layout: '/admin'
  },
  {
    path: '/manage-admission',
    name: 'Admission',
    icon: DashboardIcon,
    component: ManageAdmissions,
    layout: '/admin'
  },
  {
    path: '/manage-departments',
    name: 'Departments',
    icon: BusinessIcon,
    component: ManageDepartments,
    layout: '/admin'
  },
  {
    path: '/manage-programs',
    name: 'Programs',
    icon: ViewListIcon,
    component: ManagePrograms,
    layout: '/admin'
  },
  {
    path: '/manage-announcements',
    name: 'Announcements',
    icon: SurroundSoundRoundedIcon,
    component: ManageAnnouncement,
    layout: '/admin'
  },
  
  {
    path: '/manage-merit-list',
    name: 'Merit List',
    icon: PlaylistAddCheckIcon,
    component: ManageMeritList,
    layout: '/admin'
  },

  {
    path: '/survey',
    name: 'Survey',
    icon: DashboardIcon,
    component: Survey,
    layout: '/admin'
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: SettingsIcon,
    component: Settings,
    layout: '/admin'
  },
 
   
];

export default routes;
