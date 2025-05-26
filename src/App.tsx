import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import MovieDashboard from './layout/MovieDashboard'
import Search from './pages/Search'
import LoadingFallback from './components/common/LoadingFallback'
import AuthRoute from './components/protectedRoute/AuthRoute'
import MovieForm from './pages/MovieForm'
import Default from './pages/Default'

import Home from './pages/Home'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { Alert, Slide, Snackbar } from '@mui/material'
import { User } from './types/type'
const Watchlist = lazy(() => import('./pages/Watchlist'))
const MoodMain = lazy(() => import('./pages/MoodMain'))
const Genres = lazy(() => import('./pages/Genres'))
const Profile = lazy(() => import('./pages/Profile'))
const MovieDetail = lazy(() => import('./pages/MovieDetail'))
const Subscription = lazy(() => import('./pages/Subscription'))
const SubscriptionSuccess = lazy(() => import('./pages/SubscriptionSuccess'))
const SubscriptionCancel = lazy(() => import('./pages/SubscriptionCancel'))


const App = () => {

  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const { userInfo }: any = useSelector((state: RootState) => state.user);
  const { loading } = useSelector((state: RootState) => state.movie);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isLoggedIn && token) {
      const hasShownWelcome = sessionStorage.getItem('welcomeBackShown')

      if (!hasShownWelcome) {
        const referrer = document.referrer
        const isDirectVisit = !referrer.includes(window.location.host) || referrer === '' || referrer === window.location.href || !referrer.includes('/login') && !referrer.includes('/register');

        if (isDirectVisit) {
          setShowWelcomeBack(true);
          sessionStorage.setItem('welcomeBackShown', 'true');
        }
      }

    }
  }, [isLoggedIn, token]);

  return (
    <div>
      <Routes>
        <Route path='login' element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        } />
        <Route path='register' element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        } />
        <Route path='/' element={<MovieDashboard />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path='home' element={
            <Home />
          } />
          <Route path='genres' element={
            <Suspense fallback={<LoadingFallback />}>
              <Genres />
            </Suspense>
          } />
          <Route path='profile' element={
            <Suspense fallback={<LoadingFallback />}>
              <Profile />
            </Suspense>
          } />
          <Route path='moods' element={
            <Suspense fallback={<LoadingFallback />}>
              <MoodMain />
            </Suspense>
          } />
          <Route path='movie' element={
            <Suspense fallback={<LoadingFallback />}>
              <MovieDetail />
            </Suspense>
          } />
          <Route path='search' element={
            <Suspense fallback={<LoadingFallback />}>
              <Search />
            </Suspense>
          } />
          <Route path='watchlist' element={
            <Suspense fallback={<LoadingFallback />}>
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path='subscription' element={
            <Suspense fallback={<LoadingFallback />}>
              <Subscription />
            </Suspense>
          } />
          <Route path='movieForm' element={<MovieForm />} />

        </Route>
        <Route path='subscription-success' element={
          <Suspense fallback={<LoadingFallback />}>
            <SubscriptionSuccess />
          </Suspense>
        } />
        <Route path='subscription-cancel' element={
          <Suspense fallback={<LoadingFallback />}>
            <SubscriptionCancel />
          </Suspense>
        } />
        <Route path='*' element={<Default />} />
      </Routes>


      {
        !loading && (
          <Snackbar
            open={showWelcomeBack}
            autoHideDuration={4000}
            onClose={() => setShowWelcomeBack(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            TransitionComponent={(props) => <Slide {...props} direction="up" />}
            sx={{
              zIndex: 9999,
              mb: 3,
              mr: 3
            }}
          >
            <Alert
              severity="success"
              variant="filled"
              icon={false} // Remove default icon
              onClose={() => setShowWelcomeBack(false)}
              sx={{
                bgcolor: 'rgba(22, 22, 26, 0.94)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.08)',
                borderLeft: '3px solid #f02c49',
                borderRadius: '8px',
                padding: '10px 16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                width: '100%',
                maxWidth: '340px',
                '& .MuiAlert-message': {
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                },
                '& .MuiAlert-action': {
                  padding: 0,
                  alignItems: 'center'
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {/* Custom icon */}
                <span style={{
                  display: 'flex',
                  background: 'linear-gradient(135deg, #f02c49 0%, #f55b40 100%)',
                  padding: '6px',
                  borderRadius: '50%',
                  marginRight: '12px'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '2px' }}>
                    Welcome back!
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>
                    Hi, {userInfo?.first_name || 'User'}
                  </div>
                </div>
              </div>
            </Alert>
          </Snackbar>
        )
      }

    </div>
  )
}

export default App
