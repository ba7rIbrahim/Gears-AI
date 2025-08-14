import { arabicLocalization } from "@/localization/arabic-localization";
import { AccountSettingsCards } from "@daveyplate/better-auth-ui";

const AccoutSettingPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">إعدادات الحساب</h1>
      <AccountSettingsCards localization={arabicLocalization} />
    </div>
  );
};

export default AccoutSettingPage;
