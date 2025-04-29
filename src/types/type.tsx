export interface Movie {
    id: number;
    title: string;
    genre: string[];
    rating: string;
    description: string;
    release_year: string;
    director: string;
    duration: string;
    poster: string;
    coverimage: string;
    premium?: boolean;
}

export interface User {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
    phonenumber: string;
    subscribed?: boolean;
}