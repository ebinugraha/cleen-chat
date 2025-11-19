import { RegisterForm } from "@/features/auth/ui/components/register-form";
import { AuthFormLayout } from "@/features/auth/ui/layout/auth-form-layout";
import { requireUnauth } from "@/lib/auth-utils";

const Page = async () => {
  await requireUnauth();

  return (
    <AuthFormLayout>
      <RegisterForm />
    </AuthFormLayout>
  );
};

export default Page;
