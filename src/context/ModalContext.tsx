import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

type ModalContextType = {
  showModal: () => void;
  closeModal: () => void;
  setModalContent: (content: ReactNode) => void;
  isModalOpen: boolean;
};

export const ModalContext = createContext<ModalContextType>({
  showModal: () => {},
  closeModal: () => {},
  setModalContent: () => {},
  isModalOpen: false,
});

export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const showModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const isModalOpen = () => {
    return modalRef.current?.open ?? false;
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        closeModal,
        setModalContent,
        isModalOpen: isModalOpen(),
      }}
    >
      {children}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {modalContent}
        </div>
      </dialog>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
