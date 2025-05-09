import React, { useEffect } from "react";
import Slider from "react-slick";
import { MdArrowRight } from "react-icons/md";
import MainCarouselMovieCard from "./MainCarouselMovieCard";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Movie } from "../../types/type";

const MainCarousel = () => {
    const moviesFromStore = useSelector((state: any) => state.movie.movies);
    
    const carouselMovie = moviesFromStore && moviesFromStore.length > 0 
        ? [...moviesFromStore].sort((a: any, b: any) => b.rating - a.rating).slice(0, 10)
        : [];

    const user = useSelector((state: any) => state.user.userInfo);
    const token = useSelector((state: any) => state.user.token);

    console.log("User Info:", user);
    console.log("Token:", token);

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
            <div className="absolute hidden md:block top-0 left-0 h-full w-[18%] opacity-90 bg-gradient-to-r from-black via-black/40 to-transparent z-20 pointer-events-none" />

            <Slider {...settings}>
                {carouselMovie.map((movie: Movie, index: number) => (
                    <div key={movie.id || `movie-${index}`}>
                        <MainCarouselMovieCard movie={movie} />
                    </div>
                ))}
            </Slider>

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
