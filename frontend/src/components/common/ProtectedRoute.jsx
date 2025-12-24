import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function ProtectedRoute({children}){ //component to protected routes
    const{token, loading} =useAuth();
    if(loading){
        return <p>Loading...</p>;
    }
    return token ? children : <Navigate to= "/login" />
}
export default ProtectedRoute;