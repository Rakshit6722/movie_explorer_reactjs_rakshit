import React, { Component, useEffect, useState } from 'react';
import WithReduxState from '../components/hoc/WithReduxState';
import { Button, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import CreateMovieForm from '../components/adminControl/createMovie/CreateMovieForm';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CircularProgress from '@mui/material/CircularProgress';
import { plans } from './Subscription';
import { getSubscriptionDetailsApi } from '../services/api';
import { setCurrentPlan, setcurrentUserPlan } from '../redux/slices/userSlice';
import { current } from '@reduxjs/toolkit';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function Profile() {

  const dispatch = useDispatch()

  const userInfo = useSelector((state: any) => state.user.userInfo);
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const currentUserPlan = useSelector((state: any) => state.user.currentPlan);
  
  const [open, setOpen] = React.useState(false);
  const [subscriptionOpen, setSubscriptionOpen] = React.useState(false);
  // const [currentUserPlan, setCurrentUserPlan] = React.useState(localStorage.getItem("plan") === 'null' ? 'basic' : localStorage.getItem("plan")); 
  const [planInfo, setPlanInfo] = useState(plans.find((plan) => plan.key === currentUserPlan) || plans[0]);
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPlanDetails();
    setPlanInfo(plans.find((plan) => plan.key === currentUserPlan) || plans[0]);
  }, [currentUserPlan]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const fetchPlanDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getSubscriptionDetailsApi();
      console.log("Subscription details:", response);
      
      if (response?.plan) {
        dispatch(setCurrentPlan(response.plan));
        localStorage.setItem("plan", response.plan);
        setSubscriptionDetails(response);
      }
    } catch (err: any) {
      console.log(err);
      setError("Couldn't fetch subscription details");
    } finally {
      setLoading(false);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusDisplay = () => {
    if (!subscriptionDetails?.status) return "Not Active";
    
    const status = subscriptionDetails.status.toLowerCase();
    if (status === "active") return "Active";
    if (status === "inactive") return "Inactive";
    if (status === "trial") return "Trial";
    if (status === "cancelled") return "Cancelled";
    return subscriptionDetails.status;
  };

  const getDaysRemaining = () => {
    if (!subscriptionDetails?.expiry_date) return null;
    
    const expiry = new Date(subscriptionDetails.expiry_date);
    const today = new Date();
    
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };

  const getStatusClass = () => {
    if (!subscriptionDetails?.status) return "bg-gray-500/20 text-gray-400";
    
    const status = subscriptionDetails.status.toLowerCase();
    if (status === "active") return "bg-green-500/20 text-green-400";
    if (status === "inactive") return "bg-gray-500/20 text-gray-400";
    if (status === "trial") return "bg-blue-500/20 text-blue-400";
    if (status === "cancelled") return "bg-red-500/20 text-red-400";
    return "bg-gray-500/20 text-gray-400";
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-black text-white p-8 min-h-screen flex flex-col items-center justify-center">
        <h2 className="font-anton text-4xl tracking-wide mb-6">Profile</h2>
        <p className="font-sans text-gray-300 text-center mb-4">
          Please log in to view your profile.
        </p>
        <button onClick={() => window.location.href = '/login'} className="bg-[#e23145] hover:bg-[#e23145]/50 text-white px-6 py-3 rounded-lg font-sans transition-colors duration-300">
          Sign In
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-b from-[#e23145] via-black/60 to-transparent text-white min-h-screen">

        <div className="relative overflow-hidden">
          <div className="bg-gradient-to-r from-black/80 to-black/40 backdrop-blur-sm">
            <div className="container max-w-6xl mx-auto px-4 py-12 sm:py-16">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="font-anton text-4xl md:text-5xl tracking-wide mb-2">Hello, {userInfo.first_name}</h1>
                  <p className="text-gray-300 text-lg">Welcome to your profile</p>
                </div>
                
                {subscriptionDetails && currentUserPlan !== 'basic' && (
                  <div className="mt-4 md:mt-0 flex items-center">
                    <div className={`px-4 py-2 rounded-full ${getStatusClass()} flex items-center`}>
                      <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                      <span>{getStatusDisplay()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="container max-w-6xl mx-auto px-4 py-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            <div className="md:col-span-4 space-y-6">
        
              <div className="bg-white/10 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/10">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <PersonIcon className="text-[#e23145]" />
                    <h3 className="font-anton text-2xl tracking-wide">Account Details</h3>
                  </div>
                  
                  <div className="space-y-5 mt-6">
                    <div className="space-y-1">
                      <div className="flex items-center text-gray-400 text-sm">
                        <EmailIcon fontSize="small" className="mr-2" />
                        <span>EMAIL</span>
                      </div>
                      <p className="text-white text-lg pl-7">{userInfo.email}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center text-gray-400 text-sm">
                        <AdminPanelSettingsIcon fontSize="small" className="mr-2" />
                        <span>ACCOUNT TYPE</span>
                      </div>
                      <p className="text-white text-lg capitalize pl-7">{userInfo.role}</p>
                    </div>
                  </div>
                </div>
              </div>
    
              {userInfo.role === 'supervisor' && (
                <div className="bg-white/10 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/10">
                  <div className="p-6">
                    <h3 className="font-anton text-2xl tracking-wide mb-5">Admin Controls</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <Button 
                        sx={{ 
                          color: "#fff", 
                          backgroundColor: "rgba(226, 49, 69, 0.7)",
                          "&:hover": {
                            backgroundColor: "rgba(226, 49, 69, 0.9)",
                          }
                        }} 
                        fullWidth 
                        variant="contained" 
                        onClick={handleClickOpen}
                      >
                        Add Movie
                      </Button>
                      <Button 
                        sx={{ 
                          color: "#fff", 
                          border: "1px solid rgba(255, 255, 255, 0.3)", 
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          }
                        }} 
                        fullWidth 
                        variant="outlined"
                      >
                        Edit Movie
                      </Button>
                      <Button 
                        sx={{ 
                          color: "#fff", 
                          border: "1px solid rgba(255, 255, 255, 0.3)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          }
                        }} 
                        fullWidth 
                        variant="outlined"
                      >
                        Delete Movie
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
    
            <div className="md:col-span-8">
              <div className="bg-white/10 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/10">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <WorkspacePremiumIcon className={
                      currentUserPlan === 'basic' ? 'text-gray-400' :
                      currentUserPlan === 'gold' ? 'text-amber-400' :
                      'text-slate-300'
                    } />
                    <h3 className="font-anton text-2xl tracking-wide">Subscription Plan</h3>
                  </div>
                  
                  {loading ? (
                    <div className="flex items-center justify-center py-16">
                      <CircularProgress size={40} sx={{ color: "#e23145" }} />
                    </div>
                  ) : error ? (
                    <div className="bg-red-900/20 text-red-400 p-4 rounded-lg text-center my-6">
                      {error}
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className={`p-5 rounded-lg border ${
                        currentUserPlan === 'basic' ? 'border-gray-600 bg-gray-800/30' :
                        currentUserPlan === 'gold' ? 'border-amber-500/30 bg-gradient-to-br from-amber-900/20 to-amber-700/10' :
                        'border-slate-400/30 bg-gradient-to-br from-slate-700/20 to-slate-600/10'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-bold text-xl mr-2">
                                {planInfo.name} Plan
                              </h4>
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                currentUserPlan === 'basic' ? 'bg-gray-700 text-gray-300' :
                                currentUserPlan === 'gold' ? 'bg-amber-700/50 text-amber-200' :
                                'bg-slate-700/50 text-slate-200'
                              }`}>
                                {currentUserPlan?.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-300 mt-1">
                              {currentUserPlan === 'basic' ? 'Free access with limited content' :
                               currentUserPlan === 'gold' ? 'Premium content with no ads' :
                               'Ultimate access with all features'}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-bold text-xl">
                              {planInfo.price === 0 ? 'FREE' : `₹${planInfo.price}`}
                            </div>
                            <div className="text-xs text-gray-400">
                              {planInfo.price > 0 ? 'per month' : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                      
      
                      {subscriptionDetails && currentUserPlan !== 'basic' && (
                        <div>
                          <h4 className="font-medium mb-3">Subscription Timeline</h4>
                          <div className="p-4 bg-black/30 rounded-lg">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <div className="flex items-center text-sm mb-1">
                                  <CalendarTodayIcon fontSize="small" className="mr-2 text-gray-400" />
                                  <span className="text-gray-400">Start Date</span>
                                </div>
                                <div className="text-white pl-7">
                                  {formatDateForDisplay(subscriptionDetails.created_at)}
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex items-center text-sm mb-1">
                                  <AccessTimeIcon fontSize="small" className="mr-2 text-gray-400" />
                                  <span className="text-gray-400">Expiration Date</span>
                                </div>
                                <div className="text-white pl-7">
                                  {formatDateForDisplay(subscriptionDetails.expiry_date)}
                                </div>
                              </div>
                            </div>
                            
                            {getDaysRemaining() !== null && (
                              <div className="mt-4 pt-3 border-t border-gray-700">
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-400 text-sm">Time Remaining</span>
                                  <span className={subscriptionDetails.status?.toLowerCase() === "active" 
                                    ? "text-green-400 font-medium" 
                                    : "text-gray-400"}>
                                    {getDaysRemaining()} days
                                  </span>
                                </div>
                                <div className="mt-2 bg-gray-700/50 h-2 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${subscriptionDetails.status?.toLowerCase() === "active" ? "bg-green-500" : "bg-gray-500"}`}
                                    style={{ 
                                      width: `${Math.min(getDaysRemaining() / 30 * 100, 100)}%` 
                                    }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      

                      <div>
                        <h4 className="font-medium mb-3">Plan Features</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                          {planInfo.features.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              {feature.available ? 
                                <CheckCircleIcon fontSize="small" className="text-green-500 mr-2 flex-shrink-0" /> : 
                                <CancelIcon fontSize="small" className="text-gray-500 mr-2 flex-shrink-0" />
                              }
                              <span className={`text-sm ${feature.available ? 'text-gray-100' : 'text-gray-500'}`}>
                                {feature.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
          
                      <div>
                        <button
                          onClick={() => window.location.href = '/subscription'}
                          className={`
                            w-full py-3 rounded-lg text-sm font-medium text-center transition-all
                            ${currentUserPlan === 'basic' 
                              ? 'bg-gradient-to-r from-[#e23145] to-[#c41f33] text-white hover:shadow-lg hover:shadow-red-900/30' 
                              : 'border border-gray-600 text-gray-300 hover:bg-white/5'}
                          `}
                        >
                          {currentUserPlan === 'basic' 
                            ? 'Upgrade Plan' 
                            : subscriptionDetails?.status?.toLowerCase() === 'active' 
                              ? 'Manage Subscription' 
                              : 'Renew Subscription'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
          },
        }}
      >
        <div>
          <CreateMovieForm />
        </div>
      </BootstrapDialog>
    </>
  );
}

export default Profile;