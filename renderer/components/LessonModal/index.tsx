import { Modal } from "../Modal";

export default function LessonModal ({ isOpen, setOpen }) {

    


    return (
        <Modal.Root isOpen={isOpen}>
            <Modal.Header title="Adicionar aulas" handleClose={() => setOpen(false)}/>
            <Modal.Content>

            </Modal.Content>
        </Modal.Root>
    )
}