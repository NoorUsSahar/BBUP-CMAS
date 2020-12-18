import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import SurroundSoundRoundedIcon from '@material-ui/icons/SurroundSoundRounded';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import MenuBookIcon from '@material-ui/icons/MenuBook';

import Dashboard from '../views/AdminEtc/Coordinator/Dashboard';
import ManageApplicant from '../views/AdminEtc/Coordinator/ManageApplicant';
import ManageStudent from '../views/AdminEtc/Coordinator/ManageStudent';
import ManageAnnouncement from '../views/AdminEtc/Coordinator/ManageAnnouncement';
import ManageSections from '../views/AdminEtc/Coordinator/ManageSections';
import ManageCourses from '../views/AdminEtc/Coordinator/ManageCourses';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    layout: '/coordinator'
  },
  {
    path: '/manage-applicants',
    name: 'Manage Applicants',
    icon: AssignmentIndRoundedIcon,
    component: ManageApplicant,
    layout: '/coordinator'
  },
  {
    path: '/manage-students',
    name: 'Manage Students',
    icon: AssignmentIndRoundedIcon,
    component: ManageStudent,
    layout: '/coordinator'
  },
  {
    path: '/manage-announcements',
    name: 'Manage Announcements',
    icon: SurroundSoundRoundedIcon,
    component: ManageAnnouncement,
    layout: '/coordinator'
  },
  {
    path: '/manage-sections',
    name: 'Manage Sections',
    icon: EventSeatIcon,
    component: ManageSections,
    layout: '/coordinator'
  },
  {
    path: '/manage-courses',
    name: 'Manage Courses',
    icon: MenuBookIcon,
    component: ManageCourses,
    layout: '/coordinator'
  }
  // {
  //   path: '/manage-departments',
  //   name: 'Manage Departments',
  //   icon: DashboardIcon,
  //   component: ManageDepartments,
  //   layout: '/admin',
  // },
  // {
  //   path: '/manage-programs',
  //   name: 'Manage Programs',
  //   icon: DashboardIcon,
  //   component: ManagePrograms,
  //   layout: '/admin',
  // },
  // {
  //   path: '/settings',
  //   name: 'Settings',
  //   icon: DashboardIcon,
  //   component: Dashboard,
  //   layout: '/admin',
  // },
  //   {
  //     path: '/user',
  //     name: 'User Profile',
  //     rtlName: 'ملف تعريفي للمستخدم',
  //     icon: Person,
  //     component: UserProfile,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/table',
  //     name: 'Table List',
  //     rtlName: 'قائمة الجدول',
  //     icon: 'content_paste',
  //     component: TableList,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/typography',
  //     name: 'Typography',
  //     rtlName: 'طباعة',
  //     icon: LibraryBooks,
  //     component: Typography,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/icons',
  //     name: 'Icons',
  //     rtlName: 'الرموز',
  //     icon: BubbleChart,
  //     component: Icons,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/maps',
  //     name: 'Maps',
  //     rtlName: 'خرائط',
  //     icon: LocationOn,
  //     component: Maps,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/notifications',
  //     name: 'Notifications',
  //     rtlName: 'إخطارات',
  //     icon: Notifications,
  //     component: NotificationsPage,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/rtl-page',
  //     name: 'RTL Support',
  //     rtlName: 'پشتیبانی از راست به چپ',
  //     icon: Language,
  //     component: RTLPage,
  //     layout: '/rtl',
  //   },
  //   {
  //     path: '/upgrade-to-pro',
  //     name: 'Upgrade To PRO',
  //     rtlName: 'التطور للاحترافية',
  //     icon: Unarchive,
  //     component: UpgradeToPro,
  //     layout: '/admin',
  //   },
];

export default routes;
