import clsx from "clsx";
import Image from "next/image";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <div className="flex items-center justify-center">
      <Image
        alt="Logo"
        src="/images/logo.svg"
        width={144}
        height={36}
        className={clsx("h-auto", {
          "w-28": size === "sm",
          "w-36": size === "md",
          "w-40": size === "lg",
        })}
      />
    </div>
  );
}
