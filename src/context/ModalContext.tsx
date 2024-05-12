import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
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
    setModalContent(null);
    modalRef.current?.close();
  };

  const isModalOpen = () => {
    return modalRef.current?.open ?? false;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
        <div className="modal-box scale-100">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 outline-none"
            >
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
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used within ModalContextProvider");
  }
  return ctx;
};
