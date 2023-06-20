import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const setModalOpen = (modalTitle) => {
    setIsModalOpen(true);
    setModalContent(modalTitle);
  };
  const setModalClose = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  return [isModalOpen, modalContent, setModalOpen, setModalClose];
};

export default useModal;
