import { useState } from "react";
import authService from "@/api/authService.js";
import useAuth from "@/hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, LogIn } from "lucide-react";
import { toast } from "sonner";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await authService.loginUser({ email, password });
            login(res.data.token, res.data.user);
            navigate("/contacts");
            toast.success(`Welcome Back ${res.data.user.username}`);
        } catch (error) {
            console.error('Login failed:', error);
            // alert('Login failed. Please check your credentials and try again.');
            toast.error("Login failed. Please check your credentials and try again.");
        }
    }
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Card className="shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
                        <CardDescription className="text-center">
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={submit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter >
                            <CardContent className="flex flex-col items-center flex-nowrap w-full" >
                                <Button type="submit" className="w-full mt-8 mb-2" size="lg">
                                    <LogIn className="mr-2 h-4 w-4" />
                                    Log In
                                </Button>

                                <div className="text-center text-sm text-gray-500">
                                    <span className="mb-2">Don't have an account? </span>
                                    <a href="/register" className="text-primary font-medium">
                                        Register
                                    </a>
                                </div>
                            </CardContent>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );

}

export default Login;
