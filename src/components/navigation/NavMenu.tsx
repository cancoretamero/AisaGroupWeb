import Link from "next/link";
import type { HTMLAttributes } from "react";
import clsx from "clsx";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#products", label: "Products" },
  { href: "#blog", label: "Blog" },
];

type NavMenuProps = {
  orientation?: "horizontal" | "vertical";
} & HTMLAttributes<HTMLUListElement>;

export function NavMenu({ orientation = "horizontal", className, ...props }: NavMenuProps) {
  return (
    <ul
      className={clsx(
        "flex gap-6 text-base font-medium tracking-tight text-muted",
        orientation === "vertical" && "flex-col text-lg",
        className,
      )}
      {...props}
    >
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="transition-colors duration-200 hover:text-ink focus-visible:text-ink"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export type { NavMenuProps };
