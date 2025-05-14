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



export interface ImageData {
    base64: string;
    filename: string;
    mimeType: string;
}

export interface FormData {
    title: string;
    genre: string;
    release_year: string;
    rating: string;
    director: string;
    duration: string;
    description: string;
    plan: string;
    poster: ImageData | null;
    coverimage: ImageData | null;
}

export interface Errors {
    title: string;
    genre: string;
    release_year: string;
    rating: string;
    director: string;
    duration: string;
    description: string;
    plan: string;
    poster: string;
    coverimage: string;
}

export interface MovieFormState {
    formData: FormData;
    errors: Errors;
    loading: boolean;
    submitting: boolean;
    isEditMode: boolean;
    movieId: number | null;
    mode: string | null
}

