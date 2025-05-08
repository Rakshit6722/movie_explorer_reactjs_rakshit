import React, { useEffect, useRef, useState } from 'react';
import GenreToolbar from '../components/genre/GenreToolbar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import MoviesGrid from '../components/common/MoviesGrid/MoviesGrid';
import Footer from '../components/common/Footer';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Movie } from '../types/type';
import { setLoading } from '../redux/slices/movieSlice';
import { getMovieByPageApi } from '../services/movieApi';
import { motion } from 'framer-motion';

function Genres() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    
    const mainRef = useRef<HTMLDivElement>(null);

    const [pageMovies, setPageMovies] = useState<Movie[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string>('All');
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const initialPage = parseInt(searchParams.get('pageCount') || '1');

    // useEffect(() => {
    //     if (mainRef.current) {
    //         mainRef.current.scrollIntoView({ behavior: 'smooth' });
    //     }
    //     fetchPageData(initialPage, selectedGenre); 
    // }, []); 

    useEffect(() => {
        // if (selectedGenre === 'All' && initialPage === 1) return;
        fetchPageData(1, selectedGenre);
        const newSearchParams = new URLSearchParams(window.location.search);
        newSearchParams.set('pageCount', '1');
        navigate(`${window.location.pathname}?${newSearchParams.toString()}`);

        if (mainRef.current) {
            mainRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedGenre, navigate]); 

    const setSelectedGenreMovies = (genre: string) => {
        setSelectedGenre(genre);
    };

    const fetchPageData = async (page: number, genre: string = 'All') => {
        console.log(`Fetching page ${page} data for genre: ${selectedGenre}`)

        if (selectedGenre !== 'All') {
            genre = selectedGenre;
        }

        try {

            setIsLoading(true);
            const response = await getMovieByPageApi(page, genre);

            setPageMovies(response?.data);
            setTotalPages(response?.totalPages);
            console.log('Tot')
        } catch (err) {
            console.error("Error fetching page data:", err);
            setPageMovies([]);
        } finally {

            setIsLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        fetchPageData(page);
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
                        type={'genre'}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Genres;
