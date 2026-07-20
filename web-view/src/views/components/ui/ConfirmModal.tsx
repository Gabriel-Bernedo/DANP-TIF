import { Modal } from './Modal';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Eliminar',
  cancelText = 'Cancelar'
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
            <AlertTriangle size={24} />
          </div>
          <p className="text-gray-700">{message}</p>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
