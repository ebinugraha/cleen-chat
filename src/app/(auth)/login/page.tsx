import { LoginForm } from "@/features/auth/ui/components/login-form";
import { AuthFormLayout } from "@/features/auth/ui/layout/auth-form-layout";
import { requireUnauth } from "@/lib/auth-utils";

const Page = async () => {
  await requireUnauth();

  return (
    <AuthFormLayout>
      <LoginForm />
    </AuthFormLayout>
  );
};

export default Page;
