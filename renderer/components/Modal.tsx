import { useState } from "react";
import { X } from "lucide-react";

const Modal = ({ children, trigger, action }) => {

    const [open, setOpen] = useState(false);

    const handleOpenModal = () => {
        if (action) {
            action();
        }
        setOpen(!open);
    }

    if (!open) {
        return (
            <div onClick={handleOpenModal}>
                { trigger }
            </div>
        )
    };

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
                <div className="bg-white w-2/5 rounded-md max-h-4/5 opacity-100 flex-row p-4">
                    <div className="items-end justify-end flex">
                        <button onClick={handleOpenModal}>
                            <div className="bg-primaryBlue p-1 rounded-lg">
                                <X color="white"/> 
                            </div>
                        </button>
                    </div>
                    <div>
                        { children }
                    </div>
                </div>
            </div>
            <div onClick={handleOpenModal}>
                { trigger }
            </div>
        </div>
    )
}

export default Modal;