const Header = ({ children }) => {
    return (
        <div className="h-1/6 w-full flex items-center px-10 justify-between mb-5 mt-1 border-2 rounded-md border-darkBlue shadow-lg">
            { children }
        </div>
    )
}

export default Header;