import React, { Component } from 'react';

type Props = {
    movie: {
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
    };
};

export class MainCarouselMovieCard extends Component<Props> {
    render() {
        return (
            <div className="relative group w-full h-[400px] md:h-[570px] overflow-hidden shadow-lg bg-black">

                <div className="w-full h-full relative">
                    <img
                        src={this.props.movie.coverimage || this.props.movie.poster}
                        alt={this.props.movie.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />


                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90"></div>
                </div>


                <div className="absolute bottom-6 left-16 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 z-10">

                    <div className="w-[130px] h-[190px] hidden md:block md:w-[160px] md:h-[230px] rounded-lg overflow-hidden shadow-lg">
                        <img
                            src={this.props.movie.poster}
                            alt={this.props.movie.title}
                            className="w-full h-full object-cover"
                        />
                    </div>


                    <div className="text-white space-y-4 group">
                        <h2 className="text-2xl tracking-wide md:text-4xl text-gray-300 font-bold mb-2">
                            {this.props.movie.title}
                        </h2>
                        <p className="text-gray-300 text-sm">
                            {`${this.props.movie.release_year} • ${this.props.movie.genre.join(', ')} • ${this.props.movie.duration}`}
                        </p>
                        <p className="text-gray-400 text-sm mb-4">
                            {`Rating: ${this.props.movie.rating}`}
                        </p>


                        <button className="bg-[#f02c49] hover:bg-[#d0213b] transition-colors px-6 py-3 opacity-0 group-hover:opacity-100 rounded-full text-sm font-semibold w-full md:w-auto">
                            More Info
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainCarouselMovieCard;
