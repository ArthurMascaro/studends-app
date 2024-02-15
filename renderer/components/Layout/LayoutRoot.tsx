import { ReactNode } from "react"
import Navigation from "../Navigation"

interface LayoutRootProps {
    children: ReactNode
}

export function LayoutRoot ({ children }: LayoutRootProps) {
    return (
        <div className="w-screen h-screen flex justify-around items-center p-3">
            <div>
                <Navigation/>
            </div>
            <div className="w-10/12 h-full flex flex-col gap-10 justify-center p-6">
                { children }
            </div>
        </div>
    )
}