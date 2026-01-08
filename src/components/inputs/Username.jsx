import { useTranslation } from "react-i18next";

const Username = ({ fullName, setFullName }) => {
  const { t } = useTranslation();

  return (
    <div className="username_input">
      <label>{t("fullNameLabel")}</label>
      <input
        type="text"
        placeholder={t("fullNamePlaceholder")}
        className="username-input"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
    </div>
  );
};

export default Username;
