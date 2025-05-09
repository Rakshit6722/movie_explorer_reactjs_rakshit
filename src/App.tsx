import React, { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import MovieDashboard from './pages/MovieDashboard'
import Search from './pages/Search'
import LoadingFallback from './components/common/LoadingFallback'
const Home = lazy(() => import('./pages/Home'))
const MoodMain = lazy(() => import('./pages/MoodMain'))
const Genres = lazy(() => import('./pages/Genres'))
const Profile = lazy(() => import('./pages/Profile'))
const MovieDetail = lazy(() => import('./pages/MovieDetail'))
const Subscription = lazy(() => import('./pages/Subscription'))
const SubscriptionSuccess = lazy(() => import('./pages/SubscriptionSuccess'))


const App = () => {

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    console.log('Query Params:', queryParams.toString());
  }, [location])

  return (
    <div>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='/' element={<MovieDashboard />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path='home' element={
            <Suspense fallback={<LoadingFallback />}>
              <Home />
            </Suspense>
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
          <Route path='subscription' element={
            <Suspense fallback={<LoadingFallback />}>
              <Subscription />
            </Suspense>
          } />

          <Route path='*' element={<div>404 Not Found</div>} />
        </Route>
        <Route path='subscription-success' element={
          <Suspense fallback={<LoadingFallback />}>
            <SubscriptionSuccess />
          </Suspense>
        } />
      </Routes>
    </div>
  )
}

export default App
