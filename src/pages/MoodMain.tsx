import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import MoodToolbar from '../components/home/MoodSection/MoodToolbar';
import MoviesGrid from '../components/common/MoviesGrid/MoviesGrid';
import Footer from '../components/common/Footer';
import { motion } from 'framer-motion';

const moodBackgroundColors: any = {
    happy: 'from-amber-500/20 via-amber-400/10 to-transparent',
    sad: 'from-blue-600/20 via-blue-500/10 to-transparent',
    angry: 'from-red-600/20 via-red-500/10 to-transparent',
    excited: 'from-orange-500/20 via-orange-400/10 to-transparent',
    bored: 'from-gray-600/20 via-gray-500/10 to-transparent',
};

const moodHeadings: any = {
    happy: 'Uplifting Cinema Collection',
    sad: 'Emotionally Resonant Films',
    angry: 'High-Energy Action Selection',
    excited: 'Thrilling Entertainment',
    bored: 'Engaging Cinematic Experiences',
};

const moodGenreMapping: any = {
    happy: ["Romance", "Comedy", "Drama", "Adventure", "Music"],
    sad: ["Drama", "Romance", "Biography"],
    angry: ["Action", "Thriller", "Crime"],
    excited: ["Action", "Sci-Fi", "Adventure"],
    bored: ["Biography", "Drama"]
};

function MoodMain() {
    const selectedMood = useSelector((state: any) => state.mood.selectedMood);
    const movieList = useSelector((state: any) => state.movie.movies);
    const mainRef = useRef(null);

    useEffect(() => {
        if (mainRef.current) {
            const mainElement = mainRef.current as HTMLDivElement;
            mainElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const moodBasedMovies = useMemo(() => {
        const genres = moodGenreMapping[selectedMood] || [];
        return movieList.filter((movie: any) => {
            return genres.some((genre: string) => movie.genre === genre);
        }).sort((a: any, b: any) => b.rating - a.rating);
    }, [selectedMood, movieList]);

    return (
        <> 
        <motion.div 
            ref={mainRef} 
            className="min-h-screen bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >

            <div className="relative overflow-hidden">

                <div className={`absolute inset-0 bg-gradient-to-b ${moodBackgroundColors[selectedMood]}`}></div>

                <div className="relative z-10 px-6 pt-10 pb-12 max-w-7xl mx-auto">
                
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <motion.div
                            key={selectedMood + "-title"}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h1 className="text-2xl md:text-3xl font-semibold text-white">
                                {moodHeadings[selectedMood]}
                            </h1>
                            <p className="text-gray-400 mt-2 max-w-2xl text-sm md:text-base">
                                Tailored recommendations based on your current mood preferences. We've curated a selection of films that match how you're feeling right now.
                            </p>
                        </motion.div>
                        
                   
                        <div className="w-full lg:w-auto shrink-0">
                            <div className="border-t border-b border-gray-800 py-4 lg:border lg:rounded-lg lg:p-4 lg:bg-black/30 lg:backdrop-blur-sm">
                                <p className="text-gray-300 font-medium mb-3 text-sm uppercase tracking-wider">Select Your Mood</p>
                                <MoodToolbar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="px-6 max-w-7xl mx-auto w-full mt-8">
                <div className="flex items-center justify-between mb-6">
                    <motion.div 
                        className="flex items-center gap-2"
                        key={`${selectedMood}-count`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="text-gray-300 text-sm uppercase tracking-wide font-medium">
                            Results <span className="text-white ml-2 bg-gray-800 px-2.5 py-0.5 rounded-sm">{moodBasedMovies.length}</span>
                        </h3>
                    </motion.div>
                    

                </div>
                
                <MoviesGrid movieList={moodBasedMovies} type={'mood'}/>
            </div>
        </motion.div>
        <Footer />
        </>
    );
}

export default MoodMain;
