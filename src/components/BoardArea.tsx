import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import Board from "./Board";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundType } from "../types/Background";

interface BoardAreaProps {
  borderRadius: number;
  padding: number;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowOpacity: number;
  background: BackgroundType;
}

const BoardArea: React.FC<BoardAreaProps> = ({ borderRadius, padding, shadowX, shadowY, shadowBlur, shadowOpacity, background }) => {
  const [showBoard, setShowBoard] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageSelect = (file: File, preview: string) => {
    setImagePreview(preview);
  };

  const handleImageSubmit = () => {
    if (imagePreview) {
      console.log("Imagem enviada com sucesso!");
      setShowBoard(true);
    } else {
      alert("Nenhuma imagem selecionada.");
    }
  };

  const handleChangeImage = () => {
    setShowBoard(false);
    setImagePreview(null);
  };

  return (
    <div className="bg-white rounded-[5px] p-4 shadow-xl w-[80%] h-full relative z-50 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!showBoard ? (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ImageUpload onImageSelect={handleImageSelect} onImageSubmit={handleImageSubmit} />
          </motion.div>
        ) : (
          <motion.div key="board" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Board
              imageUrl={imagePreview}
              onChangeImage={handleChangeImage}
              borderRadius={borderRadius}
              padding={padding}
              shadowX={shadowX}
              shadowY={shadowY}
              shadowBlur={shadowBlur}
              shadowOpacity={shadowOpacity}
              background={background}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BoardArea;
