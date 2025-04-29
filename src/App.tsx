import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import MovieDashboard from './pages/MovieDashboard'
import MoodMain from './pages/MoodMain'
import Genres from './pages/Genres'
import Profile from './pages/Profile'
import MovieDetail from './pages/MovieDetail'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='/' element={<MovieDashboard />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path='home' element={<Home />} />
          <Route path='genres' element={<Genres/>} />
          <Route path='profile' element={<Profile/>} />
          <Route path='moods' element={<MoodMain />} />
          <Route path='movie' element={<MovieDetail/>}/>
          <Route path='*' element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
