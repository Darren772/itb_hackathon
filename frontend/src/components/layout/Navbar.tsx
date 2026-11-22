"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusSquare, MessageCircle, Bell, User } from "lucide-react";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data";

const TABS = [
  { href: "/feed",          label: "Jelajah",   Icon: Home },
  { href: "/groups/create", label: "Buat Grup",  Icon: PlusSquare },
  { href: "/requests",      label: "Lamaran",    Icon: MessageCircle },
  { href: "/notifications", label: "Notifikasi", Icon: Bell },
  { href: "/profile",       label: "Profil",     Icon: User },
];

export default function Navbar() {
  const pathname = usePathname();
  const unread = MOCK_NOTIFICATIONS.filter((n) => !n.is_read).length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-surface-2">
      <div className="flex items-center justify-around px-2 pb-safe">
        {TABS.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          const isNotif = href === "/notifications";
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-1 flex-col items-center gap-0.5 py-3 text-[10px] font-semibold tracking-wide transition-colors ${
                active ? "text-brand-600" : "text-ink-muted hover:text-ink-secondary"
              }`}
            >
              <span className="relative">
                <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
                {isNotif && unread > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                    {unread}
                  </span>
                )}
              </span>
              <span>{label}</span>
              {active && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-brand-600" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
