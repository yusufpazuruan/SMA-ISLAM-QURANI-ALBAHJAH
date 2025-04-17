import Logo from "@/components/logo";
import { verifyUser } from "@/db/action/user";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

const AUTH_CONTENT: Record<string, { title: string; description: string }> = {
  "/login": {
    title: "Login to your account",
    description: "Enter your email below to login to your account",
  },
  "/signup": {
    title: "Sign up",
    description: "Create a new account",
  },
  "/reset-password": {
    title: "Reset your password",
    description: "Please enter your new password below.",
  },
  // "/forgot-password": {
  //   title: "Forgot Password",
  //   description: "We'll send you a link to reset your password.",
  // },
  // "/auth": {
  //   title: "",
  //   description: "",
  // },
};

export default function AuthLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserVerification = async () => {
      const session = await verifyUser();
      
      if (session) {
        navigate("/dashboard");
        return;
      }
    };

    handleUserVerification();
  }, []);

  const location = useLocation();
  const content = AUTH_CONTENT[location.pathname] || {
    title: "",
    description: "",
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* LOGO */}
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>

        {/* FORM */}
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {content.title && (
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">{content.title}</h1>
                <p className="text-sm text-muted-foreground">
                  {content.description}
                </p>
              </div>
            )}
            <Outlet />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (IMAGE) */}
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://albahjah.or.id/wp-content/uploads/2024/09/Side-Bar-Website-768x576.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
