import Nav from "../../components/media/Nav.jsx";
import NoProds from "../../components/cart/NoundProducts.jsx";
import { useTranslation } from "react-i18next";
import useCart from "../../hooks/useCart.jsx";
import { useEffect, useState } from "react";
import BasketComponent from "../../components/cart/Basket.jsx";
import "../../styles/scss/pages/_basket.scss";
import { toast } from "react-toastify";

export default function Basket() {
  const { t } = useTranslation();
  const { cart, cartItems, loading, getCart } = useCart();
const [checkedItems, setCheckedItems] = useState({});

  const data = cart?.data || cart;
const items = cartItems || [];

  // useEffect(() => {
  //   getCart();
  // }, []);

  if (loading && items.length === 0) {
    return <div className="loading">{t("loading")}...</div>;
  }

  const handleBuyProduct = () => {
    toast.success(t("success_order"));
  };

  const checkedTotal = items
  .filter((item) => checkedItems[item.id])
  .reduce((sum, item) => {
    return sum + Number(item.price) * item.quantity;
  }, 0);


    const toggleCheck = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  useEffect(() => {
  if (items.length > 0) {
    const initialChecked = {};
    items.forEach((item) => {
      initialChecked[item.id] = true;
    });
    setCheckedItems(initialChecked);
  }
}, [items]);


  return (
    <>
      <Nav info={{ title: t("myCart"), total: Math.floor(checkedTotal) }} />

      {items.length > 0 ? (
        <div className="basket">
          <div className="basket__wrap">
            <div className="basket__prods">
              {items.map((item) => (
                <BasketComponent
                  key={item.id}
                  prod={item}
                  refresh={getCart}
                  isChecked={checkedItems[item.id] ?? true}
                  onToggleCheck={toggleCheck}
                />
              ))}
            </div>

            <div className="basket__total">
              <div className="basket__total-top">
                <h2 className="basket__total-title">{t("sum")}</h2>
                <div className="basket__total-desc">
                  <span className="basket__total-desc__text">
                   {Math.floor(checkedTotal)} {t("value")}
                  </span>
                  {/* {data?.formatted_sub_total && (
                    <span className="basket__total-desc__old">
                      {data.formatted_sub_total}
                    </span>
                  )} */}
                </div>
              </div>

              <div className="basket__total-categ">
                <div className="basket__total-categ__text">
                  <span>{t("products_in_cart")}</span>
                  <span>
                    {data?.items_qty} {t("count_unit")}
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
