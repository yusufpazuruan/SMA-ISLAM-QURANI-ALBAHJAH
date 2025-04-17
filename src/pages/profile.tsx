import { useUser } from "@/hooks/use-user";
import { useAuth } from "@workos-inc/authkit-react";
import { Input } from "@/components/ui/input";

export default function Account() {
  const user = useUser();
  const { role, organizationId } = useAuth();

  if (!user) {
    return "...";
  }

  const userFields = [
    ["First name", user.firstName],
    ["Last name", user.lastName],
    ["Email", user.email],
    role ? ["Role", role] : [],
    ["Id", user.id],
    organizationId ? ["Organization Id", organizationId] : [],
  ].filter((arr) => arr.length > 0);

  return (
    <div className="flex flex-col items-center mb-10 px-4">
      <div className="flex flex-col gap-2 mb-6 text-center">
        <h1 className="text-3xl font-bold">Account details</h1>
        <p className="text-gray-600 text-lg">Below are your account details</p>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">
        {userFields.map(([label, value]) => (
          <div key={value} className="flex items-center gap-4">
            <label className="w-32 font-medium text-sm">{label}</label>
            <Input value={value || ""} readOnly />
          </div>
        ))}
      </div>
    </div>
  );
}
