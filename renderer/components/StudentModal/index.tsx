import { useState } from "react";
import { Modal } from "../Modal";
import { Phone, User } from "../../interfaces";

interface StudentModalProps {
    student: User | null
    phones: Phone[] | null
}


export default function StudentModal ({ student, phones }: StudentModalProps) {

    const [isOpen, setOpen] = useState(false);
    const [action, setAction] = useState("create");

    return (
        <Modal.Root isOpen={isOpen}>
            <Modal.Header title="Alunos" handleClose={() => setOpen(false)}/>
            <Modal.Content>
                <div>
                    <h1>forms</h1>
                </div>
            </Modal.Content>
        </Modal.Root>
    )
}