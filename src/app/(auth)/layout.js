"use client";

import {  usePathname } from "next/navigation";
import "./AuthLayout.scss";
import Link from "next/link";

export default function AuthLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="authLayout">
      {children}

      {pathname === "/logIn" ? (
        <p>
          don&apos;t have an account? <Link href="/signUp">Sign Up</Link>
        </p>
      ) : (
        <p>
          already have an account? <Link href="/logIn">Log In</Link>
        </p>
      )}
    </div>
  );
}
