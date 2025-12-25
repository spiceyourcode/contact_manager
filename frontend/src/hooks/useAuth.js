// This hook: "Give me whatever is in AuthContext right now"
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

function useAuth(){
    const auth = useContext(AuthContext);
    return auth;
}
export default useAuth;
