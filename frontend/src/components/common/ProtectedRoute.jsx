import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {Spinner} from "@/components/ui/spinner";

function ProtectedRoute({children}){ //component to protected routes
    const{token, loading} =useAuth();
    if(loading){
               return(
                    <div className="flex justify-center items-center h-screen">
                        <Spinner className ="size=8" />
                    </div>
                )
    }
    return token ? children : <Navigate to= "/login" />
}
export default ProtectedRoute;