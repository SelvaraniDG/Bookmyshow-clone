import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import Upload from '../../assets/icons/upload';

export function FileUpload() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  // Handles file input change and automatically uploads the file
  const handleFile = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      // Prepare the form data
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        const res = await axios.post('http://localhost:8001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (res.data.Status === "Success") {
          console.log("Upload succeeded");
          // Optionally clear the file input and state
          fileInputRef.current.value = null;
        } else {
          console.log("Upload failed");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFile}
        style={{ display: 'none' }}
      />
      <div className="flex-center flex-col py-5 text-grey-500">
        <Upload />
        <h3 className="mb-2 mt-2">Drag photo here</h3>
        <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
        <Button type="button" onClick={() => fileInputRef.current.click()} className="rounded-full">
          {file ? "Upload another" : "Select from computer"}
        </Button>
      </div>
      {file && (
        <div className="mt-4 text-grey-500">
          <p>{file.name}</p>
        </div>
      )}
    </div>
  );
}
