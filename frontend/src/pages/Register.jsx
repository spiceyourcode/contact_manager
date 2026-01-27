import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import authService from "@/api/authService.js";
import { LoginForm } from "../components/login-form";
import signUpIllustration from "../assets/Sign-up-pana.svg";

export default function Register() {
    const navigate = useNavigate();

    const submit = async (formData) => {
        try {
            // Validate passwords match
            if (formData.password !== formData.confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }

            await authService.registerUser({
                email: formData.email,
                username: formData.username,
                password: formData.password,
            });

            toast.success("Registration successful! Please log in to continue.");
            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error);
            toast.error(
                error.response?.data?.message || 
                "Registration failed. Please try again."
            );
        }
    };

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="/" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <div className="size-4" />
                        </div>
                        <p className="text-4xl font-bold">CM+</p>
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm 
                            title="Create your account"
                            subtitle="Enter your details to get started"
                            submitButtonText="Sign Up"
                            mode="register"
                            showForgotPassword={false}
                            onSubmit={submit}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <img
                    src={signUpIllustration}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
