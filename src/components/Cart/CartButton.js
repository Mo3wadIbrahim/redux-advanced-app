import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../store/cartSlice";

import classes from "./CartButton.module.css";

const CartButton = () => {
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const totalQuantities = useSelector((state) => state.cart.totalQuantities);
  const dispatch = useDispatch();
  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  return (
    <button className={classes.button} onClick={handleToggleCart}>
      <span>{isCartOpen ? "Return" : "My Cart"}</span>
      <span className={classes.badge}>{totalQuantities}</span>
    </button>
  );
};

export default CartButton;
