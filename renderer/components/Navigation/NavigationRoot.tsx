import { ReactNode } from "react"

interface NavigationRootProps {
    children: ReactNode
}

export function NavigationRoot ({ children }: NavigationRootProps) {
    return (
        <div className="h-3/5 flex flex-col gap-14 py-8 px-4 bg-primaryBlue rounded-xl shadow-lg shadow-indigo-900">
            { children }
        </div>
    )
}