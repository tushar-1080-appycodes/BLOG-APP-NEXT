"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AuthLayout({ children }) {
  const pathname = usePathname();
  const [title,className] = pathname === "/logIn" ? ["Log In","login"] : ["Sign Up","signup"];

  return (
    <Card className={`authLayout ${className}`}>
      <CardHeader>
        <CardTitle className="">{title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        {pathname === "/logIn" ? (
          <p className="mx-auto my-1.5">
            don&apos;t have an account?{" "}
            <Link className="border-b-2 border-b-white" href="/signUp">
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="mx-auto my-1.5 text-center">
            already have an account?{" "}
            <Link className="border-b-2 border-b-white" href="/logIn">
              Log In
            </Link>
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
