import Nav from "../../components/media/Nav.jsx";
import NoProds from "../../components/cart/NoundProducts.jsx";
import { useTranslation } from "react-i18next";
import useCart from "../../hooks/useCart.jsx";
import { useEffect, useMemo, useState } from "react";
import BasketComponent from "../../components/cart/Basket.jsx";
import "../../styles/scss/pages/_basket.scss";
import { toast } from "react-toastify";

export default function Basket() {
  const { t } = useTranslation();
  const { cart, cartItems, loading, getCart } = useCart();

  const [checkedItems, setCheckedItems] = useState({});
  const [localItems, setLocalItems] = useState([]);

  // 1. Faqat bir marta cartni yuklash
  useEffect(() => {
    getCart();
  }, []);

  // 2. cartItems kelganda localItems va checkedItems ni yangilash
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setLocalItems(cartItems);
      
      // Faqat checkedItems bo'sh bo'lsa, hammasini belgilaymiz
      setCheckedItems(prev => {
        if (Object.keys(prev).length > 0) return prev;
        const initialChecked = {};
        cartItems.forEach(item => {
          initialChecked[item.id] = true;
        });
        return initialChecked;
      });
    }
  }, [cartItems]); // Faqat cartItems o'zgarganda ishlaydi

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const updateLocalQty = (id, newQty) => {
    setLocalItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  // 3. Jami summani hisoblash (localItems asosida)
  const checkedTotal = useMemo(() => {
    return localItems
      .filter(item => checkedItems[item.id])
      .reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  }, [localItems, checkedItems]);

  const formattedTotal = Math.floor(checkedTotal).toLocaleString("fr-FR");

  const handleBuyProduct = () => {
    toast.success(t("success_order"));
  };

  return (
    <>
      <Nav info={{ title: t("myCart"), total: Math.floor(checkedTotal) }} />

      {loading && localItems.length === 0 ? (
        <div className="loading">{t("loading")}...</div>
      ) : localItems.length > 0 ? (
        <div className="basket">
          <div className="basket__wrap">
            <div className="basket__prods">
              {localItems.map((item) => (
                <BasketComponent
                  key={item.id}
                  prod={item}
                  refresh={getCart}
                  isChecked={!!checkedItems[item.id]}
                  onToggleCheck={toggleCheck}
                  onQtyChange={updateLocalQty}
                />
              ))}
            </div>

            <div className="basket__total">
              <div className="basket__total-top">
                <h2 className="basket__total-title">{t("sum")}</h2>
                <div className="basket__total-desc">
                  <span className="basket__total-desc__text">
                    {formattedTotal} {t("value")}
                  </span>
                </div>
              </div>
              
              <div className="basket__total-categ">
                <div className="basket__total-categ__text">
                  <span>{t("products_in_cart")}</span>
                  <span>
                    {/* localItems uzunligini olish aniqroq bo'lishi mumkin */}
                    {localItems.length} {t("count_unit")}
                  </span>
                </div>
              </div>

              <button className="basket__total-btn" onClick={handleBuyProduct}>
                {t("checkout")}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <NoProds />
      )}
    </>
  );
}