import { genreImages } from "../utils/loadImages";

export const genreBackgrounds = {
    "All": {
        gradient: "from-black/40 to-black/90",
        image: genreImages['All']
    },
    "Action": {
        gradient: "from-red-900/40 to-black/80", 
        image: genreImages['Action']
    },
    "Adventure": {
        gradient: "from-amber-900/40 to-black/80", 
        image: genreImages['Adventure']
    },
    " Comedy": {
        gradient: "from-yellow-800/40 to-black/80", 
        image: genreImages['Comedy']
    },
    "Drama": {
        gradient: "from-purple-900/40 to-black/80", 
        image: genreImages['Drama']
    },
    "Fantasy": {
        gradient: "from-blue-900/40 to-black/80", 
        image: genreImages['Fantasy']
    },
    "Horror": {
        gradient: "from-gray-900/40 to-black/90", 
        image: genreImages['Horror']
    },
    "Romance": {
        gradient: "from-pink-900/80 to-black/80", 
        image: genreImages['Romance']
    },
    "Sci-Fi": {
        gradient: "from-cyan-900/40 to-black/80", 
        image: genreImages['SciFi']
    },
    " Thriller": {
        gradient: "from-red-950/40 to-black/80", 
        image: genreImages['Thriller']
    }
};


export const genres = [
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

export const genreGradients: Record<string, string> = {
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
