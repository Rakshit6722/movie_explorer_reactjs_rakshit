import React, { Component } from 'react'
import Header from '../components/common/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer'

export class MovieDashboard extends Component {
    render() {
        return (
            <>
                <div className="flex min-h-screen bg-black text-white">
                    <Header />
                    <div className="flex-1 md:pl-6 pr-0 ml-20 overflow-y-auto">
                        <Outlet />
                    </div>
                </div>
            </>
        )
    }
}

export default MovieDashboard
