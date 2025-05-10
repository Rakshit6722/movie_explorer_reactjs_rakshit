import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAsRead, markAllAsRead, clearNotifications } from '../../redux/slices/notificationSlice';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';
import Badge from '@mui/material/Badge';
import { Notification } from '../../types/type';
import { toast } from 'react-toastify';

const NotificationCenter: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [animateButton, setAnimateButton] = useState(false);
    const dispatch = useDispatch();

    const items = useSelector((state: any) => state.notification.items);
    const unreadCount = useSelector((state: any) => state.notification.unreadCount);
    const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);

    useEffect(() => {
        if (unreadCount > 0 && !isOpen) {
            setAnimateButton(true);
            const timer = setTimeout(() => setAnimateButton(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [unreadCount, isOpen]);

    const handleToggle = () => {
        if (!isLoggedIn) {
            toast.error('Please log in to view notifications.');
            return;
        }
        setIsOpen(!isOpen);
        if (!isOpen && unreadCount > 0) {
            dispatch(markAllAsRead());
        }
    };

    const handleClear = () => {
        dispatch(clearNotifications());
    };

    const handleMarkAsRead = (id: string) => {
        dispatch(markAsRead(id));
    };

    return (
        <div className="relative">
            <button
                onClick={handleToggle}
                className={`relative rounded-full p-2 bg-black/20 hover:bg-[#e23145]/10 border border-gray-800/30 hover:border-[#e23145]/20 transition-all duration-300 ${animateButton ? 'notification-pulse' : ''}`}
                aria-label={`${unreadCount} notifications`}
            >
                <Badge
                    badgeContent={unreadCount}
                    color="error"
                    sx={{
                        '& .MuiBadge-badge': {
                            backgroundColor: '#e23145',
                            fontWeight: 'bold',
                        }
                    }}
                >
                    <NotificationsIcon className="text-gray-300 group-hover:text-white transition-colors" />
                </Badge>
            </button>


            {isOpen && (
                <>

                    <div
                        className="fixed inset-0 z-40 bg-black/5"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    <div className="fixed bottom-4 right-4 w-80 max-h-[80vh] bg-black/60 backdrop-blur-xl border border-gray-800/60 rounded-lg shadow-2xl z-50 animate-slideUp overflow-hidden flex flex-col">
                        <div className="p-3 flex justify-between items-center border-b border-white/5 bg-gradient-to-r from-black/40 via-[#150507]/30 to-black/40">
                            <div className="relative">
                                <h3 className="text-lg font-medium flex items-center">
                                    <NotificationsIcon fontSize="small" sx={{ color: '#e23145', marginRight: '8px' }} />
                                    <span>Notifications</span>
                                </h3>
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#e23145]/5 to-transparent blur-sm -z-10"></div>
                            </div>
                            <div className="flex space-x-1">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(markAllAsRead());
                                    }}
                                    className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all"
                                    title="Mark all as read"
                                >
                                    <DoneAllIcon fontSize="small" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClear();
                                    }}
                                    className="p-1.5 text-gray-400 hover:text-[#e23145] rounded-full hover:bg-white/5 transition-all"
                                    title="Clear all notifications"
                                >
                                    <DeleteIcon fontSize="small" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpen(false);
                                    }}
                                    className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all"
                                    title="Close"
                                >
                                    <CloseIcon fontSize="small" />
                                </button>
                            </div>
                        </div>

                        {/* Content area with more transparency */}
                        <div className="overflow-y-auto notification-scrollbar bg-black/30" style={{ maxHeight: 'calc(80vh - 120px)' }}>
                            <div className="divide-y divide-gray-800/20">
                                {items.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                                        <div className="w-16 h-16 bg-gray-900/50 rounded-full flex items-center justify-center mb-4">
                                            <NotificationsIcon sx={{ fontSize: 36, color: 'rgba(255,255,255,0.15)' }} />
                                        </div>
                                        <p className="text-gray-400">No notifications yet</p>
                                        <p className="text-xs text-gray-600 mt-2 max-w-[200px]">
                                            We'll notify you about new movies and important updates
                                        </p>
                                    </div>
                                ) : (
                                    items.map((notification: Notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-3 hover:bg-[#15080a]/50 transition-all cursor-pointer ${notification.read ? '' : 'border-l-2 border-[#e23145]'}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleMarkAsRead(notification.id);
                                            }}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <div className="flex items-center">
                                                    {!notification.read && (
                                                        <span className="w-2 h-2 rounded-full bg-[#e23145] mr-2 flex-shrink-0"></span>
                                                    )}
                                                    <h4 className={`text-sm font-semibold ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                                                        {notification.title}
                                                    </h4>
                                                </div>
                                                <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                                                    {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-400 ml-4">{notification.body}</p>
                                            {notification.imageUrl && (
                                                <div className="mt-2 ml-4 rounded overflow-hidden">
                                                    <img
                                                        src={notification.imageUrl}
                                                        alt=""
                                                        className="w-full h-auto max-h-32 object-cover hover:scale-105 transition-transform duration-300"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Footer with more transparency */}
                        <div className="p-3 flex justify-between items-center border-t border-white/5 bg-black/40">
                            <span className="text-xs text-gray-500">Movie Explorer</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NotificationCenter;