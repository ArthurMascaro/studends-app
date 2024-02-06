import Link from "next/link";
import { BookOpen, Calendar, CircleDollarSign, Plus, Users } from "lucide-react";
import { useState } from "react";
import StudentModal from "./StudentModal";

export default function Navigation () {

    const [open, setOpen] = useState(false);

    return (
        <div className="bg-primaryBlue flex flex-col h-3/5 p-4 justify-evenly rounded-xl shadow-lg shadow-indigo-900">
            <div className="py-3">
                <div onClick={() => { console.log("abri");setOpen(!open)}}>
                    <div className="p-2 w-full bg-lightRed rounded-md shadow-sm shadow-slate-700">
                        <Plus color="white" size={36}/>
                    </div>
                </div>
                <StudentModal isOpen={open} closeModal={() => setOpen(false)} data={undefined}/>
            </div>
            <div className="flex flex-col justify-around h-3/5">
                <div>
                    <Link href="/">
                        <div className="p-2 w-full bg-darkBlue rounded-md shadow-sm shadow-black">
                            <Calendar size={36} color="white"/>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link href="/students">
                        <div className="p-2 w-full bg-darkBlue rounded-md shadow-sm shadow-black">
                            <Users size={36} color="white"/>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link href="/lessons">
                        <div className="p-2 w-full bg-darkBlue rounded-md shadow-sm shadow-black">
                            <BookOpen size={36} color="white"/>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link href="/dashboard">
                        <div className="p-2 w-full bg-darkBlue rounded-md shadow-sm shadow-black">
                            <CircleDollarSign size={36} color="white"/>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
