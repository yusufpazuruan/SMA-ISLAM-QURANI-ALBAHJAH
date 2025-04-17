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

import supabase from "@/supabase/client";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import {
  isEmailExist,
  isUserIdExist,
  isUserProfileComplete,
} from "@/db/action/user";

export default function ProtectedLayout() {
  const [loading, setLoading] = useState(true); // Status loading
  const [allowed, setAllowed] = useState(false); // Status akses diperbolehkan
  const [sessionData, setSessionData] = useState(null); // Data session dari Supabase
  const navigate = useNavigate();

  // Verifikasi session di awal
  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session || !session.user) {
      console.log("Session tidak ditemukan, arahkan ke /login");
      navigate("/login");
      return null; // Kembalikan null jika session tidak ditemukan
    }

    return session; // Kembalikan session jika ada
  };

  // Verifikasi status pengguna
  const verifyUserStatus = async (session: any) => {
    const user = session.user;
    const userId = user.id;
    const email = user.email;

    console.log("Verifikasi ID dan email pengguna");

    const [idExists, emailExists, profileComplete] = await Promise.all([
      isUserIdExist(userId),
      isEmailExist(email || ""),
      isUserProfileComplete(userId),
    ]);

    return {
      idExists,
      emailExists,
      profileComplete,
      user,
    };
  };

  // Siapkan session payload untuk dikirim ke halaman onboarding
  const prepareSessionPayload = (session: any, user: any) => {
    return {
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
      expiresIn: session.expires_in,
      expiresAt: session.expires_at,
      tokenType: session.token_type,
      providerToken: session.provider_token,
      userId: user.id,
      email: user.email,
      role: user.role,
      phone: user.phone,
      confirmedAt: user.confirmed_at,
      lastSignIn: user.last_sign_in_at,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      isAnonymous: user.is_anonymous,
      appMetadata: user.app_metadata || {},
      userMetadata: user.user_metadata || {},
      avatarUrl: user.user_metadata?.avatar_url,
      fullName: user.user_metadata?.full_name,
      name: user.user_metadata?.name,
      emailVerified: user.user_metadata?.email_verified,
      phoneVerified: user.user_metadata?.phone_verified,
      picture: user.user_metadata?.picture,
      providerId: user.user_metadata?.provider_id,
      sub: user.user_metadata?.sub,
      iss: user.user_metadata?.iss,
      identities: user.identities || [],
      primaryIdentity: user.identities?.[0] || {},
      identityData: user.identities?.[0]?.identity_data || {},
    };
  };

  // Arahkan ke halaman yang sesuai
  const handleRedirection = (idExists: boolean, emailExists: boolean, profileComplete: boolean, sessionPayload: any) => {
    if (!idExists || !emailExists || !profileComplete) {
      console.log("Data tidak lengkap, arahkan ke /onboarding");
      navigate("/example/onboarding", { state: sessionPayload });
    } else {
      console.log("Data valid, lanjutkan ke konten utama");
      setAllowed(true); // Mengatur allowed menjadi true jika data valid
    }
  };

  // Verifikasi session dan menyiapkan data session
  useEffect(() => {
    const verifySession = async () => {
      const session = await checkSession();
      if (!session) return;
      
      setSessionData(session); // Menyimpan sessionData jika session valid
    };

    verifySession();
  }, [navigate]); // Verifikasi hanya sekali saat komponen pertama kali dimuat

  // Verifikasi status pengguna dan menangani pengalihan
  useEffect(() => {
    if (sessionData) {
      const verifyStatus = async () => {
        const { idExists, emailExists, profileComplete, user } = await verifyUserStatus(sessionData);
        const sessionPayload = prepareSessionPayload(sessionData, user);
        handleRedirection(idExists, emailExists, profileComplete, sessionPayload);
      };
      verifyStatus();
    }
  }, [sessionData]); // Jalankan saat sessionData berubah

  // Mengatur loading menjadi false setelah allowed diubah menjadi true
  useEffect(() => {
    if (allowed) {
      setLoading(false); // Mengubah status loading menjadi false
    }
  }, [allowed]); // Dijalankan setiap kali allowed berubah

  // Menghandle loading
  if (loading) return <div>Loading...</div>;

  // Tampilkan outlet jika allowed, atau arahkan ke /login jika tidak
  return allowed ? <Outlet /> : <Navigate to="/login" />;
}
