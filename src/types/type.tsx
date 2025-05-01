export interface Movie {
    id: number;
    title: string;
    genre: string;
    rating: number;
    description: string;
    release_year: number;
    director: string;
    duration: number;
    poster_url: string;
    banner_url: string;
    plan?: 'basic' | 'gold' | 'platinum';
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