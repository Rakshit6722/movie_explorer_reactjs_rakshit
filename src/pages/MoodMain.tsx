import React, { useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import MoodToolbar from '../components/home/MoodSection/MoodToolbar'
import MoviesGrid from '../components/common/MoviesGrid/MoviesGrid';
import Footer from '../components/common/Footer';

const moodGenreMapping: any = {
    happy: ["Romance", "Comedy", "Drama", "Adventure", "Music"],
    sad: ["Drama", "Romance", "Biography"],
    angry: ["Action", "Thriller", "Crime"],
    excited: ["Action", "Sci-Fi", "Adventure"],
    bored: ["Biography", "Drama"]
};

const moodBackgroundColors: any = {
    happy: 'bg-gradient-to-b from-yellow-300/60 to-black',
    sad: 'bg-gradient-to-b from-blue-400/60 to-black',
    angry: 'bg-gradient-to-b from-red-400/60 to-black',
    excited: 'bg-gradient-to-b from-orange-400/60 to-black',
    bored: 'bg-gradient-to-b from-gray-400/60 to-black',
};


const moodHeadings: any = {
    happy: 'Movies to Brighten Your Day',
    sad: 'Films for Emotional Moments',
    angry: 'Action-Packed Stress Relief',
    excited: 'Thrilling Adventures Await',
    bored: 'Engaging Stories to Captivate You',
};

function MoodMain() {

    const selectedMood = useSelector((state: any) => state.mood.selectedMood)

    const movieList = useSelector((state: any) => state.movie.movies)

    const mainRef = useRef(null)

    useEffect(() => {
        if (mainRef.current) {
            const mainElement = mainRef.current as HTMLDivElement;
            mainElement.scrollIntoView({ behavior: 'smooth' });
        }
    },[])

    const moodBasedMovies = useMemo(() => {
        const genres = moodGenreMapping[selectedMood] || [];

        return movieList.filter((movie: any) => {
            return genres.some((genre: string) => movie.genre.includes(genre));
        }).sort((a: any, b: any) => b.rating - a.rating)
    }, [selectedMood, movieList])

    return (
        <> 
        <div ref={mainRef} className={`relative flex flex-col space-y-6`}>

            <div className={`py-4 md:p-8 md:py-5 relative lg:${moodBackgroundColors[selectedMood]} flex flex-col space-y-2`}>
                <h2 className="text-xl lg:text-3xl font-bold text-gray-300 tracking-wide">
                    {moodHeadings[selectedMood] || 'Movie Recommendations'}
                </h2>
                <div>
                    <div className="flex flex-col space-y-3">
                        <p className="text-gray-300 italic text-sm">Select your mood for personalized recommendations</p>

                        <div className="flex flex-wrap gap-3 mt-2">
                            <MoodToolbar />
                        </div>
                    </div>
                </div>
            </div>


            <div className="mt-6">
                <h3 className="md:text-xl font-semibold text-white px-1 md:px-0 md:ml-4 mb-4">
                    {moodBasedMovies.length} movies found for your {selectedMood} mood
                </h3>
                <MoviesGrid movieList={moodBasedMovies} />
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default MoodMain
