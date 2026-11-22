/**
 * Navbar — bottom tab bar (mobile-first)
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, MessageCircle, Bell, User } from "lucide-react";

const TABS = [
  { href: "/feed",          label: "Feed",        Icon: Home },
  { href: "/groups/create", label: "Create",       Icon: Users },
  { href: "/requests",      label: "Requests",     Icon: MessageCircle },
  { href: "/notifications", label: "Alerts",       Icon: Bell },
  { href: "/profile",       label: "Profile",      Icon: User },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white">
      <div className="flex items-center justify-around">
        {TABS.map(({ href, label, Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-medium transition-colors ${
                active ? "text-brand-600" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
