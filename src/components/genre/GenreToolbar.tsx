import React, { Component } from 'react';
import { motion } from 'framer-motion';

const genres = [
    { id: 0, name: "All" },
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 3, name: " Comedy" },
    { id: 4, name: "Drama" },
    { id: 5, name: "Horror" },
    { id: 6, name: "Romance" },
    { id: 7, name: "Sci-Fi" },
    { id: 8, name: " Thriller" },
    { id: 9, name: "Fantasy" },
]

const genreGradients: Record<string, string> = {
    "All": "from-blue-700/80 to-indigo-800/80",
    "Action": "from-red-700/80 to-red-900/80",
    "Adventure": "from-amber-600/80 to-orange-800/80",
    "Comedy": "from-yellow-600/80 to-amber-800/80",
    "Drama": "from-purple-700/80 to-purple-900/80",
    "Horror": "from-gray-800/80 to-black",
    "Romance": "from-pink-600/80 to-pink-800/80",
    "Sci-Fi": "from-cyan-600/80 to-blue-800/80",
    "Thriller": "from-red-800/80 to-red-950/80",
    "Fantasy": "from-green-600/80 to-green-800/80",
};

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
                    <div className="flex flex-col space-y-2 mb-6">
                        <h3 className="text-3xl font-sans tracking-wide text-white font-bold">Discover Films</h3>
                        <p className="text-gray-400 text-sm">Find movies from your favorite categories</p>
                    </div>
                )}

                <div className="bg-gray-900/40 backdrop-blur-sm rounded-xl p-0.5 border text-center border-gray-800/50 shadow-inner w-fit overflow-hidden">
                    <div className={`${isSearchMode ? 'flex flex-wrap gap-1 p-2'
                            : 'inline-flex flex-wrap items-center justify-center p-2 overflow-x-auto hide-scrollbar'}`}>
                        {genres.map((genre) => (
                            <motion.button
                                onClick={() => this.props.setSelectedGenre(genre.name)}
                                key={genre.id}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                className={`
                                    relative px-5 py-2.5 mx-1 my-1 font-medium text-sm rounded-md md:rounded-lg transition-all duration-300 ease-out ${selectedGenre === genre.name ? 'text-white shadow-lg' : 'bg-gray-800/40 text-gray-300 hover:text-white'} ${genre.name === 'All' && selectedGenre !== 'All' ? 'bg-gray-800/40 text-gray-400' : ''}
                                `}  >

                                {selectedGenre === genre.name && (
                                    <motion.div
                                        layoutId="selectedGenre"
                                        className={`absolute inset-0 bg-gradient-to-br ${genreGradients[genre.name]} rounded-md md:rounded-lg -z-10`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                    />
                                )}
                                <span className="relative z-10">{genre.name}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default GenreToolbar;
