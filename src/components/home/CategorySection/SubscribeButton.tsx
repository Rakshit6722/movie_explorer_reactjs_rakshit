import React, { Component, createRef } from 'react';
import WithRouter from '../../hoc/WithRouter';
import { motion, AnimatePresence } from 'framer-motion';
import WithReduxState from '../../hoc/WithReduxState';
import { User } from '../../../types/type';

type Props = {
    navigate: (path: string) => void;
    currentPlan: string | null;
}

type State = {
    minimized: boolean;
    userInfo: string | null;
}

export class SubscribeButton extends Component<Props, State> {
    state: State = {
        minimized: true,
        userInfo: this.props.currentPlan,
    }

    intervalRef = createRef<NodeJS.Timeout>();

    componentDidMount(){;

        this.startToggleInterval();
    }

    componentWillUnmount() {
        this.clearToggleInterval();
    }

    startToggleInterval = () => {
        this.clearToggleInterval();
        this.intervalRef.current = setInterval(() => {
            this.setState(prevState => ({ minimized: !prevState.minimized }));
        }, 10 * 1000);
    }

    clearToggleInterval = () => {
        if (this.intervalRef.current) {
            clearInterval(this.intervalRef.current);
            this.intervalRef.current = null;
        }
    }

    render() {
        const { userInfo } = this.state;
        const isBasicPlan = userInfo === 'basic' || userInfo === 'null';

        return (
            <div className="fixed top-4 right-4 z-50">
                <AnimatePresence mode="wait">
                    {!this.state.minimized && isBasicPlan ? (
                        <motion.div
                            key="dialog"
                            className="max-w-xs"
                            initial={{ opacity: 0, scale: 0.5, originX: 1, originY: 0 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 15,
                                    duration: 0.4
                                }
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.5,
                                transition: { duration: 0.2 }
                            }}
                            layoutId="subscribe-element"
                        >
                            <div className="bg-black/60 backdrop-blur-md p-4 rounded-lg shadow-xl border border-white/10">
                                <div className="flex items-start justify-between mb-3">
                                    <motion.h3
                                        className="font-anton text-lg text-white/90"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, transition: { delay: 0.2 } }}
                                    >
                                        Upgrade Your Experience!
                                    </motion.h3>
                                    <motion.button
                                        className="text-gray-400 hover:text-white"
                                        initial={{ opacity: 0, rotate: -90 }}
                                        animate={{ opacity: 1, rotate: 0, transition: { delay: 0.3 } }}
                                        onClick={() => this.setState({ minimized: true })}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </motion.button>
                                </div>

                                <div className="space-y-3 mb-4">
                                    <motion.div
                                        className="flex items-center"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
                                    >
                                        <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                                        <div>
                                            <span className="text-yellow-400 font-medium">Gold Plan</span>
                                            <p className="text-gray-300/90 text-sm">Access exclusive movies & HD streaming</p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="flex items-center"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
                                    >
                                        <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                                        <div>
                                            <span className="text-gray-300 font-medium">Platinum Plan</span>
                                            <p className="text-gray-400/90 text-sm">Everything in Gold + 4K & offline downloads</p>
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.button
                                    onClick={() => this.props.navigate('/subscription')}
                                    className="w-full py-2 bg-gradient-to-r from-[#e23145]/90 to-[#c41f33]/90 text-white rounded-lg font-medium tracking-wide transition hover:opacity-100"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            delay: 0.5,
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 10
                                        }
                                    }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Upgrade Now
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="button"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: { type: "spring", stiffness: 400 }
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.8,
                                transition: { duration: 0.2 }
                            }}
                            layoutId="subscribe-element"
                        >
                            {isBasicPlan ? (
                                <motion.button
                                    onClick={() => this.props.navigate('/subscription')}
                                    className="px-6 py-2 bg-gradient-to-r from-[#e23145] to-[#c41f33] text-white rounded-lg font-anton tracking-wider transition hover:opacity-80"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Subscribe
                                </motion.button>
                            ) : (
                                <motion.button
                                    onClick={() => this.props.navigate('/profile')}
                                    className="px-6 py-2 bg-gradient-to-r from-[#e23145] to-[#c41f33] text-white rounded-lg font-anton tracking-wider transition hover:opacity-80"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {userInfo === 'gold' ? 'Upgrade to Platinum' : 'Manage Subscription'}
                                </motion.button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }
}

export default WithReduxState(WithRouter(SubscribeButton));
