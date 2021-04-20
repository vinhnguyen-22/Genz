import React, { useEffect } from "react";
import HomePage from "./containers/HomePage/HomePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductListPage from "./containers/ProductListPage/ProductListPage";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions";
import ProductDetailsPage from "./containers/ProductDetailsPage/ProductDetailsPage";

import "./App.css";
import CartPage from "./containers/CartPage/CartPage";
import { getCartItems, updateCart } from "./actions/cart.action";
import CheckoutPage from "./containers/CheckoutPage/CheckoutPage";

const App = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }

    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(updateCart());
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />

          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          {/**tranh truong hop trinh duyet nhay vao slug trc ta se xep productSlug len trc */}
          <Route
            path="/:productSlug/:productId/p"
            component={ProductDetailsPage}
          />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
