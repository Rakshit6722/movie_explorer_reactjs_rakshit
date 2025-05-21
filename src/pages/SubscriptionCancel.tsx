import React, { Component } from 'react'
import { Button } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import WithRouter from '../components/hoc/WithRouter'
import { motion } from 'framer-motion'
import { updatePaymentCancelStatus } from '../services/api'

interface SubscriptionCancelProps {
    navigate: (path: string) => void
}

class SubscriptionCancel extends Component<SubscriptionCancelProps> {

    params = new URLSearchParams(window.location.search)
    sessionId = this.params.get('session_id')

    componentDidMount(){
        if (!this.sessionId) {
            this.props.navigate('/home')
        }

        this.handleCancelPayment()

    }

    handleCancelPayment = async () => {
        const response = await updatePaymentCancelStatus(this.sessionId)
        console.log(response)
    }

    handleHome = () => {
        this.props.navigate('/home')
    }

    handleProfile = () => {
        this.props.navigate('/profile')
    }

    render() {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black/80 via-black/90 to-black pt-16 pb-24 px-4 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 1 }}
                    transition={{ duration: 0.8 }}
                    exit={{ opacity: 0, y: 0.8 }}
                    className="w-full max-w-2xl bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                    <div className="bg-gradient-to-r from-red-600 to-red-700 py-4 px-6 flex items-center">
                        <CancelIcon sx={{ fontSize: 36, color: 'white' }} />
                        <h1 className="ml-3 text-white font-anton text-2xl tracking-wide">Payment Cancelled</h1>
                    </div>
                    <div className="p-8 text-center">
                        <div className="mb-6 flex justify-center">
                            <div className="p-4 rounded-full bg-red-600/20">
                                <CancelIcon sx={{ fontSize: 54, color: '#e23145' }} />
                            </div>
                        </div>
                        <h2 className="font-anton text-3xl text-white tracking-wide mb-2">
                            Subscription Not Activated
                        </h2>
                        <p className="text-gray-300 mb-8">
                            Your payment was cancelled or not completed.<br />
                            No changes have been made to your subscription.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="contained"
                                onClick={this.handleHome}
                                sx={{
                                    backgroundColor: '#e23145',
                                    '&:hover': { backgroundColor: '#c41f33' },
                                    padding: '10px 24px',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                }}
                            >
                                Back to Home
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={this.handleProfile}
                                sx={{
                                    borderColor: 'rgba(255,255,255,0.3)',
                                    color: 'white',
                                    '&:hover': {
                                        borderColor: 'rgba(255,255,255,0.6)',
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                    },
                                    padding: '10px 24px',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                }}
                            >
                                View Subscription
                            </Button>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e23145] to-transparent"></div>
                </motion.div >
            </div>
        )
    }
}

export default WithRouter(SubscriptionCancel)