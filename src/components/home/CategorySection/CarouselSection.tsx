import React, { useEffect, useState } from 'react'
import Carousel from './Carousel'
import { useSelector } from 'react-redux'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { NavLink } from 'react-router-dom'
import MoodCarousel from '../MoodSection/MoodCarousel';
import { Movie } from '../../../types/type';
import { getMovieByPageApi } from '../../../services/movieApi';
import { toast } from 'react-toastify';
import { Skeleton } from '@mui/material';

type CarouselSectionProps = {
    type: string,
    heading?: string,
}

function CarouselSection({ type, heading }: CarouselSectionProps) {

    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        fetchCarouselMovies()
    }, [])

    const fetchCarouselMovies = () => {
        switch (type) {
            case 'Trending':
                getTrendingMovies()
                break;

            case 'NewRelease':
                getNewRelease()
                break;

            case 'FanFavourite':
                getFanFavouriteMovies()
                break;

            case 'Action':
                getActionMovies()
                break;

            case 'Horror':
                getHorroMovies()
                break;

            default:
                getActionMovies();

        }
    }

    const handleDeleteMovie = async (movieId: number) => {
        const newMovies = movies.filter((movie: Movie) => movie.id !== movieId);
        setMovies(newMovies);
    }

    const getActionMovies = async () => {
        try {
            setLoading(true)
            const data = await getMovieByPageApi(1, 'Action', null, null, null);
            setMovies(data?.data)
        } catch (err: any) {
            toast.error(err?.message || 'Error fetching action movies')
        } finally {
            setLoading(false)
        }

    }
    const getHorroMovies = async () => {
        try {
            setLoading(true)
            const data = await getMovieByPageApi(1, 'Horror', null, null, null);
            setMovies(data?.data)
        } catch (err: any) {
            toast.error(err?.message || 'Error fetching horror movies')
        } finally {
            setLoading(false)
        }
    }
    const getTrendingMovies = async () => {
        try {
            setLoading(true)
            const data = await getMovieByPageApi(1, null, null, 8, null);
            setMovies(data?.data)
        } catch (err: any) {
            toast.error(err?.message || 'Error fetching trending movies')
        } finally {
            setLoading(false)
        }
    }

    const getFanFavouriteMovies = async () => {
        try {
            setLoading(true)
            const data = await getMovieByPageApi(1, null, null, 7, null);
            setMovies(data?.data)
        } catch (err: any) {
            toast.error(err?.message || 'Error fetching fan favourite movies')
        } finally {
            setLoading(false)
        }
    }
    const getNewRelease = async () => {
        try {
            setLoading(true)
            const data = await getMovieByPageApi(1, null, null, null, 2023);
            setMovies(data?.data)
        } catch (err: any) {
            toast.error(err?.message || "Error fetching new release movies")
        } finally {
            setLoading(false)
        }

    }

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
                {
                    loading ? (
                        <div className="py-4">
                            <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-2 mt-2">
                                {[...Array(7)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0"
                                        style={{ width: 'calc(50vw - 32px)', maxWidth: '210px' }}
                                    >
                                        <Skeleton
                                            variant="rectangular"
                                            animation="wave"
                                            width="100%"
                                            height={0}
                                            sx={{
                                                paddingTop: '150%',
                                                bgcolor: 'rgba(255, 255, 255, 0.07)',
                                                borderRadius: '8px',
                                                transform: 'none'
                                            }}
                                        />

                                        <Skeleton
                                            variant="text"
                                            width="75%"
                                            sx={{
                                                mt: 1.5,
                                                bgcolor: 'rgba(255, 255, 255, 0.07)',
                                                transform: 'none'
                                            }}
                                        />

                                        <div className="flex items-center mt-1">
                                            <Skeleton
                                                variant="circular"
                                                width={14}
                                                height={14}
                                                sx={{
                                                    mr: 0.5,
                                                    bgcolor: 'rgba(255, 255, 255, 0.07)',
                                                    transform: 'none'
                                                }}
                                            />
                                            <Skeleton
                                                variant="text"
                                                width={30}
                                                sx={{
                                                    bgcolor: 'rgba(255, 255, 255, 0.07)',
                                                    transform: 'none'
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : type === 'Mood' ? (
                        <MoodCarousel />
                    ) : (
                        <Carousel type={type} movieList={movies} handleDeleteMovie={handleDeleteMovie}/>
                    )
                }

            </div>
        </div>

    )
}

export default CarouselSection
