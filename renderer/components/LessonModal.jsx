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
    return (
        <Modal title="Agendar aula" trigger={<ModalTriggerButton/>} action={null}>
            <h1>Cadastro de aulas!</h1>
        </Modal>
    )
}

export default LessonModal;