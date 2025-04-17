import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import supabase from "@/supabase/client";
import { useState } from "react";

export default function SignInGoogleButton({
  type,
}: {
  type: "login" | "signup";
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/create-new-user?type=${type}`,
        },
      });

      if (error) {
        toast.error(`Google ${type} failed: ${error.message}`);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      className="flex items-center gap-2 w-full"
      disabled={isLoading}
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      {isLoading
        ? type === "login"
          ? "Logging in..."
          : "Signing up..."
        : type === "login"
        ? "Login with Google"
        : "Sign up with Google"}
    </Button>
  );
}
