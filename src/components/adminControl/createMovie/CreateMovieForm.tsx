// import React, { useState } from 'react';
// import { TextField, Button, MenuItem } from '@mui/material'; // Add MenuItem import
// import { creatMovieApi } from '../../../services/adminApi';
// import WithRouter from '../../hoc/WithRouter';

// // Image Preview Component
// const ImagePreview = ({ imageFile, onImageChange, label, name, error }: any) => {
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   // Update preview when file changes
//   React.useEffect(() => {
//     if (typeof imageFile === 'string') {
//       setPreviewUrl(imageFile);
//     } else if (imageFile instanceof File) {
//       const url = URL.createObjectURL(imageFile);
//       setPreviewUrl(url);
//       return () => URL.revokeObjectURL(url);
//     }
//   }, [imageFile]);

//   const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       try {
//         // Store the original filename
//         const originalFilename = file.name;
        
//         // First resize the image
//         const resizedImage = await resizeImage(file, 800, 800);
        
//         // Convert resized blob to base64
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           // Set preview and pass both base64 string and filename
//           if (reader.result) {
//             setPreviewUrl(reader.result.toString());
//             onImageChange(name, {
//               base64: reader.result.toString(),
//               filename: originalFilename,
//               type: file.type
//             });
//           }
//         };
//         reader.readAsDataURL(resizedImage);
//       } catch (error) {
//         console.error("Error processing image:", error);
//       }
//     }
//   };

//   // Rest of component remains the same
//   return (
//     <div className="flex flex-col">
//       <label className="text-sm text-gray-300 mb-1 font-medium">{label}</label>
//       <div className="relative group h-40 border border-gray-700 rounded-lg overflow-hidden bg-gray-900/30">
//         {previewUrl ? (
//           <img 
//             src={previewUrl} 
//             alt={label} 
//             className="w-full h-full object-contain" 
//           />
//         ) : (
//           <div className="absolute inset-0 flex items-center justify-center text-gray-500">
//             <span>No image selected</span>
//           </div>
//         )}
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//           <span className="text-white text-sm font-medium">
//             {previewUrl ? "Change Image" : "Select Image"}
//           </span>
//         </div>
//         <input
//           type="file"
//           name={name}
//           accept="image/*"
//           onChange={handleImageChange}
//           className="absolute inset-0 opacity-0 cursor-pointer"
//         />
//       </div>
//       {error && <p className="text-[#ff6b6b] text-xs mt-1">{error}</p>}
//       {imageFile && typeof imageFile === 'object' && (
//         <p className="text-sm text-gray-300 mt-1 truncate">
//           Selected: {imageFile.name}
//         </p>
//       )}
//     </div>
//   );
// };

// // Image resizing function
// const resizeImage = async (
//   file: File, 
//   maxWidth: number, 
//   maxHeight: number, 
//   quality = 0.8
// ): Promise<Blob> => {
//   return new Promise((resolve, reject) => {
//     const image = new Image();
//     image.src = URL.createObjectURL(file);
    
//     image.onload = () => {
//       const canvas = document.createElement("canvas");
//       let width = image.width;
//       let height = image.height;

//       // Determine scaling factor while keeping aspect ratio
//       if (width > height) {
//         if (width > maxWidth) {
//           height *= maxWidth / width;
//           width = maxWidth;
//         }
//       } else {
//         if (height > maxHeight) {
//           width *= maxHeight / height;
//           height = maxHeight;
//         }
//       }

//       canvas.width = width;
//       canvas.height = height;
//       const context = canvas.getContext("2d");
      
//       if (context) {
//         context.clearRect(0, 0, width, height);
//         context.drawImage(image, 0, 0, width, height);
//       }

//       // Convert the canvas to a Blob with reduced quality
//       canvas.toBlob(
//         (blob: Blob | null) => {
//           if (blob) {
//             resolve(blob);
//           } else {
//             reject(new Error("Failed to create blob"));
//           }
//         },
//         file.type,
//         quality
//       );
//     };
    
//     image.onerror = reject;
//   });
// };

// const base64ToBlob = (base64: string, mimeType: string = "image/jpeg") => {
//   try {
//     // Check if the base64 string is valid and has data
//     const split = base64?.split(",");
//     if (!split || split.length < 2) {
//       console.error("Invalid base64 string format");
//       return null;
//     }

//     // Get the base64 content (after the comma)
//     const byteCharacters = atob(split[1]);
    
//     // Convert to byte array
//     const byteArrays = [];
//     const sliceSize = 512;
    
//     for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//       const slice = byteCharacters.slice(offset, offset + sliceSize);
//       const byteNumbers = new Array(slice.length);
      
//       for (let i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//       }
      
//       byteArrays.push(new Uint8Array(byteNumbers));
//     }
    
//     // Create and return the blob with the correct MIME type
//     return new Blob(byteArrays, { type: mimeType });
//   } catch (error) {
//     console.error("Error converting base64 to blob:", error);
//     return null;
//   }
// };

// const CreateMovieForm = (props: any) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     genre: '',
//     release_year: '',
//     rating: '',
//     director: '',
//     duration: '',
//     description: '',
//     plan: '',
//     poster: null as null | string | { base64: string, filename: string, type: string },
//     coverimage: null as null | string | { base64: string, filename: string, type: string }
//   });

//   const [errors, setErrors] = useState({
//     title: '',
//     genre: '',
//     release_year: '',
//     rating: '',
//     director: '',
//     duration: '',
//     description: '',
//     plan: '',
//     poster: '',
//     coverimage: ''
//   });

//   const [formSubmitted, setFormSubmitted] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//     setErrors(prevErrors => ({
//       ...prevErrors,
//       [name]: ''
//     }));
//   };

//   // Updated handleFileChange to handle base64 strings
//   const handleFileChange = (name: string, base64String: string) => {
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: base64String
//     }));
//     setErrors(prevErrors => ({
//       ...prevErrors,
//       [name]: ''
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = { ...errors };
//     let isValid = true;

//     if (!formData.title || formData.title.trim() === '') {
//       newErrors.title = 'Title is required';
//       isValid = false;
//     } else if (formData.title.length > 100) {
//       newErrors.title = 'Title must be less than 100 characters';
//       isValid = false;
//     }

//     if (!formData.genre || formData.genre.trim() === '') {
//       newErrors.genre = 'Genre is required';
//       isValid = false;
//     }

//     if (!formData.release_year) {
//       newErrors.release_year = 'Release year is required';
//       isValid = false;
//     }

//     if (!formData.rating) {
//       newErrors.rating = 'Rating is required';
//       isValid = false;
//     } else if (parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 10) {
//       newErrors.rating = 'Rating must be between 0 and 10';
//       isValid = false;
//     }

//     if (!formData.director || formData.director.trim() === '') {
//       newErrors.director = 'Director is required';
//       isValid = false;
//     }

//     if (!formData.duration) {
//       newErrors.duration = 'Duration is required';
//       isValid = false;
//     } else if (parseFloat(formData.duration) < 1 || parseFloat(formData.duration) > 600) {
//       newErrors.duration = 'Duration must be between 1 and 600 minutes';
//       isValid = false;
//     }

//     if (!formData.description || formData.description.trim() === '') {
//       newErrors.description = 'Description is required';
//       isValid = false;
//     }

//     if (!formData.plan || formData.plan.trim() === '') {
//       newErrors.plan = 'Plan is required';
//       isValid = false;
//     }

//     if (!formData.poster) {
//       newErrors.poster = 'Poster image is required';
//       isValid = false;
//     }

//     if (!formData.coverimage) {
//       newErrors.coverimage = 'Cover image is required';
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   // Updated submission handler
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormSubmitted(true);
    
//     if (!validateForm()) return;

//     const submitData = new FormData();

//     // Add text fields
//     submitData.append('title', formData.title || '');
//     submitData.append('genre', formData.genre || '');
//     submitData.append('release_year', formData.release_year || '');
//     submitData.append('rating', formData.rating || '');
//     submitData.append('director', formData.director || '');
//     submitData.append('duration', formData.duration || '');
//     submitData.append('description', formData.description || '');
//     submitData.append('plan', formData.plan || 'basic');

//     // Handle poster image
//     if (formData.poster && typeof formData.poster === 'object') {
//       try {
//         const posterData = formData.poster;
//         const mimeType = posterData.base64.match(/^data:(.*?);base64,/)?.[1] || posterData.type;
//         const posterBlob = base64ToBlob(posterData.base64, mimeType);
        
//         if (posterBlob) {
//           // Use original filename
//           submitData.append('poster', posterBlob, posterData.filename);
//         }
//       } catch (error) {
//         console.error("Error processing poster:", error);
//       }
//     }
    
//     // Handle banner image
//     if (formData.coverimage && typeof formData.coverimage === 'object') {
//       try {
//         const coverData = formData.coverimage;
//         const mimeType = coverData.base64.match(/^data:(.*?);base64,/)?.[1] || coverData.type;
//         const bannerBlob = base64ToBlob(coverData.base64, mimeType);
        
//         if (bannerBlob) {
//           // Use original filename
//           submitData.append('banner', bannerBlob, coverData.filename);
//         }
//       } catch (error) {
//         console.error("Error processing cover:", error);
//       }
//     }

//     // Log what's being sent
//     console.log("Form data entries:");
//     for (const [key, value] of submitData.entries()) {
//       console.log(`${key}: ${value instanceof Blob ? `Blob (${value.size} bytes)` : value}`);
//     }

//     try {
//       const result = await creatMovieApi(submitData, props.dispatch);
//       console.log("API response:", result);
//     } catch (error) {
//       console.error("API error:", error.response?.data || error.message);
//     }
//   };

//   // Render error helper
//   const renderError = (field: keyof typeof errors) => {
//     return errors[field] ? (
//       <p className="text-[#ff6b6b] text-xs mt-1">{errors[field]}</p>
//     ) : null;
//   };

//   return (
//     <div
//       className="bg-white/10 p-7 text-white rounded-lg w-full backdrop-blur-sm"
//       style={{
//         maxWidth: '100%',
//         margin: '0 auto',
//         maxHeight: '80vh',
//         display: 'flex',
//         flexDirection: 'column',
//         boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
//         border: '1px solid rgba(255, 255, 255, 0.1)',
//       }}
//     >
//       <h2 className="font-anton text-2xl tracking-wide mb-4 text-center relative">
//         <span className="relative z-10">Add Movie</span>
//         <span className="absolute inset-0 bg-gradient-to-r from-[#e23145]/40 to-transparent h-[2px] bottom-0 w-40 mx-auto left-0 right-0"></span>
//       </h2>
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//         <div className="flex flex-col">
//           <TextField
//             fullWidth
//             label="Title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             variant="outlined"
//             size="small"
//             InputLabelProps={{ style: { color: 'white' } }}
//             InputProps={{ 
//               style: { color: 'white' },
//               sx: { '&:hover': { '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e23145' } } }
//             }}
//             error={!!errors.title}
//           />
//           {renderError('title')}
//         </div>

//         <div className="flex flex-col">
//           <TextField
//             fullWidth
//             label="Genre"
//             name="genre"
//             value={formData.genre}
//             onChange={handleChange}
//             variant="outlined"
//             size="small"
//             InputLabelProps={{ style: { color: 'white' } }}
//             InputProps={{ style: { color: 'white' } }}
//             error={!!errors.genre}
//           />
//           {renderError('genre')}
//         </div>

//         <div className="flex flex-col">
//           <TextField
//             fullWidth
//             label="Release Year"
//             name="release_year"
//             value={formData.release_year}
//             onChange={handleChange}
//             variant="outlined"
//             type="number"
//             size="small"
//             InputLabelProps={{ style: { color: 'white' } }}
//             InputProps={{ style: { color: 'white' } }}
//             error={!!errors.release_year}
//           />
//           {renderError('release_year')}
//         </div>
       
//         <div className="flex flex-col">
//           <TextField
//             fullWidth
//             label="Rating"
//             name="rating"
//             value={formData.rating}
//             onChange={handleChange}
//             variant="outlined"
//             type="string"
//             size="small"
//             InputLabelProps={{ style: { color: 'white' } }}
//             InputProps={{ style: { color: 'white' } }}
//             error={!!errors.rating}
//           />
//           {renderError('rating')}
//         </div>

//         <div className="flex flex-col">
//           <TextField
//             fullWidth
//             label="Director"
//             name="director"
//             value={formData.director}
//             onChange={handleChange}
//             variant="outlined"
//             size="small"
//             InputLabelProps={{ style: { color: 'white' } }}
//             InputProps={{ style: { color: 'white' } }}
//             error={!!errors.director}
//           />
//           {renderError('director')}
//         </div>

//         <div className="flex flex-col">
//           <TextField
//             fullWidth
//             label="Duration (min)"
//             name="duration"
//             value={formData.duration}
//             onChange={handleChange}
//             variant="outlined"
//             type="number"
//             size="small"
//             InputLabelProps={{ style: { color: 'white' } }}
//             InputProps={{ style: { color: 'white' } }}
//             error={!!errors.duration}
//           />
//           {renderError('duration')}
//         </div>

//         <div className="flex flex-col col-span-1 sm:col-span-1 lg:col-span-1">
//           <TextField
//             select
//             fullWidth
//             label="Plan"
//             name="plan"
//             value={formData.plan}
//             onChange={handleChange}
//             variant="outlined"
//             size="small"
//             InputLabelProps={{ style: { color: 'white' } }}
//             InputProps={{ style: { color: 'white' } }}
//             error={!!errors.plan}
//           >
//             <MenuItem value="basic">Basic</MenuItem>
//             <MenuItem value="gold">Gold</MenuItem>
//             <MenuItem value="platinum">Platinum</MenuItem>
//           </TextField>
//           {renderError('plan')}
//         </div>
        
//         <div className="flex flex-col col-span-1 sm:col-span-1 lg:col-span-2">
//           <TextField
//             fullWidth
//             label="Description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             variant="outlined"
//             multiline
//             rows={2}
//             size="small"
//             InputLabelProps={{ style: { color: 'white' } }}
//             InputProps={{ 
//               style: { color: 'white' },
//               sx: { '&:hover': { '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e23145' } } }
//             }}
//             error={!!errors.description}
//           />
//           {renderError('description')}
//         </div>

//         {/* Image uploads with preview */}
//         <div className="col-span-1 sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
//           <ImagePreview 
//             imageFile={formData.poster}
//             onImageChange={handleFileChange}
//             label="Poster Image"
//             name="poster"
//             error={errors.poster}
//           />
          
//           <ImagePreview 
//             imageFile={formData.coverimage}
//             onImageChange={handleFileChange}
//             label="Cover Image"
//             name="coverimage"
//             error={errors.coverimage}
//           />
//         </div>

//         <div className="col-span-1 sm:col-span-2 lg:col-span-3">
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             style={{
//               background: 'linear-gradient(to right, #e23145, #a8182e)',
//               textTransform: 'uppercase',
//               letterSpacing: '1px',
//               fontFamily: 'Anton, sans-serif',
//               boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
//               padding: '8px 0',
//             }}
//           >
//             Add Movie
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default WithRouter(CreateMovieForm);

import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material'; // Add MenuItem import
import { creatMovieApi } from '../../../services/adminApi';
import WithRouter from '../../hoc/WithRouter';

// Image Preview Component
const ImagePreview = ({ imageFile, onImageChange, label, name, error }: any) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Update preview when file changes
  React.useEffect(() => {
    if (typeof imageFile === 'string') {
      setPreviewUrl(imageFile);
    } else if (imageFile instanceof File) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // Store the original filename
        const originalFilename = file.name;
        
        // First resize the image
        const resizedImage = await resizeImage(file, 800, 800);
        
        // Convert resized blob to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          // Set preview and pass both base64 string and filename
          if (reader.result) {
            setPreviewUrl(reader.result.toString());
            onImageChange(name,reader?.result?.toString());
          }
        };
        reader.readAsDataURL(resizedImage);
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
  };

  // Rest of component remains the same
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-300 mb-1 font-medium">{label}</label>
      <div className="relative group h-40 border border-gray-700 rounded-lg overflow-hidden bg-gray-900/30">
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt={label} 
            className="w-full h-full object-contain" 
          />
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
      {imageFile && typeof imageFile === 'object' && (
        <p className="text-sm text-gray-300 mt-1 truncate">
          Selected: {imageFile.name}
        </p>
      )}
    </div>
  );
};

// Image resizing function
const resizeImage = async (
  file: File, 
  maxWidth: number, 
  maxHeight: number, 
  quality = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    
    image.onload = () => {
      const canvas = document.createElement("canvas");
      let width = image.width;
      let height = image.height;

      // Determine scaling factor while keeping aspect ratio
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
      }

      // Convert the canvas to a Blob with reduced quality
      canvas.toBlob(
        (blob: Blob | null) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to create blob"));
          }
        },
        file.type,
        quality
      );
    };
    
    image.onerror = reject;
  });
};

const base64ToBlob = (base64: string, mimeType: string = "image/jpeg") => {
  try {
    // Check if the base64 string is valid and has data
    const split = base64?.split(",");
    if (!split || split.length < 2) {
      console.error("Invalid base64 string format");
      return null;
    }

    // Get the base64 content (after the comma)
    const byteCharacters = atob(split[1]);
    
    // Convert to byte array
    const byteArrays: Uint8Array[] = [];
    const sliceSize = 512;
    
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    
    // Create and return the blob with the correct MIME type
    return new Blob(byteArrays, { type: mimeType });
  } catch (error) {
    console.error("Error converting base64 to blob:", error);
    return null;
  }
};

const CreateMovieForm = (props: any) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    release_year: '',
    rating: '',
    director: '',
    duration: '',
    description: '',
    plan: '',
    poster: '',
    coverimage: null as null | string | { base64: string, filename: string, type: string }
  });

  const [errors, setErrors] = useState({
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
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  // Updated handleFileChange to handle base64 strings
  const handleFileChange = (name: string, base64String: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: base64String
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!formData.title || formData.title.trim() === '') {
      newErrors.title = 'Title is required';
      isValid = false;
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
      isValid = false;
    }

    if (!formData.genre || formData.genre.trim() === '') {
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

    if (!formData.director || formData.director.trim() === '') {
      newErrors.director = 'Director is required';
      isValid = false;
    }

    if (!formData.duration) {
      newErrors.duration = 'Duration is required';
      isValid = false;
    } else if (parseFloat(formData.duration) < 1 || parseFloat(formData.duration) > 600) {
      newErrors.duration = 'Duration must be between 1 and 600 minutes';
      isValid = false;
    }

    if (!formData.description || formData.description.trim() === '') {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!formData.plan || formData.plan.trim() === '') {
      newErrors.plan = 'Plan is required';
      isValid = false;
    }

    if (!formData.poster) {
      newErrors.poster = 'Poster image is required';
      isValid = false;
    }

    if (!formData.coverimage) {
      newErrors.coverimage = 'Cover image is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Updated submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    if (!validateForm()) return;

    const submitData = new FormData();

    // Add text fields
    submitData.append('title', formData.title || '');
    submitData.append('genre', formData.genre || '');
    submitData.append('release_year', formData.release_year || '');
    submitData.append('rating', formData.rating || '');
    submitData.append('director', formData.director || '');
    submitData.append('duration', formData.duration || '');
    submitData.append('description', formData.description || '');
    submitData.append('plan', formData.plan || 'basic');

    const base64ToBlob = (base64: string, mimeType: string = "image/jpeg") => {
      const byteCharacters = atob(base64?.split(",")[1]); // Decode Base64, ignoring the `data:image/jpeg;base64,` prefix
      const byteNumbers = new Array(byteCharacters.length).fill(null).map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: mimeType });
    };

    // Handle poster image
    if (formData.poster) {
      try {
        const posterData:any = formData.poster;
        // const mimeType = posterData.base64.match(/^data:(.*?);base64,/)?.[1] || posterData.type;
        // const posterBlob = base64ToBlob(posterData.base64, mimeType);
        
        const mimeType = formData.poster.match(/^data:(.*?);base64,/)?.[1] || "image/jpeg"; // Extract MIME type from Base64 string
        			const imageBlob = base64ToBlob(formData.poster, mimeType);
              submitData.append("poster", imageBlob, posterData.filename);
          
        // if (posterBlob) {
        //   // Use original filename
        //   submitData.append('poster', posterBlob, posterData.filename);
        // }
      } catch (error) {
        console.error("Error processing poster:", error);
      }
    }
    
    // Handle banner image
    if (formData.coverimage) {
      try {
        const coverData = formData.coverimage;
        // const mimeType = coverData.base64.match(/^data:(.*?);base64,/)?.[1] || coverData.type;
        // const bannerBlob = base64ToBlob(coverData.base64, mimeType);
        const mimeType = formData.poster.match(/^data:(.*?);base64,/)?.[1] || "image/jpeg"; // Extract MIME type from Base64 string
        const imageBlob = base64ToBlob(formData.poster, mimeType);
        if (typeof coverData === 'object' && coverData.filename) {
          submitData.append("banner", imageBlob, coverData.filename);
        }
    
        // if (bannerBlob) {
        //   // Use original filename
        //   submitData.append('banner', bannerBlob, coverData.filename);
        // }
      } catch (error) {
        console.error("Error processing cover:", error);
      }
    }

    // Log what's being sent
    console.log("Form data entries:");
    for (const [key, value] of submitData.entries()) {
      console.log(`${key}: ${value instanceof Blob ? `Blob (${value.size} bytes)` : value}`);
    }

    try {
      const result = await creatMovieApi(submitData, props.dispatch);
      console.log("API response:", result);
    } catch (error: any) {
      console.error("API error:", error.response?.data || error.message);
    }
  };

  // Render error helper
  const renderError = (field: keyof typeof errors) => {
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
        
        <div className="flex flex-col col-span-1 sm:col-span-1 lg:col-span-2">
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

        {/* Image uploads with preview */}
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

