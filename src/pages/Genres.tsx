import React, { Component, useEffect, useMemo, useRef, useState } from 'react'
import GenreToolbar from '../components/genre/GenreToolbar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import MoviesGrid from '../components/common/MoviesGrid/MoviesGrid';
import Footer from '../components/common/Footer';

function Genres() {

    const [selectedGenre, setSelectedGenre] = useState<string>('All');

    const movieList = useSelector((state: RootState) => state.movie.movies);

    const mainRef = useRef(null)

    useEffect(() => {
        if (mainRef.current) {
            const mainElement = mainRef.current as HTMLDivElement;
            mainElement.scrollIntoView({ behavior: 'smooth' });
        }
    },[])

    const setSelectedGenreMovies = (genre: string) => {
        setSelectedGenre(genre);
    }

    const filteredMovies = useMemo(() => {
        if (selectedGenre === 'All') {
            return movieList;
        } else {
            return movieList.filter((movie: any) => movie.genre.includes(selectedGenre));
        }
    }, [selectedGenre, movieList]);


    return (
        <>

            <div ref={mainRef} className="flex flex-col space-y-8 py-6">
                <div className="lg:px-4">
                    <GenreToolbar selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenreMovies} />
                </div>

                <div className="mt-2">
                    {filteredMovies.length > 0 ? (
                        <div className="px-4">
                            <p className="text-gray-300 text-sm mb-4 md:ml-4">
                                Showing {filteredMovies.length} movies in {selectedGenre || "all genres"}
                            </p>
                            <MoviesGrid movieList={filteredMovies} />
                        </div>
                    ) : (
                        <div className="flex justify-center items-center py-12">
                            <p className="text-gray-400 text-lg">No movies found in this genre</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )

}

export default Genres
