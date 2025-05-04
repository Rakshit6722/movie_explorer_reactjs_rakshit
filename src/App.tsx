import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import MovieDashboard from './pages/MovieDashboard'
import Search from './pages/Search'
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
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          } />
          <Route path='genres' element={
            <Suspense fallback={<div>Loading...</div>}>
              <Genres />
            </Suspense>
          } />
          <Route path='profile' element={
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          } />
          <Route path='moods' element={
            <Suspense fallback={<div>Loading...</div>}>
              <MoodMain />
            </Suspense>
          } />
          <Route path='movie' element={
            <Suspense fallback={<div>Loading...</div>}>
              <MovieDetail />
            </Suspense>
          } />
          <Route path='search' element={
            <Suspense fallback={<div>Loading...</div>}>
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
