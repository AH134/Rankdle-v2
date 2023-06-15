import { useRef, useEffect } from "react";

const useClickOutside = () => {
  const ref = useRef(0);

  const openDialog = () => {
    const dialogElement = ref.current;
    dialogElement.showModal();
  };

  const closeDialog = () => {
    const dialogElement = ref.current;
    dialogElement.close();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const dialogElement = ref.current;

      if (e.target === dialogElement) {
        setTimeout(() => {
          dialogElement.close();
        }, 200);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return [ref, openDialog, closeDialog];
};

export default useClickOutside;
