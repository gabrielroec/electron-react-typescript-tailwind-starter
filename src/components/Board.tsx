import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { backgrounds, BackgroundType } from "../types/Background";

interface BoardProps {
  imageUrl: string | null;
  onChangeImage?: () => void;
  borderRadius: number;
  padding: number;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowOpacity: number;
  background: BackgroundType;
}

const Board: React.FC<BoardProps> = ({
  imageUrl,
  onChangeImage,
  borderRadius,
  padding,
  shadowX,
  shadowY,
  shadowBlur,
  shadowOpacity,
  background,
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const currentBackground = backgrounds.find((bg) => bg.id === background) || backgrounds[backgrounds.length - 1];

  const handleExport = async (format: "png" | "jpg" | "webp") => {
    if (!imageUrl) return;

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        const canvasWidth = img.width + padding * 2;
        const canvasHeight = img.height + padding * 2;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Desenhar fundo com o background selecionado
        if (currentBackground.gradient !== "transparent") {
          // Criar gradiente no canvas
          const gradient = ctx!.createLinearGradient(0, 0, canvasWidth, canvasHeight);

          // Extrair cores do gradiente baseado no tipo de background
          switch (background) {
            case "desktop":
              gradient.addColorStop(0, "#ff8a00");
              gradient.addColorStop(1, "#e52e71");
              break;
            case "cool":
              gradient.addColorStop(0, "#2193b0");
              gradient.addColorStop(1, "#6dd5ed");
              break;
            case "nice":
              gradient.addColorStop(0, "#834d9b");
              gradient.addColorStop(1, "#d04ed6");
              break;
            case "morning":
              gradient.addColorStop(0, "#ff6e7f");
              gradient.addColorStop(1, "#bfe9ff");
              break;
            case "love":
              gradient.addColorStop(0, "#654ea3");
              gradient.addColorStop(1, "#da92b4");
              break;
            case "rain":
              gradient.addColorStop(0, "#00c6fb");
              gradient.addColorStop(1, "#005bea");
              break;
            case "sky":
              gradient.addColorStop(0, "#89f7fe");
              gradient.addColorStop(1, "#66a6ff");
              break;
            case "none":
            default:
              // Não fazer nada para background transparente
              break;
          }

          // Aplicar gradiente
          if (background !== "none") {
            ctx!.fillStyle = gradient;
            ctx!.fillRect(0, 0, canvasWidth, canvasHeight);
          }
        }

        // Configurar sombra
        ctx!.save();
        ctx!.shadowColor = `rgba(0, 0, 0, ${shadowOpacity / 100})`;
        ctx!.shadowBlur = shadowBlur;
        ctx!.shadowOffsetX = shadowX;
        ctx!.shadowOffsetY = shadowY;

        // Desenhar sombra arredondada
        ctx!.beginPath();
        ctx!.moveTo(padding + borderRadius, padding);
        ctx!.arcTo(canvasWidth - padding, padding, canvasWidth - padding, canvasHeight - padding, borderRadius);
        ctx!.arcTo(canvasWidth - padding, canvasHeight - padding, padding, canvasHeight - padding, borderRadius);
        ctx!.arcTo(padding, canvasHeight - padding, padding, padding, borderRadius);
        ctx!.arcTo(padding, padding, canvasWidth - padding, padding, borderRadius);
        ctx!.closePath();

        ctx!.fill();
        ctx!.restore();

        // Aplicar clipping para a imagem
        ctx!.beginPath();
        ctx!.moveTo(padding + borderRadius, padding);
        ctx!.arcTo(canvasWidth - padding, padding, canvasWidth - padding, canvasHeight - padding, borderRadius);
        ctx!.arcTo(canvasWidth - padding, canvasHeight - padding, padding, canvasHeight - padding, borderRadius);
        ctx!.arcTo(padding, canvasHeight - padding, padding, padding, borderRadius);
        ctx!.arcTo(padding, padding, canvasWidth - padding, padding, borderRadius);
        ctx!.clip();

        // Desenhar a imagem com padding
        ctx!.drawImage(img, padding, padding, img.width, img.height);

        // Converter para o formato desejado
        const mimeType = `image/${format}`;
        const dataUrl = canvas.toDataURL(mimeType, 1.0);

        // Criar link de download
        const link = document.createElement("a");
        link.download = `imagem.${format}`;
        link.href = dataUrl;
        link.click();
      };

      img.src = imageUrl;
    } catch (error) {
      console.error("Erro ao exportar imagem:", error);
      alert("Erro ao exportar imagem. Tente novamente.");
    }
  };

  return (
    <>
      <div
        className="w-full h-full flex items-center justify-center relative overflow-hidden"
        style={{
          padding: `${padding}px`,
          background: currentBackground.gradient,
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {imageUrl && (
            <motion.img
              src={imageUrl}
              alt="Imagem enviada"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-full max-h-full object-contain"
              style={{
                borderRadius: `${borderRadius}px`,
                filter: `drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity / 100}))`,
              }}
            />
          )}
        </div>
      </div>
      <div className="absolute top-4 right-4 flex gap-2">
        <motion.div className="relative">
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="bg-white/90 hover:bg-white px-4 py-2 rounded-full shadow-lg 
                     transition-all duration-200 hover:scale-105 backdrop-blur-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span className="text-gray-600 text-sm font-medium">Exportar</span>
          </motion.button>

          <AnimatePresence>
            {showExportMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50"
              >
                <button
                  onClick={() => handleExport("png")}
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <span className="w-12 text-xs text-gray-500">PNG</span>
                  <span>Alta qualidade</span>
                </button>
                <button
                  onClick={() => handleExport("jpg")}
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <span className="w-12 text-xs text-gray-500">JPG</span>
                  <span>Menor tamanho</span>
                </button>
                <button
                  onClick={() => handleExport("webp")}
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <span className="w-12 text-xs text-gray-500">WebP</span>
                  <span>Moderno</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={onChangeImage}
          className="bg-white/90 hover:bg-white px-4 py-2 rounded-full shadow-lg 
                   transition-all duration-200 hover:scale-105 backdrop-blur-sm flex items-center gap-2"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-gray-600 text-sm font-medium">Trocar imagem</span>
        </motion.button>
      </div>
    </>
  );
};

export default Board;
