"use client";

import { useRouter, usePathname } from "next/navigation";
import "./AuthLayout.scss";
import Link from "next/link";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="authLayout">
      {children}

      <hr />
      {
        pathname === "/Auth/logIn" ? (
            <p>
            don't have an account? <Link href="/Auth/signUp">Sign Up</Link>
            </p>
        ) : (
            <p>
            already have an account? <Link href="/Auth/logIn">Log In</Link>
            </p>
        )
      }
    </div>
  );
}
