import React, { Component } from 'react'

const genres = [
    { id: 0, name: "All" },
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 3, name: " Comedy" },
    { id: 4, name: "Drama" },
    { id: 5, name: "Fantasy" },
    { id: 6, name: "Horror" },
    { id: 7, name: "Mystery" },
    { id: 8, name: "Romance" },
    { id: 9, name: "Sci-Fi" },
    { id: 10, name: " Thriller" }
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
    type?: string;
    removeMargins?: boolean;
}

interface GenreToolbarState {

}

export class GenreToolbar extends Component<GenreToolbarProps, GenreToolbarState> {
    render() {
        const { selectedGenre, type, removeMargins = false } = this.props;
        const isSearchMode = type === 'search';

        return (
            <div className={`${isSearchMode && !removeMargins ? 'mt-4' : ''}`}>
                {!isSearchMode && (
                    <div className="flex flex-col space-y-2 mb-5">
                        <h3 className="text-4xl font-sans tracking-wide text-gray-300 font-bold">Discover Films</h3>
                        <p className="text-gray-400 italic text-sm font-light">Find movies from your favorite categories</p>
                    </div>
                )}
                <div className={`
                    ${isSearchMode ? 'flex flex-wrap gap-2' : 'flex space-x-4 py-2'} 
                    font-medium overflow-x-auto scrollbar-hide
                `}>
                    {genres.map((genre) => (
                        <button
                            onClick={() => this.props.setSelectedGenre(genre.name)}
                            key={genre.id}
                            className={`
                                ${isSearchMode 
                                  ? 'px-3 py-1 text-xs rounded-md transition-all'
                                  : 'px-4 py-2 text-sm rounded-full transition-all'
                                } 
                                ${selectedGenre === genre.name
                                  ? `${isSearchMode ? 'bg-gradient-to-r from-[#f02c49] to-[#f35174]' : ''} text-white font-medium`
                                  : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700/70'}
                            `}
                            style={!isSearchMode && selectedGenre === genre.name ? { backgroundColor: genreColors[genre.name] } : {}}
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
