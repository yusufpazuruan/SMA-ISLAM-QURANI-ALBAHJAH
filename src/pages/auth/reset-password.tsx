import { Button } from "@/components/ui/button";
import supabase from "@/supabase/client";
import { useState } from "react";
import PasswordInput from "@/components/ui/password-input";
import { useNavigate } from "react-router";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
  return (
    <div>
      <form onSubmit={handleResetPassword} className="space-y-6 mt-4">
        <div className="space-y-6">
          <PasswordInput
            label="Password"
            name="password"
            required
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save new password"}
        </Button>
      </form>
    </div>
  );
}
