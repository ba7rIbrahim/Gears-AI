import { authClient } from "@/lib/auth";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { useNavigate, NavLink } from "react-router-dom";

const LinkAdapter = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <NavLink to={href} className={className}>
    {children}
  </NavLink>
);

export function AuthProviders({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={navigate}
      Link={LinkAdapter}
    >
      {children}
    </AuthUIProvider>
  );
}
