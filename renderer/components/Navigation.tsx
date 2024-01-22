import Link from "next/link";
import Modal from "./Modal";
import StudentModal from "./StudentModal";

const Navigation = () => {
    return (
        <div className="bg-primaryBlue flex flex-col h-3/5 w-4/6 m-5 items-center rounded-xl mx-4 shadow-lg shadow-indigo-900">
            <div className="my-10 p-2">
                <StudentModal/>
            </div>
            <Link href="/">index</Link>
            <Link href="/students">Users</Link>
        </div>
    )
}

export default Navigation;