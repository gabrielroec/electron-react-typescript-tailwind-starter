import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TitleBar from "../../components/TitleBar";

const Welcome = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleNavigate = () => {
    setIsExiting(true);
    // Aguarda a animação terminar antes de navegar
    setTimeout(() => {
      navigate("/main");
    }, 500); // 500ms = duração da animação
  };

  return (
    <>
      <TitleBar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
        <motion.div
          initial={{ x: 0, opacity: 1 }}
          animate={{
            x: isExiting ? -200 : 0,
            opacity: isExiting ? 0 : 1,
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
            type: "spring",
            stiffness: 100,
          }}
          className="bg-white rounded-lg shadow-xl p-10 m-4 max-w-2xl w-full"
        >
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-2 font-sf-regular">
              Bem-vindo ao Printly!{" "}
              <motion.span
                animate={{ rotate: [10, -10, 10, 10] }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="inline-block"
              >
                👋
              </motion.span>
            </h1>
            <p className="text-gray-600 text-xl mb-8">Seu novo aplicativo para fazer prints incríveis</p>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-700 font-sf-regular">🚀 Rápido</h3>
                  <p className="text-gray-600 font-sf-regular">Aplicação leve e rápida</p>
                </div>
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-700 font-sf-regular">⚡ Eficiente</h3>
                  <p className="text-gray-600 font-sf-regular">Arquivos mais leves e com mais qualidade</p>
                </div>
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-700 font-sf-regular">🛠️ Customizável</h3>
                  <p className="text-gray-600 font-sf-regular">Customize seus prints como quiser</p>
                </div>
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-700 font-sf-regular">🔒 Seguro</h3>
                  <p className="text-gray-600 font-sf-regular">Arquivos seguros e protegidos</p>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={handleNavigate}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200 font-sf-regular"
                >
                  Começar
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-4 font-sf-regular">Versão 1.0.0</p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Welcome;
