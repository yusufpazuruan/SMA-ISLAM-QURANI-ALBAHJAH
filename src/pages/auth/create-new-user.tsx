import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { createUser, isUserIdExist, verifyUser } from "@/db/action/user";
import { generateUsername } from "@/lib/utils";

export default function CreateNewUser() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserVerification = async () => {
      const session = await verifyUser();

      if (!session) {
        navigate("/login");
        return;
      }

      const type = searchParams.get("type"); // "signup" | "login" | null
      const { id, email = "", avatar_url = "", fullname = "" } = session;

      const idExists = await isUserIdExist(id);

      // === HANDLE TANPA TYPE ===
      if (!type) {
        if (idExists) {
          navigate("/dashboard");
        } else {
          const username = await generateUsername(fullname || email);
          await createUser({ id, email, avatar_url, fullname, username });
          navigate("/onboarding");
        }
        return;
      }

      // === HANDLE TYPE SIGNUP ===
      if (type === "signup") {
        if (!idExists) {
          const username = await generateUsername(fullname || email);
          await createUser({ id, email, avatar_url, fullname, username });
        }
        navigate("/onboarding");
        return;
      }

      // === HANDLE TYPE LOGIN ===
      if (type === "login") {
        if (!idExists) {
          const username = await generateUsername(fullname || email);
          await createUser({ id, email, avatar_url, fullname, username });
        }
        navigate("/dashboard");
        return;
      }

      // === TYPE TIDAK VALID ===
      navigate("/dashboard");
    };

    handleUserVerification();
  }, [navigate, searchParams]);

  return null;
}


/*
jika user sudah ada di postgres neondb & tanpa type-> redirect ke /dashboard
jika user belum ada di postgres neondb & tanpa type -> buat user -> redirect ke /onboarding

jika user sudah ada di postgres neondb & type=signup -> redirect ke /onboarding
jika user belum ada di postgres neondb & type=signup -> buat user -> redirect ke /onboarding

jika user sudah ada di postgres neondb & type=login -> redirect ke /dashboard
jika user belum ada di postgres neondb & type=login -> buat user -> redirect ke /dashboard
*/