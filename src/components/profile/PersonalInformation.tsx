import React, { Component } from 'react';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import CircularProgress from '@mui/material/CircularProgress';
import WithRouter from '../hoc/WithRouter';

export class PersonalInformation extends Component<any> {


    render() {
        const { userInfo, currentPlan, loading, subscriptionDetails, getStatusDisplay, error, planInfo, formatDateForDisplay, getDaysRemaining } = this.props;

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
                                                onClick={() => window.location.href = '/movieForm?mode=add'}
                                                className="w-full py-2.5 bg-black/30 hover:bg-[#e23145]/10 text-gray-200 rounded text-left px-4 flex justify-between items-center border border-transparent hover:border-[#e23145]/30 transition-all duration-200"
                                            >
                                                <span>Add Movie</span>
                                                <KeyboardArrowRightIcon fontSize="small" className="text-[#e23145]" />
                                            </button>

                                            <button
                                                onClick={() => this.props.navigate('/home')}
                                                className="w-full py-2.5 bg-black/30 hover:bg-[#e23145]/10 text-gray-200 rounded text-left px-4 flex justify-between items-center border border-transparent hover:border-[#e23145]/30 transition-all duration-200"
                                            >
                                                <span>Edit Movie</span>
                                                <KeyboardArrowRightIcon fontSize="small" className="text-[#e23145]" />
                                            </button>

                                            <button
                                                onClick={() => this.props.navigate('/home')}
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
                            <div className={`rounded-lg overflow-hidden relative group transform transition-all duration-500 
                                ${currentPlan === 'gold'
                                    ? 'bg-gradient-to-br from-[#b7923c] via-[#e7c565] to-[#9a7b31] shadow-[0_10px_40px_-15px_rgba(251,191,36,0.4)]'
                                    : currentPlan === 'platinum'
                                        ? 'bg-gradient-to-br from-[#a4a7ad] via-[#d1d6e0] to-[#8a8e96] shadow-[0_10px_40px_-15px_rgba(148,163,184,0.4)]'
                                        : 'bg-gradient-to-br from-[#232323] via-[#303030] to-[#1a1a1a]'}
                                hover:-translate-y-1 hover:shadow-2xl`}>

                                <div className="absolute inset-0 overflow-hidden">
                                    <div className={`absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2IiBoZWlnaHQ9IjYiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNiAwIEwgMCAwIDAgNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDIzOSwgMjM5LCAyNTAsIDAuMSkiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXRyZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-30 mix-blend-overlay`}></div>

                                    <div className="absolute inset-0 opacity-60">
                                        <div className={`absolute -inset-full w-[200%] h-[200%] bg-gradient-to-r 
                                            ${currentPlan === 'gold'
                                                ? 'from-transparent via-amber-100/30 to-transparent'
                                                : currentPlan === 'platinum'
                                                    ? 'from-transparent via-slate-100/30 to-transparent'
                                                    : 'from-transparent via-gray-100/10 to-transparent'
                                            } 
                                            -rotate-45 animate-shine-slow transform-gpu`}></div>
                                    </div>

                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 via-transparent to-black/40 opacity-70"></div>

                                    <div className="absolute top-0 inset-x-0 h-[1px] bg-white/30"></div>

                                    <div className={`absolute inset-0 ${currentPlan === 'gold'
                                            ? 'bg-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIi8+PGxpbmUgeDE9IjAiIHkxPSIxMDAiIHgyPSIxMDAiIHkyPSIwIiBzdHJva2U9InJnYmEoMjU1LDIxNSwxNDAsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjIsMjQiLz48L3N2Zz4=)]'
                                            : currentPlan === 'platinum'
                                                ? 'bg-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIi8+PGxpbmUgeDE9IjAiIHkxPSIxMDAiIHgyPSIxMDAiIHkyPSIwIiBzdHJva2U9InJnYmEoMjI4LDIzNSwyNTAsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjIsMjQiLz48L3N2Zz4=)]'
                                                : 'bg-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIi8+PGxpbmUgeDE9IjAiIHkxPSIxMDAiIHgyPSIxMDAiIHkyPSIwIiBzdHJva2U9InJnYmEoMTgwLDE4MCwxODAsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjIsMjQiLz48L3N2Zz4=)]'
                                        }`}></div>
                                </div>

                                <div className={`absolute inset-0 rounded-lg border-2 ${currentPlan === 'gold'
                                        ? 'border-amber-900/30 shadow-[inset_0_0_15px_rgba(120,83,15,0.5)]'
                                        : currentPlan === 'platinum'
                                            ? 'border-slate-700/30 shadow-[inset_0_0_15px_rgba(71,85,105,0.5)]'
                                            : 'border-gray-800/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]'
                                    }`}></div>

                                <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-black/20 shadow-inner shadow-black/60 border border-white/20"></div>
                                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-black/20 shadow-inner shadow-black/60 border border-white/20"></div>
                                <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-black/20 shadow-inner shadow-black/60 border border-white/20"></div>
                                <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-black/20 shadow-inner shadow-black/60 border border-white/20"></div>

                                <div className="absolute top-0 inset-x-0 h-1 overflow-hidden">
                                    <div className={`h-full w-full ${currentPlan === 'gold'
                                            ? 'bg-gradient-to-r from-amber-800/70 via-amber-400 to-amber-800/70'
                                            : currentPlan === 'platinum'
                                                ? 'bg-gradient-to-r from-slate-600/70 via-slate-300 to-slate-600/70'
                                                : 'bg-gradient-to-r from-gray-800/70 via-[#e23145] to-gray-800/70'
                                        }`}></div>
                                </div>

                                <div className="p-6 relative z-10">
                                    <div className={`flex items-center justify-between border-b pb-3 mb-5 ${currentPlan === 'gold'
                                            ? 'border-amber-800/30'
                                            : currentPlan === 'platinum'
                                                ? 'border-slate-700/30'
                                                : 'border-gray-700/50'
                                        }`}>
                                        <h3 className={`text-xl font-medium flex items-center ${currentPlan === 'gold'
                                                ? 'text-amber-950'
                                                : currentPlan === 'platinum'
                                                    ? 'text-slate-950'
                                                    : 'text-white'
                                            }`}>
                                            <WorkspacePremiumIcon
                                                className={`transition-transform group-hover:scale-110 duration-300 ${currentPlan === 'gold'
                                                        ? 'text-amber-800'
                                                        : currentPlan === 'platinum'
                                                            ? 'text-slate-700'
                                                            : 'text-[#e23145]'
                                                    }`}
                                                sx={{ mr: 1.5 }}
                                            />
                                            <span className="tracking-wide">Your Subscription</span>
                                        </h3>

                                        {!loading && subscriptionDetails && (
                                            <span className={`text-xs px-3 py-1 rounded-full flex items-center
                                                ${subscriptionDetails.status?.toLowerCase() === 'active'
                                                    ? currentPlan === 'basic'
                                                        ? 'bg-green-900/30 text-green-400 border border-green-800/50'
                                                        : 'bg-black/20 text-green-800 border border-black/30 shadow-inner shadow-black/20'
                                                    : 'bg-black/30 text-red-800 border border-black/30 shadow-inner shadow-black/20'
                                                }`}>
                                                <span className={`w-2 h-2 rounded-full mr-1.5
                                                    ${subscriptionDetails.status?.toLowerCase() === 'active'
                                                        ? 'bg-green-600 animate-pulse'
                                                        : 'bg-red-600'
                                                    }`}>
                                                </span>
                                                <span className={`font-medium ${currentPlan !== 'basic' ? 'text-black/80' : ''
                                                    }`}>{getStatusDisplay()}</span>
                                            </span>
                                        )}
                                    </div>

                                    {loading ? (
                                        <div className="h-52 flex flex-col items-center justify-center gap-3">
                                            <CircularProgress size={28} sx={{
                                                color: currentPlan === 'gold'
                                                    ? "#92400e"
                                                    : currentPlan === 'platinum'
                                                        ? "#475569"
                                                        : "#e23145"
                                            }} />
                                            <span className={`text-sm ${currentPlan !== 'basic' ? 'text-black/70' : 'text-gray-400'
                                                }`}>Loading subscription details...</span>
                                        </div>
                                    ) : error ? (
                                        <div className="text-red-600 flex flex-col items-center gap-2 text-center py-8 text-sm">
                                            {error}
                                            <button onClick={() => window.location.href = '/subscription'}
                                                className={`mt-2 border rounded-md px-4 py-2 transition-all duration-300 hover:scale-105 ${currentPlan !== 'basic'
                                                        ? 'border-black/20 bg-black/10 hover:bg-black/20 text-black/90'
                                                        : 'border-red-400/50 bg-red-400/10 hover:bg-red-400/20 text-white'
                                                    }`}>
                                                <span className="font-medium cursor-pointer">Retry</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className={`rounded-xl relative overflow-hidden backdrop-blur-sm ${currentPlan === 'gold'
                                                    ? 'bg-gradient-to-br from-amber-300/80 to-amber-500/80 border-2 border-amber-600/30'
                                                    : currentPlan === 'platinum'
                                                        ? 'bg-gradient-to-br from-slate-300/80 to-slate-400/80 border-2 border-slate-500/30'
                                                        : 'bg-black/80 border border-[#1a1a1a]'
                                                }`}>
                                                {currentPlan !== 'basic' && (
                                                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNCAwIEwgMCAwIDAgNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDAsIDAsIDAuMSkiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-30 mix-blend-overlay"></div>
                                                )}

                                                {currentPlan !== 'basic' && (
                                                    <div className="absolute -inset-full w-[200%] h-[300%] bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45 animate-shine-slow transform-gpu"></div>
                                                )}

                                                <div className="p-5 relative z-10">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`p-3 rounded-full ${currentPlan === 'gold'
                                                                    ? 'bg-gradient-to-br from-amber-200 to-amber-400 shadow-inner shadow-amber-900/20 border border-amber-500/50'
                                                                    : currentPlan === 'platinum'
                                                                        ? 'bg-gradient-to-br from-slate-200 to-slate-400 shadow-inner shadow-slate-700/20 border border-slate-500/50'
                                                                        : 'bg-gradient-to-br from-red-700/20 to-red-900/20 border border-red-800/20'
                                                                }`}>
                                                                <WorkspacePremiumIcon
                                                                    className={`${currentPlan === 'gold'
                                                                            ? 'text-amber-800'
                                                                            : currentPlan === 'platinum'
                                                                                ? 'text-slate-700'
                                                                                : 'text-gray-400'
                                                                        }`}
                                                                    sx={{ fontSize: 32 }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <span className={`text-lg font-bold block ${currentPlan === 'basic' ? 'text-white' : 'text-black/80'
                                                                    }`}>
                                                                    {planInfo?.name || 'Basic'} Plan
                                                                </span>
                                                                <span className={`text-xs px-2 py-0.5 rounded-md inline-block mt-1 font-medium ${currentPlan === 'gold'
                                                                        ? 'bg-amber-900/40 text-amber-100'
                                                                        : currentPlan === 'platinum'
                                                                            ? 'bg-slate-700/40 text-slate-100'
                                                                            : 'bg-gray-700 text-gray-300'
                                                                    }`}>
                                                                    {currentPlan?.toUpperCase() || 'BASIC'}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="text-right">
                                                            <div className={`font-bold text-xl ${currentPlan === 'gold'
                                                                    ? 'text-amber-900'
                                                                    : currentPlan === 'platinum'
                                                                        ? 'text-slate-900'
                                                                        : 'text-white'
                                                                }`}>
                                                                {planInfo?.price === 0 ? 'FREE' : `₹${planInfo?.price}`}
                                                            </div>
                                                            <span className={`text-xs ${currentPlan === 'basic' ? 'text-gray-400' : 'text-black/60'
                                                                }`}>
                                                                {planInfo?.price > 0 ? 'per month' : ''}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

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
                                                                <div className={`h-full rounded-full relative ${subscriptionDetails.status?.toLowerCase() === "active"
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

                                            {planInfo?.features && (
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
                                                                        className={`mr-2 flex-shrink-0 ${currentPlan === 'gold'
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
                                            )}

                                            <div className="pt-1">
                                                <button
                                                    onClick={() => window.location.href = '/subscription'}
                                                    className={`w-full py-3 text-sm font-bold tracking-wide text-center rounded-lg 
                                                        transition-all duration-300 relative overflow-hidden ${currentPlan === 'gold'
                                                            ? 'bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 text-amber-100 hover:shadow-amber-900/30'
                                                            : currentPlan === 'platinum'
                                                                ? 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 text-slate-100 hover:shadow-slate-800/30'
                                                                : 'bg-gradient-to-r from-[#e23145] to-[#78121e] text-white'
                                                        }
                                                        shadow-lg transform hover:-translate-y-0.5 hover:shadow-xl`}
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

export default WithRouter(PersonalInformation);
