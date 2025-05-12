import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { updatePaymentStatus } from '../services/api'
import { useDispatch } from 'react-redux'
import { setCurrentPlan } from '../redux/slices/userSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Button } from '@mui/material';
import confetti from 'canvas-confetti';
import { toast } from 'react-toastify'

const SubscriptionSuccess = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();

  const params = new URLSearchParams(window.location.search)
  const paymentIntentId = params.get('session_id')

  const [planInfo, setPlanInfo] = React.useState<any>(null)
  const [subscriptionData, setSubscriptionData] = useState({
    plan: '',
    subscription_id: 0,
  });

  useEffect(() => {
    if (paymentIntentId) {
      updatePaymentSuccessStatus()
    } else {
      toast.error("Payment ID not found")
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    const session_id = params.get('session_id');
  
    if (plan) {
      launchConfetti();
    }
  }, [location]);

  const updatePaymentSuccessStatus = async () => {
    try {
      const response = await updatePaymentStatus(paymentIntentId)
      if (response) {
        dispatch(setCurrentPlan(response?.data?.plan))
        setSubscriptionData({
          plan: response?.data?.plan,
          subscription_id: response?.data?.subscription_id,
        })
        setPlanInfo(response?.data)
        setTimeout(() => {
          navigate('/')
        }, 3000)
      }

    } catch (err: any) {
      toast.error("Couldn't update payment status", err?.message)
    }
  }

  const launchConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: any, max: any) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      const colors = subscriptionData.plan === 'gold' 
        ? ['#FFD700', '#FFC107', '#FF9800'] 
        : ['#e23145', '#c41f33', '#ff6b81'];
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors
      });
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors
      });
    }, 250);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/80 via-black/90 to-black pt-16 pb-24 px-4 flex flex-col items-center">
      <motion.div 
        className="w-full max-w-2xl bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 py-4 px-6 flex items-center justify-between">
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.2, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 36, color: 'white' }} />
              </motion.div>
              <h1 className="ml-3 text-white font-anton text-2xl tracking-wide">Payment Successful</h1>
            </div>
          </div>

          <div className="p-8 text-center">
            <motion.div
              className="mb-6 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className={`p-4 rounded-full ${
                subscriptionData.plan === 'gold' 
                  ? 'bg-amber-600/20' 
                  : subscriptionData.plan === 'platinum' 
                    ? 'bg-gray-600/20' 
                    : 'bg-red-600/20'
              }`}>
                <WorkspacePremiumIcon sx={{ 
                  fontSize: 54, 
                  color: subscriptionData.plan === 'gold' 
                    ? '#FFC107' 
                    : subscriptionData.plan === 'platinum' 
                      ? '#E0E0E0' 
                      : '#e23145' 
                }} />
              </div>
            </motion.div>
            
            <motion.h2 
              className="font-anton text-3xl text-white tracking-wide mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Welcome to {subscriptionData.plan?.charAt(0).toUpperCase() + subscriptionData.plan?.slice(1)} Plan!
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Your subscription has been activated successfully.
            </motion.p>
            
            <motion.div 
              className="bg-white/5 rounded-lg p-5 mb-8 border border-white/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-gray-400 text-sm">Subscription Plan</p>
                  <p className="text-white font-medium text-lg capitalize">{subscriptionData.plan}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Subscription ID</p>
                  <p className="text-white font-medium">#{subscriptionData.subscription_id}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-green-400 font-medium">Active</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Date</p>
                  <p className="text-white font-medium">
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <Button 
                variant="contained"
                onClick={() => navigate('/home')}
                sx={{ 
                  backgroundColor: '#e23145',
                  '&:hover': {
                    backgroundColor: '#c41f33',
                  },
                  padding: '10px 24px',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              >
                Explore Movies
              </Button>
              
              <Button 
                variant="outlined"
                onClick={() => navigate('/profile')}
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
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e23145] to-transparent"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default SubscriptionSuccess;
