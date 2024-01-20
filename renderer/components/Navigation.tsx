import Link from "next/link";

const Navigation = () => {
    return (
        <div className="bg-primaryBlue flex flex-col h-full p-3 items-center rounded-xl mx-4 shadow-lg shadow-indigo-900">
            <div className="p-4 my-5">
                <button className="bg-lightRed">
                    <div></div>
                    <h2>Novo Aluno</h2>
                </button>
            </div>
            <Link href="/">index</Link>
            <Link href="/students">Users</Link>
        </div>
    )
}

export default Navigation;