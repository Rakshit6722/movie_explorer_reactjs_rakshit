import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import MovieDashboard from './layout/MovieDashboard'
import Search from './pages/Search'
import LoadingFallback from './components/common/LoadingFallback'
import AuthRoute from './components/protectedRoute/AuthRoute'
import MovieForm from './pages/MovieForm'
import Default from './pages/Default'

const Home = lazy(() => import('./pages/Home'))
const MoodMain = lazy(() => import('./pages/MoodMain'))
const Genres = lazy(() => import('./pages/Genres'))
const Profile = lazy(() => import('./pages/Profile'))
const MovieDetail = lazy(() => import('./pages/MovieDetail'))
const Subscription = lazy(() => import('./pages/Subscription'))
const SubscriptionSuccess = lazy(() => import('./pages/SubscriptionSuccess'))
const SubscriptionCancel = lazy(() => import('./pages/SubscriptionCancel'))


const App = () => {

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
    </div>
  )
}

export default App
