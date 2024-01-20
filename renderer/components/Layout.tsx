import Navigation from "./Navigation"

const Layout = ({ children }) => {
    return (
        <div className="w-screen h-screen flex flex-row">
            <div className="w-2/12 py-20 px-8 ">
                <Navigation/>
            </div>
            <div className="w-10/12 h-screen py-20 px-8 ">
                { children }
            </div>
        </div>
    )
}

export default Layout;