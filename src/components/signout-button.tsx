"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import supabase from "@/supabase/client";
import { LogOutIcon } from "lucide-react";
import { useState } from "react";

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Failed to sign out", {
        description: error.message,
      });
    } else {
      toast.success("Signed out successfully", {
        description:
          "You have been signed out successfully, Please login again!",
        duration: 15000,
      });
      navigate("/login");
    }

    setIsLoading(false);
  };

  return (
    <Button
      onClick={handleSignOut}
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      <LogOutIcon size={16} aria-hidden="true" />
      {isLoading ? "Signing out..." : "Sign Out"}
    </Button>
  );
}
