import Navigation from "./Navigation"

const Layout = ({ children }) => {
    return (
        <div className="w-screen h-screen flex flex-row">
            <div className="w-2/12 flex justify-center items-center">
                <Navigation/>
            </div>
            <div className="w-10/12 flex justify-center flex-col py-6 px-8">
                { children }
            </div>
        </div>
    )
}

export default Layout;