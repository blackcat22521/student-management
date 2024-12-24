import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-red-600"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
