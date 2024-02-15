import { ReactNode } from "react"

interface LayoutHeaderProps {
    children: ReactNode
}

export function LayoutHeader ({ children }: LayoutHeaderProps) {
    return (
        <div className="w-full h-1/6 flex items-center justify-between px-10 rounded-md border-2 border-darkBlue shadow-lg">
            { children }
        </div>
    )
}