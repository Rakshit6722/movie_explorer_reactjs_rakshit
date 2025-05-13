import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { creatMovieApi } from '../../../services/adminApi';
import WithRouter from '../../hoc/WithRouter';
import axios from 'axios';


interface ImageData {
  base64: string;
  filename: string;
  mimeType: string;
}

interface FormData {
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

interface Errors {
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

const ImagePreview = ({ imageFile, onImageChange, label, name, error }: {
  imageFile: ImageData | null;
  onImageChange: (name: string, data: ImageData) => void;
  label: string;
  name: string;
  error: string;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile?.base64) {
      setPreviewUrl(imageFile.base64);
    }
  }, [imageFile]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const resizedImage = await resizeImage(file, 800, 800);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const base64 = reader.result.toString();
          onImageChange(name, {
            base64,
            filename: file.name,
            mimeType: file.type
          });
          setPreviewUrl(base64);
        }
      };
      reader.readAsDataURL(resizedImage);
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-300 mb-1 font-medium">{label}</label>
      <div className="relative group h-40 border border-gray-700 rounded-lg overflow-hidden bg-gray-900/30">
        {previewUrl ? (
          <img src={previewUrl} alt={label} className="w-full h-full object-contain" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <span>No image selected</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-sm font-medium">
            {previewUrl ? "Change Image" : "Select Image"}
          </span>
        </div>
        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      {error && <p className="text-[#ff6b6b] text-xs mt-1">{error}</p>}
      {imageFile?.filename && (
        <p className="text-sm text-gray-300 mt-1 truncate">Selected: {imageFile.filename}</p>
      )}
    </div>
  );
};

// Image resizing function
const resizeImage = async (file: File, maxWidth: number, maxHeight: number, quality = 0.8): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = image;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");

      if (context) {
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        canvas.toBlob(
          (blob) => blob ? resolve(blob) : reject(new Error("Failed to create blob")),
          file.type,
          quality
        );
      } else {
        reject(new Error("Failed to get canvas context"));
      }
    };

    image.onerror = () => reject(new Error("Failed to load image"));
  });
};

// Base64 to Blob conversion
const base64ToBlob = (base64: string, mimeType: string): Blob | null => {
  try {
    const split = base64.split(",");
    if (split.length < 2) return null;

    const byteCharacters = atob(split[1]);
    const byteArrays: Uint8Array[] = [];
    const sliceSize = 512;

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length).fill(0).map((_, i) => slice.charCodeAt(i));
      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays as BlobPart[], { type: mimeType });
  } catch (error) {
    console.error("Error converting base64 to blob:", error);
    return null;
  }
};

const CreateMovieForm = (props: any) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    genre: '',
    release_year: '',
    rating: '',
    director: '',
    duration: '',
    description: '',
    plan: '',
    poster: null,
    coverimage: null
  });

  const [errors, setErrors] = useState<Errors>({
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
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (name: string, data: ImageData) => {
    setFormData(prev => ({ ...prev, [name]: data }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = { ...errors };
    let isValid = true;

    const validations: Array<{
      field: keyof FormData;
      validate: (value: any) => string | null;
    }> = [
        {
          field: 'title',
          validate: (value) => !value.trim() ? 'Title is required' :
            value.length > 100 ? 'Title must be less than 100 characters' : null
        },
        { field: 'genre', validate: (value) => !value.trim() ? 'Genre is required' : null },
        { field: 'release_year', validate: (value) => !value ? 'Release year is required' : null },
        {
          field: 'rating',
          validate: (value) => !value ? 'Rating is required' :
            (parseFloat(value) < 0 || parseFloat(value) > 10) ? 'Rating must be between 0 and 10' : null
        },
        { field: 'director', validate: (value) => !value.trim() ? 'Director is required' : null },
        {
          field: 'duration',
          validate: (value) => !value ? 'Duration is required' :
            (parseFloat(value) < 1 || parseFloat(value) > 600) ? 'Duration must be between 1 and 600 minutes' : null
        },
        { field: 'description', validate: (value) => !value.trim() ? 'Description is required' : null },
        { field: 'plan', validate: (value) => !value.trim() ? 'Plan is required' : null },
        { field: 'poster', validate: (value) => !value ? 'Poster image is required' : null },
        { field: 'coverimage', validate: (value) => !value ? 'Cover image is required' : null }
      ];

    validations.forEach(({ field, validate }) => {
      const error = validate(formData[field]);
      newErrors[field] = error || '';
      if (error) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setFormSubmitted(true);

  //   if (!validateForm()) return;

  //   const submitData = new FormData();
  //   const fields: Array<keyof FormData> = [
  //     'title', 'genre', 'release_year', 'rating',
  //     'director', 'duration', 'description', 'plan'
  //   ];

  //   fields.forEach(field => submitData.append(field, formData[field] || ''));

  //   const appendImage = (field: 'poster' | 'coverimage', key: string) => {
  //     const imageData = formData[field];
  //     if (imageData) {
  //       const blob = base64ToBlob(imageData.base64, imageData.mimeType);
  //       if (blob) {
  //         submitData.append(key, blob, imageData.filename);
  //       }
  //     }
  //   };

  //   appendImage('poster', 'poster');
  //   appendImage('coverimage', 'banner');

  //   try {
  //     const result = await creatMovieApi(submitData, props.dispatch);
  //     console.log("API response:", result);
  //   } catch (error: any) {
  //     console.error("API error:", error.response?.data || error.message);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', 'The Great Adventure');
      formData.append('genre', 'Action');
      formData.append('release_year', "2023");
      formData.append('rating', "8.8");
      formData.append('director', 'Jane Doe');
      formData.append('duration', "120");
      formData.append('description', 'An epic tale of courage and discovery in a fantastical world.');
      formData.append('plan', 'platinum');
      formData.append('poster', new File(['dummy poster content'], 'poster.jpg', { type: 'image/jpeg' }));
      formData.append('banner', new File(['dummy banner content'], 'banner.jpg', { type: 'image/jpeg' }));


      const response = await axios.post(`https://movie-explorer-rorakshaykat2003-movie.onrender.com/api/v1/movies`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("response", response)
    } catch (error: any) {
      console.error('Error creating movie:', error.response?.data);
      throw error.response?.data?.errors || 'Failed to create movie';
    }
  };



  const renderError = (field: keyof Errors) => (
    errors[field] ? <p className="text-[#ff6b6b] text-xs mt-1">{errors[field]}</p> : null
  );

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
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="flex flex-col">
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
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
            value={formData.genre}
            onChange={handleChange}
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
            value={formData.release_year}
            onChange={handleChange}
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
            value={formData.rating}
            onChange={handleChange}
            variant="outlined"
            type="number"
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
            value={formData.director}
            onChange={handleChange}
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
            value={formData.duration}
            onChange={handleChange}
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
            select
            fullWidth
            label="Plan"
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            variant="outlined"
            size="small"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
            error={!!errors.plan}
          >
            <MenuItem value="basic">Basic</MenuItem>
            <MenuItem value="gold">Gold</MenuItem>
            <MenuItem value="platinum">Platinum</MenuItem>
          </TextField>
          {renderError('plan')}
        </div>

        <div className="flex flex-col col-span-1 sm:col-span-2 lg:col-span-2">
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
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
          <ImagePreview
            imageFile={formData.poster}
            onImageChange={handleFileChange}
            label="Poster Image"
            name="poster"
            error={errors.poster}
          />
          <ImagePreview
            imageFile={formData.coverimage}
            onImageChange={handleFileChange}
            label="Cover Image"
            name="coverimage"
            error={errors.coverimage}
          />
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
};

export default WithRouter(CreateMovieForm);