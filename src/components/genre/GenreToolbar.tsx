import React, { Component } from 'react'


const genres = [
    { id: 0, name: "All" },
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 3, name: "Comedy" },
    { id: 4, name: "Drama" },
    { id: 5, name: "Fantasy" },
    { id: 6, name: "Horror" },
    { id: 7, name: "Mystery" },
    { id: 8, name: "Romance" },
    { id: 9, name: "Sci-Fi" },
    { id: 10, name: "Thriller" }
]

const genreColors: Record<string, string> = {
    "All": "#4FD1C5",
    "Action": "#E53E3E",
    "Adventure": "#DD6B20",
    "Comedy": "#F6E05E",
    "Drama": "#805AD5",
    "Fantasy": "#4FD1C5",
    "Horror": "#1A202C",
    "Mystery": "#2C5282",
    "Romance": "#ED64A6",
    "Sci-Fi": "#38B2AC",
    "Thriller": "#9B2C2C"
}

interface GenreToolbarProps {
    selectedGenre: string;
    setSelectedGenre: (genre: string) => void;
}

interface GenreToolbarState {

}


export class GenreToolbar extends Component<GenreToolbarProps, GenreToolbarState> {


    render() {
        const { selectedGenre } = this.props;

        return (
            <div>
                <div className="flex flex-col space-y-2 mb-5">
                    <h3 className="text-4xl font-sans tracking-wide text-gray-300 font-bold  ">Browse by Genre</h3>
                    <p className="text-gray-400 italic text-sm font-light">Find movies from your favorite categories</p>
                </div>

                <div className="flex font-anton tracking-wide space-x-4 overflow-x-auto scrollbar-hide py-2">
                    {genres.map((genre) => (
                        <button
                            onClick={() => this.props.setSelectedGenre(genre.name)}
                            key={genre.id}
                            style={selectedGenre === genre.name ? { backgroundColor: genreColors[genre.name] } : {}}
                            className={`px-4 tracking-wider py-2 rounded-full md:text-lg font-medium transition-all duration-300
                ${selectedGenre === genre.name
                                    ? 'text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'}
              `}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>
            </div>
        )
    }
}

export default GenreToolbar
