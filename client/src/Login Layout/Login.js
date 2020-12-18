import React, { Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Admin from '../views/AdminEtc/Login/Admin';
import Faculty from '../views/Facultysc/Login/Faculty'
import Applicant from '../views/AdminEtc/Login/Applicant';
import Alert from '../components/Alert/Alert';
import Coordinator from '../views/AdminEtc/Login/Coordinator';
import Logins from './Logins';

const Login = () => {
  const switchRoutes = (
    <Switch>
      <Route path='/login/admin' component={Admin} />
      <Route path='/login/applicant' component={Applicant} />
      <Route path='/login/faculty' component={Faculty} />
      <Route path='/login/logins' component={Logins}/>
      <Route path='/login/coordinator' component={Coordinator} />
      <Redirect from='/login' to='/login/admin' />
    </Switch>
  );

  return (
    <Fragment>
      {/* <Navbar /> */}
      <Alert />
      {switchRoutes}
    </Fragment>
  );
};

export default Login;
