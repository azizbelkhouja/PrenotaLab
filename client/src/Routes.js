import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

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
const LabsPage = lazy(() => import('./pages/Public/LabsPage'));
const BookingPage = lazy(() => import('./pages/Public/BookingPage'));

const Checkin = lazy(() => import('./pages/Public/Checkin'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Routes>
          {/* Login and Register */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Public routes with layout wrapper */}
          <Route
            path="/checkin/:reservationId"
            element={
              <WithLayoutRoute layout={PublicLayout} component={Checkin} />
            }
          />
          <Route
            path="/"
            element={<WithLayoutRoute layout={PublicLayout} component={HomePage} />}
          />
          <Route
            path="/mydashboard"
            element={<WithLayoutRoute layout={PublicLayout} component={MyDashboard} />}
          />
          <Route
            path="/labs"
            element={<WithLayoutRoute layout={PublicLayout} component={LabsPage} />}
          />
          <Route
            path="/seminario/category/:category"
            element={
              <WithLayoutRoute layout={PublicLayout} component={SeminarioCategoryPage} />
            }
          />
          <Route
            path="/seminario/:id"
            element={
              <WithLayoutRoute
                layout={PublicLayout}
                layoutProps={{ withFooter: false }}
                component={SeminarioPage}
              />
            }
          />
          <Route
            path="/seminario/booking/:id"
            element={
              <WithLayoutRoute
                layout={PublicLayout}
                layoutProps={{ withFooter: false }}
                component={BookingPage}
              />
            }
          />

          {/* Protected admin routes */}
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute layout={AdminLayout} component={DashboardPage} />}
          />
          <Route
            path="/admin/users"
            element={<ProtectedRoute layout={AdminLayout} component={User} />}
          />
          <Route
            path="/admin/showtimes"
            element={<ProtectedRoute layout={AdminLayout} component={ShowtimeList} />}
          />
          <Route
            path="/admin/reservations"
            element={<ProtectedRoute layout={AdminLayout} component={ReservationList} />}
          />
          <Route
            path="/admin/labs"
            element={<ProtectedRoute layout={AdminLayout} component={LabList} />}
          />
          <Route
            path="/admin/seminari"
            element={<ProtectedRoute layout={AdminLayout} component={SeminarioList} />}
          />
          <Route
            path="/admin/account"
            element={<ProtectedRoute layout={AdminLayout} component={Account} />}
          />

          {/* 404 fallback */}
          <Route path="*" element={<div>404 NOT FOUND</div>} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
