import React from 'react';
import CameraIcon from './icons/CameraIcon';
import PhotoIcon from './icons/PhotoIcon';
import XMarkIcon from './icons/XMarkIcon';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onChooseFromGallery: () => void;
}

const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({ isOpen, onClose, onTakePhoto, onChooseFromGallery }) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-end animate-fade-in" 
          onClick={onClose} 
          role="dialog" 
          aria-modal="true"
          aria-labelledby="photo-upload-title"
      >
        <div 
          className="bg-slate-50 w-full rounded-t-2xl p-4 animate-slide-up-fast"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
              <h3 id="photo-upload-title" className="text-lg font-bold text-slate-800">Cambiar foto de perfil</h3>
              <button onClick={onClose} className="p-2 -mr-2 text-slate-500 hover:bg-slate-100 rounded-full" aria-label="Cerrar">
                  <XMarkIcon className="w-6 h-6" />
              </button>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={onTakePhoto}
              className="w-full flex items-center p-4 bg-white hover:bg-slate-100 rounded-xl text-left transition-colors border border-slate-200"
            >
              <CameraIcon className="w-6 h-6 text-teal-500 mr-4" />
              <span className="font-semibold text-slate-700">Hacer una foto</span>
            </button>
            <button
              onClick={onChooseFromGallery}
              className="w-full flex items-center p-4 bg-white hover:bg-slate-100 rounded-xl text-left transition-colors border border-slate-200"
            >
              <PhotoIcon className="w-6 h-6 text-teal-500 mr-4" />
              <span className="font-semibold text-slate-700">Elegir de la galería</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="w-full mt-6 bg-slate-100 text-slate-700 px-4 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slideUpFast {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up-fast { animation: slideUpFast 0.25s ease-out forwards; }
      `}</style>
    </>
  );
};

export default PhotoUploadModal;
