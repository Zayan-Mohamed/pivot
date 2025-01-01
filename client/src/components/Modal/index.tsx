import React from "react";
import ReactDOM from "react-dom";
import Header from "../Header";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name: string;
};

const Modal = ({ children, isOpen, onClose, name }: Props) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-dark-secondary">
        <Header
          name={name}
          buttonComponent={
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full bg-green-primary text-white hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600"
              onClick={onClose}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          }
          isSmallerText
        />{" "}
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
