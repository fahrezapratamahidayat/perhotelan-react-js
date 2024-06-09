import LoginForm from "@/components/form/login-form";
import { AuthLayout } from "@/components/layouts/auth-layouts";

export function LoginPage() {
  return (
    <AuthLayout title="Don't have an account?" to="/auth/register">
      <LoginForm />
    </AuthLayout>
  );
}
