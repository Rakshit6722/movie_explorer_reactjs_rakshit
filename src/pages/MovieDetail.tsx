import React, { Component, createRef } from 'react';
import { Movie } from '../types/type';
import Footer from '../components/common/Footer';

const movieDetailDummyData: Movie = {
    id: 1,
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    release_year: '2008',
    genre: ['Action', 'Drama', 'Crime'],
    rating: "9.0",
    poster: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRute--pNVdX7oKA1SVN6i3qqXOFRhsMGKtdlwxrHhQKz-SWbNI_QNUUAzfrow0TugyYR2T9Q',
    coverimage: 'https://i0.wp.com/thenerdsofcolor.org/wp-content/uploads/2014/06/edge_of_tomorrow_2014_movie-wide.jpg?fit=1440%2C900&ssl=1',
    director: 'Christopher Nolan',
    duration: '152 min',
    premium: true,
};

class MovieDetail extends Component<any, any> {


    constructor(props: any) {
        super(props);
        this.state = {
            movie: movieDetailDummyData,
            isLoading: false
        };
    }
    mainRef = createRef<HTMLDivElement>();

    searchParams = new URLSearchParams(window.location.search);
    movieId = this.searchParams.get('id');

    componentDidMount() {
        console.log(this.movieId);
        // Future API call would go here
        if(this.mainRef.current) {
            this.mainRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    render() {
        const { movie } = this.state;

        return (
            <div ref={this.mainRef} className='flex flex-col gap-36'>
                <div className="min-h-screen bg-black text-white font-sans">

                    <div className="relative w-full h-[75vh]">
          
                        <div className="absolute inset-0">
                            <img
                                src={movie.coverimage}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />
                       
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                        </div>

          
                        <div className="absolute bottom-0 w-full pb-12">
                            <div className="container mx-auto px-6 flex items-end gap-8">
                                <div className="md:w-56 md:h-80 rounded-lg shadow-lg overflow-hidden border border-gray-700 relative bottom-6 transform transition hover:scale-105">
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1 pb-6">
                                    <h1 className="hidden md:block md:text-4xl font-anton text-gray-300 tracking-wide font-bold mb-3">{movie.title}</h1>

                                    <div className="flex flex-wrap items-center text-sm text-gray-300 mb-4">
                                        <span className="mr-3">{movie.release_year}</span>
                                        <span className="mr-3">•</span>
                                        <span className="mr-3">{movie.duration}</span>
                                        <span className="mr-3">•</span>
                                        <div className="flex items-center">
                                            <span className="text-yellow-400 mr-1">★</span>
                                            <span>{movie.rating}</span>
                                        </div>
                                    </div>

                                 
                                    <div className="text-gray-400 mb-4">
                                        Directed by <span className="text-gray-200">{movie.director}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

        
                    <div className="container mx-auto px-6 md:py-1">
                        <div className="max-w-screen">
                            <div className='mb-5 block md:hidden'>
                                <p className='text-4xl font-anton'>{movie.title}</p>
                            </div>
                            {movie.premium && (
                                <div className="mb-6">
                                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        Premium Content
                                    </span>
                                </div>
                            )}

                            <div className="mb-8">
                                <div className="flex flex-wrap gap-3">
                                    {movie.genre.map((genre: string, idx: number) => (
                                        <span
                                            key={idx}
                                            className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full border transform transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer bg-red-900/70 text-red-100 border-red-700 hover:bg-red-800`}
                                        >
                                            <span className="inline-flex items-center">

                                                {genre}
                                            </span>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-4 text-gray-200">Synopsis</h2>
                                <p className="text-gray-300 italic leading-relaxed">
                                    {movie.description}
                                </p>
                            </div>

                            <div className="mt-12 border-t border-gray-800 pt-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Cast & Crew</h3>
                                        <p className="text-gray-400">Cast information would appear here</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">More Like This</h3>
                                        <p className="text-gray-400">Similar movie recommendations would appear here</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        );
    }
}

export default MovieDetail;