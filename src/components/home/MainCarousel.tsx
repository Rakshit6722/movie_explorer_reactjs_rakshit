import React,  from "react";
import Slider from "react-slick";
import { MdArrowRight } from "react-icons/md";
import MainCarouselMovieCard from "./MainCarouselMovieCard";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Movie } from "../../types/type";
import MoodFeaturePromo from "./MoodSection/MoodFeaturePromo";

const MainCarousel = () => {
    const moviesFromStore = useSelector((state: any) => state.movie.movies);
    
    const carouselMovie = moviesFromStore && moviesFromStore.length > 0 
        ? [...moviesFromStore].sort((a: any, b: any) => b.rating - a.rating).slice(0, 10)
        : [];

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

    if (!carouselMovie.length) {
        return (
            <div className="w-full h-[400px] md:h-[570px] bg-gray-900/50 flex items-center justify-center">
                <div className="animate-pulse text-white">Loading featured movies...</div>
            </div>
        );
    }

    return (
        <div className="relative w-full z-10">
        <div className="absolute hidden md:block inset-y-[-4%] left-[-4%] w-[50%] max-w-[400px] opacity-90 bg-gradient-to-r from-black/95 to-transparent z-20 pointer-events-none" /> 
        
  

            <Slider {...settings}>
                {carouselMovie.map((movie: Movie, index: number) => (
                    <div key={movie.id || `movie-${index}`}>
                        <MainCarouselMovieCard data-testId="carousel-movie-card" movie={movie} />
                    </div>
                ))}
            </Slider>
            <MoodFeaturePromo/>

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
        </div>
    );
};

export default MainCarousel;
