import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Menu, Search, X } from "lucide-react";
import locate from "../../assets/img/locateIcon.svg";
import instagram from "../../assets/img/header-instagram-icon.svg";
import facebook from "../../assets/img/header-facebook-icon.svg";
import telegram from "../../assets/img/header-telegram-icon.svg";
import userIcon from "../../assets/img/user.svg";
import smallBasket from "../../assets/img/smallBasket.svg";
import searchLupa from "../../assets/img/searchLupa.svg";
import ChooseLang from "../tools/ChooseLang.jsx";
import CatalogMenu from "../catalog-button/Catalogbutton.jsx";
import HeaderAdaptNav from "./HeaderAdaptNav.jsx";
import { AuthContext } from "../../auth/context/AuthContext.jsx";
import { useDispatch, useSelector } from "react-redux";

export default function Header({ st, sfunc, state, func, setSearchQuery }) {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const { user, openAuth } = useContext(AuthContext);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const items = Array.isArray(cart?.data?.items) ? cart.data.items : [];

  const totalCount = useMemo(() => {
    return items.reduce((total, item) => total + (item.quantity || 0), 0);
  }, [items]);

  const toggleMenu = () => {
    setIsCatalogOpen((prev) => !prev);
    // Menyu ochilganda qidiruvni yopish
    if (!isCatalogOpen && (st || state)) {
      sfunc(false);
      func(false);
    }
  };

  const toggleSearch = () => {
    sfunc(!st);
    // Qidiruv ochilganda menyuni yopish
    if (!st && isCatalogOpen) {
      setIsCatalogOpen(false);
    }
  };

  return (
    <>
      <div className="header">
        <div className="header__wrap">
          <div className="header__top">
            <div className="container">
              <div className="header__top-wrap">
                <div className="header__top-locate">
                  <img src={locate} alt="locate icon" />
                  <p className="header__top-locate__text">{t("country")}:</p>
                  <span className="header__top-locate__span">{t("city")}</span>
                </div>
                <div className="header__top-nav">
                  <div className="header__top-nav__links">
                    <a href="#">
                      <img src={instagram} alt="instagram-icon" />
                    </a>
                    <a href="#">
                      <img src={facebook} alt="facebook-icon" />
                    </a>
                    <a href="#">
                      <img src={telegram} alt="telegram-icon" />
                    </a>
                  </div>
                  <div className="header__top-nav__number">
                    <a
                      className="header__top-nav__number-link"
                      href="tel:+998991999996"
                    >
                      +998 99 199 99 96
                    </a>
                  </div>
                  <ChooseLang />
                </div>
              </div>
            </div>
          </div>

          <div className="header__main">
            <div className="container">
              <div className="header__main-wrap">
                {/* Desktop versiya */}
                <Link className="logo-link" to="/" style={{ display: window.innerWidth > 769 ? 'block' : 'none' }}>
                  <h2 className="header__main-logo">Logo company</h2>
                </Link>

                {/* Mobile versiya */}
                {window.innerWidth <= 769 && (
                  <>
                    {st || state ? (
                      // Search mode
                      <>
                        <div className="mobile-search-container">
                          <input
                            type="text"
                            className="header__main-inp"
                            placeholder={t("search")}
                            autoFocus
                            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                          />
                        </div>
                        <div className="header__main-adaptive">
                          <button
                            className="header__main-adaptive__btn"
                            onClick={toggleSearch}
                          >
                            <Search color="white" size={20} />
                          </button>
                          <button
                            className="header__main-adaptive__btn"
                            onClick={toggleSearch}
                          >
                            <X color="white" size={20} />
                          </button>
                        </div>
                      </>
                    ) : (
                      // Normal mode
                      <>
                        <Link className="logo-link" to="/">
                          <h2 className="header__main-logo">Logo company</h2>
                        </Link>
                        <div className="header__main-adaptive">
                          <button
                            className="header__main-adaptive__btn"
                            onClick={toggleSearch}
                          >
                            <Search color="white" size={20} />
                          </button>
                          <button onClick={toggleMenu} className="mobile-catalog-btn">
                            {isCatalogOpen ? (
                              <X color="white" size={20} />
                            ) : (
                              <Menu color="white" size={20} />
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* Desktop qidiruv va navigation */}
                {window.innerWidth > 769 && (
                  <>
                    <div className="header__main-center">
                      <CatalogMenu />

                      <div className="header__main-center__search">
                        <input
                          type="text"
                          className="header__main-center__search-input"
                          placeholder={t("search")}
                          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        />

                        <button className="header__main-center__search-button">
                          <img
                            src={searchLupa}
                            alt="search"
                            width={20}
                            height={18}
                          />
                        </button>
                      </div>
                    </div>
                    <div className="header__main-nav">
                      {user ? (
                        <Link
                          to="/account/profile"
                          className="header__main-nav__elem header__user"
                        >
                          <img src={userIcon} alt="user-icon" />
                          <div className="header__user-info">
                            <span className="header__user-name">
                              {user.full_name || user.username}
                            </span>
                            <button className="exit-btn">{t("Profil")}</button>
                          </div>
                        </Link>
                      ) : (
                        <button className="login-btn" onClick={openAuth}>
                          <img src={userIcon} alt="user-icon" />
                          <p className="header__main-nav__elem-text">
                            {t("login")}
                          </p>
                        </button>
                      )}

                      <div
                        className="link"
                        onClick={(e) => {
                          if (!user) {
                            e.preventDefault();
                            openAuth();
                          }
                        }}
                      >
                        <Link to={user ? "/basket" : "#"}>
                          <div className="header__main-nav__elem">
                            <img src={smallBasket} alt="basket icon" />
                            <p className="header__main-nav__elem-text">
                              {t("cart")}
                            </p>
                            <div className="header__main-nav__elem-span">
                              {totalCount}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menyu */}
      {isCatalogOpen && (
        <div className="mobile-catalog">
          <HeaderAdaptNav onClose={() => setIsCatalogOpen(false)} />
        </div>
      )}
    </>
  );
}