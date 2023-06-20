import { useRef } from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, handleModalClose, children }) => {
  const modalRef = useRef(0);

  return (
    <div
      ref={modalRef}
      className={
        isOpen
          ? `${styles.modalBackground} ${styles.modalVisible}`
          : styles.modalBackground
      }
      onClick={(e) => {
        if (e.target === modalRef.current) {
          handleModalClose();
        }
      }}
    >
      <div
        className={
          isOpen
            ? `${styles.modalContainer} ${styles.modalAnimate}`
            : styles.modalContainer
        }
      >
        <div className={styles.closeButtonContainer}>
          <button className={styles.closeButton} onClick={handleModalClose}>
            <img
              src="../images/global/close-icon.svg"
              alt="close-icon"
              width={"20px"}
            />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
