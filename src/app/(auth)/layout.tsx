import { AuthLayout } from "@/features/auth/ui/layout/auth-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
