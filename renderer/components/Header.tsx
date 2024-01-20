const Header = ({ children }) => {
    return (
        <div className="h-28 flex items-center px-10 justify-between mb-5 mt-1 border-2 rounded-md border-darkBlue shadow-lg">
            { children }
        </div>
    )
}

export default Header;