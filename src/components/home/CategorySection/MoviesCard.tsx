import React, { useEffect, useState } from 'react';
import { Movie } from '../../../types/type';
import { useNavigate } from 'react-router-dom';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

type MoviesCardProps = {
    movie: Movie;
    index?: number;
    type?: 'standard' | 'trending'
};

function MoviesCard({ movie, index = 0, type = 'standard' }: MoviesCardProps) {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState<string>('');
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const formatRating = (rating: number) => {
        if (rating || rating === 0) {
            return rating.toFixed(1);
        }
        return 'N/A';
    };

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
    };

    useEffect(() => {
        setImageUrl(movie.poster_url);
    }, [movie.poster_url]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                const images = document.querySelectorAll('img');
                images.forEach((img) => {
                    const src = img.getAttribute('src');
                    if (src) {
                        img.setAttribute('src', src); 
                    }
                });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const renderPlanIcon = () => {
        if (!movie?.plan || movie.plan === 'basic') return null;

        const badgeStyles = movie.plan === 'gold' 
            ? {
                iconColor: 'text-amber-300',
                textColor: 'text-amber-200',
                bgGradient: 'bg-gradient-to-br from-amber-600 to-amber-800',
                border: 'border-amber-400/50',
                shadow: 'shadow-[0_0_8px_rgba(251,191,36,0.5)]',
                label: 'GOLD'
              }
            : {
                iconColor: 'text-slate-200',
                textColor: 'text-slate-100',
                bgGradient: 'bg-gradient-to-br from-slate-400 to-slate-600',
                border: 'border-slate-300/50',
                shadow: 'shadow-[0_0_8px_rgba(203,213,225,0.5)]',
                label: 'PLATINUM'
              };

        return (
            <div 
                className={`absolute top-2 right-2 ${badgeStyles.bgGradient} ${badgeStyles.border} ${badgeStyles.shadow} px-2.5 py-1 rounded-lg z-20 group-hover:opacity-0 transition-opacity duration-300 flex items-center gap-1.5 animate-pulse-subtle`}
            >
                <StarRoundedIcon className={`${badgeStyles.iconColor}`} sx={{ fontSize: 18 }} />
                <span className={`text-xs font-semibold ${badgeStyles.textColor} tracking-wide`}>{badgeStyles.label}</span>
            </div>
        );
    };

    return (
        <div
            className={`relative w-[140px] h-[230px] md:w-[180px] md:h-[260px] group transition-all duration-300 ${
                isMobile ? '' : 'hover:scale-105 hover:z-10'
            }`}
            onClick={() => isMobile && setShowDetails(!showDetails)} 
        >
            {renderPlanIcon()}
            
            <div className="absolute inset-0 rounded-md overflow-hidden shadow-lg group-hover:shadow-2xl">
                <img
                    src={imageUrl || 'https://via.placeholder.com/180x260?text=No+Image'}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />

                <div className="absolute top-2 left-2 bg-black/70 text-yellow-400 px-2 py-1 rounded-md text-sm font-bold">
                    ★ {formatRating(movie.rating)}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent opacity-90"></div>
            </div>
            
            <div
                className={`absolute inset-0 bg-black/70 rounded-md p-4 flex flex-col justify-between ${
                    isMobile
                        ? showDetails
                            ? 'opacity-100'
                            : 'opacity-0'
                        : 'opacity-0 group-hover:opacity-100'
                } transition-opacity duration-300`}
            >
                <div>
                    <h3 className="text-white text-sm font-semibold truncate">{movie.title}</h3>
                    <div className="flex items-center text-gray-300 text-sm mt-1">
                        <span>{movie.release_year}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDuration(movie.duration)}</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                        <span className="bg-gray-700 text-xs px-2 py-1 rounded-full text-gray-300">
                            {movie.genre}
                        </span>
                        {movie.genre.length > 2 && (
                            <span className="bg-gray-700 text-xs px-2 py-1 rounded-full text-gray-300">
                                +{movie.genre.length - 2}
                            </span>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => navigate(`/movie?id=${movie.id}`)}
                    className={`mt-auto w-full py-2 text-sm rounded-md transition-colors ${
                        movie?.plan === 'basic' 
                            ? 'bg-[#f02c49] hover:bg-[#f02c49c5] hover:text-black text-white'
                            : movie?.plan === 'gold'
                                ? 'bg-amber-500 hover:bg-amber-400 text-black'
                                : 'bg-slate-300 hover:bg-slate-200 text-black'
                    }`}
                >
                    More Info
                </button>
            </div>
        </div>
    );
}

export default MoviesCard;