import React, { useEffect, useState } from 'react';
import MoviesCard from '../../home/CategorySection/MoviesCard';
import Pagination from '@mui/material/Pagination';
import { useSelector } from 'react-redux';
import { Movie } from '../../../types/type';

interface MoviesGridProps {
    movieList: Movie[];
}

function MoviesGrid({ movieList }: MoviesGridProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 20;

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movieList.slice(indexOfFirstMovie, indexOfLastMovie);

    const selectedMood = useSelector((state: any) => state.mood.selectedMood);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedMood, movieList]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className='flex flex-wrap justify-start gap-2.5 mb-16'>
                {currentMovies.map((movie, index) => (
                    <MoviesCard key={index} movie={movie} />
                ))}
            </div>

            {
                movieList.length > moviesPerPage && (

                    <div className="flex justify-center items-center mt-10 mb-20">
                        <Pagination
                            key={currentPage}
                            count={Math.ceil(movieList.length / moviesPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            shape="rounded"
                            size="large"
                            variant="outlined"
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    color: 'white',
                                    borderColor: '#4b5563',
                                    fontSize: '1rem',
                                    minWidth: '45px',
                                    height: '45px',
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
                )
            }

        </>
    );
}

export default MoviesGrid;
