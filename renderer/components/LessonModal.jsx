import { useState } from "react";
import Modal from "./Modal";

const ModalTriggerButton = () => {
    return (
        <div style={{ userSelect: "none" }}>
            <div className="py-3 px-5 w-full bg-darkBlue rounded-md shadow-sm shadow-black">
                <h1 className="text-xl font-bold text-white">Agendar nova aula</h1>
            </div>
        </div>
    )
}

const LessonModal = () => {

    const [open, setOpen] = useState(false);

    return (
        <div>
            <Modal title="Agendar aula" isOpen={open} closeModal={() => setOpen(false)}>
                <h1>Cadastro de aulas!</h1>
            </Modal>
            <div onClick={() => setOpen(!open)}>
                <ModalTriggerButton/>
            </div>
        </div>
    )
}

export default LessonModal;