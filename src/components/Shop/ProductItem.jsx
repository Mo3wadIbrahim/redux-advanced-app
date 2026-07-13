import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { centsUsdFormatter } from "../../util/helpers";
const ProductItem = ({ title, price, description, id }) => {
  const dispatch = useDispatch();
  const handleAddItem = () => {
    dispatch(cartActions.addItem({ id, title, price }));
  };
  return (
    <li className={classes.item} key={id}>
      <Card>
        <header>
          <h3>
            {id}: {title}
          </h3>
          <div className={classes.price}>{centsUsdFormatter(price)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={handleAddItem}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
