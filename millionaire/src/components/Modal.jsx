import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    // console.log(children);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded shadow-lg w-[70%]">
                <div>
                    {children}
                </div>
                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;