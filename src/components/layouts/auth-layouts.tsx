import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function AuthLayout({
  children,
  title,
  to,
}: {
  children: React.ReactNode;
  title: string;
  to: string;
}) {
  return (
    <>
      <div className="flex items-center min-h-screen flex-col justify-center bg-black">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="">
            <CardTitle className="text-2xl">
              {to === "/auth/register" ? "Login" : "Register"}
            </CardTitle>
            <CardDescription>
              {to === "/auth/register" ? "Enter your email below to login to your accountt" : "Enter your information to create an account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
        </Card>
        <div className="mt-4 text-center text-sm">
          {title}{" "}
          <Link to={to} className="underline">
            {to === "/auth/login" ? "Sign up" : "Sign in"}
          </Link>
        </div>
      </div>
    </>
  );
}
