import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
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

const App = () => {
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
          <Route path='*' element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
