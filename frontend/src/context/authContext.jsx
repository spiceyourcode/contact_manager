import { createContext, useEffect, useState } from "react";
import authService from "../api/authService";

export const AuthContext = createContext(); //create the context for sharing the auth state

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    useEffect(()=>{
        const loadUser = async()=>{
            try {
                if(token){
                    const res = await authService.currentUser();
                    setUser(res.data.user || res.data); // Handle both response formats
                } else {
                    setUser(null);
                }
            } catch(error){
                logout();
            } finally{
                setLoading(false);
            }
        };
        loadUser();
    },[token]); // Added token to dependency array
    const login = (token, user) =>{
        localStorage.setItem("token", token);
        setUser(user);
    };

    const logout = ()=>{
        localStorage.removeItem('token');
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{user, token, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );

};



