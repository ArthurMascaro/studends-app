import { useForm } from "react-hook-form";
import Modal from "./Modal";

export default function LessonModal ({ isOpen, closeModal, lesson }) {
    let defaultValues = {};

    if (lesson) {
        defaultValues = {};
    }

    const { control, handleSubmit } = useForm();

    return (
        <div>
            <Modal isOpen={isOpen} closeModal={closeModal} title={lesson ? "Dados da aula" : "Nova aula"}>
                <h1>Oii</h1>
            </Modal>
        </div>
    )
}