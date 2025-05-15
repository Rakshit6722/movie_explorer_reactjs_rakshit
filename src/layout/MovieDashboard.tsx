import React, { Component } from 'react'
import Header from '../components/common/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer'
import { LinearProgress } from '@mui/material'
import WithRouter from '../components/hoc/WithRouter'

export class MovieDashboard extends Component<any> {

    render() {
        const { movieLoading } = this.props;
        
        return (
            <>
                {movieLoading && (
                    <LinearProgress 
                        variant="indeterminate"
                        sx={{ 
                            zIndex: '150',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '5px',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: '#f02c49',
                            },
                            '&.MuiLinearProgress-root': {
                                backgroundColor: 'rgba(240, 44, 73, 0.2)',
                            },
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '100%',
                                backgroundColor: 'rgba(240, 44, 73, 0.2)',
                            }
                        }} 
                    />
                )}
            
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

export default WithRouter(MovieDashboard)
