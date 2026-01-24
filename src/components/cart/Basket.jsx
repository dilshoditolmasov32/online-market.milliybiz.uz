import { useTranslation } from "react-i18next";
import { Trash2, Plus, Minus, Check } from "lucide-react";
import { updateCartItem, removeCartItem } from "../../service/cart.service";
import debounce from "lodash.debounce";
import { useCallback, useState, useEffect } from "react";

export default function Cart({ prod, refresh,  isChecked,
  onToggleCheck, onQtyChange}) {
  const { product } = prod;
  const { t } = useTranslation();
  const [localQty, setLocalQty] = useState(prod.quantity);

  useEffect(() => {
    setLocalQty(prod.quantity);
  }, [prod.quantity]);

  const debouncedUpdate = useCallback(
    debounce(async (itemId, qty) => {
      try {
        await updateCartItem(itemId, qty);
        refresh();
      } catch (err) {
        console.error("Xatolik:", err);
        setLocalQty(prod.quantity);
      }
    }, 500),
    [prod.quantity, refresh]
  );

  const handleQtyChange = (change) => {
    const newQty = localQty + change;
    if (newQty < 1) return;
    setLocalQty(newQty);
if (onQtyChange) {
      onQtyChange(prod.id, newQty); 
    }
    debouncedUpdate(prod.id, newQty);
  };

  return (
    <div className="cart-elem">
      <div
        className={`cart-elem__select ${isChecked ? "checked" : ""}`}
        onClick={() => onToggleCheck(prod.id)}
      >
        {isChecked && <Check size={16} />}
      </div>

      <div className="cart-elem__img-wrap">
        <img
          src={product?.base_image?.small_image_url}
          alt={prod.name}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      <div className="cart-elem__info">
        <div className="cart-elem__top">
          <div className="cart-elem__price">
            {prod.formatted_price}
            {prod.base_discount_amount > 0 && (
              <span className="cart-elem__badge">
                -{Math.round(prod.base_discount_amount)}%
              </span>
            )}
          </div>
        </div>
        <p className="cart-elem__name">{prod.name}</p>
        <p className="cart-elem__code">
          {t("product_code")}: {prod.sku || prod.id}
        </p>
      </div>

      <div className="cart-elem__controls">
        <div className="qty">
          <button
            className="qty__btn"
            onClick={() => handleQtyChange(-1)}
            disabled={localQty <= 1}
          >
            <Minus size={16} />
          </button>

          <span className="qty__num">{localQty}</span>

          <button className="qty__btn" onClick={() => handleQtyChange(1)}>
            <Plus size={16} />
          </button>
        </div>

        <button
          className="del"
          onClick={() => removeCartItem(prod.id).then(refresh)}
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
