import React, { useEffect, useRef, useState } from 'react';
import { MdSettingsSystemDaydream } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const MoodFeaturePromo = () => {
    const navigate = useNavigate();
    const [minimized, setMinimized] = useState(true);
    const intervalRef = useRef<number | null>(null);

    const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
            if (!intervalRef.current) {
                intervalRef.current = window.setInterval(() => {
                    setMinimized(prev => !prev);
                }, 2 * 60 * 1000);
            }
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
    };

    useEffect(() => {
        if (document.visibilityState === 'visible') {
            intervalRef.current = window.setInterval(() => {
                setMinimized(prev => !prev);
            }, 5000);
        }

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {

            document.removeEventListener("visibilitychange", handleVisibilityChange);
            
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, []);

    if (minimized) {
        return (
            <div
                className="absolute bottom-20 right-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 shadow-lg cursor-pointer z-60 hover:bg-[#e23145]/70 hover:border-[#e23145]/30 transition-all duration-300"
                onClick={() => setMinimized(false)}
                title="Explore mood search feature"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
        );
    }

    return (
        <div className="absolute bottom-20 right-8 w-64 bg-black/40 backdrop-blur-sm rounded-lg shadow-xl z-60 overflow-hidden border border-white/10 animate-fadeIn">
            <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                        <div className="h-4 mr-2 bg-gradient-to-r from-white/40 to-white/10 w-1"></div>
                        <h3 className="text-white font-semibold text-sm">Mood-Based Search</h3>
                    </div>
                    <button
                        onClick={() => setMinimized(true)}
                        className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <p className="text-gray-300 text-xs mb-4">
                    Discover the perfect film based on your current mood. Our smart recommendations adapt to how you feel.
                </p>

                <button
                    onClick={() => navigate('/mood')}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-[#e23145]/70 hover:border-[#e23145]/30 text-white text-sm py-2 rounded-md flex items-center justify-center transition-all duration-300"
                >
                    <span>Explore By Mood</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default MoodFeaturePromo;

// Add this CSS to your global styles:
/*

*/