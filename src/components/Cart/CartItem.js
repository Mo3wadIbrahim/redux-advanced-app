import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";

const CartItem = ({ id, title, quantity, total, price }) => {
  const dispatch = useDispatch();
  const currentItem = { id, title, price };
  const handleAddItem = () => {
    dispatch(cartActions.addItem(currentItem));
  };
  const handleRemoveItem = () => {
    dispatch(cartActions.removeItem(currentItem));
  };
  const handleMinusItem = () => {
    dispatch(cartActions.minusItem(currentItem));
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleRemoveItem}> X </button>
          <button onClick={handleMinusItem}>-</button>
          <button onClick={handleAddItem}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
