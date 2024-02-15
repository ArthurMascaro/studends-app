export function ModalContent ({ children }) {
    return (
        <div className="h-full overflow-y-auto px-2 py-4">
            {children}
        </div>
    )
}