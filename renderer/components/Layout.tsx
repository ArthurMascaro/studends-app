import Navigation from "./Navigation"

const Layout = ({ children }) => {
    return (
        <div className="w-screen h-screen flex flex-row">
            <div className="w-2/12 bg-fuchsia-600">
                <Navigation/>
            </div>
            <div className="w-10/12 h-screen bg-lightGray">
                { children }
            </div>
        </div>
    )
}

export default Layout;