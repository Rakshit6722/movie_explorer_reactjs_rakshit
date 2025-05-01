import React, { Component } from 'react';
import { Movie } from '../../types/type';

type Props = {
    movie: Movie
};

export class MainCarouselMovieCard extends Component<Props> {
    
    
    render() {
        let coverUrl = `https://movie-explorer-rorakshaykat2003-movie.onrender.com/${this.props.movie.poster_url}`
        let bannerUrl = `https://movie-explorer-rorakshaykat2003-movie.onrender.com/${this.props.movie.banner_url}`

        return (
            <div className="relative group w-full h-[400px] md:h-[570px] overflow-hidden shadow-lg bg-black">

                <div className="w-full h-full relative">
                    <img
                        src={bannerUrl}
                        alt={this.props.movie.title}
                        className="w-[100%] h-[100%] object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />


                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90"></div>
                </div>


                <div className="absolute bottom-6 left-16 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 z-10">

                    <div className="w-[130px] h-[190px] hidden md:block md:w-[160px] md:h-[230px] rounded-lg overflow-hidden shadow-lg">
                        <img
                            src={coverUrl}
                            alt={this.props.movie.title}
                            className="w-full h-full object-cover"
                        />
                    </div>


                    <div className="text-white space-y-5 max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-bold mb-3 
                                       bg-gradient-to-r from-white via-gray-200 to-gray-400 font-anton tracking-wider opacity-70 text-transparent bg-clip-text 
                                       drop-shadow-sm">
                            {this.props.movie.title}
                        </h2>
                        
                     
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-2">
                            <div className="flex flex-wrap gap-2"> 
                                    <span className="px-3 py-1 bg-red-900/30 border border-red-800/40 
                                                    text-red-100 rounded-full text-xs font-medium">
                                        {this.props.movie.genre}
                                    </span>

                                <span className="px-3 py-1 bg-gray-900/50 border border-gray-700/40 
                                               text-gray-300 rounded-full text-xs font-medium">
                                    {this.props.movie.release_year}
                                </span>
                            </div>
                            
              
                            <div className="flex items-center">
                                <div className="flex items-center justify-center bg-yellow-500/20 border border-yellow-500/30 
                                                rounded-lg px-3 py-1.5 text-yellow-400">
                                    <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                    <span className="font-bold text-sm">
                                        {this.props.movie.rating.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
{/*                       
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 max-w-lg">
                            {this.props.movie.description || "No description available for this title."}
                        </p> */}
                        
                     
                        <p className="text-gray-400 text-sm">
                            Director: <span className="text-gray-300 font-medium">{this.props.movie.director}</span>
                        </p>
                        
               
                        <div className="flex flex-wrap gap-4 mt-6 pt-2">
                            <button 
                                onClick={() => window.location.href = `/movie?id=${this.props.movie.id}`}
                                className="bg-[#f02c49] hover:bg-[#d0213b] transition-all px-7 py-3 
                                           rounded-full text-sm font-semibold flex items-center
                                           shadow-lg shadow-[#f02c49]/20 transform hover:scale-105">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                More Info
                            </button>
                            

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainCarouselMovieCard;
