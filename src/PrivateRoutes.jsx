import { Outlet, Navigate } from "react-router-dom";



const PrivateRoutes = ({ children, ...rest }) => {
    const token = localStorage.getItem("token");
  
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes