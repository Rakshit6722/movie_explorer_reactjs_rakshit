import React from 'react';
import Slider from "react-slick";
import { Movie } from '../../../types/type';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type MidCarouselProps = {
  movieList: Array<Movie>;
  type?: string;
}

const MidCarousel = ({ movieList, type }: MidCarouselProps) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    appendDots: (dots: React.ReactNode) => (
      <div style={{ position: 'absolute', bottom: '10px', width: '100%', textAlign: 'center' }}>
        <ul className="flex justify-center items-center gap-1 m-0 p-0"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="custom-dot bg-white/30 hover:bg-white/50 w-1.5 h-1.5 rounded-full transition-all duration-300" />
    )
  };


  const validMovies = movieList.filter(movie => movie.release_year > 2015) || [];

  if (validMovies.length === 0) {
    return null; 
  }

  return (
    <div className="mid-carousel-container  mx-auto w-full">
      <div className="slider-container relative  overflow-hidden shadow-lg border border-white/5">
        <Slider {...settings}>
          {validMovies.map((movie, index) => (
            <div key={movie.id || index} className="outline-none">
              <div 
                className="relative aspect-[21/6] md:aspect-[21/7] cursor-pointer overflow-hidden group" 
                onClick={() => navigate(`/movie?id=${movie.id}`)}
              >
                {/* Banner Image with zoom effect */}
                <img 
                  src={movie.banner_url}
                  alt={movie.title}
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
                  loading={index <= 1 ? "eager" : "lazy"}
                />
                
                {/* Enhanced Gradient Overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80" /> */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                
                {/* Compact Title with Badge */}
                <div className="absolute bottom-3 left-0 right-0 px-4 md:px-6 flex items-end">
                  <div className="flex items-center">
                    <div className="w-1 h-8 bg-red-500 rounded-sm mr-3 hidden md:block"></div>
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="bg-red-500/80 text-white text-xs px-2 py-0.5 rounded mr-2 uppercase tracking-wide">
                          Featured
                        </span>
                        <span className="text-gray-400 text-xs">
                          {movie.release_year}
                        </span>
                      </div>
                      <h3 className="text-white text-lg md:text-2xl font-anton tracking-wide">
                        {movie.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      
      <style>{`
        .slick-dots li button:before { display: none; }
        .slick-dots li.slick-active .custom-dot {
          width: 20px;
          background-color: #e23145;
        }
        .slick-dots li { margin: 0; }
      `}</style>
    </div>
  );
};

export default MidCarousel;
