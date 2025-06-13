import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './components/Loading';
import { ProtectedRoute, WithLayoutRoute } from './routers';

import { AdminLayout, PublicLayout } from './layouts';

// Admin
const DashboardPage = lazy(() => import('./pages/Admin/Dashboard'));
const SeminarioList = lazy(() => import('./pages/Admin/SeminarioList'));
const LabList = lazy(() => import('./pages/Admin/LabList'));
const ShowtimeList = lazy(() => import('./pages/Admin/ShowtimeList'));
const ReservationList = lazy(() => import('./pages/Admin/ReservationList'));
const User = lazy(() => import('./pages/Admin/User'));
const Account = lazy(() => import('./pages/Admin/Account'));

// Register - Login
const Register = lazy(() => import('./pages/Public/Register'));
const Login = lazy(() => import('./pages/Public/Login'));

// Public
const HomePage = lazy(() => import('./pages/Public/HomePage'));
const SeminarioPage = lazy(() => import('./pages/Public/SeminarioPage'));
const MyDashboard = lazy(() => import('./pages/Public/MyDashboard'));
const SeminarioCategoryPage = lazy(() =>
  import('./pages/Public/SeminarioCategoryPage')
);
const CinemasPage = lazy(() => import('./pages/Public/CinemasPage'));
const BookingPage = lazy(() => import('./pages/Public/BookingPage'));

const Checkin = lazy(() => import('./pages/Public/Checkin'));

const Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          <WithLayoutRoute
            exact
            path="/checkin/:reservationId"
            component={Checkin}
            layout={PublicLayout}
          />

          <WithLayoutRoute
            exact
            path="/"
            layout={PublicLayout}
            component={HomePage}
          />
          <WithLayoutRoute
            exact
            path="/mydashboard"
            layout={PublicLayout}
            component={MyDashboard}
          />
          <WithLayoutRoute
            exact
            path="/cinemas"
            layout={PublicLayout}
            component={CinemasPage}
          />
          <WithLayoutRoute
            exact
            path="/seminario/category/:category"
            layout={PublicLayout}
            component={SeminarioCategoryPage}
          />
          <WithLayoutRoute
            exact
            path="/seminario/:id"
            layout={PublicLayout}
            layoutProps={{ withFooter: false }}
            component={SeminarioPage}
          />
          <WithLayoutRoute
            exact
            path="/seminario/booking/:id"
            layout={PublicLayout}
            layoutProps={{ withFooter: false }}
            component={BookingPage}
          />
          <ProtectedRoute
            exact
            path="/admin/dashboard"
            layout={AdminLayout}
            component={DashboardPage}
          />
          <ProtectedRoute
            exact
            path="/admin/users"
            layout={AdminLayout}
            component={User}
          />
          <ProtectedRoute
            exact
            path="/admin/showtimes"
            layout={AdminLayout}
            component={ShowtimeList}
          />
          <ProtectedRoute
            exact
            path="/admin/reservations"
            layout={AdminLayout}
            component={ReservationList}
          />
          <ProtectedRoute
            exact
            path="/admin/labs"
            layout={AdminLayout}
            component={LabList}
          />
          <ProtectedRoute
            exact
            path="/admin/seminari"
            layout={AdminLayout}
            component={SeminarioList}
          />
          <ProtectedRoute
            exact
            path="/admin/account"
            layout={AdminLayout}
            component={Account}
          />
          <Route path="*" component={() => '404 NOT FOUND'} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
