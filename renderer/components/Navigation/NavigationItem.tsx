import Link from "next/link"
import { ElementType } from "react"

interface NavigationItemProps {
    target: string,
    icon: ElementType
}

export function NavigationItem ({ target, icon: Icon }: NavigationItemProps) {
    return (
       <div>
            <Link href={target}>
                <div className="p-2 w-full bg-darkBlue rounded-md shadow-sm shadow-black">
                    <Icon size={36} color="white"/>
                </div>
            </Link>
       </div>
    )
}