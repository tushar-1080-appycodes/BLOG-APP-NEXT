"use client";

import { usePathname } from "next/navigation";
// import "./AuthLayout.scss";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AuthLayout({ children }) {
  const pathname = usePathname();

  return (
    <Card className="p-2 bg-black text-white self-center flex flex-col gap-4 border-2 rounded-2xl mt-[20%] lg:my-[2%] w-[90%] md:w-[80%] lg:w-1/3">
      <CardHeader>
        <CardTitle className="text-5xl md:text-7xl p-4">{pathname === "/logIn" ? "Log In" : "Sign Up"}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        {pathname === "/logIn" ? (
          <p className="mx-auto my-1.5">
            don&apos;t have an account? <Link className="border-b-2 border-b-white" href="/signUp">Sign Up</Link>
          </p>
        ) : (
          <p className="mx-auto my-1.5">
            already have an account? <Link className="border-b-2 border-b-white" href="/logIn">Log In</Link>
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
