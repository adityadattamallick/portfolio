"use client";

import { profile } from "@/data/profile";

export function EmailLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const openMail = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const { user, domain } = profile.email;
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <a href="#contact" className={className} onClick={openMail}>
      {children}
    </a>
  );
}
