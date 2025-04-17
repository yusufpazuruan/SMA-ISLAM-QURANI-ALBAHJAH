import { RiGraduationCapFill } from "@remixicon/react";

export default function Logo() {
  return (
    <div className="flex justify-center gap-2 md:justify-start">
      <a href="#" className="flex items-center gap-2 font-medium">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <RiGraduationCapFill className="size-5" />
        </div>
        <div className="flex flex-col -gap-2">
          <div className="text-sm font-bold">Sma Islam</div>
          <div className="text-muted-foreground text-xs">Qurani Al-Bahjah</div>
        </div>
      </a>
    </div>
  )
}