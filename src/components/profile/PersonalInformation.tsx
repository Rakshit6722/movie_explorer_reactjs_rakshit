import React, { Component } from 'react'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import CircularProgress from '@mui/material/CircularProgress';

// At the beginning of your class component, add this styling configuration
const planStyles = {
  basic: {
    container: "border-[#1a1a1a] bg-black",
    topBar: "bg-gradient-to-r from-transparent via-[#e23145] to-transparent",
    icon: "text-gray-400",
    infoBox: "border-[#1a1a1a] bg-black/80",
    badge: "bg-gray-700 text-gray-300",
    effects: [], // No effects for basic
    button: "bg-gradient-to-r from-[#e23145] to-[#78121e] text-white shadow-md shadow-[#e23145]/20"
  },
  gold: {
    container: "border-amber-700/60 bg-gradient-to-br from-black via-[#151005] to-[#1c1505]",
    topBar: "bg-gradient-to-r from-amber-800/50 via-amber-500 to-amber-800/50",
    icon: "text-amber-400",
    infoBox: "border-amber-700/40 bg-gradient-to-br from-[#1a1404] to-[#0f0a01]",
    badge: "bg-amber-900/50 text-amber-200",
    effects: [
      // Gold effects - each item will be a component
      <div key="gold-glow-1" className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-40 bg-amber-700 blur-[60px]"></div> 
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-600 blur-[80px] opacity-40"></div>
      </div>,
      <div key="gold-glow-2" className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-xl"></div>,
      <div key="gold-glow-3" className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-amber-600/15 to-transparent rounded-full blur-xl"></div>,
      <div key="gold-pattern" className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGQUQ2MDciIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptLTIgMGgxdjJoLTF2LTJ6bS0yIDBoMXYyaC0xdi0yem0tMi0xaDEwdjFoLTEwdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
    ],
    infoBoxEffects: [
      <div key="gold-info-shine" className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-45deg] transform-gpu animate-shine pointer-events-none"></div>,
      <div key="gold-info-glow-1" className="absolute top-0 right-0 w-20 h-20 bg-amber-600/10 rounded-full blur-xl"></div>,
      <div key="gold-info-glow-2" className="absolute bottom-0 left-0 w-20 h-20 bg-amber-500/10 rounded-full blur-xl"></div>
    ],
    button: "bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 hover:from-gray-700 hover:to-gray-800"
  },
  platinum: {
    container: "border-slate-600/60 bg-gradient-to-br from-black via-[#101114] to-[#181a1e]",
    topBar: "bg-gradient-to-r from-slate-700/50 via-slate-400 to-slate-700/50",
    icon: "text-slate-300",
    infoBox: "border-slate-600/40 bg-gradient-to-br from-[#141821] to-[#0d1017]",
    badge: "bg-slate-800/50 text-slate-300",
    effects: [
      <div key="plat-glow-1" className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-40 bg-slate-500 blur-[60px]"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-slate-400 blur-[80px] opacity-40"></div>
      </div>,
      <div key="plat-glow-2" className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-slate-300/20 to-transparent rounded-full blur-xl"></div>,
      <div key="plat-glow-3" className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-slate-400/15 to-transparent rounded-full blur-xl"></div>,
      <div key="plat-pattern" className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNDMEM0Q0MiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptLTIgMGgxdjJoLTF2LTJ6bS0yIDBoMXYyaC0xdi0yem0tMi0xaDEwdjFoLTEwdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
    ],
    infoBoxEffects: [
      <div key="plat-info-shine" className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-45deg] transform-gpu animate-shine pointer-events-none"></div>,
      <div key="plat-info-glow-1" className="absolute top-0 right-0 w-20 h-20 bg-slate-400/10 rounded-full blur-xl"></div>,
      <div key="plat-info-glow-2" className="absolute bottom-0 left-0 w-20 h-20 bg-slate-300/10 rounded-full blur-xl"></div>
    ],
    button: "bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 hover:from-gray-700 hover:to-gray-800"
  }
};

export class PersonalInformation extends Component<any> {
    componentDidMount(): void {
    }
    render() {
        const { userInfo, handleClickOpen, currentPlan, loading, subscriptionDetails, getStatusDisplay, error, planInfo, formatDateForDisplay, getDaysRemaining } = this.props;
        
        // Get the appropriate style set based on current plan
        const style = planStyles[currentPlan] || planStyles.basic;
        
        return (
            <>
                <div className="container max-w-6xl mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-4 space-y-4">
                            <div className="bg-black rounded-lg overflow-hidden border border-[#1a1a1a] hover:border-[#252525] relative hover:shadow-xl hover:shadow-black/10 transition-all duration-300">
                                <div className="absolute top-0 inset-x-0 h-1">
                                    <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#e23145] to-transparent"></div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-medium mb-4 border-b border-[#1a1a1a] pb-2 flex items-center">
                                        <AccountCircleIcon fontSize="small" sx={{ mr: 1, color: '#e23145' }} />
                                        <span>Account Info</span>
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="p-2 rounded-md bg-black hover:bg-[#0a0a0a] border border-[#1a1a1a] transition-colors duration-200">
                                            <span className="block text-xs text-gray-500 mb-1">EMAIL</span>
                                            <span className="text-gray-200">{userInfo.email}</span>
                                        </div>

                                        <div className="p-2 rounded-md bg-black hover:bg-[#0a0a0a] border border-[#1a1a1a] transition-colors duration-200">
                                            <span className="block text-xs text-gray-500 mb-1">ROLE</span>
                                            <span className="text-gray-200 capitalize">{userInfo.role}</span>
                                        </div>

                                        <div className="p-2 rounded-md bg-black hover:bg-[#0a0a0a] border border-[#1a1a1a] transition-colors duration-200">
                                            <span className="block text-xs text-gray-500 mb-1">MEMBER SINCE</span>
                                            <span className="text-gray-200">
                                                {new Date().toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {userInfo.role === 'supervisor' && (
                                <div className="bg-black rounded-lg overflow-hidden border border-[#1a1a1a] hover:border-[#252525] relative hover:shadow-xl hover:shadow-black/10 transition-all duration-300">
                                    <div className="absolute top-0 inset-x-0 h-1">
                                        <div className="h-full w-2/3 mx-auto bg-gradient-to-r from-[#78121e] via-[#e23145] to-[#78121e]"></div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-lg font-medium mb-3 border-b border-gray-800/80 pb-2 flex items-center">
                                            <SettingsIcon fontSize="small" sx={{ mr: 1, color: '#e23145' }} />
                                            <span>Admin Controls</span>
                                        </h3>

                                        <div className="space-y-2">
                                            <button
                                                onClick={handleClickOpen}
                                                className="w-full py-2.5 bg-black/30 hover:bg-[#e23145]/10 text-gray-200 rounded text-left px-4 flex justify-between items-center border border-transparent hover:border-[#e23145]/30 transition-all duration-200"
                                            >
                                                <span>Add Movie</span>
                                                <KeyboardArrowRightIcon fontSize="small" className="text-[#e23145]" />
                                            </button>

                                            <button
                                                className="w-full py-2.5 bg-black/30 hover:bg-[#e23145]/10 text-gray-200 rounded text-left px-4 flex justify-between items-center border border-transparent hover:border-[#e23145]/30 transition-all duration-200"
                                            >
                                                <span>Edit Movie</span>
                                                <KeyboardArrowRightIcon fontSize="small" className="text-[#e23145]" />
                                            </button>

                                            <button
                                                className="w-full py-2.5 bg-black/30 hover:bg-[#e23145]/10 text-gray-200 rounded text-left px-4 flex justify-between items-center border border-transparent hover:border-[#e23145]/30 transition-all duration-200"
                                            >
                                                <span>Delete Movie</span>
                                                <KeyboardArrowRightIcon fontSize="small" className="text-[#e23145]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="md:col-span-8">
                            <div className={`rounded-lg overflow-hidden border relative group transform transition-all duration-300
    ${style.container} hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-${currentPlan === 'gold' ? 'amber' : currentPlan === 'platinum' ? 'slate' : 'red'}-900/20`}>
    
    {/* Background Pattern - More subtle */}
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjRkZGIiBzdG9wLW9wYWNpdHk9Ii4wNSIgb2Zmc2V0PSIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiNGRkYiIHN0b3Atb3BhY2l0eT0iMCIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZD0iTTAgMGg2MHY2MEgwVjB6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4yIi8+PC9zdmc+')] opacity-10"></div>
    
    {/* Render all effects from the array */}
    {style.effects.map((effect) => effect)}
    
    {/* Top accent bar with animation */}
    <div className="absolute top-0 inset-x-0 h-1 overflow-hidden">
        <div className={`h-full w-full ${style.topBar} group-hover:opacity-100 opacity-80 transition-opacity duration-500`}></div>
    </div>
    
    <div className="p-6 relative z-10">
        {/* Header with premium styling */}
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-3 mb-5">
            <h3 className="text-xl font-medium flex items-center">
                <WorkspacePremiumIcon
                    className={`${style.icon} transition-transform group-hover:scale-110 duration-300`}
                    fontSize="small"
                    sx={{ mr: 1.5 }}
                />
                <span className="tracking-wide">Your Subscription</span>
            </h3>
            
            {!loading && subscriptionDetails && (
                <span className={`text-xs px-2.5 py-0.5 rounded-full flex items-center backdrop-blur-sm transition-all duration-300
                    ${subscriptionDetails.status?.toLowerCase() === 'active'
                        ? 'bg-green-900/30 text-green-400 border border-green-800/50 group-hover:bg-green-900/40'
                        : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 group-hover:bg-gray-800/60'
                    }`}>
                    <span className={`w-2 h-2 rounded-full mr-1.5 transition-all duration-300
                        ${subscriptionDetails.status?.toLowerCase() === 'active' 
                            ? 'bg-green-400 group-hover:animate-pulse' 
                            : 'bg-gray-500'
                        }`}>
                    </span>
                    {getStatusDisplay()}
                </span>
            )}
        </div>

        {/* Content section with improved spacing and visuals */}
        {loading ? (
            <div className="h-52 flex flex-col items-center justify-center gap-3">
                <CircularProgress size={28} sx={{ color: currentPlan === 'gold' ? "#d97706" : currentPlan === 'platinum' ? "#94a3b8" : "#e23145" }} />
                <span className="text-sm text-gray-400">Loading subscription details...</span>
            </div>
        ) : error ? (
            <div className="text-red-400 flex flex-col items-center gap-2 text-center py-8 text-sm">
                {error}
                <button onClick={() => window.location.href = '/subscription'}
                    className='mt-2 border border-red-400/50 rounded-md px-4 py-2 bg-red-400/10 hover:bg-red-400/20 transition-all duration-200 hover:scale-105'>
                    <span className="text-white font-medium cursor-pointer">Retry</span>
                </button>
            </div>
        ) : (
            <div className="space-y-6">
                {/* Plan info box with enhanced styling */}
                <div className={`p-5 rounded-xl border relative overflow-hidden backdrop-blur-sm transition-all duration-300
                    ${style.infoBox} transform group-hover:translate-y-[-2px] group-hover:shadow-lg`}>
                    
                    {/* Render info box effects */}
                    {style.infoBoxEffects && style.infoBoxEffects.map((effect) => effect)}
                    
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-full ${
                                currentPlan === 'gold' 
                                    ? 'bg-gradient-to-br from-amber-700/30 to-amber-900/30 border border-amber-600/30' 
                                    : currentPlan === 'platinum' 
                                        ? 'bg-gradient-to-br from-slate-700/30 to-slate-900/30 border border-slate-600/30'
                                        : 'bg-gradient-to-br from-red-700/20 to-red-900/20 border border-red-800/20'
                            } transition-all duration-300 group-hover:scale-105`}>
                                <WorkspacePremiumIcon
                                    className={`${style.icon} transition-transform duration-300`}
                                    sx={{ fontSize: 32 }}
                                />
                            </div>
                            <div>
                                <span className="text-lg font-medium block tracking-wide">
                                    {planInfo.name} Plan
                                </span>
                                <span className={`text-xs px-2 py-0.5 rounded-md inline-block mt-1 font-medium tracking-wide ${style.badge}`}>
                                    {currentPlan?.toUpperCase()}
                                </span>
                            </div>
                        </div>
                        
                        <div className="text-right">
                            <div className={`font-semibold text-xl ${
                                currentPlan === 'gold' 
                                    ? 'text-amber-300'
                                    : currentPlan === 'platinum'
                                        ? 'text-slate-300' 
                                        : 'text-white'
                            }`}>
                                {planInfo.price === 0 ? 'FREE' : `₹${planInfo.price}`}
                            </div>
                            <span className="text-xs text-gray-400 tracking-wide">
                                {planInfo.price > 0 ? 'per month' : ''}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats/info cards with improved styling */}
                {subscriptionDetails && currentPlan !== 'basic' && (
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[140px] p-4 rounded-xl border border-opacity-30 backdrop-blur-sm 
                            bg-gradient-to-br from-black/60 to-black/80 hover:from-black/80 hover:to-black/60 
                            transition-all duration-300 hover:shadow-lg group-hover:border-opacity-50">
                            <div className="text-xs text-gray-400 flex items-center mb-2 font-medium">
                                <CalendarTodayIcon sx={{ fontSize: 14, mr: 0.8 }} />
                                START DATE
                            </div>
                            <div className="text-sm font-medium">{formatDateForDisplay(subscriptionDetails.created_at)}</div>
                        </div>

                        <div className="flex-1 min-w-[140px] p-4 rounded-xl border border-opacity-30 backdrop-blur-sm 
                            bg-gradient-to-br from-black/60 to-black/80 hover:from-black/80 hover:to-black/60 
                            transition-all duration-300 hover:shadow-lg group-hover:border-opacity-50">
                            <div className="text-xs text-gray-400 flex items-center mb-2 font-medium">
                                <AccessTimeIcon sx={{ fontSize: 14, mr: 0.8 }} />
                                EXPIRES
                            </div>
                            <div className="text-sm font-medium">{formatDateForDisplay(subscriptionDetails.expiry_date)}</div>
                        </div>

                        {getDaysRemaining() !== null && (
                            <div className="flex-1 min-w-[140px] p-4 rounded-xl border border-opacity-30 backdrop-blur-sm 
                                bg-gradient-to-br from-black/60 to-black/80 hover:from-black/80 hover:to-black/60 
                                transition-all duration-300 hover:shadow-lg group-hover:border-opacity-50">
                                <div className="text-xs text-gray-400 mb-2 font-medium">TIME REMAINING</div>
                                <div className="text-sm font-medium flex items-center justify-between">
                                    <span>{getDaysRemaining()} days</span>
                                    <span className={`text-xs font-medium ${subscriptionDetails.status?.toLowerCase() === 'active' ? 'text-green-400' : 'text-gray-400'}`}>
                                        {Math.min(Math.round(getDaysRemaining() / 30 * 100), 100)}%
                                    </span>
                                </div>
                                <div className="w-full bg-black/80 rounded-full h-1.5 mt-2.5 overflow-hidden">
                                    <div className={`h-full rounded-full relative ${
                                        subscriptionDetails.status?.toLowerCase() === "active" 
                                            ? "bg-gradient-to-r from-green-500 to-green-400" 
                                            : "bg-gray-500"
                                        }`}
                                        style={{
                                            width: `${Math.min(getDaysRemaining() / 30 * 100, 100)}%`
                                        }}>
                                        <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Features section */}
                <div className="p-4 rounded-xl border border-opacity-20 
                    bg-gradient-to-br from-black/60 to-black/80 backdrop-blur-sm">
                    <div className="text-xs text-gray-400 mb-3 uppercase font-medium tracking-wide">Plan Features</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {planInfo.features.slice(0, 4).map((feature: any, index: number) => (
                            <div key={index} className={`flex items-center p-2.5 rounded-lg transition-all duration-200
                                ${feature.available 
                                    ? 'border border-opacity-10 hover:border-opacity-30 hover:shadow-inner' 
                                    : 'border border-transparent hover:bg-black/40'
                                }`}
                                style={{
                                    borderColor: feature.available 
                                        ? currentPlan === 'gold' 
                                            ? '#92400e' 
                                            : currentPlan === 'platinum' 
                                                ? '#475569' 
                                                : '#991b1b'
                                        : 'transparent'
                                }}>
                                {feature.available ?
                                    <CheckCircleIcon 
                                        className={`mr-2 flex-shrink-0 ${
                                            currentPlan === 'gold' 
                                                ? 'text-amber-500' 
                                                : currentPlan === 'platinum' 
                                                    ? 'text-slate-400' 
                                                    : 'text-green-500'
                                        }`} 
                                        style={{ fontSize: '16px' }} /> :
                                    <CancelIcon className="text-gray-500 mr-2 flex-shrink-0" style={{ fontSize: '16px' }} />
                                }
                                <span className={`text-sm ${feature.available ? 'text-gray-100' : 'text-gray-500'}`}>
                                    {feature.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action button with enhanced styling */}
                <div className="pt-1">
                    <button
                        onClick={() => window.location.href = '/subscription'}
                        className={`w-full py-3 text-sm font-medium tracking-wide text-center rounded-lg 
                            transition-all duration-300 relative overflow-hidden group ${style.button}
                            transform hover:translate-y-[-1px]`}
                    >
                        <span className="relative z-10">
                            {currentPlan === 'basic'
                                ? 'Upgrade Plan'
                                : subscriptionDetails?.status?.toLowerCase() === 'active'
                                    ? 'Manage Plan'
                                    : 'Renew Plan'}
                        </span>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></div>
                    </button>
                </div>
            </div>
        )}
    </div>
</div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default PersonalInformation
