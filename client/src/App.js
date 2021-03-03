import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initProducts } from "./reducers/products";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";
import Cart from "./components/Cart";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initProducts());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/" component={Products} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </div>
  );
};

export default App;
