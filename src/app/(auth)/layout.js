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
    <Card className="p-4 bg-black text-white  flex flex-col justify-center items-start jus gap-4 border-2 rounded-2xl mx-5 mt-[20%] lg:mt-[15%] w-fit">
      <CardHeader>
        <CardTitle className="text-5xl md:text-7xl text-nowrap p-4">{pathname === "/logIn" ? "Log In" : "Sign Up"}</CardTitle>
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
