import { useState } from "react"
import Modal from "./Modal";
import { EditLecture } from "../intefaces";
import { useForm } from "react-hook-form";
import { useLessonsStore, useStudentsStore } from "../store";

export default function LectureModal ({ isOpen, closeModal, onSave, lecture }) {

    const [user, setUser] = useState(null);

    const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EditLecture>({ defaultValues: lecture });

    const handleClose = () => {
        reset();
        closeModal();
    }

    const onSubmit = (data) => {
        onSave(data);
        handleClose();
    }

    return (
        <div>
            <Modal isOpen={isOpen} closeModal={closeModal} title="Editar aula">
                <div>
                    <form></form>
                </div>
            </Modal>
        </div>
    )
}