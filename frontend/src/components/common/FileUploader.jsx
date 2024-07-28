import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Button } from '../ui/button';
import Upload from '../../assets/icons/upload';

// Function to convert file to a URL for preview
export default function convertFileToUrl(file) {
  return URL.createObjectURL(file);
}

// FileUploader Component
export function FileUploader({ imageUrl, onFieldChange, setFiles }) {
  const onDrop = useCallback(async (acceptedFiles) => {
    setFiles(acceptedFiles);
    const file = acceptedFiles[0];
    
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        // Upload file to server
        const response = await axios.post('http://localhost:8001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('upload image response: ', response.data);

        if (response.data.Status === 'Success') {
          const uploadedImageUrl = `http://localhost:8001/uploads/${response.data.file.filename}`;
          onFieldChange(uploadedImageUrl); // Pass the uploaded image URL to the parent component
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }, [setFiles, onFieldChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      
      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center">
          <img
            src={imageUrl}
            alt="Uploaded Preview"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
          <Upload />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}