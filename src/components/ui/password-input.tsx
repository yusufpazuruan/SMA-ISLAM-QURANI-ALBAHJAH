"use client";

import { useId, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

export interface PasswordInputProps {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  forgot?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({
  label,
  name,
  placeholder,
  className,
  required,
  forgot,
  value,
  onChange,
}: PasswordInputProps) {
  const id = useId();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center">
        <Label htmlFor={id}>{label}</Label>
        {forgot && (
          <Link
            to="/forgot-password"
            className="ml-auto text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </Link>
        )}
      </div>
      <div className="relative">
        <Input
          id={id}
          className="pe-9"
          placeholder={placeholder ? placeholder : "*********"}
          type={isVisible ? "text" : "password"}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
        />
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls="password"
        >
          {isVisible ? (
            <EyeOffIcon size={16} aria-hidden="true" />
          ) : (
            <EyeIcon size={16} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
