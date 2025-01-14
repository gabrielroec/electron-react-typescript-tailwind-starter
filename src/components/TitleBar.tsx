import React from "react";

declare global {
  interface Window {
    electron: {
      windowControls: {
        close: () => void;
        minimize: () => void;
      };
    };
  }
}

const TitleBar = () => {
  const handleClose = () => {
    window.electron.windowControls.close();
  };

  const handleMinimize = () => {
    window.electron.windowControls.minimize();
  };

  return (
    <div className="absolute w-full p-4 ">
      {/* Adicionamos a classe draggable que definiremos no CSS */}
      <div className="bg-white rounded-[5px] flex gap-3 items-center justify-between p-4 draggable shadow-xl">
        <div className="text-lg font-bold font-sf-regular">Printly!</div>
        {/* Adicionamos no-drag para os botões continuarem clicáveis */}
        <div className="flex gap-3 items-center no-drag">
          <div className="flex gap-1 items-center text-sm cursor-pointer font-sf-regular" onClick={handleMinimize}>
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            Minimizar
          </div>
          <div className="flex gap-1 items-center text-sm cursor-pointer font-sf-regular" onClick={handleClose}>
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            Fechar
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
