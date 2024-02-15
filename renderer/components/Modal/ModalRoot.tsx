import { ReactNode } from "react"

interface ModalRootProps {
    children: ReactNode,
    isOpen: boolean, 

}

export function ModalRoot ({ children, isOpen }: ModalRootProps) {

    if (!isOpen) {
        return <></>
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white w-2/5 rounded-md max-h-4/5 opacity-100 flex-row p-4">
                {children}
            </div>
        </div>
    )
}