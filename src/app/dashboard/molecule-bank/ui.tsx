import React from "react";

interface ModalProps {
  id: string;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ id, title }) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box bg-[#ffffff] text-black dark:bg-[#181818] dark:text-white">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="py-4"></div>
        <div className="modal-action">
          <form method="dialog"></form>
        </div>
      </div>
    </dialog>
  );
};
export default Modal;