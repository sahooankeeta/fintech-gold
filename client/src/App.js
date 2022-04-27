import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Grow from "@mui/material/Grow";
import {
  Header,
  Auth,
  Shop,
  CreateEditForm,
  ProductView,
  Cart,
  Checkout,
  OrdersPage,
  ViewOrder,
  Landing,
} from "./components";
const App = () => {
  const user = useSelector((state) => state.profile);
  const isAdmin = user?.result?.isAdmin;
  const cart = useSelector((state) => state.cart);
  localStorage.setItem("cart", JSON.stringify(cart));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Header items={cart.items.length} isAdmin={isAdmin} />
        <Grow in>
          <Container maxWidth="xl">
            <Switch>
              <Route path="/myBag" exact component={Cart} />
              <Route path="/form" exact component={CreateEditForm} />
              <Route path="/checkout" exact component={Checkout} />
              <Route
                path="/orders"
                exact
                component={() => (
                  <OrdersPage user={user.result._id} isAdmin={isAdmin} />
                )}
              />
              <Route path="/order/:id" exact component={ViewOrder} />
              <Route
                path="/view/:id"
                exact
                component={() => <ProductView isAdmin={isAdmin} />}
              />
              <Route
                path="/auth"
                exact
                component={() =>
                  !user?.result ? <Auth /> : <Redirect to="/" />
                }
              />
              <Route
                path="/shop/:item"
                component={() => <Shop isAdmin={isAdmin} />}
              />
              <Route path="/" exact component={Landing} />
            </Switch>
          </Container>
        </Grow>
      </Container>
    </BrowserRouter>
  );
};

export default App;
