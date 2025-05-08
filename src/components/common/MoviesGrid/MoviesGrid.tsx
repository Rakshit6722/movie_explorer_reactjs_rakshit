import React from 'react';
import MoviesCard from '../../home/CategorySection/MoviesCard';
import Pagination from '@mui/material/Pagination';
import { Movie } from '../../../types/type';

interface MoviesGridProps {
    movieList: Movie[];
    onChange?: (page: number) => void;
    totalPages?: number;
    currentPage?: number; 
    type?: string | null;
    isLoading?: boolean;
}

function MoviesGrid({ movieList, onChange, totalPages = 10, currentPage = 1, type = null, isLoading = false }: MoviesGridProps) {
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        if (value === currentPage || !onChange) return;
        onChange(value);
    };

    const pageCount = totalPages || Math.ceil(movieList.length / 10);

    return (
        <div className="flex flex-col w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 
                  gap-2 sm:gap-2.5 md:gap-3 justify-items-center w-full min-h-[400px]">
                {isLoading ? (
                    <div className="col-span-full py-20 text-center text-gray-400">
                        Loading movies...
                    </div>
                ) : movieList.length > 0 ? (
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

            {((type === 'genre' || type === 'search') && pageCount > 1) && (
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
