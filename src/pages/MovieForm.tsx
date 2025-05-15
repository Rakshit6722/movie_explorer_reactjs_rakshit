import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { addMovie, updateMovieDetails } from '../services/adminApi';
import { getMovieDetails } from '../services/movieApi';
import { motion } from 'framer-motion';
import { Box, Divider } from '@mui/material';
import { toast } from 'react-toastify';
import { Errors, MovieFormState } from '../types/type';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const StyledTextField = styled(TextField)({
    '& .MuiInputLabel-root': {
        color: 'rgba(255,255,255,0.7)',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#f02c49',
    },
    '& .MuiInputBase-input': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#f02c49',
        },
    },
});

export class MovieForm extends Component<{}, MovieFormState> {
    constructor(props: {}) {
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

            submitData.forEach((value, key) => {
                console.log(key, value);
            }
            );
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

            window.location.href = '/home';

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
        const { formData, loading, submitting, isEditMode } = this.state;

        if (loading) {
            return (
                <div className="flex items-center justify-center p-8 min-h-[60vh]">
                    <CircularProgress sx={{ color: '#f02c49' }} />
                    <span className="ml-2 text-white font-medium">Loading movie data...</span>
                </div>
            );
        }

        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18122B] via-[#393053] to-[#635985]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/10 backdrop-blur-xl border border-gradient-to-r from-[#e23145] to-[#fbbf24] shadow-2xl p-8 rounded-2xl w-full max-w-3xl mx-auto"
                >
                    <h2 className="font-anton text-3xl mb-8 font-bold text-center bg-gradient-to-r from-[#e23145] to-[#fbbf24] bg-clip-text text-transparent drop-shadow-lg">
                        {isEditMode ? 'Edit Movie' : 'Add New Movie'}
                    </h2>

                    <form onSubmit={this.handleSubmit}>
                        <Box className="mb-8">
                            <h3 className="font-anton text-xl text-gray-300 mb-4">Movie Details</h3>
                            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 3 }} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <StyledTextField
                                        fullWidth
                                        label="Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={this.handleInputChange}
                                        variant="outlined"
                                        margin="dense"
                                        error={!!this.state.errors.title}
                                    />
                                    {this.renderError('title')}
                                </div>

                                <div>
                                    <StyledTextField
                                        fullWidth
                                        label="Genre"
                                        name="genre"
                                        value={formData.genre}
                                        onChange={this.handleInputChange}
                                        variant="outlined"
                                        margin="dense"
                                        error={!!this.state.errors.genre}
                                    />
                                    {this.renderError('genre')}
                                </div>

                                <div>
                                    <StyledTextField
                                        fullWidth
                                        label="Release Year"
                                        name="release_year"
                                        type="number"
                                        value={formData.release_year}
                                        onChange={this.handleInputChange}
                                        variant="outlined"
                                        margin="dense"
                                        error={!!this.state.errors.release_year}
                                    />
                                    {this.renderError('release_year')}
                                </div>

                                <div>
                                    <StyledTextField
                                        fullWidth
                                        label="Rating (0-10)"
                                        name="rating"
                                        type="number"
                                        inputProps={{ step: "0.1", min: "0", max: "10" }}
                                        value={formData.rating}
                                        onChange={this.handleInputChange}
                                        variant="outlined"
                                        margin="dense"
                                        error={!!this.state.errors.rating}
                                    />
                                    {this.renderError('rating')}
                                </div>

                                <div>
                                    <StyledTextField
                                        fullWidth
                                        label="Director"
                                        name="director"
                                        value={formData.director}
                                        onChange={this.handleInputChange}
                                        variant="outlined"
                                        margin="dense"
                                        error={!!this.state.errors.director}
                                    />
                                    {this.renderError('director')}
                                </div>

                                <div>
                                    <StyledTextField
                                        fullWidth
                                        label="Duration (minutes)"
                                        name="duration"
                                        type="number"
                                        value={formData.duration}
                                        onChange={this.handleInputChange}
                                        variant="outlined"
                                        margin="dense"
                                        error={!!this.state.errors.duration}
                                    />
                                    {this.renderError('duration')}
                                </div>

                                {/* Plan */}
                                <div>
                                    <FormControl fullWidth margin="dense" error={!!this.state.errors.plan}>
                                        <InputLabel id="plan-label"
                                            sx={{
                                                color: 'rgba(255,255,255,0.7)',
                                                '&.Mui-focused': {
                                                    color: '#f02c49'
                                                }
                                            }}>
                                            Plan
                                        </InputLabel>
                                        <Select
                                            labelId="plan-label"
                                            name="plan"
                                            value={formData.plan}
                                            onChange={this.handleInputChange}
                                            label="Plan"
                                            sx={{
                                                color: 'white',
                                                borderRadius: '8px',
                                                '.MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'rgba(255, 255, 255, 0.4)',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#f02c49',
                                                }
                                            }}
                                        >
                                            <MenuItem value="basic">Basic (Free)</MenuItem>
                                            <MenuItem value="gold">Gold (Premium)</MenuItem>
                                            <MenuItem value="platinum">Platinum (Premium+)</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {this.renderError('plan')}
                                </div>

                                <div className="md:col-span-2">
                                    <StyledTextField
                                        fullWidth
                                        label="Description"
                                        name="description"
                                        value={formData.description}
                                        onChange={this.handleInputChange}
                                        variant="outlined"
                                        margin="dense"
                                        multiline
                                        rows={3}
                                        error={!!this.state.errors.description}
                                    />
                                    {this.renderError('description')}
                                </div>
                            </div>
                        </Box>

                        <Box className="mb-8">
                            <h3 className="font-anton text-xl text-gray-300 mb-4">Movie Images</h3>
                            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 3 }} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="relative">
                                    <div className="flex items-center mb-2">
                                        <span className="text-white">Poster Image</span>
                                        <span className="text-[#f02c49] ml-1">*</span>
                                    </div>

                                    <div
                                        className={`mb-4 relative w-full h-56 rounded-lg overflow-hidden border-2 transition-all duration-300
                                        ${formData.poster
                                            ? 'border-[#e23145] bg-gradient-to-b from-[#fbbf24]/10 to-[#e23145]/10'
                                            : 'border-dashed border-[#e23145]/40 bg-white/5 hover:bg-white/10'}`}
                                    >
                                        {formData.poster ? (
                                            <>
                                                <img
                                                    src={URL.createObjectURL(formData.poster)}
                                                    alt="Poster Preview"
                                                    className="w-full h-full object-contain"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full">
                                                <p className="text-white/50 mb-2">No poster selected</p>
                                                <p className="text-xs text-gray-500">Recommended size: 300x450px</p>
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        component="label"
                                        variant="outlined"
                                        fullWidth
                                        sx={{
                                            textTransform: 'none',
                                            borderColor: 'rgba(255,255,255,0.3)',
                                            color: 'white',
                                            borderRadius: '8px',
                                            py: 1.2,
                                            '&:hover': {
                                                borderColor: '#f02c49',
                                                backgroundColor: 'rgba(240, 44, 73, 0.1)'
                                            }
                                        }}
                                    >
                                        {formData.poster ? 'Change Poster' : 'Upload Poster'}
                                        <VisuallyHiddenInput
                                            type="file"
                                            onChange={this.handleFileChange('poster')}
                                            accept="image/*"
                                        />
                                    </Button>

                                    {this.renderError('poster')}
                                    {formData.poster && (
                                        <p className="text-xs text-gray-400 mt-1 truncate">
                                            {formData.poster.name}
                                        </p>
                                    )}
                                </div>

                                <div className="relative">
                                    <div className="flex items-center mb-2">
                                        <span className="text-white">Banner Image</span>
                                        <span className="text-[#f02c49] ml-1">*</span>
                                    </div>

                                    <div
                                        className={`mb-4 relative w-full h-56 rounded-lg overflow-hidden border 
                                        ${formData.coverimage ? 'border-gray-600 bg-gradient-to-b from-gray-800 to-gray-900' :
                                                'border-dashed border-gray-600 bg-black/40'}`}
                                    >
                                        {formData.coverimage ? (
                                            <>
                                                <img
                                                    src={URL.createObjectURL(formData.coverimage)}
                                                    alt="Banner Preview"
                                                    className="w-full h-full object-contain"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full">
                                                <p className="text-white/50 mb-2">No banner selected</p>
                                                <p className="text-xs text-gray-500">Recommended size: 1280x720px</p>
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        component="label"
                                        variant="outlined"
                                        fullWidth
                                        sx={{
                                            textTransform: 'none',
                                            borderColor: 'rgba(255,255,255,0.3)',
                                            color: 'white',
                                            borderRadius: '8px',
                                            py: 1.2,
                                            '&:hover': {
                                                borderColor: '#f02c49',
                                                backgroundColor: 'rgba(240, 44, 73, 0.1)'
                                            }
                                        }}
                                    >
                                        {formData.coverimage ? 'Change Banner' : 'Upload Banner'}
                                        <VisuallyHiddenInput
                                            type="file"
                                            onChange={this.handleFileChange('coverimage')}
                                            accept="image/*"
                                        />
                                    </Button>

                                    {this.renderError('coverimage')}
                                    {formData.coverimage && (
                                        <p className="text-xs text-gray-400 mt-1 truncate">
                                            {formData.coverimage.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Box>

                        <motion.div
                            className="flex justify-end mt-8"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                                disabled={submitting}
                                sx={{
                                    background: 'linear-gradient(to right, #e23145, #78121e)',
                                    textTransform: 'none',
                                    minWidth: '140px',
                                    fontSize: '16px',
                                    py: 1.2,
                                    px: 4,
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(226, 49, 69, 0.3)',
                                    '&:hover': {
                                        background: 'linear-gradient(to right, #f04155, #8a1523)',
                                        boxShadow: '0 6px 16px rgba(226, 49, 69, 0.4)',
                                    }
                                }}
                            >
                                {submitting ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : isEditMode ? 'Update Movie' : 'Create Movie'}
                            </Button>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        );
    }
}

export default MovieForm;