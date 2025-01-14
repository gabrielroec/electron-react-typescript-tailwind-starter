import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploadProps {
  onImageSelect: (file: File, preview: string) => void;
  onImageSubmit: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, onImageSubmit }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const previewUrl = reader.result as string;
        setPreview(previewUrl);
        onImageSelect(file, previewUrl);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, selecione apenas arquivos de imagem.");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-6 cursor-pointer
          transition-colors duration-200 ease-in-out
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"}
          ${preview ? "h-auto" : "h-48"}
          flex flex-col items-center justify-center
        `}
      >
        <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />

        {preview ? (
          <div className="w-full">
            <img src={preview} alt="Preview" className="max-h-64 mx-auto object-contain rounded-lg" />
            <p className="text-sm text-gray-500 text-center mt-2">Clique para selecionar uma nova imagem</p>
          </div>
        ) : (
          <>
            <svg
              className="w-12 h-12 text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-500 text-center">Clique para selecionar uma nova imagem</p>
          </>
        )}
      </div>

      <AnimatePresence>
        {preview && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            onClick={() => {
              console.log("Enviando imagem...");
              onImageSubmit?.();
            }}
          >
            Enviar Imagem
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;
