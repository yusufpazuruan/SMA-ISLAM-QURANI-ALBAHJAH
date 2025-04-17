import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import { InputWithEndIcon } from "@/components/ui/input-with-end-icon";
import { MailIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import supabase from "@/supabase/client";
import SignInGoogleButton from "@/components/signin-google";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


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

  return (

    <div className="space-y-6 mt-4">
      {/* FORM CONTENT */}
      <form onSubmit={handleLogin}>
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
            forgot
          />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
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
      
      <SignInGoogleButton type="login"/>
      {/* SIGN UP PLACEHOLDER */}
      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link to="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </p>
    </div>
  );
}
