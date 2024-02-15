import { ReactNode } from "react"
import { Navigation } from "../Navigation"
import { BookOpen, Calendar, CircleDollarSign, Users } from "lucide-react"

interface LayoutRootProps {
    children: ReactNode
}

export function LayoutRoot ({ children }: LayoutRootProps) {
    return (
        <div className="w-screen h-screen flex justify-around items-center p-3">
            <div>
                <Navigation.Root>
                    <Navigation.Item target="/" icon={Calendar}/>
                    <Navigation.Item target="/students" icon={Users}/>
                    <Navigation.Item target="/lessons" icon={BookOpen}/>
                    <Navigation.Item target="/dashboard" icon={CircleDollarSign}/>
                </Navigation.Root>
            </div>
            <div className="w-10/12 h-full flex flex-col gap-10 justify-center p-6">
                { children }
            </div>
        </div>
    )
}