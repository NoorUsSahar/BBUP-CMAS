import React, { Fragment, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from './Login Layout/Login';
import Register from './Register Layout/Register';

import Admin from './layouts/Admin.js';
import Applicant from './layouts/Applicant';
import Coordinator from './layouts/Coordinator';
import FeeChallan from './views/AdminEtc/FeeChallan/FeeChallan';
import Announcements from './layouts/Announcements';
import { loadUser } from './actions/adminEtc/auth';
import AdminPrivateRoute from './components/Routing/AdminPrivateRoute';
import ApplicantPrivateRoute from './components/Routing/ApplicantPrivateRoute';
import CoordinatorPrivateRoute from './components/Routing/CoordinatorPrivateRoute';

// import facultyStore from './Faculty Self Center/utils/store';
import store from './utils/store';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';

//Faculty Center
import { loadFaculty } from './actions/facultysc/auth';
import Faculty from './layouts/Faculty'
import FacultyPrivateRoute from './components/Routing/FacultyPrivateRoute';

import './assets/scss/App.scss';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadFaculty());
  }, [loadFaculty() , loadUser()]);

  return (
    <Fragment>

      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />

            <FacultyPrivateRoute path='/faculty' component={Faculty} />
      
            <AdminPrivateRoute path='/admin' component={Admin} />
            <ApplicantPrivateRoute path='/applicant' component={Applicant} />
            <CoordinatorPrivateRoute
              path='/coordinator'
              component={Coordinator}
            />
            <Route path='/fee-challan/:id/:program_id' component={FeeChallan} />
            <Route path='/announcement' component={Announcements} />
           
            <Redirect from='/' to='/login/logins' />
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
};

export default App;
