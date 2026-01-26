import authService from "@/api/authService.js";
import useAuth from "@/hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LoginForm } from "../components/login-form";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (formData) => {
    try {
      const res = await authService.loginUser({ 
        email: formData.email, 
        password: formData.password 
      });
      login(res.data.token, res.data.user);
      navigate("/contacts");
      toast.success(`Welcome Back ${res.data.user.username}`);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2  sm:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium ">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <div className="size-4" />
            </div>
            <p className="text-4xl font-bold">CM+</p>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm 
              title="Hello, Welcome Back!"
              subtitle="Your contacts are safe here"
              submitButtonText="Login"
              mode="login"
              showForgotPassword={true}
              onSubmit={submit}
            />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default Login;
