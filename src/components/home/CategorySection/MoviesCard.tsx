import React from 'react';
import { Movie } from '../../../types/type';
import { Navigate, useNavigate } from 'react-router-dom';

type MoviesCardProps = {
    movie: Movie;
    index?: number;
    type?: 'standard' | 'trending';
};

function MoviesCard({ movie, index = 0, type = 'standard' }: MoviesCardProps) {

    const navigate = useNavigate()

    const imageUrl = `https://movie-explorer-rorakshaykat2003-movie.onrender.com//${movie.poster_url}`

    const formatRating = (rating: number) => {
        if (rating || rating === 0) {
            return rating.toFixed(1);
        }
        return 'N/A';
    }

    const formatDuration = (minutes: number) => {
        if (!minutes && minutes !== 0) return 'N/A';
        
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        
        if (hours === 0) {
            return `${mins}m`;
        } else if (mins === 0) {
            return `${hours}h`;
        } else {
            return `${hours}h ${mins}m`;
        }
    }

    // if (type === 'trending') {
    //     return (
    //         <div
    //             className="relative group w-[200px] h-[300px] overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
    //             style={{ aspectRatio: '2/3' }}
    //         >

    //             <div className="absolute inset-0">
    //                 <img
    //                     src={movie.coverimage || movie.poster}
    //                     alt={movie.title}
    //                     className="w-full h-full object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-90"
    //                 />
    //             </div>


    //             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

    //             <div className="absolute left-3 top-3">
    //                 <span
    //                     className="text-4xl font-extrabold text-white opacity-90"
    //                     style={{ textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}
    //                 >
    //                     #{index + 1}
    //                 </span>
    //             </div>

    //         </div>
    //     );
    // }


    return (
        <div
            className="relative w-[140px] h-[230px] md:w-[180px] md:h-[290px] group transition-all duration-300 hover:scale-105 hover:z-10"
        >

            <div className="absolute inset-0 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl">
                <img
                    src={imageUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    loading='lazy'
                />

                <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 px-2 py-1 rounded-md text-sm font-bold">
                    ★ {formatRating(movie.rating)}
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent opacity-90"></div>

                <div className="absolute bottom-3 left-3 right-3">
                    {/* <h3 className="text-white text-sm font-semibold truncate">{movie.title}</h3> */}
                </div>
            </div>

            <div className="absolute inset-0 bg-black/70 rounded-xl p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div>
                    <h3 className="text-white text-sm font-semibold truncate">{movie.title}</h3>
                    <div className="flex items-center text-gray-300 text-sm mt-1">
                        <span>{movie.release_year}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDuration(movie.duration)}</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                        <span
                            className="bg-gray-700 text-xs px-2 py-1 rounded-full text-gray-300"
                        >
                            {movie.genre}
                        </span>
                        {movie.genre.length > 2 && (
                            <span className="bg-gray-700 text-xs px-2 py-1 rounded-full text-gray-300">
                                +{movie.genre.length - 2}
                            </span>
                        )}
                    </div>
                </div>

                <button onClick={() => navigate(`/movie?id=${movie.id}`)} className="mt-auto w-full bg-[#f02c49] hover:bg-[#f02c49c5] hover:text-black text-white py-2 rounded-md transition-colors">
                    More Info
                </button>
            </div>
        </div>
    );
}

export default MoviesCard;