import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';

import Dashboard from '../views/AdminEtc/Applicant/Dashboard';
import UndergraduatePersonalDetails from '../views/AdminEtc/Applicant/UndergraduatePersonalDetails';
import UndergraduateIncomeDetails from '../views/AdminEtc/Applicant/UndergraduateIncomeDetails';
import UndergraduateEducationDetails from '../views/AdminEtc/Applicant/UndergraduateEducationDetails';
import Settings from '../views/AdminEtc/Applicant/Settings';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    layout: '/applicant'
  },
  {
    path: '/personal-details',
    name: 'Personal Details',
    icon: PersonOutlineIcon,
    component: UndergraduatePersonalDetails,
    layout: '/applicant'
  },
  {
    path: '/income-details',
    name: 'Income Details',
    icon: AttachMoneyIcon,
    component: UndergraduateIncomeDetails,
    layout: '/applicant'
  },
  {
    path: '/education-details',
    name: 'Education Details',
    icon: MenuBookIcon,
    component: UndergraduateEducationDetails,
    layout: '/applicant'
  },

  {
    path: '/settings',
    name: 'Settings',
    icon: SettingsIcon,
    component: Settings,
    layout: '/applicant'
  }
];

export default routes;
