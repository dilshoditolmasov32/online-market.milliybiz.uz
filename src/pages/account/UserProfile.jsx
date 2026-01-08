import { useState } from "react";
import OrdersHistory from "./ProfileHistory";
import ProfileInfo from "./ProfilInfo";
import ModalLogout from "../../components/modal/ModalLogout.jsx";
import { useTranslation } from "react-i18next";
import arrowIcon from "../../assets/img/arrowIcon.svg";
import { NavLink } from "react-router";
import { useLogout } from "../../hooks/useLogout.jsx";

const TABS = {
  PROFILE: "profile",
  ORDERS: "orders",
};

export default function UserProfile({ onLogout }) {
  const { t } = useTranslation();
  const { logout, loading } = useLogout();
  const [activeTab, setActiveTab] = useState(TABS.PROFILE);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setIsOpen(true);
  };

  const onCloseFunc = () => {
    setIsOpen(false);
  };
  const confirmLogout = async () => {
    await logout();
    setIsOpen(false);
  };
  return (
    <div className="profile-page">
      <div className="profile-page__container">
        <div className="profile-page__breadcrumbs">
          <NavLink to="/">
            <button className="profile-page__back-btn">
              <img src={arrowIcon} alt={t("back")} />
              {t("back")}
            </button>
          </NavLink>

          <NavLink to="/">
            <span className="profile-page__crumb">{t("home")}</span>
          </NavLink>

          <span className="profile-page__crumb profile-page__crumb--current">
            {t("myPage")}
          </span>
        </div>

        <h1 className="profile-page__title">{t("myPage")}</h1>

        <div className="profile-page__layout">
          <aside className="profile-sidebar">
            <button
              className={
                "profile-sidebar__item" +
                (activeTab === TABS.PROFILE
                  ? " profile-sidebar__item--active"
                  : "")
              }
              onClick={() => setActiveTab(TABS.PROFILE)}
            >
              {t("myPage")}
            </button>

            <button
              className={
                "profile-sidebar__item" +
                (activeTab === TABS.ORDERS
                  ? " profile-sidebar__item--active"
                  : "")
              }
              onClick={() => setActiveTab(TABS.ORDERS)}
            >
              {t("ordersHistory")}
            </button>

            <button
              className="profile-sidebar__item profile-sidebar__item--logout"
              onClick={handleLogout}
            >
              {t("logout")}
            </button>
          </aside>

          {isOpen && (
            <ModalLogout
              onCloseFunc={onCloseFunc}
              onConfirm={confirmLogout}
              loading={loading}
            />
          )}

          <section className="profile-content">
            {activeTab === TABS.PROFILE ? <ProfileInfo /> : <OrdersHistory />}
          </section>
        </div>
      </div>
    </div>
  );
}
