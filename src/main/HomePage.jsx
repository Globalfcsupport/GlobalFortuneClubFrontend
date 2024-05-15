import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import SideBar from "./SideBar"

const HomePage = () => {
  return (
  <>
   <section className="w-full h-screen flex items-center justify-center">
        <div className=" w-[18%] h-screen flex items-center justify-start p-0">
          <SideBar />
        </div>
        <dir className=" w-[82%] h-screen flex flex-col items-center justify-center">
          <div className="w-full h-min">
            <NavBar />
          </div>
          <div className="w-full h-[90vh] overflow-hidden flex items-center justify-center ">
            <Outlet />
          </div>
        </dir>
      </section>
  </>
  )
}

export default HomePage
