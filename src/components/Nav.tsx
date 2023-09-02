"use client";

import { flowbiteTheme } from "@/utils";
import Logo from "./Logo";
import Button from "./Button";
import { Menu } from "lucide-react";
import clsx from "clsx";
import AnimateHeight from "react-animate-height";
import { Navbar, Flowbite } from "flowbite-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { name: "Product", href: "/product" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
];

export default function Nav() {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <Flowbite theme={{ theme: flowbiteTheme }}>
      <Navbar
        fluid
        rounded
        className="relative h-[75px] flex items-stretch justify-stretch [&>div]:flex-1 [&>div]:justify-between md:h-auto"
      >
        <Navbar.Brand
          href="/"
          className="focus-visible:outline-none focus:ring-2 focus:ring-blue-700/50 focus:border-none rounded-md"
        >
          <Logo />
        </Navbar.Brand>

        <div className="flex items-center order-1 md:order-2">
          <Button className="mr-4 md:mr-0">Get started</Button>
          <button
            onClick={() => setNavOpen((prev) => !prev)}
            className="h-fit block md:hidden rounded focus:ring-2 focus:ring-blue-700/50 focus:border-none focus-visible:outline-none"
          >
            <Menu className="w-7 h-7 focus:outline-none" />
          </button>
        </div>

        <Navbar.Collapse>
          {navLinks.map(({ href, name }, i) => (
            <Navbar.Link
              key={i}
              href={href}
              active={selectedLayoutSegment === name.toLowerCase()}
              className="text-base"
            >
              {name}
            </Navbar.Link>
          ))}
        </Navbar.Collapse>

        {/* mobile menu */}
        <AnimateHeight
          id="example-panel"
          duration={300}
          height={navOpen ? "auto" : 0}
          className="absolute left-0 top-[75px] w-full bg-white shadow-sm md:hidden"
        >
          <ul className="w-full flex flex-col">
            {navLinks.map(({ href, name }, i) => (
              <li key={i} className="text-base">
                <Link
                  href={href}
                  className={clsx(
                    "block font-medium px-4 py-2 hover:text-blue-700 transition-colors",
                    {
                      "text-blue-700":
                        selectedLayoutSegment === name.toLowerCase(),
                      "mb-4": i === navLinks.length - 1,
                    }
                  )}
                  onClick={() => setNavOpen(false)}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </AnimateHeight>
      </Navbar>
    </Flowbite>
  );
}
