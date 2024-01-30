import Navigation from "./Navigation"

const Layout = ({ children }) => {
    return (
        <div className="w-screen h-screen flex flex-row justify-around items-center p-3">
            <Navigation/>
            <div className="w-10/12 h-5/6 flex justify-center flex-col p-6">
                { children }
            </div>
        </div>
    )
}

export default Layout;