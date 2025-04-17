import SignOutButton from "@/components/signout-button";
import supabase from "@/supabase/client";
import { useEffect, useState } from "react";

export default function Admin() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: dataUser } = await supabase.auth.getSession();
      setData(dataUser);
    };

    getSession();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Admin Page session: WELCOME 😘 {data?.user?.email} <SignOutButton />

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}