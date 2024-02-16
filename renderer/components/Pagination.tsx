export default function Pagination ({ totalData, perPage, setCurrentPage, currentPage }) {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalData/perPage); i++) {
        pages.push(i);
    }
    
    return (
        <div className="flex w-10/12 overflow-x-auto items-center justify-evenly">
            {
                pages.map((page, index) => {
                    return (
                        <button className={`font-bold flex items-center justify-center w-6 h-6 rounded-sm ${currentPage === page ? "bg-darkBlue text-white" : "border-2 border-darkBlue text-darkBlue"}`} key={index} onClick={() => setCurrentPage(page)}>{page}</button>
                    )
                })
            }
        </div>
    )
}