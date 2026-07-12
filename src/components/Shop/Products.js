import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 799,
    title: "Test 1",
    description: "This is a first product - amazing!",
  },
  {
    id: "p2",
    price: 1499,
    title: "Test 2",
    description: "This is a second product - amazing!",
  },
  {
    id: "p3",
    price: 1999,
    title: "Test 3",
    description: "This is a third product - amazing!",
  },
  {
    id: "p4",
    price: 2499,
    title: "Test 4",
    description: "This is a fourth product - amazing!",
  },
];
const Products = () => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
