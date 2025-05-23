import React, { Component, createRef } from 'react';
import { Movie } from '../types/type';
import Footer from '../components/common/Footer';
import WithReduxState from '../components/hoc/WithReduxState';
import { NavLink } from 'react-router-dom';
import { getMovieDetails } from '../services/movieApi';
import { authorizeUserForAccessMovie } from '../utils/AuthorizeUser';
import AuthorizedContent from '../components/common/AuthorizedContent';
import { toast } from 'react-toastify';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import WithRouter from '../components/hoc/WithRouter';
import DeleteConfirmationAlert from '../components/common/DeleteConfirmationAlert';

class MovieDetail extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            movie: '',
            similarMovie: [],
            isLoading: true,
            imageError: false,
            showDeleteDialog: false,
        };
    }


    mainRef = createRef<HTMLDivElement>();
    searchParams = new URLSearchParams(window.location.search);
    movieId = this.searchParams.get('id');
    currentPlan = this.props.currentPlan;
    role = this.props.userInfo.role || '';

    async componentDidMount() {
        if (this.movieId) {
            await this.getMovie(this.movieId);
        }

        if (this.mainRef.current) {
            this.mainRef.current.scrollIntoView({ behavior: 'smooth' });
        }

    }

    async componentDidUpdate(prevProps: any) {
        const currentMovieId = new URLSearchParams(window.location.search).get('id');

        if (prevProps.movieList !== this.props.movieList || currentMovieId !== this.movieId) {

            this.movieId = currentMovieId;

            if (this.movieId) {
                this.setState({ isLoading: true });

                await this.getMovie(this.movieId);
                this.findSimilarMovies(this.state.movie);

                if (this.mainRef.current) {
                    this.mainRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }

    getMovie = async (id: string) => {
        if (!id) return;
        try {
            const data = await getMovieDetails(Number(id))
            this.setState({ movie: data?.data, isLoading: false });
            if (this.state.movie) {
                this.findSimilarMovies(this.state.movie)

            }
        } catch (error: any) {
            toast.error(error?.message || "Couldn't fetch movie details");
            this.setState({ isLoading: false });
            return;
        }

    }
    handleDelete = async () => {
        try {
            const response = await this.props.deleteMovie(this.movieId);
            if (response?.status === 200) {
                toast.success("Movie deleted successfully !");
                this.setState({ showDeleteDialog: false });
                this.props.navigate('/');
            }
            toast.success("Movie deleted successfully!");
        } catch (error: any) {
            toast.error(error?.message || "Failed to delete movie.");
        }
    }

    findSimilarMovies = (movie: Movie) => {
        const similarMovies = this.props.movieList.filter((m: Movie) => (m.genre === movie.genre || m.genre === 'Action') && m.id !== this.state.movie.id).slice(0, 6);
        if (similarMovies.length > 0) {
            this.setState({ similarMovie: similarMovies });
            console.log("similar movies", similarMovies)
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
        const isAuthorized = authorizeUserForAccessMovie(this.currentPlan, movie, this.props.userInfo.role);


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

        if (movie && !isAuthorized) {
            return (
                <AuthorizedContent
                    isAuthorized={false}
                    requiredPlan={movie.plan}
                    posterUrl={movie.poster_url}
                    movieTitle={movie.title}
                >
                    <div></div>
                </AuthorizedContent>
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
            <div ref={this.mainRef} className="flex flex-col bg-[#0f0f0f] min-h-screen">

                <div className="relative h-[85vh] sm:h-[75vh] md:h-[75vh] lg:h-[80vh] w-full flex flex-col lg:flex-row">
                    {(this.role === 'admin' || this.role === 'supervisor') && (
                        <div className="absolute top-6 right-6 z-30 flex gap-3">
                            <button
                                onClick={() => {
                                    localStorage.setItem('editMovieId', movie.id.toString());
                                    this.props.navigate('/movieForm');
                                }}
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-[6px] border-2 border-blue-400/30 shadow-[0_2px_12px_0_rgba(30,144,255,0.15)] transition-all duration-200 hover:shadow-[0_0_16px_4px_rgba(30,144,255,0.25)] hover:bg-blue-400/20 hover:border-blue-400 hover:text-blue-50 focus:outline-none"
                                title="Edit Movie"
                            >
                                <EditRoundedIcon sx={{ fontSize: 20 }} />
                            </button>
                            <button
                                onClick={() => this.setState({ showDeleteDialog: true })}
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-[6px] border-2 border-red-400/30 shadow-[0_2px_12px_0_rgba(240,44,73,0.15)] transition-all duration-200 hover:shadow-[0_0_16px_4px_rgba(240,44,73,0.25)] hover:bg-red-400/20 hover:border-red-400 hover:text-red-50 focus:outline-none"
                                title="Delete Movie"
                            >
                                <DeleteOutlineRoundedIcon sx={{ fontSize: 20 }} />
                            </button>
                        </div>
                    )}
                    <div className="hidden lg:flex lg:w-1/3 bg-black h-full relative overflow-hidden items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0f0f0f] z-10"></div>
                        <div className="h-full w-full lg:w-3/4 flex items-center justify-center relative z-0">
                            <div className="w-full h-5/6 rounded-xl shadow-2xl overflow-hidden border border-gray-800 transform transition hover:scale-[1.02] duration-300">
                                <img
                                    src={movie?.poster_url}
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    onError={this.handleImageError}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-2/3 h-full relative overflow-hidden">
                        <div className="absolute inset-0 z-0">
                            <img
                                src={movie?.banner_url}
                                alt={movie.title}
                                className="w-full h-full object-cover object-top sm:object-center"
                                loading="lazy"
                                onError={this.handleImageError}
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/60 to-[#0f0f0f]/20"></div>
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0f0f0f]/20 to-[#0f0f0f] lg:hidden"></div>
                        </div>


                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12 z-10">
                            <div className="max-w-3xl">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-wide mb-2 sm:mb-4 leading-tight">
                                    {movie.title}
                                </h1>

                                <div className="flex flex-wrap items-center text-xs sm:text-sm md:text-base text-gray-300 mb-3 sm:mb-6 gap-2 sm:gap-4">
                                    <span className="font-medium text-white">{movie.release_year}</span>
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full hidden sm:block"></span>
                                    <span className="font-medium">{this.formatDuration(movie.duration)}</span>
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full hidden sm:block"></span>
                                    <div className="flex items-center">
                                        <span className="text-yellow-400 mr-1 text-sm sm:mr-1.5 sm:text-lg">★</span>
                                        <span className="font-bold">{this.formatRating(movie.rating)}</span>
                                    </div>
                                </div>


                                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-8">
                                    {Array.isArray(movie.genre) ? (
                                        movie.genre.map((genre: string, index: number) => (
                                            <span key={index}
                                                className="px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider rounded-full
                                                    bg-red-900/40 text-red-100 border border-red-800/50"
                                            >
                                                {genre}
                                            </span>
                                        ))
                                    ) : (
                                        <span
                                            className="px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider rounded-full
                                                bg-red-900/40 text-red-100 border border-red-800/50"
                                        >
                                            {movie.genre}
                                        </span>
                                    )}

                                    {(movie?.plan === 'gold' || movie?.plan === 'platinum') && (
                                        <span className={`bg-gradient-to-r ${movie.plan === 'gold'
                                            ? 'from-yellow-500 to-amber-600 text-black'
                                            : 'from-gray-400 to-gray-600 text-white'
                                            } px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider inline-flex items-center`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            {movie.plan === 'gold' ? 'Gold Plan' : 'Platinum Plan'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:mt-0 lg:mt-0 relative z-10">
                    <div className="bg-black/70 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-800/50 p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 shadow-xl">
                        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">

                            <div className="lg:w-2/3">
                                <div className="flex items-center mb-4 sm:mb-6">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Synopsis</h2>
                                    <div className="h-0.5 bg-red-800/30 flex-grow ml-4 sm:ml-6"></div>
                                </div>

                                <div className="text-gray-300 leading-relaxed text-base sm:text-lg">
                                    {movie.description}
                                </div>

                                <div className="mt-6 sm:mt-8">
                                    <div className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">Directed by</div>
                                    <div className="text-white text-base sm:text-lg font-medium">{movie.director}</div>
                                </div>
                            </div>

                            <div className="lg:w-1/3 mt-6 lg:mt-0 pt-6 lg:pt-0 border-t lg:border-t-0 border-gray-800/30 lg:border-l lg:border-gray-700/50 lg:pl-8">
                                <div className="flex items-center mb-4 sm:mb-6">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Details</h2>
                                    <div className="h-0.5 bg-red-800/30 flex-grow ml-4 sm:ml-6"></div>
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-gray-800/30">
                                        <span className="text-gray-400 text-sm sm:text-base">Release Year</span>
                                        <span className="text-white font-medium text-sm sm:text-base">{movie.release_year}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-gray-800/30">
                                        <span className="text-gray-400 text-sm sm:text-base">Duration</span>
                                        <span className="text-white font-medium text-sm sm:text-base">{this.formatDuration(movie.duration)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-gray-800/30">
                                        <span className="text-gray-400 text-sm sm:text-base">Director</span>
                                        <span className="text-white font-medium text-sm sm:text-base">{movie.director}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-gray-800/30">
                                        <span className="text-gray-400 text-sm sm:text-base">Genre</span>
                                        <span className="text-white font-medium truncate max-w-[120px] sm:max-w-[180px] text-sm sm:text-base">
                                            {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-1.5 sm:py-2">
                                        <span className="text-gray-400 text-sm sm:text-base">Rating</span>
                                        <div className="flex items-center">
                                            <span className="text-yellow-400 mr-1">★</span>
                                            <span className="text-white font-medium text-sm sm:text-base">{this.formatRating(movie.rating)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-12 sm:mb-16">
                        <div className="flex items-center mb-6 sm:mb-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-white">More Like This</h2>
                            <div className="h-0.5 bg-red-800/30 flex-grow ml-4 sm:ml-6"></div>
                        </div>


                        <div className="flex overflow-x-auto pb-4 sm:pb-6 gap-4 sm:gap-6 scrollbar-hide snap-x">
                            {this.state.similarMovie.map((movie: Movie, index: number) => (
                                <NavLink to={`/movie?id=${movie.id}`} key={index} className="flex-shrink-0 snap-start">
                                    <div className="w-36 sm:w-44 md:w-52 group cursor-pointer">
                                        <div className="w-full h-52 sm:h-64 md:h-72 bg-gray-800 rounded-lg overflow-hidden mb-2 sm:mb-3 border border-gray-700/50 shadow-lg transform transition-transform group-hover:scale-105">
                                            <img
                                                src={movie.poster_url}
                                                alt={movie.title}
                                                loading="lazy"
                                                className="w-full h-full object-cover"
                                                onError={this.handleImageError}
                                            />
                                        </div>
                                        <h4 className="text-white font-medium text-sm sm:text-base md:text-lg group-hover:text-red-500 transition-colors line-clamp-1">
                                            {movie.title}
                                        </h4>
                                        <div className="flex items-center text-xs sm:text-sm text-gray-400">
                                            <span>{movie.release_year}</span>
                                            <span className="mx-1 sm:mx-2">•</span>
                                            <span className="truncate">{movie.genre}</span>
                                        </div>
                                    </div>
                                </NavLink>
                            ))}

                            {this.state.similarMovie.length === 0 && (
                                <div className="w-full py-8 sm:py-10 text-center text-gray-500">
                                    No similar movies found
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Footer />
                <DeleteConfirmationAlert
                    open={this.state.showDeleteDialog}
                    onClose={() => this.setState({ showDeleteDialog: false })}
                    onConfirm={this.handleDelete}
                    movieTitle={movie.title}
                />
            </div>
        );
    }
}

export default WithRouter(WithReduxState(MovieDetail));