import { arabicLocalization } from "@/localization/arabic-localization";
import { SecuritySettingsCards } from "@daveyplate/better-auth-ui";

const SecuritySettingPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">إعدادات الأمان</h1>
      <SecuritySettingsCards localization={arabicLocalization} />
    </div>
  );
};

export default SecuritySettingPage;
