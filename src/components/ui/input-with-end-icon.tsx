import { useId, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const InputWithEndIcon = forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input> & {
    endIcon?: React.ReactNode;
    label?: string;
    className?: string;
    placeholder?: string;
  }
>(({ endIcon, className, label, placeholder, ...props }, ref) => {
  const id = useId();
  return (
    <div className={cn("relative *:not-first:mt-2" , className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <Input
          id={id}
          className={cn("peer pe-9", className)}
          placeholder={placeholder ? placeholder : "yusufpazuruan@gmail.com"}
          ref={ref}
          {...props}
        />
        {endIcon && (
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
            {endIcon}
          </div>
        )}
      </div>
    </div>
  );
});
