import { useState, useRef, useEffect } from "react";
import { X, ChevronRight, Menu, ArrowDownUp } from "lucide-react";
import useCategories from "../../hooks/useCategories";
import { useTranslation } from "react-i18next";

export default function CatalogMenu() {
  const { t } = useTranslation();
  const { categories, loading } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const selectedCategoryData = categories.find(
    (cat) => cat.id === selectedCategory
  );

 

  return (
    <div className="catalog-menu" ref={menuRef}>
      <button
        className={`catalog-btn ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span className="catalog-btn__icon">{isOpen ? <X /> : <Menu />}</span>
       <span className="catalog-btn__text">{t("catalog")}</span>
      </button>

      {isOpen && !isMobile && (
        <div className="catalog-menu__dropdown">
          <div className="catalog-menu__dropdown__container">
            <div className="catalog-menu__dropdown__sidebar">
              <div className="catalog-menu__dropdown__sidebar__content">
                {categories?.map((category) => (
                  <button
                    key={category.id}
                    onMouseEnter={() => setSelectedCategory(category.id)}
                    className={`catalog-menu__category ${
                      selectedCategory === category.id ? "active" : ""
                    }`}
                  >
                    
                    <span className="catalog-menu__category__icon">
                      {category.image ? (
                        <img src={category.image} alt={t("categoryIcon")} width={20} />
                      ) : (
                        <ArrowDownUp size={20} />
                      )}
                    </span>
                    <span className="catalog-menu__category__name">
                      {category.name}
                    </span>
                    <ChevronRight className="catalog-menu__category__chevron" />
                  </button>
                ))}
              </div>
            </div>

            <div className="catalog-menu__dropdown__content">
              {selectedCategoryData?.subcategories?.length > 0 ? (
                <div className="catalog-menu__panel">
                  <div className="catalog-menu__panel__header">
                    <h3>{selectedCategoryData.name}</h3>
                  </div>
                  <div className="catalog-menu__panel__grid">
                    {selectedCategoryData.subcategories.map((subcat, index) => (
                      <div key={index} className="catalog-menu__panel__column">
                        <h4>{subcat.name}</h4>
                        <ul>
                          {subcat.items?.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <a href={`/category/${item.id}`}>
                                {item.name || item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="catalog-menu__panel__empty">
                  <p>
                      {loading ? t("loading") : t("noSubcategories")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
