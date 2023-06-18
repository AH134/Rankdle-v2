import { useRef } from "react";
import styles from "./Modal.module.css";

const Modal = ({ context, isOpen, setIsOpen, children }) => {
  const modalRef = useRef(0);
  const handleModalClose = () => setIsOpen(false);

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
        <div className={styles.modalTitle}>
          <h1>{context}</h1>
          <button className={styles.closeButton} onClick={handleModalClose}>
            X
          </button>
        </div>
        <hr />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
