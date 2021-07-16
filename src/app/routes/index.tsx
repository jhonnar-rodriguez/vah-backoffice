import { Switch, Redirect } from "react-router-dom";
import RouteWithLayout from "../hoc/routeWithLayout/RouteWithLayout";
import MainLayout from "../components/layout/main/Main";

import { DashboardPage, ProductListPage } from "../pages"

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
        pageTitle="Listado de Productos"
      />
    </Switch>
  );
};

export default Routes;
