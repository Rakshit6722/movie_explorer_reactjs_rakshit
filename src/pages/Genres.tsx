import React, { useEffect, useRef, useState } from 'react';
import GenreToolbar from '../components/genre/GenreToolbar';
import { useDispatch } from 'react-redux';
import MoviesGrid from '../components/common/MoviesGrid/MoviesGrid';
import Footer from '../components/common/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { Movie } from '../types/type';
import { getMovieByPageApi } from '../services/movieApi';
import { motion, AnimatePresence } from 'framer-motion';
import { genreImages } from '../utils/loadImages';

const genreBackgrounds = {
    "All": {
        gradient: "from-black/40 to-black/90",
        image: genreImages['All']
    },
    "Action": {
        gradient: "from-red-900/40 to-black/80", 
        image: genreImages['Action']
    },
    "Adventure": {
        gradient: "from-amber-900/40 to-black/80", 
        image: genreImages['Adventure']
    },
    " Comedy": {
        gradient: "from-yellow-800/40 to-black/80", 
        image: genreImages['Comedy']
    },
    "Drama": {
        gradient: "from-purple-900/40 to-black/80", 
        image: genreImages['Drama']
    },
    "Fantasy": {
        gradient: "from-blue-900/40 to-black/80", 
        image: genreImages['Fantasy']
    },
    "Horror": {
        gradient: "from-gray-900/40 to-black/90", 
        image: genreImages['Horror']
    },
    "Romance": {
        gradient: "from-pink-900/80 to-black/80", 
        image: genreImages['Romance']
    },
    "Sci-Fi": {
        gradient: "from-cyan-900/40 to-black/80", 
        image: genreImages['SciFi']
    },
    " Thriller": {
        gradient: "from-red-950/40 to-black/80", 
        image: genreImages['Thriller']
    }
};

function Genres() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const mainRef = useRef<HTMLDivElement>(null);
    
    const searchParams = new URLSearchParams(location.search);
    const urlGenre = searchParams.get('genre') || 'All';
    const urlPage = parseInt(searchParams.get('pageCount') || '1');
    
    const [pageMovies, setPageMovies] = useState<Movie[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string>(urlGenre);
    const [currentPage, setCurrentPage] = useState<number>(urlPage);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchPageData(urlPage, urlGenre);
    }, []);
    

    const setSelectedGenreMovies = (genre: string) => {
        if (genre === selectedGenre) return;
    
        setIsLoading(true);
        setSelectedGenre(genre);
        setCurrentPage(1);
        updateUrlParams(genre, 1);
        fetchPageData(1, genre);
  
        if (mainRef.current) {
            mainRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
  
    const updateUrlParams = (genre: string, page: number) => {
        const newParams = new URLSearchParams();
        newParams.set('genre', genre);
        newParams.set('pageCount', page.toString());
        navigate(`${window.location.pathname}?${newParams.toString()}`, { replace: true });
    };

    const fetchPageData = async (page: number, genre: string = 'All') => {        
        try {
            setIsLoading(true);
            const response = await getMovieByPageApi(page, genre === 'All' ? '' : genre);
            
            setPageMovies(response?.data || []);
            setTotalPages(response?.totalPages || 0);
        } catch (err) {
            console.error("Error fetching page data:", err);
            setPageMovies([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        if (page === currentPage) return;
        setCurrentPage(page)
        updateUrlParams(selectedGenre, page);
        fetchPageData(page, selectedGenre);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className="bg-gradient-to-b from-black to-[#0f0f0f] min-h-screen">
                <div ref={mainRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-8 lg:py-4">
                    <motion.div 
                        className="mb-8 pb-6 border-b border-gray-800/50"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            {selectedGenre === 'All' ? 'Browse All Movies' : `${selectedGenre} Movies`}
                        </h1>
                        <p className="text-gray-400 text-sm sm:text-base">
                            {selectedGenre === 'All' 
                                ? 'Explore our complete catalog of movies across all genres' 
                                : `Discover our collection of ${selectedGenre.toLowerCase()} films`}
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        className="mb-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        <motion.div 
                            className="relative overflow-hidden backdrop-blur-sm rounded-xl border border-gray-800/40 shadow-lg"
                            layoutId="genreContainer"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={selectedGenre}
                                    className="absolute inset-0 z-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="absolute inset-0 overflow-hidden">
                                        <img 
                                            src={genreBackgrounds[selectedGenre as keyof typeof genreBackgrounds]?.image || genreBackgrounds.All.image} 
                                            alt={`${selectedGenre} genre background`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    
                                    <div className={`absolute inset-0 bg-gradient-to-br ${genreBackgrounds[selectedGenre as keyof typeof genreBackgrounds]?.gradient || genreBackgrounds.All.gradient}`}></div>
                                </motion.div>
                            </AnimatePresence>
                            
                            <div className="relative z-10 p-4 sm:p-6">
                                <h2 className="text-lg font-medium text-white mb-4">
                                    {selectedGenre === 'All' ? 'Browse by Genre' : `${selectedGenre} Films`}
                                </h2>
                                <GenreToolbar
                                    selectedGenre={selectedGenre}
                                    setSelectedGenre={setSelectedGenreMovies}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                    
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-6">
                            <motion.div
                                className="flex items-center"
                                key={`${selectedGenre}-count`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-gray-300 text-sm sm:text-base font-medium">
                                    {selectedGenre === 'All' ? 'All Movies' : `${selectedGenre} Movies`}
                                </h3>
                                {!isLoading && (
                                    <span className="ml-3 bg-gray-800/80 text-white text-xs font-medium px-2.5 py-1 rounded-md border border-gray-700/50">
                                        {pageMovies.length} results
                                    </span>
                                )}
                            </motion.div>
                            
                            {totalPages > 1 && (
                                <div className="text-sm text-gray-400">
                                    Page {currentPage} of {totalPages}
                                </div>
                            )}
                        </div>
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${selectedGenre}-${currentPage}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isLoading ? (
                                    <div className="py-16 flex flex-col items-center justify-center">
                                        <div className="w-10 h-10 border-3 border-t-transparent border-red-600 rounded-full animate-spin"></div>
                                        <p className="mt-4 text-gray-400">Loading movies...</p>
                                    </div>
                                ) : pageMovies.length > 0 ? (
                                    <MoviesGrid
                                        movieList={pageMovies}
                                        onChange={handlePageChange}
                                        totalPages={totalPages}
                                        currentPage={currentPage}
                                        type={'genre'}
                                        isLoading={isLoading}
                                    />
                                ) : (
                                    <div className="py-16 text-center bg-gray-900/30 rounded-xl border border-gray-800/40">
                                        <h3 className="text-xl font-medium text-white mb-2">No Movies Found</h3>
                                        <p className="text-gray-400 max-w-md mx-auto">
                                            We couldn't find any {selectedGenre !== 'All' ? selectedGenre.toLowerCase() : ''} movies matching your criteria.
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Genres;
