import { useParams } from "react-router-dom";
import { AuthCard } from "@daveyplate/better-auth-ui";
import { arabicLocalization } from "@/localization/arabic-localization";

const AuthPage = () => {
  const { pathname } = useParams();
  return (
    <main className=" container flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
      <AuthCard
        pathname={pathname}
        socialLayout="horizontal"
        localization={arabicLocalization}
        classNames={{
          base: "text-right py-6",
          title: "text-xl",
          description: "text-md",
          footerLink: "cursor-pointer",
          form: {
            button: "cursor-pointer",
            label: "mt-4 relative",
            input: "text-sm",
            error: "text-right",
          },
          continueWith: "mt-4 block mx-auto",
        }}
      />
    </main>
  );
};

export default AuthPage;
