import React, { useEffect } from 'react'
import Carousel from './Carousel'
import { useSelector } from 'react-redux'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { NavLink } from 'react-router-dom'
import MoodCarousel from '../MoodSection/MoodCarousel';
import { Movie } from '../../../types/type';

type CarouselSectionProps = {
    type: string,
    heading?: string,
}

function CarouselSection({ type, heading }: CarouselSectionProps) {

    const movies = useSelector((state: any) => state.movie.movies)

    const movieList: Movie[] = React.useMemo(() => {
        switch (type) {
            case 'Trending':
                return movies.filter((movie: any) => parseInt(movie.rating) > 7.5).sort((a: any, b: any) => b.rating - a.rating).slice(0, 30);
            case 'NewRelease':
                return movies.filter((movie: any) => parseInt(movie.release_year) > 2015).sort((a: any, b: any) => b.release_year - a.release_year).slice(0, 30);
            case 'FanFavourite':
                return movies.filter((movie: any) => parseInt(movie.rating) > 7.5).sort((a: any, b: any) => b.rating - a.rating);
            case 'Action':
                return movies.filter((movie: any) => movie.genre === 'Action').sort((a: any, b: any) => b.rating - a.rating).slice(0, 30);
            case 'Horror':
                return movies.filter((movie: any) => movie.genre === 'Horror').sort((a: any, b: any) => b.rating - a.rating).slice(0, 30)
            default:
                return movies;
        }
    }, [type, movies]);
    
    return (
        <div className='flex flex-col z-20'>
            <div className='group cursor-pointer flex items-center space-x-2 lg:space-x-4 font-sans tracking-wide'>
                <p className='font-anton text-gray-300 tracking-wide text-3xl lg:text-3xl'>{heading}</p>
                <NavLink to={type === 'Mood' ? '/moods' : '/genres'}>
                    <div className="relative flex items-center italic space-x-1 lg:space-x-1 cursor-pointer overflow-hidden group">
                        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#f02c49] lg:ml-2 transition-all duration-300 group-hover:w-[85%]"></span>
                        <p className="text-gray-400 text-sm transition-all duration-300 group-hover:text-[#f02c49] lg:opacity-0 group-hover:opacity-100">
                            See All
                        </p>
                        <MdOutlineKeyboardArrowRight className="text-gray-400 lg:text-2xl group-hover:text-[#f02c49] transition-all duration-300 lg:opacity-0 group-hover:opacity-100" />
                    </div>
                </NavLink>
            </div>

            <div>
                {type === 'Mood' ? (
                    <MoodCarousel />
                ) : (
                    <Carousel type={type} movieList={movieList} />
                )}
            </div>
        </div>

    )
}

export default CarouselSection
