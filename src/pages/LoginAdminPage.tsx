import LoginFormAdmin from "@/components/form/form-login-admin";
import LoginForm from "@/components/form/login-form";
import { AuthLayoutAdmin } from "@/components/layouts/auth-layouts";

export function LoginAdminPage() {
  return (
    <AuthLayoutAdmin>
      <LoginFormAdmin />
    </AuthLayoutAdmin>
  );
}
