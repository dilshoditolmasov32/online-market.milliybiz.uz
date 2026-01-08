import { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function CodeInput({ length = 6, code, setCode }) {
  const inputsRef = useRef([]);
  const { t } = useTranslation();

  const handleChange = (index, value) => {
    const val = value.replace(/\D/g, "");
    if (!val && value !== "") return;

    const newCode = [...code];
    newCode[index] = val.slice(-1);
    setCode(newCode);

    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const digits = pasteData.replace(/\D/g, "").slice(0, length);

    if (!digits) return;

    const newCode = Array(length).fill("");
    digits.split("").forEach((digit, index) => {
      newCode[index] = digit;
    });

    setCode(newCode);

    const nextIndex = Math.min(digits.length, length - 1);
    inputsRef.current[nextIndex]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  return (
    <div
      className="code__inputs-row"
      style={{ display: "flex", gap: "8px" }}
      role="group"
      aria-label={t("codeInputs")}
    >
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          value={code[index] || ""}
          maxLength={1}
          className="code__input-box"
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          aria-label={t("codeDigit", { index: index + 1 })}
        />
      ))}
    </div>
  );
}
