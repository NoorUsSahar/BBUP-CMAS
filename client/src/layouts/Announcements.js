import React, { Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Navbar from '../components/Navbars/Landing';
import Announcement from '../views/AdminEtc/Announcement/Announcement';
import Alert from '../components/Alert/Alert';

const Announcements = () => {
  const switchRoutes = (
    <Switch>
      <Route path='/announcement' component={Announcement} />
    </Switch>
  );

  return (
    <Fragment>
      <Navbar />
      <Alert />
      <div style={{ align: 'center' }}>{switchRoutes}</div>
    </Fragment>
  );
};

export default Announcements;
