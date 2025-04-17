"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PasswordInput from "@/components/ui/password-input";
import { InputWithEndIcon } from "@/components/ui/input-with-end-icon";
import { MailIcon } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import supabase from "@/supabase/client";
import SignInGoogleButton from "@/components/signin-google";
import { isEmailExist } from "@/db/action/user";
import { useNavigate } from "react-router";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const emailExist = await isEmailExist(email);
    if (emailExist) {
      toast.warning("Email already exists, please login to continue a dashboard.");
      setIsLoading(false);
      navigate("/login");
      return;
    }

    if (password == email) {
      setError("Password tidak boleh sama dengan email");
      setIsLoading(false);
      return;
    }

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
          emailRedirectTo: `${window.location.origin}/create-new-user`,
        },
      });
      if (error) throw error;
      toast.success("Thank you for signing up!", {
        description:
          "You've successfully signed up.\nPlease check your email to confirm your account before signing in.",
        duration: 15000,
      });
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="space-y-6 mt-4">
      {/* FORM CONTENT */}
      <form onSubmit={handleSignUp}>
        <div className="space-y-6">
          <InputWithEndIcon
            id="email"
            label="Email"
            type="email"
            required
            endIcon={<MailIcon size={16} aria-hidden="true" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            label="Password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating an account..." : "Signup"}
          </Button>
        </div>
      </form>
      {/* SOCIAL LOGIN */}
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
        {/* SOCIAL BUTTONS */}
      </div>
      <SignInGoogleButton type="signup"/>
      {/* SIGN UP PLACEHOLDER */}
      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </p>
    </div>
  );
}
