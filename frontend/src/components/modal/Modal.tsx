'use client'

import React from 'react'

interface IModalProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal(props: IModalProps) {
  const { title, children, className, isOpen, onClose } = props;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-lg shadow-lg ${className}`}>
        <div className="border-b px-4 py-2 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-lg font-semibold">
            &times; {/* Unicode multiplication sign used as 'X' */}
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
