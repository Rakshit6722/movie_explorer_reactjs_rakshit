import React, { Component } from 'react';
import { TextField, Button } from '@mui/material';
import { creatMovieApi } from '../../../services/adminApi';

export class CreateMovieForm extends Component<any, any> {
    state = {

        title: '',
        genre: '',
        release_year: null,
        rating: null,
        director: '',
        duration: null,
        description: '',
        plan: '',
        poster: null,
        coverimage: null,
        posterName: '',
        coverimageName: '',
        
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
            coverimage: '',
        },
        formSubmitted: false, 
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        this.setState({ 
            [name]: value,
            errors: {
                ...this.state.errors,
                [name]: '' 
            } 
        });
    };

    handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            this.setState({ 
                [name]: files[0],
                [`${name}Name`]: files[0].name,
                errors: {
                    ...this.state.errors,
                    [name]: '' 
                }
            });
        }
    };

    validateForm = () => {
        const { title, genre, release_year, rating, director, duration, description, plan, poster, coverimage } = this.state;
        let isValid = true;
        const errors = { ...this.state.errors };

       
        if (!title || title.trim() === '') {
            errors.title = 'Title is required';
            isValid = false;
        } else if (title.length > 100) {
            errors.title = 'Title must be less than 100 characters';
            isValid = false;
        }

        if (!genre || genre.trim() === '') {
            errors.genre = 'Genre is required';
            isValid = false;
        }

        if (!release_year) {
            errors.release_year = 'Release year is required';
            isValid = false;
        } 
        if (!rating) {
            errors.rating = 'Rating is required';
            isValid = false;
        } else if (rating < 0 || rating > 10) {
            errors.rating = 'Rating must be between 0 and 10';
            isValid = false;
        }

        if (!director || director.trim() === '') {
            errors.director = 'Director is required';
            isValid = false;
        }

  
        if (!duration) {
            errors.duration = 'Duration is required';
            isValid = false;
        } else if (typeof duration === 'number' && (duration < 1 || duration > 600)) {
            errors.duration = 'Duration must be between 1 and 600 minutes';
            isValid = false;
        }

      
        if (!description || description.trim() === '') {
            errors.description = 'Description is required';
            isValid = false;
        }

       
        if (!plan || plan.trim() === '') {
            errors.plan = 'Plan is required';
            isValid = false;
        }

     
        if (!poster) {
            errors.poster = 'Poster image is required';
            isValid = false;
        }

      
        if (!coverimage) {
            errors.coverimage = 'Cover image is required';
            isValid = false;
        }

        this.setState({ errors });
        return isValid;
    };

    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        this.setState({ formSubmitted: true });
        
        const isValid = this.validateForm();
        if(!isValid){
            return;
        }

        console.log("form details", this.state)

        // const { title, genre, release_year, rating, director, duration, description, plan, poster, coverimage } = this.state;
        // const formData = new FormData();
        // formData.append('title', title);
        // formData.append('genre', genre);
        // formData.append('release_year', release_year);
        // formData.append('rating', parseFloat(rating));
        // formData.append('director', director);
        // formData.append('duration', duration);
        // formData.append('description', description);
        // formData.append('plan', plan);
        // formData.append('poster', poster);
        // formData.append('banner', coverimage);

        // await creatMovieApi(formData);
    };

    render() {
        const { title, genre, release_year, rating, director, duration, description, plan } = this.state;
        const { errors, formSubmitted } = this.state;

        const renderError = (field: keyof typeof this.state.errors) => {
            return errors[field] ? (
                <p className="text-[#ff6b6b] text-xs mt-1">{errors[field]}</p>
            ) : null;
        };

        return (
            <div
                className="bg-white/10 p-7 text-white rounded-lg w-full backdrop-blur-sm"
                style={{
                    maxWidth: '100%',
                    margin: '0 auto',
                    maxHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <h2 className="font-anton text-2xl tracking-wide mb-4 text-center relative">
                    <span className="relative z-10">Add Movie</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#e23145]/40 to-transparent h-[2px] bottom-0 w-40 mx-auto left-0 right-0"></span>
                </h2>
                <form onSubmit={this.handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  
                    <div className="flex flex-col">
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={title}
                            onChange={this.handleChange}
                            variant="outlined"
                            size="small"
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{ 
                                style: { color: 'white' },
                                sx: { '&:hover': { '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e23145' } } }
                            }}
                            error={!!errors.title}
                        />
                        {renderError('title')}
                    </div>

                    <div className="flex flex-col">
                        <TextField
                            fullWidth
                            label="Genre"
                            name="genre"
                            value={genre}
                            onChange={this.handleChange}
                            variant="outlined"
                            size="small"
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{ style: { color: 'white' } }}
                            error={!!errors.genre}
                        />
                        {renderError('genre')}
                    </div>

                    <div className="flex flex-col">
                        <TextField
                            fullWidth
                            label="Release Year"
                            name="release_year"
                            value={release_year || ''}
                            onChange={this.handleChange}
                            variant="outlined"
                            type="number"
                            size="small"
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{ style: { color: 'white' } }}
                            error={!!errors.release_year}
                        />
                        {renderError('release_year')}
                    </div>
                   
                    <div className="flex flex-col">
                        <TextField
                            fullWidth
                            label="Rating"
                            name="rating"
                            value={rating || ''}
                            onChange={this.handleChange}
                            variant="outlined"
                            type="string"
                            size="small"
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{ style: { color: 'white' } }}
                            error={!!errors.rating}
                        />
                        {renderError('rating')}
                    </div>

                    <div className="flex flex-col">
                        <TextField
                            fullWidth
                            label="Director"
                            name="director"
                            value={director}
                            onChange={this.handleChange}
                            variant="outlined"
                            size="small"
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{ style: { color: 'white' } }}
                            error={!!errors.director}
                        />
                        {renderError('director')}
                    </div>

                    <div className="flex flex-col">
                        <TextField
                            fullWidth
                            label="Duration (min)"
                            name="duration"
                            value={duration || ''}
                            onChange={this.handleChange}
                            variant="outlined"
                            type="number"
                            size="small"
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{ style: { color: 'white' } }}
                            error={!!errors.duration}
                        />
                        {renderError('duration')}
                    </div>

                    <div className="flex flex-col col-span-1 sm:col-span-1 lg:col-span-1">
                        <TextField
                            fullWidth
                            label="Plan"
                            name="plan"
                            value={plan}
                            onChange={this.handleChange}
                            variant="outlined"
                            size="small"
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{ style: { color: 'white' } }}
                            error={!!errors.plan}
                        />
                        {renderError('plan')}
                    </div>
                    
                    <div className="flex flex-col col-span-1 sm:col-span-1 lg:col-span-2">
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={description}
                            onChange={this.handleChange}
                            variant="outlined"
                            multiline
                            rows={2}
                            size="small"
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{ 
                                style: { color: 'white' },
                                sx: { '&:hover': { '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e23145' } } }
                            }}
                            error={!!errors.description}
                        />
                        {renderError('description')}
                    </div>

                   
                    <div className="col-span-1 sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-300 mb-1 font-medium">Poster Image</label>
                            <input
                                type="file"
                                name="poster"
                                accept="image/*"
                                onChange={this.handleFileChange}
                                className={`text-gray-300 text-sm w-full file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0 file:text-sm file:font-semibold
                                file:bg-[#e23145]/20 file:text-white hover:file:bg-[#e23145]/30 ${errors.poster ? 'border border-[#ff6b6b] rounded-md' : ''}`}
                            />
                            {renderError('poster')}
                            {this.state.posterName && (
                                <p className="text-sm text-gray-300 mt-1 truncate">
                                    Selected: {this.state.posterName}
                                </p>
                            )}
                        </div>
                        
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-300 mb-1 font-medium">Cover Image</label>
                            <input
                                type="file"
                                name="coverimage"
                                accept="image/*"
                                onChange={this.handleFileChange}
                                className={`text-gray-300 text-sm w-full file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0 file:text-sm file:font-semibold
                                file:bg-[#e23145]/20 file:text-white hover:file:bg-[#e23145]/30 ${errors.coverimage ? 'border border-[#ff6b6b] rounded-md' : ''}`}
                            />
                            {renderError('coverimage')}
                            {this.state.coverimageName && (
                                <p className="text-sm text-gray-300 mt-1 truncate">
                                    Selected: {this.state.coverimageName}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            style={{
                                background: 'linear-gradient(to right, #e23145, #a8182e)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontFamily: 'Anton, sans-serif',
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                                padding: '8px 0',
                            }}
                        >
                            Add Movie
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateMovieForm;
