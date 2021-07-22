import { Switch, Redirect } from "react-router-dom";
import RouteWithLayout from "../hoc/routeWithLayout/RouteWithLayout";
import MainLayout from "../components/layout/main/Main";

import {
  CouponsPage,
  CustomersPage,
  DashboardPage,
  ProductListPage,
  AllowedClientPage,
} from "../pages"

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        path="/dashboard"
        layout={MainLayout}
        component={DashboardPage}
        pageTitle="Tablero"
      />

      <RouteWithLayout
        path="/settings/products"
        layout={MainLayout}
        component={ProductListPage}
        pageTitle="Productos"
      />

      <RouteWithLayout
        path="/settings/customers"
        layout={MainLayout}
        component={CustomersPage}
        pageTitle="Clientes"
      />

      <RouteWithLayout
        path="/settings/coupons"
        layout={MainLayout}
        component={CouponsPage}
        pageTitle="Cupones"
      />

      <RouteWithLayout
        path="/settings/security/apps"
        layout={MainLayout}
        component={AllowedClientPage}
        pageTitle="Aplicaciones Permitidas"
      />
    </Switch>
  );
};

export default Routes;
