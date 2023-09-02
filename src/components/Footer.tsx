import { Facebook, Twitter, Github, Dribbble } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    icon: Facebook,
    href: "#",
  },
  {
    icon: Twitter,
    href: "#",
  },
  {
    icon: Github,
    href: "#",
  },
  {
    icon: Dribbble,
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-white py-8 sm:py-10">
      <div className="container max-w-full w-full flex justify-between items-center gap-4 flex-wrap">
        <div>
          <p className="text-base text-[#6B7280]">
            © 2023 Themesberg, LLC. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          {footerLinks.map(({ icon: Icon, href }, i) => (
            <Link
              key={i}
              href={href}
              target="_blank"
              className="text-black/70 hover:text-black p-2 transition-colors duration-300 outline-none focus:ring-2 focus:ring-black/40 rounded-md"
            >
              <Icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
