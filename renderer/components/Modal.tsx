import { X } from "lucide-react";

const Modal = ({ children, isOpen, closeModal, title }) => {

    if (!isOpen) {
        return <></>
    }

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
                <div className="bg-white w-2/5 rounded-md max-h-4/5 opacity-100 flex-row p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-darkBlue text-2xl font-bold">{title}</h1>
                        <button onClick={closeModal}>
                            <div className="bg-primaryBlue p-1 rounded-lg">
                                <X color="white"/> 
                            </div>
                        </button>
                    </div>
                    <div className="overflow-y-auto h-full">
                        { children }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;