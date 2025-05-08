import React, { Component, createRef, useState } from 'react';
import { Movie } from '../types/type';
import Footer from '../components/common/Footer';
import WithReduxState from '../components/hoc/WithReduxState';
import { NavLink } from 'react-router-dom';

class MovieDetail extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            movie: '',
            similarMovie: [],
            isLoading: true,
            imageError: false
        };
    }
    
    mainRef = createRef<HTMLDivElement>();
    searchParams = new URLSearchParams(window.location.search);
    movieId = this.searchParams.get('id');

    async componentDidMount() {
        console.log('Movie ID:', this.movieId);

        if(this.movieId) {
            await this.getMovie(this.movieId);
            this.findSimilarMovies(this.state.movie)
        }
  
        if(this.mainRef.current) {
            this.mainRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    async componentDidUpdate(prevProps: any) {
        const currentMovieId = new URLSearchParams(window.location.search).get('id');
        
        if (prevProps.movieList !== this.props.movieList ||  currentMovieId !== this.movieId) {
            
            this.movieId = currentMovieId;
            
            if(this.movieId) {
                this.setState({ isLoading: true });
                
                await this.getMovie(this.movieId);
                this.findSimilarMovies(this.state.movie);
            
                if(this.mainRef.current) {
                    this.mainRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }

    getMovie = (id: string) => {
        console.log("movieList", this.props.movieList);
        if (this.props.movieList && Array.isArray(this.props.movieList)) {
            const movieDetail = this.props.movieList.filter((movie: Movie) => movie.id === Number(id));
            if (movieDetail.length > 0) {
                this.setState({ movie: movieDetail[0], isLoading: false });
            } else {
                this.setState({ movie: '', isLoading: false });
            }
        } else {
            this.setState({ isLoading: false });
        }
    }

    findSimilarMovies = (movie: Movie) => {
        console.log("movie", movie);
        const similarMovies = this.props.movieList.filter((m: Movie) => (m.genre === movie.genre || m.genre === 'Action') && m.id !== this.state.movie.id).slice(0, 4);

        if(similarMovies.length > 0) {
            this.setState({ similarMovie: similarMovies });
        }
    }

    handleImageError = () => {
        this.setState({ imageError: true });
    }

    formatRating = (rating: number) => {
        if (rating || rating === 0) {
            return Number(rating).toFixed(1);
        }
        return 'N/A';
    }

    formatDuration = (minutes: number) => {
        if (!minutes && minutes !== 0) return 'N/A';
        
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        
        if (hours === 0) {
            return `${mins}m`;
        } else if (mins === 0) {
            return `${hours}h`;
        } else {
            return `${hours}h ${mins}m`;
        }
    }

    render() {
        const { movie, isLoading, imageError } = this.state;

        if (isLoading) {
            return (
                <div className="min-h-screen bg-black flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-t-transparent border-red-600 rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-300">Loading movie details...</p>
                    </div>
                </div>
            );
        }

        if (!movie) {
            return (
                <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4">
                    <h2 className="text-3xl font-bold mb-4">Movie Not Found</h2>
                    <p className="text-gray-300 mb-6">The movie you're looking for isn't available.</p>
                    <button 
                        onClick={() => window.history.back()}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 transition rounded-md"
                    >
                        Go Back
                    </button>
                </div>
            );
        }


        return (
            <div ref={this.mainRef} className="flex flex-col bg-[#0f0f0f]">
          
                <div className="group relative w-full h-[50vh] sm:h-[65vh] md:h-[70vh] lg:h-[95vh]">
                  
                    <div className="absolute inset-0 z-0">
                        <img
                            src={movie?.banner_url}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={this.handleImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/70 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r w-[10%] from-[#0f0f0f]  to-transparent" />
                    </div>

                    <div className="absolute bottom-0 w-full z-10">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
                            <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
                               
                                <div className="w-[120px] mb-5  h-[180px] md:w-[150px] md:h-[250px] lg:w-[180px] lg:h-[300px] 
                                            rounded-lg shadow-2xl overflow-hidden border border-gray-800 
                                            transform translate-y-8 md:translate-y-16 transition-transform hover:scale-105">
                                    <img
                                        src={movie?.poster_url}
                                        alt={movie.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        onError={this.handleImageError}
                                    />
                                </div>

                              
                                <div className="flex-1 pb-6">
                                  
                                    <h1 className="hidden md:block text-3xl lg:text-5xl font-extrabold text-white tracking-wide mb-4">
                                        {movie.title}
                                    </h1>

                                   
                                    <div className="flex flex-wrap items-center text-sm text-gray-300 mb-4 gap-3">
                                        <span className="font-medium text-white">
                                            {movie.release_year}
                                        </span>
                                        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                        <span className="font-medium">
                                            {this.formatDuration(movie.duration)}
                                        </span>
                                        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                        <div className="flex items-center">
                                            <span className="text-yellow-400 mr-1">★</span>
                                            <span className="font-bold">{this.formatRating(movie.rating)}</span>
                                        </div>
                                    </div>

                                   
                                    <div className="text-gray-400 mb-6">
                                        Directed by <span className="text-white font-medium">{movie.director}</span>
                                    </div>

                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="md:hidden container mx-auto px-4 pt-24 pb-6">
                    <h1 className="text-3xl font-bold text-white mb-4">{movie.title}</h1>
                </div>

                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pt-24 md:pb-16">
                    <div className="flex flex-col md:flex-row gap-12">
                        
                        <div className="w-full md:w-2/3">
                        
                            <div className="mb-8">
                                <div className="flex flex-wrap gap-3">
                                    {Array.isArray(movie.genre) ? (
                                        movie.genre.map((genre: string, index: number) => (
                                            <span key={index}
                                                className="px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full
                                                         bg-red-900/40 text-red-100 border border-red-800/50 hover:bg-red-800/60
                                                         transition-all duration-300 cursor-pointer"
                                            >
                                                {genre}
                                            </span>
                                        ))
                                    ) : (
                                        <span
                                            className="px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full
                                                     bg-red-900/40 text-red-100 border border-red-800/50 hover:bg-red-800/60
                                                     transition-all duration-300 cursor-pointer"
                                        >
                                            {movie.genre}
                                        </span>
                                    )}
                                </div>
                            </div>

                  
                            {(movie?.plan === 'gold' || movie?.plan === 'platinum') && (
                                <div className="mb-6">
                                    <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        {movie.plan === 'gold' ? 'Gold Plan' : 'Platinum Plan'}
                                    </span>
                                </div>
                            )}

                            <div className="mb-10">
                                <h2 className="text-xl font-semibold mb-4 text-white">Synopsis</h2>
                                <p className="text-gray-300 leading-relaxed">
                                    {movie.description}
                                </p>
                            </div>
                        </div>

                        <div className="w-full md:w-1/3">
                     
                            <div className="bg-gray-900/40 rounded-xl p-6 mb-8">
                                <h3 className="text-lg font-semibold mb-6 text-white">More Like This</h3>
                                <div className="space-y-4">
                                  
                                    {this.state.similarMovie.map((movie: Movie, index: number) => (
                                        <NavLink to={`/movie?id=${movie.id}`} key={index}>
                                        <div key={index} className="flex items-center gap-3 group cursor-pointer">
                                            <div className="w-16 h-24 md:w-24 md:h-36 bg-gray-800 rounded-md flex-shrink-0 overflow-hidden">
                                                <img
                                                    src={movie.poster_url}
                                                    alt={movie.title}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover"
                                                    onError={this.handleImageError}
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium group-hover:text-red-500 transition-colors">{movie.title}</h4>
                                                <div className="flex items-center text-sm text-gray-400">
                                                    <span>{movie.release_year}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{movie.genre}</span>
                                                </div>
                                            </div>
                                        </div>
                                        </NavLink>
                                    ))}
                                </div>
                            </div>

                         
                            <div className="bg-gray-900/40 rounded-xl p-6">
                                <h3 className="text-lg font-semibold mb-4 text-white">Movie Details</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Release Year:</span>
                                        <span className="text-white">{movie.release_year}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Duration:</span>
                                        <span className="text-white">{this.formatDuration(movie.duration)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Director:</span>
                                        <span className="text-white">{movie.director}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Genre:</span>
                                        <span className="text-white truncate max-w-[150px]">
                                            {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Rating:</span>
                                        <span className="text-white">{this.formatRating(movie.rating)}</span>
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

export default WithReduxState(MovieDetail);