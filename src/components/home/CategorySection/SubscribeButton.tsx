import React, { Component, createRef } from 'react';
import WithRouter from '../../hoc/WithRouter';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
    navigate: (path: string) => void;
}

type State = {
    minimized: boolean;
}

export class SubscribeButton extends Component<Props, State> {
    state: State = {
        minimized: false
    }

    intervalRef = createRef<NodeJS.Timeout>();

    componentDidMount() {
        if (this.intervalRef.current) {
            clearInterval(this.intervalRef.current);
        } else {
            this.intervalRef.current = setInterval(() => {
                this.setState((prevState) => ({ minimized: !prevState.minimized }));
            }, 8000); 
        }
    }

    componentWillUnmount() {
        if (this.intervalRef.current) {
            clearInterval(this.intervalRef.current);
        }
    }

    render() {
        if (!this.state.minimized) {
            return (
                <motion.div 
                    className="fixed top-4 right-4 z-50 max-w-xs"
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="bg-black/60 backdrop-blur-md p-4 rounded-lg shadow-xl border border-white/10">
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="font-anton text-lg text-white/90">Upgrade Your Experience!</h3>
                            <button 
                                className="text-gray-400 hover:text-white"
                                onClick={() => this.setState({ minimized: true })}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </button>
                        </div>
                        
                        <div className="space-y-3 mb-4">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                                <div>
                                    <span className="text-yellow-400 font-medium">Gold Plan</span>
                                    <p className="text-gray-300/90 text-sm">Access exclusive movies & HD streaming</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                                <div>
                                    <span className="text-gray-300 font-medium">Platinum Plan</span>
                                    <p className="text-gray-400/90 text-sm">Everything in Gold + 4K & offline downloads</p>
                                </div>
                            </div>
                        </div>
                        
                        <button
                            onClick={() => this.props.navigate('/subscription')}
                            className="w-full py-2 bg-gradient-to-r from-[#e23145]/90 to-[#c41f33]/90 text-white rounded-lg font-medium tracking-wide transition hover:opacity-100"
                        >
                            Upgrade Now
                        </button>
                    </div>
                </motion.div>
            );
        }

        return (
            <motion.div 
                className="fixed top-4 right-4 z-50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <button
                    onClick={() => this.props.navigate('/subscription')}
                    className="px-6 py-2 bg-gradient-to-r from-[#e23145] to-[#c41f33] text-white rounded-lg font-anton tracking-wider transition hover:opacity-80"
                >
                    Subscribe
                </button>
            </motion.div>
        );
    }
}

export default WithRouter(SubscribeButton);
