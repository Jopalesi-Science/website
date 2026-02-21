"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-6">
      {/* Logo / site name */}
      <Link href="/" className="text-sm tracking-[0.3em] uppercase opacity-80 hover:opacity-100 transition-opacity">
        Jopalesi
      </Link>

      {/* Route links */}
      <ul className="flex gap-8">
        {routes
          .filter((r) => r.path !== "/")
          .map((route) => {
            const isActive = pathname === route.path;
            return (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className={`text-xs tracking-[0.25em] uppercase transition-opacity ${
                    isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
                  }`}
                >
                  {route.code}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
