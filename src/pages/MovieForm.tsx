import React, { Component } from 'react';
import { addMovie, updateMovieDetails } from '../services/adminApi';
import { getMovieDetails } from '../services/movieApi';
import { toast } from 'react-toastify';
import { Errors, MovieFormState } from '../types/type';
import CreateEditForm from '../components/adminControl/CreateEditForm';
import WithRouter from '../components/hoc/WithRouter';


export class MovieForm extends Component<{
    navigate: (path: string) => void;
}, MovieFormState> {
    constructor(props: any) {
        super(props);

        const searchParams = new URLSearchParams(window.location.search)
        const mode = searchParams.get('mode')

        if (mode === 'add') {
            localStorage.removeItem('editMovieId');
        }

        const storedMovieId = localStorage.getItem('editMovieId');
        const isEditMode = !!storedMovieId;
        const movieId = storedMovieId ? parseInt(storedMovieId) : null;

        this.state = {
            formData: {
                title: '',
                genre: '',
                release_year: '',
                rating: '',
                director: '',
                duration: '',
                description: '',
                plan: 'basic',
                poster: null,
                coverimage: null
            },
            errors: {
                title: '',
                genre: '',
                release_year: '',
                rating: '',
                director: '',
                duration: '',
                description: '',
                plan: '',
                poster: '',
                coverimage: ''
            },
            loading: isEditMode,
            submitting: false,
            isEditMode,
            movieId,
            mode
        };
    }

    componentDidMount() {
        if (this.state.isEditMode && this.state.movieId) {
            this.fetchMovieData(this.state.movieId);
        }
    }


    fetchMovieData = async (movieId: number) => {
        try {
            this.setState({ loading: true });

            const response = await getMovieDetails(movieId);
            const movie = response.data;

            this.setState({
                formData: {
                    title: movie.title || '',
                    genre: movie.genre || '',
                    release_year: movie.release_year?.toString() || '',
                    rating: movie.rating?.toString() || '',
                    director: movie.director || '',
                    duration: movie.duration?.toString() || '',
                    description: movie.description || '',
                    plan: movie.premium ? 'gold' : 'basic',
                    poster: null,
                    coverimage: null
                },
                loading: false
            });

            if (movie.poster_url) {
                this.loadImageFromUrl(movie.poster_url, 'poster');
            }

            if (movie.banner_url) {
                this.loadImageFromUrl(movie.banner_url, 'coverimage');
            }

        } catch (error) {
            console.error('Error fetching movie data:', error);
            this.setState({ loading: false });
            toast.error('Failed to load movie data. Please try again.');
        }
    };

    loadImageFromUrl = async (url: string, fieldName: 'poster' | 'coverimage') => {
        if (!url) return;

        if (url.startsWith('http://res.cloudinary.com/')) {
            url = url.replace('http://', 'https://');
        }


        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const filename = url.split('/').pop() || 'image';
            const file = new File([blob], filename, { type: blob.type });

            this.setState(prevState => ({
                formData: {
                    ...prevState.formData,
                    [fieldName]: file
                }
            }));
        } catch (error) {
            console.error(`Error loading ${fieldName} image:`, error);
        }
    };

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            },
            errors: {
                ...prevState.errors,
                [name]: ''
            }
        }));
    };

    handleFileChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            this.setState(prevState => ({
                formData: {
                    ...prevState.formData,
                    [fieldName]: file
                },
                errors: {
                    ...prevState.errors,
                    [fieldName]: ''
                }
            }));
        }
    };

    validateForm = (): boolean => {
        const { formData, isEditMode } = this.state;
        const newErrors: Errors = {
            title: '',
            genre: '',
            release_year: '',
            rating: '',
            director: '',
            duration: '',
            description: '',
            plan: '',
            poster: '',
            coverimage: ''
        };
        let isValid = true;

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
            isValid = false;
        }

        if (!formData.genre.trim()) {
            newErrors.genre = 'Genre is required';
            isValid = false;
        }

        if (!formData.release_year) {
            newErrors.release_year = 'Release year is required';
            isValid = false;
        }

        if (!formData.rating) {
            newErrors.rating = 'Rating is required';
            isValid = false;
        } else if (parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 10) {
            newErrors.rating = 'Rating must be between 0 and 10';
            isValid = false;
        }

        if (!formData.director.trim()) {
            newErrors.director = 'Director is required';
            isValid = false;
        }

        if (!formData.duration) {
            newErrors.duration = 'Duration is required';
            isValid = false;
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
            isValid = false;
        }

        if (!formData.plan) {
            newErrors.plan = 'Plan selection is required';
            isValid = false;
        }

        if (!isEditMode) {
            if (!formData.poster) {
                newErrors.poster = 'Poster image is required';
                isValid = false;
            }

            if (!formData.coverimage) {
                newErrors.coverimage = 'Cover image is required';
                isValid = false;
            }
        }

        this.setState({ errors: newErrors });
        return isValid;
    };

    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        this.setState({ submitting: true });

        try {
            const { formData, isEditMode, movieId } = this.state;
            const submitData = new FormData();

            submitData.append('title', formData.title);
            submitData.append('genre', formData.genre);
            submitData.append('release_year', formData.release_year);
            submitData.append('rating', formData.rating);
            submitData.append('director', formData.director);
            submitData.append('duration', formData.duration);
            submitData.append('description', formData.description);
            submitData.append('plan', formData.plan);

            if (formData.poster instanceof File) {
                submitData.append('poster', formData.poster, formData.poster.name);
            }
            if (formData.coverimage instanceof File) {
                submitData.append('banner', formData.coverimage, formData.coverimage.name);
            }
            let response;

            if (isEditMode && movieId) {
                response = await updateMovieDetails(movieId, submitData);
                if (response) {
                    localStorage.removeItem('editMovieId')
                }
                toast.success('Movie updated successfully!');
            } else {
                response = await addMovie(submitData);
                toast.success('Movie created successfully!');
            }


            if (isEditMode) {
                localStorage.removeItem('editMovieId');
            }

            this.props.navigate('/');

        } catch (error: any) {
            console.error('Error submitting form:', error);
            toast.error(`Failed to ${this.state.isEditMode ? 'update' : 'create'} movie: ${error.response?.data?.message || error.message}`);
        } finally {
            this.setState({ submitting: false });
            this.setState({
                formData: {
                    title: '',
                    genre: '',
                    release_year: '',
                    rating: '',
                    director: '',
                    duration: '',
                    description: '',
                    plan: 'basic',
                    poster: null,
                    coverimage: null
                }
            })
        }
    };

    renderError = (fieldName: keyof Errors) => {
        const error = this.state.errors[fieldName];
        return error ? <p className="text-[#ff6b6b] text-xs mt-1">{error}</p> : null;
    };

    render() {
        const { formData, errors, loading, submitting, isEditMode } = this.state;

        return (
            <CreateEditForm
                formData={formData}
                errors={errors}
                loading={loading}
                submitting={submitting}
                renderError={this.renderError}
                isEditMode={isEditMode}
                handleSubmit={this.handleSubmit}
                handleInputChange={this.handleInputChange}
                handleFileChange={this.handleFileChange} />
        )
    }
}

export default WithRouter(MovieForm);