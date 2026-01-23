import { useContext, useEffect, useState } from "react";
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
    setIsCatalogOpen((prev) => {
      const next = !prev;
      if (next && (st || state)) {
        sfunc(false);
        func(false);
      }
      return next;
    });
  };

  const toggleSearch = () => {
    sfunc((prev) => {
      const next = !prev;
      if (next && isCatalogOpen) {
        setIsCatalogOpen(false);
      }
      return next;
    });
  };

  const [recentSearches, setRecentSearches] = useState([
    "kuzoynak g‘ilof",
    "sichqoncha",
    "quloqchin",
  ]);

  const removeRecentSearch = (index) => {
    setRecentSearches((prev) => prev.filter((_, i) => i !== index));
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
              <div
                className={`header__main-wrap ${
                  st || state ? "is-search-open" : ""
                }`}
              >
                <Link className="logo-link" to="/">
                  <h2 className="header__main-logo">Logo company</h2>
                </Link>

                <div className="header__main-adaptive">
                  {st || state ? (
                    <div className="header__main-adaptive__search-open">
                      <div className="mobile-search-container">
                        <input
                          className="header__main-inp"
                          placeholder={t("search")}
                          autoFocus
                          onChange={(e) =>
                            dispatch(setSearchQuery(e.target.value))
                          }
                        />

                        <button className="header__main-adaptive__search">
                          <Search size={20} color="white" />
                        </button>

                        {(st || state) && (
                          <div className="search-dropdown">
                            <div className="search-dropdown__header">
                              <span>Yaqinda izlaganlaringiz</span>
                            </div>

                            <ul className="search-dropdown__list">
                              {recentSearches.map((item, index) => (
                                <li
                                  key={index}
                                  className="search-dropdown__item"
                                >
                                  <span className="text">{item}</span>

                                  <button
                                    className="remove"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeRecentSearch(index);
                                    }}
                                  >
                                    ×
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <button
                        className="header__main-adaptive__menu"
                        onClick={toggleSearch}
                      >
                        <X size={20} color="white" />
                      </button>
                    </div>
                  ) : (
                    <div className="header__main-adaptive__default">
                      <button
                        className="header__main-adaptive__search"
                        onClick={toggleSearch}
                      >
                        <Search size={20} color="white" />
                      </button>

                      <button
                        className="header__main-adaptive__menu"
                        onClick={toggleMenu}
                      >
                        {isCatalogOpen ? (
                          <X size={20} color="white" />
                        ) : (
                          <Menu size={20} color="white" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <>
                  <div className="header__main-center">
                    <CatalogMenu />

                    <div className="header__main-center__search">
                      <input
                        type="text"
                        className="header__main-center__search-input"
                        placeholder={t("search")}
                        onChange={(e) =>
                          dispatch(setSearchQuery(e.target.value))
                        }
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

                <></>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCatalogOpen && (
      
          <div onClick={(e) => e.stopPropagation()}>
            <HeaderAdaptNav onClose={() => setIsCatalogOpen(false)} />
          </div>
      )}
    </>
  );
}
