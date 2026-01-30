import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const AnimatedModal = ({ isOpen, onClose, children }: Props) => {
  const [entered, setEntered] = useState(false);
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setEntered(true);
      document.body.style.overflow = "hidden";
    }else{
        setEntered(false);
        setTimeout(() => {
            setVisible(false)
        }, 250);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setEntered(false);
    setTimeout(onClose, 10);
  };

  if (!visible) return null;

  return (
    <div
      className={"fixed inset-0 bg-black/40 z-50 flex items-center justify-center modal-blur-enter"
    }
      onClick={handleClose}
    >
      <div
        className={
          "bg-white p-6 rounded-xl w-full max-w-md shadow-lg " +
          (entered ? "modal-scale-enter" : "modal-scale-exit")
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};