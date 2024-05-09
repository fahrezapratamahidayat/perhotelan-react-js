import RegisterForm from "@/components/form/register-form";
import AuthLayout from "@/components/layouts/auth-layouts";

export default function RegisterPage() {
  return (
    <AuthLayout title="Already have an account?" to="/auth/login">
      <RegisterForm />
    </AuthLayout>
  );
}
