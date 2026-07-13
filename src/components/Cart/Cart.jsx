import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { centsUsdFormatter } from "../../util/helpers";
const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalQuantities = useSelector((state) => state.cart.totalQuantities);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {items.length === 0 && <p>There is no Items in Your Cart</p>}
      {items.length > 0 && (
        <ul>
          {items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.title}
              quantity={item.quantity}
              total={item.total}
              price={item.price}
            />
          ))}
        </ul>
      )}
      <div>
        <h3>Total Quantities: {totalQuantities}</h3>
        <h3>Total Price: {centsUsdFormatter(totalPrice)}</h3>
      </div>
    </Card>
  );
};

export default Cart;
