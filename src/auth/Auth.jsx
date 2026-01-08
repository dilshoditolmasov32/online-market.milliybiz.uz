import { IoClose } from "react-icons/io5";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Username from "../components/inputs/Username";
import { AuthContext } from "./context/AuthContext";
import Create from "./Create";
import Login from "./Login";
import Code from "./Code";
import left from "../assets/img/left.svg";

export default function Auth() {
  const { isAuthOpen, closeAuth, login } = useContext(AuthContext);
  const { t } = useTranslation();
  const [current, setCurrent] = useState("create");
  const [backBtn, setBackBtn] = useState(false);
  const [titleKey, setTitleKey] = useState("enterPhone");

  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (isAuthOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, [isAuthOpen]);

  if (!isAuthOpen) return null;

  return (
    <div className="auth__outer">
      <div className="auth" onClick={() => closeAuth()}>
        <div className="auth__wrap" onClick={(e) => e.stopPropagation()}>
          <div className="auth__desc">
            <p className="auth__desc-text">
              {backBtn && (
                <img
                  onClick={() => {
                    setCurrent("create");
                    setBackBtn(false);
                    setTitleKey("enterPhone");
                  }}
                  className="auth__desc-text__back"
                  src={left}
                  alt={t("back")}
                />
              )}
              {t(titleKey)}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                closeAuth();
              }}
              className="close-btn"
              type="button"
            >
              <IoClose size={30} color="black" />
            </button>
          </div>

          <div className="auth__child">
            {current === "create" ? (
              <>
                <Username fullName={fullName} setFullName={setFullName} />
                <Create
                  title={setTitleKey}
                  setCurrent={setCurrent}
                  setBack={setBackBtn}
                  phone={phone}
                  setPhone={setPhone}
                  setFullName={setFullName}
                  login={login}
                  fullName={fullName}
                />
              </>
            ) : current === "login" ? (
              <Login
                title={setTitleKey}
                setCurrent={setCurrent}
                setBack={setBackBtn}
                phone={phone}
                setPhone={setPhone}
                login={login}
              />
            ) : current === "code" ? (
              <Code
                title={setTitleKey}
                setCurrent={setCurrent}
                setBack={setBackBtn}
                phone={phone}
                fullName={fullName}
                login={login}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
