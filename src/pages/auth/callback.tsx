// import { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router";
// import supabase from "@/helper/supabase/client";
// import { isEmailExist } from "@/db/action/user";

// export default function AuthCallback() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [identity, setIdentity] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const handleRedirect = async () => {
//       try {
//         const { data, error } = await supabase.auth.getUserIdentities();

//         if (error || !data?.identities?.length) {
//           navigate("/login");
//           return;
//         }

//         const identity = data.identities[0];
//         const email = identity?.identity_data?.email;

//         // Simpan identity dulu untuk jaga-jaga jika perlu render data dulu
//         setIdentity(identity);

//         const exists = await isEmailExist(email);
//         const type = searchParams.get("type");

//         alert(exists);

//         if (!exists) {
//           // navigate("/onboarding");

//           console.log("yes");
//         } else {
//           navigate(type === "signup" ? "/onboarding" : "/dashboard");
//         }
//       } catch (err) {
//         console.error("Auth error:", err);
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };

//     handleRedirect();
//   }, []);

//   if (loading || !identity) {
//     return <p>Loading user identity...</p>;
//   }

//   // Ambil semua data ke dalam variabel
//   const {
//     identity_id,
//     id,
//     user_id,
//     provider,
//     last_sign_in_at,
//     created_at,
//     updated_at,
//     email,
//     identity_data = {},
//   } = identity;

//   const {
//     avatar_url,
//     full_name,
//     name,
//     email_verified,
//     phone_verified,
//     provider_id,
//     picture,
//     sub,
//     iss,
//   } = identity_data;

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h2>User Identity</h2>
//       {avatar_url && (
//         <img
//           src={avatar_url}
//           alt="Avatar"
//           style={{
//             width: 96,
//             height: 96,
//             borderRadius: "50%",
//             marginBottom: 16,
//           }}
//         />
//       )}
//       <p>
//         <strong>Identity ID:</strong> {identity_id}
//       </p>
//       <p>
//         <strong>ID:</strong> {id}
//       </p>
//       <p>
//         <strong>User ID:</strong> {user_id}
//       </p>
//       <p>
//         <strong>Provider:</strong> {provider}
//       </p>
//       <p>
//         <strong>Email:</strong> {email}
//       </p>
//       <p>
//         <strong>Last Sign In:</strong> {last_sign_in_at}
//       </p>
//       <p>
//         <strong>Created At:</strong> {created_at}
//       </p>
//       <p>
//         <strong>Updated At:</strong> {updated_at}
//       </p>

//       <h3>Identity Data</h3>
//       <p>
//         <strong>Full Name:</strong> {full_name}
//       </p>
//       <p>
//         <strong>Name:</strong> {name}
//       </p>
//       <p>
//         <strong>Email Verified:</strong> {email_verified ? "Yes" : "No"}
//       </p>
//       <p>
//         <strong>Phone Verified:</strong> {phone_verified ? "Yes" : "No"}
//       </p>
//       <p>
//         <strong>Provider ID:</strong> {provider_id}
//       </p>
//       <p>
//         <strong>Sub:</strong> {sub}
//       </p>
//       <p>
//         <strong>ISS:</strong> {iss}
//       </p>
//       <p>
//         <strong>Picture:</strong>{" "}
//         <a href={picture} target="_blank" rel="noopener noreferrer">
//           {picture}
//         </a>
//       </p>
//     </div>
//   );
// }
