'use client';
import React, { createContext, useContext, useState } from 'react';

interface ImageUploadContextType {
  file: File | null;
  previewUrl: string | null;
  setFile: (file: File | null, previewUrl: string | null) => void;
}

const ImageUploadContext = createContext<ImageUploadContextType | undefined>(
  undefined
);

export const ImageUploadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [file, setFileState] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const setFile = (newFile: File | null, url: string | null) => {
    setFileState(newFile);
    setPreviewUrl(url);
  };

  return (
    <ImageUploadContext.Provider value={{ file, previewUrl, setFile }}>
      {children}
    </ImageUploadContext.Provider>
  );
};

export const useImageUpload = () => {
  const context = useContext(ImageUploadContext);
  if (!context) {
    throw new Error(
      'useImageUpload must be used within an ImageUploadProvider'
    );
  }
  return context;
};
