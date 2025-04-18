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
    <Card className="p-8 bg-black text-white flex flex-col justify-center items-stretch gap-4 border-2 rounded-2xl mx-5 mx-md-auto mt-[10rem] w-[85%] md:w-1/2 lg:w-1/3">
      <CardHeader>
        <CardTitle className="text-5xl md:text-7xl sm:text-nowrap">{pathname === "/logIn" ? "Log In" : "Sign Up"}</CardTitle>
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
          <p className="mx-auto my-1.5 text-center">
            already have an account? <Link className="border-b-2 border-b-white" href="/logIn">Log In</Link>
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
