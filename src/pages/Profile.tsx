import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { plans } from '../constants/subscriptionPlans';
import { getSubscriptionDetailsApi } from '../services/api';
import { setCurrentPlan } from '../redux/slices/userSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonalInformation from '../components/profile/PersonalInformation';
import { LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logoutUtil } from '../utils/authActions';


function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const userInfo = useSelector((state: any) => state.user.userInfo);
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);

  const [currentUserPlan, setCurrentUserPlan] = useState(useSelector((state: any) => state.user.currentPlan))

  const [planInfo, setPlanInfo] = useState(plans.find((plan) => plan.key === currentUserPlan) || plans[0]);
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPlanDetails();
    setPlanInfo(plans.find((plan) => plan.key === currentUserPlan) || plans[0]);
  }, [currentUserPlan]);


  const fetchPlanDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getSubscriptionDetailsApi();

      if (response?.plan) {
        if(response?.status === 'pending') {
          setError("You did not complete the payment, please try again.");
          return
        }else if(response?.status === 'cancelled') {
          setError("Your subscription has been cancelled, please subscribe again or login again.");
          return
        }
        dispatch(setCurrentPlan(response.plan));
        localStorage.setItem("plan", response.plan);
        setSubscriptionDetails(response);
      }
    } catch (err: any) {
      setError("Couldn't fetch subscription details");
    } finally {
      setLoading(false);
    }
  }

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

  const handleLogout = async () => {
    logoutUtil(dispatch, navigate);
  }

  if (!isLoggedIn) {
    return (
      <div className="bg-black text-white p-6 min-h-screen flex flex-col items-center justify-center">
        <div className="relative w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-[#e23145] to-[#78121e] flex items-center justify-center">
          <AccountCircleIcon sx={{ fontSize: 52, color: 'white' }} />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#e23145]/30 to-transparent blur-lg -z-10"></div>
        </div>
        <h2 className="font-anton text-3xl mb-4">Profile</h2>
        <p className="text-gray-400 text-center mb-4">
          Please sign in to view your profile.
        </p>
        <button onClick={() => window.location.href = '/login'}
          className="relative bg-gradient-to-r from-[#e23145] to-[#78121e] text-white px-6 py-2 rounded-md overflow-hidden group">
          <span className="relative z-10">Sign In</span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen pb-12 relative">
      <div className="absolute top-0 left-0 w-full h-96 overflow-hidden -z-10 opacity-50">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#e23145]/30 to-transparent"></div>
        <div className="absolute right-0 top-0 h-60 w-60 rounded-full blur-3xl bg-[#e23145]/10"></div>
        <div className="absolute left-20 top-40 h-40 w-40 rounded-full blur-2xl bg-[#78121e]/10"></div>
      </div>
      <header className="py-6 border-b border-gray-800 relative">
        <div className="absolute inset-x-0 bottom-0 h-[1px]">
          <div className="h-full w-1/3 mx-auto bg-gradient-to-r from-transparent via-[#e23145]/50 to-transparent"></div>
        </div>
        <div className="container flex justify-between max-w-6xl mx-auto px-4">
          <h1 className="font-anton text-3xl tracking-wide flex items-center">
            <AccountCircleIcon sx={{ fontSize: 32, marginRight: 1, color: '#e23145' }} />
            {userInfo.first_name}'s Profile
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 py-1.5 px-3 text-sm bg-black/40 hover:bg-[#e23145]/15 rounded-lg border border-gray-800/40 hover:border-[#e23145]/30 text-gray-300 hover:text-white transition-all duration-200 group"
          >
            <LogOutIcon
              
              fontSize="small"
              className="text-gray-400 group-hover:text-[#e23145] transition-colors"
            />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <PersonalInformation userInfo={userInfo} currentPlan={currentUserPlan} loading={loading} error={error} planInfo={planInfo} formatDateForDisplay={formatDateForDisplay} getDaysRemaining={getDaysRemaining} subscriptionDetails={subscriptionDetails} getStatusDisplay={getStatusDisplay} />

    </div>
  );
}

export default Profile;