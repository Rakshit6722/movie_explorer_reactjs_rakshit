import React, { useRef, useState, useEffect } from 'react';
import MoviesCard from './MoviesCard';
import { HiArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import { NavLink } from 'react-router-dom';

type CarouselSectionProps = {
    movieList: Array<{
        id: number;
        title: string;
        genre: Array<string>;
        release_year: string;
        rating: string;
        description: string;
        director: string;
        duration: string;
        poster: string;
        coverimage: string;
    }>,
    type: string,
};

function Carousel({ movieList,type }: CarouselSectionProps) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isLeftVisible, setIsLeftVisible] = useState(false);
    const [isRightVisible, setIsRightVisible] = useState(true);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[innerWidth])

    const checkScrollPosition = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setIsLeftVisible(scrollLeft > 0);
            setIsRightVisible(scrollLeft < scrollWidth - clientWidth);
        }
    };

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {

        checkScrollPosition();

        if (carouselRef.current) {
            carouselRef.current.addEventListener('scroll', checkScrollPosition);
        }

        return () => {
            if (carouselRef.current) {
                carouselRef.current.removeEventListener('scroll', checkScrollPosition);
            }
        };
    }, [movieList]);

    return (
        <div className="relative">

            {((innerWidth >= 768) &&isLeftVisible) && (
                <button
                    onClick={scrollLeft}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-4 rounded-full border border-gray-700 hover:border-[#f02c49] hover:bg-black/60 transition-all duration-300 z-20"
                >
                    <HiArrowSmLeft size={26} />
                </button>
            )}

            <div
                ref={carouselRef}
                className="flex space-x-4 overflow-x-auto py-4 px-0 scrollbar-hide snap-x snap-mandatory"
            >

                {movieList.map((movie, index) => (
                    <div key={movie.id} className="flex-shrink-0">
                        {
                            type === 'Trending' ? (
                                <MoviesCard type='trending' movie={movie} index={index} />
                            ) : (
                                <MoviesCard type='standard' movie={movie} index={index} />
                            )
                        }
                    </div>
                ))}
            </div>


            {((innerWidth >= 768) && isRightVisible) && (
                <button
                    onClick={scrollRight}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-4 rounded-full border border-gray-700 hover:border-[#f02c49] hover:bg-black/60 transition-all duration-300 z-10"
                >
                    <HiOutlineArrowSmRight size={26} />
                </button>
            )}
        </div>
    );
}

export default Carousel;
