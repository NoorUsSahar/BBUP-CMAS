import { combineReducers } from 'redux';
import auth from './adminEtc/auth';
import alert from './adminEtc/alert';
import department from './adminEtc/department';
import program from './adminEtc/program';
import applicant from './adminEtc/applicant';
import coordinator from './adminEtc/coordinator';
import profile from './adminEtc/profile';
import admission from './adminEtc/admission';
import announcement from './adminEtc/announcement';
import enrollment from './adminEtc/enrollment';
import course from './adminEtc/course';
import section from './adminEtc/section';
import survey from './adminEtc/survey';
import chatbot from './adminEtc/chatbot';
import faculties from './adminEtc/faculties';
import student_profile from './adminEtc/student_profile';
import event from './adminEtc/event'

export default combineReducers({
  auth,
  alert,
  department,
  program,
  applicant,
  coordinator,
  chatbot,
  event,
  profile,
  admission,
  announcement,
  enrollment,
  course,
  section,
  faculties,
 survey,
 student_profile,

});
