import { useState } from "react";

const Modal = ({ onOpen, onClose, title, content }) => {


  if (onOpen == true) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
        <div className="fixed z-10 inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
          {/* Conteúdo do modal */}
  
          {/* Fundo do modal */}
          <div className="relative z-50 bg-white rounded-lg shadow-lg">
    
            {/* Cabeçalho do modal */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button
                className="text-gray-500 hover:text-gray-600"
                onClick={onClose}
                aria-label="Fechar modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* Conteúdo principal do modal */}
            <div className="p-6">{content}</div>
          </div>
        </div>
        
      </div>
    );    
  }

  if (onClose == true) {
    return null;
  }

};

export default Modal;
