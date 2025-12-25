import { useState } from "react";
import authService from "@/api/authService.js";
import useAuth from "@/hooks/useAuth.js";
import {useNavigate} from "react-router-dom";
import { Button } from "@/components/ui/Button";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} =useAuth();
    const navigate =useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await authService.loginUser({email, password});
            login(res.data.token, res.data.user);
            navigate("/contacts");
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    }
    return(
        <form onSubmit={submit}>
            <h2>Login</h2>
            <input placeholder="email" value = {email} onChange={e =>{setEmail(e.target.value)}}/>
            <input placeholder="password" value = {password} onChange={e =>{setPassword(e.target.value)}}/>
            <Button type="submit">Login</Button>
        </form>
    );

}

export default Login;
