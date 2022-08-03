import cartActions from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { sendData, getData } from "../store/cart";
import uiActions from "../store/ui";
const products = [
  { id: 1, title: "T-shirt👕", price: 25 },
  { id: 2, title: "Hat👒", price: 10 },
  { id: 3, title: "Shoes👠", price: 11 }
];
let intialLoad = true;
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { addToCart, increment, decrement } = cartActions;
  const addToCartHandler = (product) => {
    dispatch(uiActions.change({ status: "success", message: "Success 🎉🤗" }));
    dispatch(addToCart(product));
  };
  const incrementHandler = (id) => {
    dispatch(increment(id));
  };
  const decrementHandler = (id) => {
    dispatch(decrement(id));
  };
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
  useEffect(() => {
    if (intialLoad) {
      intialLoad = false;
      return;
    } else {
      cart.items && dispatch(sendData(cart));
    }
  }, [cart, dispatch]);
  return (
    <>
      <h1>
        In Cart <span className="cart-total-amount">{cart.totalAmount}</span>
      </h1>
      <h2 className="total-price">
        {cart.totalPrice}
        <span>💵</span>
      </h2>
      <div className="container cart">
        {cart?.items?.map((item) =>
          cart.items.length > 0 ? (
            <div key={item.id} className="product-item">
              <p className="product-title">{item.title}</p>
              <p className="product-price" style={{ width: "5rem" }}>
                {item.price * item.amount}
                <span>💵</span>
              </p>
              <p className="cart-total-amount">{item.amount}</p>
              <div style={{ display: "flex" }}>
                <button
                  onClick={() => incrementHandler(item.id)}
                  className="btn btn-group-item"
                >
                  +
                </button>
                <button
                  className="btn btn-group-item"
                  onClick={() => decrementHandler(item.id)}
                >
                  -
                </button>
              </div>
            </div>
          ) : (
            <p style={{ color: "red" }}>Nothing here..</p>
          )
        )}
      </div>
      <h1>Proudcts list</h1>
      <div className="container">
        {products.map((product) => (
          <div className="product-item" key={product.id}>
            <p className="product-title">{product.title}</p>
            <p className="product-price">
              {product.price}
              <span>💵</span>
            </p>
            <button className="btn" onClick={() => addToCartHandler(product)}>
              Buy <span> 🤑</span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
export default Cart;
