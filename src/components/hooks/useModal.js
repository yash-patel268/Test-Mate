import { Modal } from "@/components/Modal";
import { useCallback, useRef } from "react";

export const useModal = () => {
  const ref = useRef(null),
    handleOpen = () => ref.current.handleOpen(),
    handleClose = () => ref.current.handleClose();

  return {
    Modal: useCallback(({ ...props }) => <Modal {...props} ref={ref} />, []),
    handleOpen,
    handleClose,
  };
};
