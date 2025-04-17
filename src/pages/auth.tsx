// "use client";

// import { useState } from "react";
// import { useNavigate, Link } from "react-router";
// import { toast } from "sonner";
// import { MailIcon } from "lucide-react";

// import { cn } from "@/lib/utils";
// import supabase from "@/helper/supabase/client";
// import Logo from "@/components/logo";
// import { Button } from "@/components/ui/button";
// import PasswordInput from "@/components/ui/password-input";
// import { InputWithEndIcon } from "@/components/ui/input-with-end-icon";

// export interface AuthFormProps {
//   type: "login" | "signup";
// }

// export default function Auth({
//   className,
//   type,
//   ...props
// }: AuthFormProps & React.ComponentProps<"form">) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();
//   const isSignup = type === "signup";

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     try {
//       if (isSignup) {
//         if (password !== confirmPassword) {
//           setError("Passwords do not match");
//           return;
//         }

//         const { error } = await supabase.auth.signUp({
//           email,
//           password,
//           options: {
//             emailRedirectTo: `${window.location.origin}/dashboard`,
//           },
//         });

//         if (error) throw error;

//         toast.success("Check your email for the confirmation link!");
//       } else {
//         const { error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });

//         if (error) throw error;

//         navigate("/dashboard");
//       }
//     } catch (error: unknown) {
//       setError(error instanceof Error ? error.message : "An error occurred");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="grid min-h-screen lg:grid-cols-2">
//       {/* Left Side */}
//       <div className="flex flex-col gap-4 p-6 md:p-10">
//         <Logo />
//         <div className="flex flex-1 items-center justify-center">
//           <div className="w-full max-w-sm">
//             {/* Header */}
//             <div className="flex flex-col items-center gap-2 text-center">
//               <h1 className="text-2xl font-bold">
//                 {isSignup ? "Sign up" : "Login to your account"}
//               </h1>
//               <p className="text-muted-foreground text-sm">
//                 {isSignup
//                   ? "Create a new account"
//                   : "Enter your email below to login to your account"}
//               </p>
//             </div>

//             {/* Form Fields */}
//             <div className="grid gap-4 mt-4">
//               <form
//                 className={cn("flex flex-col gap-6", className)}
//                 onSubmit={handleSubmit}
//                 {...props}
//               >
//                 <InputWithEndIcon
//                   id="email"
//                   label="Email"
//                   type="email"
//                   placeholder="yusufpazuruan@gmail.com"
//                   required
//                   endIcon={<MailIcon size={16} aria-hidden="true" />}
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />

//                 <PasswordInput
//                   label="Password"
//                   name="password"
//                   required
//                   placeholder="*** *** ***"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />

//                 {isSignup && (
//                   <PasswordInput
//                     label="Confirm Password"
//                     name="confirmPassword"
//                     required
//                     placeholder="*** *** ***"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                   />
//                 )}

//                 {error && (
//                   <p className="text-sm text-red-500 text-center">{error}</p>
//                 )}

//                 <Button type="submit" className="w-full" disabled={isLoading}>
//                   {isLoading
//                     ? isSignup
//                       ? "Creating an account..."
//                       : "Logging in..."
//                     : isSignup
//                     ? "Sign up"
//                     : "Login"}
//                 </Button>
//               </form>
//               {/* Or continue with */}
//               <div className="relative text-center text-sm">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t" />
//                 </div>
//                 <span className="relative bg-background px-2 text-muted-foreground">
//                   Or continue with
//                 </span>
//               </div>

//               {/* Google Login Placeholder */}
//               <Button
//                 className="flex items-center gap-2 w-full"
//                 onClick={() =>
//                   toast.info(
//                     "Maaf, fitur ini masih dalam proses. Kami sedang mengembangkan fitur ini, silakan coba lagi nanti."
//                   )
//                 }
//               >
//                 <img
//                   src="https://www.svgrepo.com/show/475656/google-color.svg"
//                   alt="Google"
//                   className="w-5 h-5"
//                 />
//                 {isSignup ? "Sign up" : "Login"} with Google
//               </Button>
//             </div>

//             {/* Switch Auth Mode */}
//             <div className="text-center text-sm mt-4">
//               {isSignup
//                 ? "Already have an account? "
//                 : "Don't have an account? "}
//               <Link
//                 to={isSignup ? "/login" : "/signup"}
//                 className="underline underline-offset-4"
//               >
//                 {isSignup ? "Login" : "Sign up"}
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side (Image) */}
//       <div className="relative hidden bg-muted lg:block">
//         <img
//           src="https://albahjah.or.id/wp-content/uploads/2024/09/Side-Bar-Website-768x576.jpg"
//           alt="Auth Banner"
//           className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
//         />
//       </div>
//     </div>
//   );
// }

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { toast } from "sonner";
import PasswordInput from "@/components/ui/password-input";
import { InputWithEndIcon } from "@/components/ui/input-with-end-icon";
import { MailIcon } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import supabase from "@/supabase/client";

export interface AuthFormProps {
  type: "login" | "signup" | "forgot" | "reset" | "confirm" | "error";
}

export default function Auth(
  props: AuthFormProps & React.ComponentProps<"form">
) {
  const { className, type } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (type === "confirm") {
      const searchParams = new URLSearchParams(location.search);
      const token_hash = searchParams.get("token_hash");
      const otp_type = searchParams.get("type") as
        | "signup"
        | "invite"
        | "magiclink"
        | "recovery"
        | null;
      const next = searchParams.get("next") || "/";

      if (token_hash && otp_type) {
        supabase.auth
          .verifyOtp({
            type: otp_type,
            token_hash,
          })
          .then(({ error }) => {
            if (!error) {
              navigate(next);
            } else {
              navigate(`/auth/error?error=${error.message}`);
            }
          });
      } else {
        navigate(`/auth/error?error=No token hash or type`);
      }
    }
  }, [type, location, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate("/dashboard");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      toast.success("Check your email for the confirmation link!");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      navigate("/dashboard");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (type === "confirm") {
    const searchParams = new URLSearchParams(location.search);
    const token_hash = searchParams.get("token_hash");
    const otp_type = searchParams.get("type") as
      | "signup"
      | "invite"
      | "magiclink"
      | "recovery"
      | null;
    const next = searchParams.get("next") || "/";

    useEffect(() => {
      if (!token_hash || !otp_type) {
        navigate(
          `/auth/error?error=${encodeURIComponent("Missing token or type")}`
        );
        return;
      }

      supabase.auth
        .verifyOtp({
          type: otp_type,
          token_hash,
        })
        .then(({ error }) => {
          if (error) {
            navigate(`/auth/error?error=${encodeURIComponent(error.message)}`);
          } else {
            navigate(next);
          }
        });
    }, [token_hash, otp_type, navigate, next]);

    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-2">
            Confirming your email...
          </p>
          <p className="text-xs text-muted-foreground">
            Please wait while we verify your account.
          </p>
        </div>
      </div>
    );
  }

  if (type === "error") {
    const searchParams = new URLSearchParams(location.search);
    const errorMsg = searchParams.get("error");

    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-bold">
                Oops, something went wrong.
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                {errorMsg
                  ? `Error: ${decodeURIComponent(errorMsg)}`
                  : "An unexpected error occurred."}
              </p>
              <div className="mt-4 text-center">
                <Link to="/login" className="text-sm underline text-primary">
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <Logo />
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <form
              className={cn("flex flex-col gap-6", className)}
              onSubmit={
                type === "login"
                  ? handleLogin
                  : type === "signup"
                  ? handleSignUp
                  : type === "forgot"
                  ? handleForgotPassword
                  : type === "reset"
                  ? handleResetPassword
                  : undefined
              }
              {...props}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">
                  {type === "signup"
                    ? "Sign up"
                    : type === "forgot"
                    ? "Forgot your password?"
                    : type === "reset"
                    ? "Reset Your Password"
                    : success
                    ? ""
                    : "Login to your account"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {type === "signup"
                    ? "Create a new account"
                    : type === "forgot"
                    ? "Type in your email and we’ll send you a link to reset your password"
                    : type === "reset"
                    ? "Please enter your new password below."
                    : "Enter your email below to login to your account"}
                </p>
              </div>
              <div className="grid gap-6">
                {type !== "reset" && (
                  <InputWithEndIcon
                    id="email"
                    label="Email"
                    type="email"
                    required
                    endIcon={<MailIcon size={16} aria-hidden="true" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                )}

                {(type === "login" ||
                  type === "signup" ||
                  type === "reset") && (
                  <PasswordInput
                    label="Password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    forgot={type === "login"}
                  />
                )}

                {type === "signup" && (
                  <PasswordInput
                    label="Confirm Password"
                    name="confirmPassword"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                )}

                {error && <p className="text-sm text-red-500">{error}</p>}
                {success && (
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Check your email</h1>
                    <p className="text-sm text-muted-foreground">
                      Password reset instructions sent
                    </p>
                    <p className="text-sm text-muted-foreground mt-9">
                      If you registered using your email and password, you will
                      receive a password reset email.
                    </p>
                  </div>
                )}

                {(type as string) !== "confirm" && (
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading
                      ? type === "signup"
                        ? "Creating account..."
                        : type === "reset"
                        ? "Saving new password..."
                        : "Processing..."
                      : type === "signup"
                      ? "Sign up"
                      : type === "forgot"
                      ? "Send reset email"
                      : type === "reset"
                      ? "Save new password"
                      : "Login"}
                  </Button>
                )}
              </div>
              {(type === "login" || type === "signup") && (
                <>
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="bg-background text-muted-foreground relative z-10 px-2">
                      Or continue with
                    </span>
                  </div>
                  <Button
                    className="flex items-center gap-2 w-full"
                    type="button"
                    onClick={() =>
                      toast.info(
                        "Maaf, fitur ini masih dalam proses. Kami sedang mengembangkan fitur ini, silakan coba lagi nanti"
                      )
                    }
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    {type === "signup" ? "Sign up" : "Login"} with Google
                  </Button>
                  <div className="text-center text-sm">
                    {type === "signup"
                      ? "Already have an account? "
                      : "Don't have an account? "}
                    <Link
                      to={type === "signup" ? "/login" : "/signup"}
                      className="underline underline-offset-4"
                    >
                      {type === "signup" ? "Login" : "Sign up"}
                    </Link>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
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
