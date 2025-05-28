import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { MdArrowRight } from "react-icons/md";
import MainCarouselMovieCard from "./MainCarouselMovieCard";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Movie } from "../../types/type";
import MoodFeaturePromo from "./MoodSection/MoodFeaturePromo";
import { getMovieByPageApi } from "../../services/movieApi";
import { toast } from "react-toastify";
import { Skeleton, LinearProgress } from '@mui/material';
import { motion } from "framer-motion";

const MainCarousel = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchCarouselMovies()
    }, [])

    const fetchCarouselMovies = async () => {
        try {
            const data = await getMovieByPageApi(1, null, null, 8, null);
            if (data?.data) {
                setMovies(data.data);
            } else {
                setMovies([]);
            }
        } catch (err: any) {
            toast.error(err?.message || "Error fetching featured movies");
            setMovies([]);
        } finally {
            setLoading(false);
        }
    }

    const NextArrow = (props: any) => {
        const { onClick } = props;
        return (
            <div
                className="custom-arrow custom-next-arrow"
                onClick={onClick}
            >
                <MdArrowRight size={50} color="gray" />
            </div>
        );
    };

    const settings = {
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        nextArrow: <NextArrow />,
        prevArrow: undefined,
    };

    return (
        <>
            {loading && (
                <LinearProgress
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 9999,
                        height: 3,
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#f02c49', 
                        },
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                />
            )}

            {(!movies.length || loading) ? (
                <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] xl:h-[650px] 2xl:h-[700px] bg-[#0a0a0c] relative overflow-hidden">
                    <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width="100%"
                        height="100%"
                        sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.03)', 
                            position: 'absolute',
                            transform: 'none'
                        }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

                    <div className="absolute bottom-20 left-6 md:left-16 z-20 flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                        <div className="hidden md:block">
                            <Skeleton
                                variant="rectangular"
                                animation="wave"
                                width={160}
                                height={230}
                                sx={{
                                    bgcolor: 'rgba(255, 255, 255, 0.04)',
                                    borderRadius: '8px',
                                    transform: 'none'
                                }}
                            />
                        </div>

                        <div className="w-full max-w-2xl">
                            <Skeleton
                                variant="text"
                                width="70%"
                                height={50}
                                sx={{
                                    bgcolor: 'rgba(255, 255, 255, 0.04)', 
                                    mb: 3,
                                    transform: 'none'
                                }}
                            />

                            <Skeleton 
                                variant="text" 
                                width="100%" 
                                sx={{ bgcolor: 'rgba(255, 255, 255, 0.03)', transform: 'none', mb: 1 }} 
                            />
                            <Skeleton 
                                variant="text" 
                                width="90%" 
                                sx={{ bgcolor: 'rgba(255, 255, 255, 0.03)', transform: 'none' }} 
                            />
                            
                            <div className="mt-6">
                                <Skeleton
                                    variant="rectangular"
                                    width={120}
                                    height={40}
                                    sx={{
                                        bgcolor: 'rgba(255, 255, 255, 0.04)', 
                                        borderRadius: '6px',
                                        transform: 'none'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        <Skeleton
                            variant="circular"
                            width={10}
                            height={10}
                            sx={{
                                bgcolor: 'rgba(240, 44, 73, 0.5)', 
                                transform: 'none'
                            }}
                        />
                    </div>
                </div>
            ) : !movies ? (
                <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] xl:h-[650px] 2xl:h-[700px] bg-[#121218] flex items-center justify-center">
                    <p>No movies found</p>
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                        duration: 1.2,
                        ease: [0.22, 0.03, 0.26, 1] 
                    }}
                    className="relative w-full z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.992 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                            duration: 1.6,
                            ease: "easeOut",
                            delay: 0.15
                        }}
                        className="w-full"
                    >
                        <div className="absolute hidden md:block inset-y-[-4%] left-[-4%] w-[50%] max-w-[400px] opacity-90 bg-gradient-to-r from-black/95 to-transparent z-20 pointer-events-none" />

                        <Slider {...settings}>
                            {movies.map((movie: Movie, index: number) => (
                                <motion.div 
                                    key={movie.id || `movie-${index}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ 
                                        duration: 0.7, 
                                        delay: 0.3 + (index * 0.05), // Staggered delay based on index
                                        ease: "easeInOut"
                                    }}
                                >
                                    <MainCarouselMovieCard data-testId="carousel-movie-card" movie={movie} />
                                </motion.div>
                            ))}
                        </Slider>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.7, 
                            delay: 0.4,
                            ease: [0.22, 0.03, 0.26, 1]
                        }}
                    >
                        <MoodFeaturePromo />
                    </motion.div>

                    <style>{`
                        .slick-prev {
                            display: none !important;  /* Hides the previous arrow */
                        }

                        .custom-arrow {
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            z-index: 30;
                            cursor: pointer;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            border-radius: 50%;
                            background-color: rgba(0, 0, 0, 0.5);
                            width: 80px;
                            height: 80px;
                            transition: background-color 0.3s ease;
                        }
                        
                        .custom-arrow:hover {
                            background-color: rgba(0, 0, 0, 0.7);
                        }
                        
                        .custom-next-arrow {
                            right: 20px;
                        }
                    `}</style>
                </motion.div>
            )}
        </>
    );
};

export default MainCarousel;
