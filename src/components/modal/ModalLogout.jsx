import { useTranslation } from "react-i18next";


export default function ModalLogout({ onCloseFunc, onConfirm, loading }) {
  const { t } = useTranslation();



  return (
    <div className="modal-logout">
      <div className="modal-logout__wrapper">
        <h2 className="modal-logout__title">{t("logout")}</h2>
        <p
          className="modal-logout__message"
          onClick={onCloseFunc}
          disabled={loading}
        >
          {t("logoutConfirm")}
        </p>
        <div className="modal-logout__actions">
          <button
            className="modal-logout__button modal-logout__button--cancel"
            onClick={onCloseFunc}
          >
            {t("no")}
          </button>
          <button
            className="modal-logout__button modal-logout__button--confirm"
            onClick={onConfirm}
            disabled={loading}
          >
            {t("yes")}
          </button>
        </div>
      </div>
    </div>
  );
}
