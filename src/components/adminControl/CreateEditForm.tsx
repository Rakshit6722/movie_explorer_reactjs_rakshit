import React, { Component } from 'react'
import { motion } from 'framer-motion';
import { Box, Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';


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

interface propType{
    loading: boolean;
    formData: any;
    submitting: boolean;
    handleFileChange: (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    isEditMode: boolean;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    errors: any;
    renderError: (field: string) => JSX.Element | null;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown; }>) => void;
    
}

export class CreateEditForm extends Component<propType> {
    render() {

        const { loading,
            formData,
            submitting,
            handleFileChange,
            isEditMode,
            handleSubmit,
            errors,
            renderError,
            handleInputChange, } = this.props

        if (loading) {
            return (
                <div className="flex items-center justify-center p-8 min-h-[60vh]">
                    <CircularProgress sx={{ color: '#f02c49' }} />
                    <span className="ml-2 text-white font-medium">Loading movie data...</span>
                </div>
            );
        }

        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e23145] via-black to-[#78121e]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-black/80 backdrop-blur-xl shadow-2xl p-10 w-full max-w-7xl mx-auto"
                >
                    <h2 className="font-anton text-3xl text-center tracking-wider mb-10 font-bold text-white drop-shadow-lg">
                        {isEditMode ? 'Edit Movie' : 'Add New Movie'}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <Box className="mb-8">
                            <h3 className="font-anton text-xl text-gray-300 mb-4">Movie Details</h3>
                            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 3 }} />

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                                <div className="flex flex-col gap-6">
                                    <StyledTextField
                                        fullWidth
                                        label="Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        margin="dense"
                                        error={!!errors.title}
                                    />
                                    {renderError('title')}

                                    <FormControl fullWidth margin="dense" error={!!errors.genre}>
                                        <InputLabel
                                            id="genre-label"
                                            sx={{
                                                color: 'rgba(255,255,255,0.7)',
                                                '&.Mui-focused': { color: '#f02c49' }
                                            }}
                                        >
                                            Genre
                                        </InputLabel>
                                        <Select
                                            labelId="genre-label"
                                            name="genre"
                                            value={formData.genre}
                                            onChange={handleInputChange}
                                            label="Genre"
                                            sx={{
                                                color: 'white',
                                                borderRadius: '8px',
                                                backgroundColor: 'rgba(20,20,20,0.85)',
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
                                            MenuProps={{
                                                PaperProps: {
                                                    sx: {
                                                        backgroundColor: 'rgba(20,20,20,0.97)',
                                                        color: 'white',
                                                        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.5)',
                                                        borderRadius: 2,
                                                    }
                                                }
                                            }}
                                        >
                                            <MenuItem value=""><em>Select Genre</em></MenuItem>
                                            <MenuItem value="Action">Action</MenuItem>
                                            <MenuItem value="Adventure">Adventure</MenuItem>
                                            <MenuItem value="Horror">Horror</MenuItem>
                                            <MenuItem value="Comedy">Comedy</MenuItem>
                                            <MenuItem value="Romance">Romance</MenuItem>
                                            <MenuItem value="Thriller">Thriller</MenuItem>
                                            <MenuItem value="Drama">Drama</MenuItem>
                                            <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
                                            <MenuItem value="Fantasy">Fantasy</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {renderError('genre')}
                                </div>

                                <div className="flex flex-col gap-6">
                                    <StyledTextField
                                        fullWidth
                                        label="Release Year"
                                        name="release_year"
                                        type="number"
                                        value={formData.release_year}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        margin="dense"
                                        error={!!errors.release_year}
                                    />
                                    {renderError('release_year')}

                                    <StyledTextField
                                        fullWidth
                                        label="Rating (0-10)"
                                        name="rating"
                                        type="number"
                                        inputProps={{ step: "0.1", min: "0", max: "10" }}
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        margin="dense"
                                        error={!!errors.rating}
                                    />
                                    {renderError('rating')}
                                </div>

                                <div className="flex flex-col gap-6">
                                    <StyledTextField
                                        fullWidth
                                        label="Director"
                                        name="director"
                                        value={formData.director}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        margin="dense"
                                        error={!!errors.director}
                                    />
                                    {renderError('director')}

                                    <StyledTextField
                                        fullWidth
                                        label="Duration (minutes)"
                                        name="duration"
                                        type="number"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        margin="dense"
                                        error={!!errors.duration}
                                    />
                                    {renderError('duration')}
                                </div>

                                <div className="flex flex-col gap-6">
                                    <FormControl fullWidth margin="dense" error={!!errors.plan}>
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
                                            onChange={handleInputChange}
                                            label="Plan"
                                            sx={{
                                                color: 'white',
                                                borderRadius: '8px',
                                                backgroundColor: 'rgba(20,20,20,0.85)',
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
                                            MenuProps={{
                                                PaperProps: {
                                                    sx: {
                                                        backgroundColor: 'rgba(20,20,20,0.97)',
                                                        color: 'white',
                                                        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.5)',
                                                        borderRadius: 2,
                                                    }
                                                }
                                            }}
                                        >
                                            <MenuItem value="basic">Basic (Free)</MenuItem>
                                            <MenuItem value="gold">Gold (Premium)</MenuItem>
                                            <MenuItem value="platinum">Platinum (Premium+)</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {renderError('plan')}
                                </div>
                            </div>

                            <div className="col-span-4 mb-8">
                                <StyledTextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="dense"
                                    multiline
                                    rows={3}
                                    error={!!errors.description}
                                />
                                {renderError('description')}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
                                            onChange={handleFileChange('poster')}
                                            accept="image/*"
                                        />
                                    </Button>
                                    {renderError('poster')}
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
                                            onChange={handleFileChange('coverimage')}
                                            accept="image/*"
                                        />
                                    </Button>
                                    {renderError('coverimage')}
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

export default CreateEditForm
