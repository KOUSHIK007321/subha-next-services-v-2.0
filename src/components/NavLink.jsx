"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ label, href }) {
  const pathname = usePathname();
  return (
    <Link
      className={`${
        pathname === href
          ? "text-slate-200 active: bg-slate-700 rounded-md px-4 py-3 text-sm font-medium"
          : "text-slate-200 hover:bg-slate-700 hover:text-white rounded-md px-4 py-3 text-sm font-medium"
      } `}
      href={href}
    >
      {label}
    </Link>
  );
}
