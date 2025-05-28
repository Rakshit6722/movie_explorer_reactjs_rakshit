import React, { Component } from 'react'
import Header from '../components/common/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer'
import { LinearProgress } from '@mui/material'
import WithRouter from '../components/hoc/WithRouter'

export class MovieDashboard extends Component<any> {
    render() {        
        return (
            <>
                <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
                    <Header />
                    <div className="flex-1 pt-16 md:pt-0 md:pl-6 px-4 md:px-6 md:ml-20 overflow-y-auto">
                        <Outlet />
                    </div>
                </div>
            </>
        )
    }
}

export default WithRouter(MovieDashboard)