import React, { useEffect, useRef, useState } from 'react';
import GenreToolbar from '../components/genre/GenreToolbar';
import { useDispatch } from 'react-redux';
import MoviesGrid from '../components/common/MoviesGrid/MoviesGrid';
import Footer from '../components/common/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { Movie } from '../types/type';
import { getMovieByPageApi } from '../services/movieApi';
import { motion } from 'framer-motion';

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
            <div ref={mainRef} className="flex flex-col space-y-8 py-6">
                <div>
                    <GenreToolbar
                        selectedGenre={selectedGenre}
                        setSelectedGenre={setSelectedGenreMovies}
                    />
                </div>

                <div className="mt-2">
                    <motion.div
                        className="flex items-center gap-2"
                        key={`${selectedGenre}-count`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="text-gray-300 text-sm uppercase tracking-wide font-medium mb-5">
                            Results <span className="text-white ml-2 bg-gray-800 px-2.5 py-0.5 rounded-sm">{pageMovies.length}</span>
                        </h3>
                    </motion.div>

                    <MoviesGrid
                        movieList={pageMovies}
                        onChange={handlePageChange}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        type={'genre'}
                        isLoading={isLoading}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Genres;
