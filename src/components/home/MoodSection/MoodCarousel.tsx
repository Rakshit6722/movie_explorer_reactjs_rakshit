import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMood } from '../../../redux/slices/moodSlice';
import MoodToolbar from './MoodToolbar';
import Carousel from '../CategorySection/Carousel';
import { moodGenreMapping } from '../../../constants/mood';


function MoodCarousel() {

    const movies = useSelector((state: any) => state.movie.movies);

    const selectedMood = useSelector((state: any) => state.mood.selectedMood);

    const movieList = useMemo(() => {
        const genres = moodGenreMapping[selectedMood] || [];

        return movies.filter((movie: any) => {
            return genres.some((genre: string) => movie.genre === genre);
        }).sort((a: any, b: any) => b.rating - a.rating).slice(0, 10);

    }, [selectedMood, movies]);

    const moodBackgroundColors: any = {
        happy: 'lg:bg-gradient-to-b from-yellow-300 to-black',
        sad: 'lg:bg-gradient-to-b from-blue-400 to-black',
        angry: 'lg:bg-gradient-to-b from-red-400 to-black',
        excited: 'lg:bg-gradient-to-b from-orange-400 to-black',
        bored: 'lg:bg-gradient-to-b from-gray-400 to-black',
    };
    return (
        <div className={`relative ${moodBackgroundColors[selectedMood]} py-6 lg:pl-8 rounded-l-xl lg:rounded-l-md shadow-lg`}>
        
            <div className="absolute inset-0 bg-black/30 rounded-l-md z-0"></div>

            <div className="relative z-10">
                <MoodToolbar />
                <Carousel key={selectedMood} type="standard" movieList={movieList} />
            </div>
        </div>
    );
}

export default MoodCarousel;
