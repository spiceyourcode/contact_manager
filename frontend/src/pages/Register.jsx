import { useState } from "react";
import authService from "../api/authService.js";
import {useNavigate} from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function Register() {
    const [form, setForm] = useState({});
    const navigate = useNavigate();

    const submit = async(e)=>{
        e.preventDefault();
        await authService.registerUser(form);
        navigate("/login");
    };

    return(
        <form onSubmit={submit}>
            <h2>Register</h2>
            <input placeholder="Name" onChange={e =>{setForm({...form, name: e.target.value})}} />
            <input placeholder="Email" onChange={e =>{setForm({...form, email: e.target.value})}} />
            <input placeholder="Password" onChange={e =>{setForm({...form, password: e.target.value})}} />
            <Button type="submit">Register</Button>
        </form>
    );
}