import { useSelector } from "react-redux";
import { Outlet , Navigate } from "react-router"


const Layout = () => {
    const authState = useSelector((state) => state.authState);
    let loggedUser = authState?.reqUser;
  return (
    <div>
        {loggedUser ? <Outlet/> : <Navigate to="/login"/>} 
    </div>
  )
}

export default Layout