import { Button } from "@/components/ui/button";
// import Logo from "@/components/logo";
import { InputWithEndIcon } from "@/components/ui/input-with-end-icon";
import { MailIcon } from "lucide-react";
import supabase from "@/supabase/client";
import { useState } from "react";
import { Link } from "react-router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  return (
    <div className="space-y-6 mt-4">
      {success ? (
        <div>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Reset Your Password</h1>
            <p className="text-sm text-muted-foreground">
              Password reset instructions sent
            </p>
          </div>

          <p className="text-center text-sm mt-4">
            If you registered using your email and password, you will receive a
            password reset email.
          </p>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Reset Your Password</h1>
            <p className="text-sm text-muted-foreground">
              Type in your email and we&apos;ll send you a link to reset your
              password
            </p>
          </div>
          <form onSubmit={handleForgotPassword} className="space-y-6 mt-8">
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
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send reset email"}
            </Button>
          </form>

          {/* SIGN UP PLACEHOLDER */}
          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Login
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
