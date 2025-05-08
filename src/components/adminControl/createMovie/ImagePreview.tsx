import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { creatMovieApi } from '../../../services/adminApi';
import WithRouter from '../../hoc/WithRouter';

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
  

// Image Preview Component
const ImagePreview = ({ imageFile, onImageChange, label, name, error }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Update preview when file changes
  React.useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // Resize the image before preview
        const resizedImage = await resizeImage(file, 800, 800, 0.85);
        onImageChange(name, new File([resizedImage], file.name, { type: file.type }));
      } catch (error) {
        console.error("Error resizing image:", error);
        onImageChange(name, file); // Fall back to original file if resize fails
      }
    }
  };

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
      {imageFile && (
        <p className="text-sm text-gray-300 mt-1 truncate">
          Selected: {imageFile.name}
        </p>
      )}
    </div>
  );
};