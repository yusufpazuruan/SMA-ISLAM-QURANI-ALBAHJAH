import { useLocation } from "react-router";
import { useForm } from "react-hook-form";

export default function OnboardingPage() {
  const { state: session } = useLocation();

  const user = session?.user;
  const userId = user?.id;
  const email = user?.email;
  const confirmedAt = user?.confirmed_at;
  const lastSignIn = user?.last_sign_in_at;
  const createdAt = user?.created_at;
  const updatedAt = user?.updated_at;
  const userMetadata = user?.user_metadata || {};
  const avatarUrl = userMetadata?.avatar_url;
  const fullName = userMetadata?.full_name;
  const emailVerified = userMetadata?.email_verified;

  console.log(session)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullname: fullName || "",
      email: email || "",
      avatar_url: avatarUrl || "",
      username: "", // user isi sendiri
      gender: "",
      city: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Data onboarding:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("fullname")} placeholder="Full Name" />
      <input {...register("email")} placeholder="Email" />
      <input {...register("avatar_url")} placeholder="Avatar URL" />
      <input {...register("username")} placeholder="Username" />
      <select {...register("gender")}>
        <option value="">Pilih Gender</option>
        <option value="L">Laki-laki</option>
        <option value="P">Perempuan</option>
      </select>
      <input {...register("city")} placeholder="Kota" />
      <button type="submit">Lanjutkan</button>
    </form>
  );
}
