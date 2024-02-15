import { ReactNode } from "react"

interface LayoutContentProps {
    children: ReactNode
}

export function LayoutContent ({ children }: LayoutContentProps) {
    return (
        <div className="w-full h-5/6 p-5 bg-lightGray shadow-lg rounded-sm shadow-slate-400">
            { children }
        </div>
    )
}