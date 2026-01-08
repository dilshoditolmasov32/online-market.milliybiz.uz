
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="notfound">
      <div className="container">
        <div className="notfound__wrap">
          <div className="notfound__desc">
            <h1 className="notfound__title">
              {t("title")}
            </h1>
            <p className="notfound__text">
              {t("subtitle")}
            </p>
          </div>

          <div className="notfound__help">
            <p className="notfound__help-text">
              {t("help")}
            </p>

            <div className="notfound__help-links">
              <Link
                className="link notfound__help-links__link"
                to="/"
              >
                {t("home")}
              </Link>

              <Link
                className="link notfound__help-links__link"
                to="/products"
              >
                {t("products")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
