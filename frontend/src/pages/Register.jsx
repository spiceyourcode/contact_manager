import { useState } from "react";
import authService from "../api/authService.js";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import {
    Card,
    CardContent,
    CardFooter,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, LogIn, User } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
    const [form, setForm] = useState({});
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        await authService.registerUser(form);
        navigate("/login");
        toast.success("Registration successful! Please log in to continue.");
    };

    return (
        <div className="min-h-svh w-full flex items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md">
                <Card className="bg-white shadow-md rounded-lg p-6">
                    <CardHeader>
                        <CardTitle className="text-center text-xl ">Register</CardTitle>
                        <CardDescription className="text-center">
                            Create a new account to manage your contacts.
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={submit}>
                        <CardContent>
                            <div className="mb-4 space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Enter your Name"
                                        onChange={(e) => {
                                            setForm({ ...form, name: e.target.value });
                                        }}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="mb-4 space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Enter your Email"
                                        onChange={(e) => {
                                            setForm({ ...form, email: e.target.value });
                                        }}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="mb-4 space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Enter your Password"
                                        onChange={(e) => {
                                            setForm({ ...form, password: e.target.value });
                                        }}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </form>

                    <CardFooter className="flex justify-center items-center flex-col">
                        <Button className = "w-full" type="submit">Register</Button>
                        <p className="text-center">
                            Already have an account?{"     "}
                            <a href="/login" className="font-medium">
                                Log in
                            </a>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
