// //@ts-nocheck
// import supabase from "@/helper/supabase/client";
// import { useEffect, useState } from "react";
// import { Navigate, Outlet, useNavigate } from "react-router";
// import { isEmailExist, isUserIdExist, isUserProfileComplete } from "@/db/action/user";

// export default function ProtectedLayout() {
//   const [loading, setLoading] = useState(true);
//   const [allowed, setAllowed] = useState(false);
//   const [sessionData, setSessionData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyUser = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();

//       if (!session || !session.user) {
//         navigate("/login");
//         return;
//       }

//       setSessionData(session); // simpan session lengkap

//       const userId = session.user.id;
//       const email = session.user.email;

//       const [idExists, emailExists, profileComplete] = await Promise.all([
//         isUserIdExist(userId),
//         isEmailExist(email),
//         isUserProfileComplete(userId),
//       ]);

//       if (!idExists || !emailExists || !profileComplete) {
//         navigate("/onboarding");
//         return;
//       }

//       setAllowed(true);
//       setLoading(false);
//     };

//     verifyUser();
//   }, [navigate]);

//   // Ambil semua data dari sessionData
//   const accessToken = sessionData?.access_token;
//   const refreshToken = sessionData?.refresh_token;
//   const expiresIn = sessionData?.expires_in;
//   const expiresAt = sessionData?.expires_at;
//   const tokenType = sessionData?.token_type;
//   const providerToken = sessionData?.provider_token;

//   const user = sessionData?.user;
//   const userId = user?.id;
//   const email = user?.email;
//   const role = user?.role;
//   const phone = user?.phone;
//   const confirmedAt = user?.confirmed_at;
//   const lastSignIn = user?.last_sign_in_at;
//   const createdAt = user?.created_at;
//   const updatedAt = user?.updated_at;
//   const isAnonymous = user?.is_anonymous;

//   const appMetadata = user?.app_metadata || {};
//   const userMetadata = user?.user_metadata || {};
//   const avatarUrl = userMetadata?.avatar_url;
//   const fullName = userMetadata?.full_name;
//   const name = userMetadata?.name;
//   const emailVerified = userMetadata?.email_verified;
//   const phoneVerified = userMetadata?.phone_verified;
//   const picture = userMetadata?.picture;
//   const providerId = userMetadata?.provider_id;
//   const sub = userMetadata?.sub;
//   const iss = userMetadata?.iss;

//   const identities = user?.identities || [];
//   const primaryIdentity = identities[0] || {};
//   const identityId = primaryIdentity?.identity_id;
//   const identityData = primaryIdentity?.identity_data || {};
//   const identityProvider = primaryIdentity?.provider;
//   const identityCreatedAt = primaryIdentity?.created_at;
//   const identityUpdatedAt = primaryIdentity?.updated_at;

//   if (loading) return <div>Loading...</div>;

//   return allowed ? <Outlet /> : <Navigate to="/login" />;
// }

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import {
  isUserDataComplete,
  isUserStatusPending,
  verifyUser,
} from "@/db/action/user";
import { toast } from "sonner";

export default function ProtectedLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserVerification = async () => {
      const session = await verifyUser();
      if (!session) {
        navigate("/login");
        return;
      }

      const userDataComplete = await isUserDataComplete(session.id);
      if (!userDataComplete) {
        navigate("/onboarding");
        return;
      }

      const userStatusPending = await isUserStatusPending(session.id);
      if (userStatusPending) {
        navigate("/account-status");
        return;
      }
    };

    handleUserVerification();
  }, [navigate]);

  return <Outlet />;
}
