import React, { useEffect, useState, useRef } from 'react';
import MoviesCard from '../../home/CategorySection/MoviesCard';
import Pagination from '@mui/material/Pagination';
import { useSelector } from 'react-redux';
import { Movie } from '../../../types/type';
import { useLocation, useNavigate } from 'react-router-dom';

interface MoviesGridProps {
    movieList: Movie[];
    onChange?: (page: number) => void;
    totalPages?: number;
    type?: string | null
}

function MoviesGrid({ movieList, onChange, totalPages = 10, type = null }: MoviesGridProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const isFirstRender = useRef(true);

    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('pageCount');

    const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
    const [loading, setLoading] = useState(false);
    const moviesPerPage = 10;
    const selectedMood = useSelector((state: any) => state.mood.selectedMood);

    useEffect(() => {
        if (!isFirstRender.current && type === 'genre') {
            setCurrentPage(1);
            const newSearchParams = new URLSearchParams(location.search);
            newSearchParams.set('pageCount', '1');
            navigate(`${location.pathname}?${newSearchParams.toString()}`);

            if (onChange) {
                onChange(1);
            }
        }
    }, [selectedMood, type]);

    useEffect(() => {
        if (isFirstRender.current && type === 'genre') {
            isFirstRender.current = false;
            const initialPage = pageParam ? parseInt(pageParam) : 1;
            if (onChange && initialPage) {
                onChange(initialPage);
            }

            return;
        }

        if (pageParam && parseInt(pageParam) !== currentPage) {
            const newPage = parseInt(pageParam);
            setCurrentPage(newPage);


            if (onChange) {
                onChange(newPage);
            }
        }
    }, [pageParam]);


    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        if (value === currentPage) return;

        setCurrentPage(value);

        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('pageCount', value.toString());
        navigate(`${location.pathname}?${newSearchParams.toString()}`);

        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (onChange) {
            onChange(value);
        }
    };
    const pageCount = totalPages || Math.ceil(movieList.length / moviesPerPage);

    return (
        <div className="flex flex-col w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 
                  gap-2 sm:gap-2.5 md:gap-3 justify-items-center w-full">
                {movieList.length > 0 ? (
                    movieList.map((movie, index) => (
                        <div key={`movie-${movie.id || index}`} className="w-full flex justify-center">
                            <MoviesCard movie={movie} />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-gray-400">
                        No movies found. Try adjusting your filters.
                    </div>
                )}
            </div>

            {(type === 'genre' && pageCount > 1) && (
                <div className="flex justify-center items-center mt-10 mb-8">
                    <Pagination
                        count={pageCount}
                        page={currentPage}
                        onChange={handlePageChange}
                        shape="rounded"
                        size="large"
                        variant="outlined"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: 'white',
                                borderColor: '#4b5563',
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                                minWidth: { xs: '35px', sm: '45px' },
                                height: { xs: '35px', sm: '45px' },
                                borderRadius: '12px',
                                transition: 'all 0.3s ease',
                            },
                            '& .MuiPaginationItem-root:hover': {
                                backgroundColor: '#374151',
                                borderColor: '#6b7280',
                            },
                            '& .Mui-selected': {
                                backgroundColor: '#f02c49',
                                color: 'white',
                                borderColor: '#f02c49',
                            },
                            '& .Mui-selected:hover': {
                                backgroundColor: '#e02443',
                                borderColor: '#e02443',
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default MoviesGrid;
