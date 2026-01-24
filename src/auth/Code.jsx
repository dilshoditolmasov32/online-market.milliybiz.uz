import React, { useState, useEffect, useContext } from "react";
import CodeInput from "./CodeInput";
import { useTranslation } from "react-i18next";
import { useOtp } from "../hooks/useOtp.jsx";
import { AuthContext } from "../auth/context/AuthContext.jsx";

export default function Code({ title, setBack, phone, fullName }) {
  const [code, setCode] = useState(Array(6).fill(""));
  const [localError, setLocalError] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [resendTimeout, setResendTimeout] = useState(120);

  const { t } = useTranslation();
  const { verifyOtp, requestOtp, loading, error: apiError } = useOtp();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    setBack(true);
    title("enterCode");

    let timer;
    if (isResendDisabled && resendTimeout > 0) {
      timer = setInterval(() => setResendTimeout((prev) => prev - 1), 1000);
    } else {
      setIsResendDisabled(false);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isResendDisabled, resendTimeout, setBack, title]);
const handleVerifyCode = async () => {
  setLocalError("");

  const formattedCode = code.join("").trim();
  if (formattedCode.length !== 6) {
    setLocalError(t("fillAllCells"));
    return;
  }

  const cleanPhone = phone.replace(/\D/g, "");
  
  const result = await verifyOtp(cleanPhone, formattedCode, fullName);

  if (result?.success) {
    await login(result.data);
  }
};
  const handleResend = async () => {
    const cleanPhone = phone.replace(/\D/g, "");
    const result = await requestOtp(cleanPhone);

    if (result?.success) {
      setIsResendDisabled(true);
      setResendTimeout(120);
      setCode(Array(6).fill(""));
    }
  };

  return (
    <div className="code__wrap">
      <div className="code__top">
        <p className="code__top-text">{t("confirmText")}</p>

        <CodeInput code={code} setCode={setCode} length={6} />
      </div>

      {(localError || apiError) && (
        <p
          className="code__error-msg"
          style={{ color: "red", marginTop: "10px" }}
        >
          {localError || apiError}
        </p>
      )}

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <a
          href="https://t.me/online_shop_confirm_bot"
          target="_blank"
          rel="noreferrer"
          className="code__bot"
          style={{ textDecoration: "none", display: "block" }}
        >
          {t("telegramBot")}
        </a>

        <button
          className="code__btn"
          onClick={handleVerifyCode}
          disabled={loading}
        >
          {loading ? t("loading") : t("create")}
        </button>
      </div>

      <div className="code__info">
        {isResendDisabled ? (
          <p>
            {t("resendWait")} {resendTimeout} {t("resendSeconds")}
          </p>
        ) : (
          <button className="code__resend-link" onClick={handleResend}>
            {t("resend")}
          </button>
        )}
      </div>
    </div>
  );
}
