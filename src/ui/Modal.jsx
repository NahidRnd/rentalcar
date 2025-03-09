import { FaRegCircleXmark } from "react-icons/fa6";
import useOutsideClick from "../hooks/useOutsideClick";

function Modal({open, onClose, title, children}) {
  
  const ref = useOutsideClick(onClose);

  return open && <div className="backdrop-blur-sm fixed top-0 left-0 w-full h-screen bg-opacity-30 z-50">
    <div ref={ref} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    rounded-lg bg-white p-32 shadow-lg transition-all duration-500 ease-out w-[calc(100vw-2rem)] md:max-w-[28rem] overflow-y-auto">
      <div className="flex items-center justify-between border-b border-b-gray-400 pb-8 mb-24">
        <p className="font-bold text-base">{title}</p>
        <button onClick={onClose}><FaRegCircleXmark /></button>
      </div>
      {children}
    </div>
  </div>
}

export default Modal
