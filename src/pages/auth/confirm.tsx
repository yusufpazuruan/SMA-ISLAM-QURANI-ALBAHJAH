import { useEffect } from "react";
import supabase from "@/supabase/client";
import { useNavigate } from "react-router";

export default function Confirm() {
  const searchParams = new URLSearchParams(location.search);
  const token_hash = searchParams.get("token_hash");
  const otp_type = searchParams.get("type") as
    | "signup"
    | "invite"
    | "magiclink"
    | "recovery"
    | null;
  const next = searchParams.get("next") || "/";

  const navigate = useNavigate();

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

