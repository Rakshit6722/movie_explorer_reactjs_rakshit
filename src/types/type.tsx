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
    first_name: string;
    last_name: string;
    role: string;
    phonenumber: string;
    active_plan: string;
}


export interface Notification {
    id: string,
    title: string,
    body: string,
    timestamp: string,
    read: boolean,
    imageUrl?: string
}
