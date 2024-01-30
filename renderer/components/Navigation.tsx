import Link from "next/link";
import StudentModal from "./StudentModal";

const Navigation = () => {
    return (
        <div className="bg-primaryBlue flex flex-col h-3/5 px-3 items-center rounded-xl shadow-lg shadow-indigo-900">
            <div className="my-10 p-2">
                <StudentModal/>
            </div>
            <Link href="/">index</Link>
            <Link href="/students">Users</Link>
        </div>
    )
}

export default Navigation;