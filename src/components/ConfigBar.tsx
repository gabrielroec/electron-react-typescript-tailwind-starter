import React from "react";
import { backgrounds, BackgroundType } from "../types/Background";

interface ConfigBarProps {
  borderRadius: number;
  padding: number;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowOpacity: number;
  background: BackgroundType;
  onBorderRadiusChange: (value: number) => void;
  onPaddingChange: (value: number) => void;
  onShadowXChange: (value: number) => void;
  onShadowYChange: (value: number) => void;
  onShadowBlurChange: (value: number) => void;
  onShadowOpacityChange: (value: number) => void;
  onBackgroundChange: (value: BackgroundType) => void;
}

const ConfigBar: React.FC<ConfigBarProps> = ({
  borderRadius,
  padding,
  shadowX,
  shadowY,
  shadowBlur,
  shadowOpacity,
  background,
  onBorderRadiusChange,
  onPaddingChange,
  onShadowXChange,
  onShadowYChange,
  onShadowBlurChange,
  onShadowOpacityChange,
  onBackgroundChange,
}) => {
  return (
    <div className="bg-white rounded-[5px] p-4 shadow-xl w-[20%] h-full relative z-50">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Configurações</h3>

        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Background</h4>
          <div className="grid grid-cols-4 gap-2">
            {backgrounds.map((bg) => (
              <button
                key={bg.id}
                onClick={() => onBackgroundChange(bg.id)}
                className={`w-12 h-12 rounded-lg transition-all duration-200 hover:scale-105 ${
                  background === bg.id ? "ring-2 ring-blue-500" : ""
                }`}
                style={{
                  background: bg.gradient,
                }}
              >
                <span className="sr-only">{bg.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600 flex items-center justify-between">
            Border Radius
            <span className="text-gray-400">{borderRadius}px</span>
          </label>
          <input
            type="range"
            min="0"
            max="32"
            value={borderRadius}
            onChange={(e) => onBorderRadiusChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600 flex items-center justify-between">
            Padding
            <span className="text-gray-400">{padding}px</span>
          </label>
          <input
            type="range"
            min="0"
            max="64"
            value={padding}
            onChange={(e) => onPaddingChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Configurações de Sombra</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-600 flex items-center justify-between">
                X<span className="text-gray-400">{shadowX}px</span>
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                value={shadowX}
                onChange={(e) => onShadowXChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600 flex items-center justify-between">
                Y<span className="text-gray-400">{shadowY}px</span>
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                value={shadowY}
                onChange={(e) => onShadowYChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600 flex items-center justify-between">
                Blur
                <span className="text-gray-400">{shadowBlur}px</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={shadowBlur}
                onChange={(e) => onShadowBlurChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600 flex items-center justify-between">
                Opacidade
                <span className="text-gray-400">{shadowOpacity}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={shadowOpacity}
                onChange={(e) => onShadowOpacityChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigBar;
