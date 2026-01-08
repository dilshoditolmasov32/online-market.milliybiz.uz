import { useState } from "react";
import { useTranslation } from "react-i18next";

const FilterButton = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`filter-button ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const ProductFilter = () => {
  const [activeFilter, setActiveFilter] = useState("Barchasi");
  const { t } = useTranslation();
  const filters = [
    { key: "specialOffer", value: "special" },
    { key: "news", value: "news" },
    { key: "all", value: "all" },
  ];

  return (
    <div className="product-filter-container">
      <div className="all-products-box">
        <div className="all-products-text">{t("barchaMahsulotlar")}</div>
        <div className="product-count">2 930 {t("product")}</div>
      </div>

      <div className="filter-buttons-group">
        {filters.map((filter) => (
          <FilterButton
            key={filter.value}
            label={t(filter.key)}
            isActive={activeFilter === filter.value}
            onClick={() => setActiveFilter(filter.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
