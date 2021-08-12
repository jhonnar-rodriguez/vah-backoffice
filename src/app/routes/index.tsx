import { Switch, Redirect } from "react-router-dom";
import RouteWithLayout from "../hoc/routeWithLayout/RouteWithLayout";
import MainLayout from "../components/layout/main/Main";

import {
  UsersPage,
  OrdersPage,
  CouponsPage,
  NotFoundPage,
  CustomersPage,
  DashboardPage,
  ProductListPage,
  OrderDetailPage,
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
        exact={true}
        layout={MainLayout}
        component={DashboardPage}
        pageTitle="Tablero"
      />

      <RouteWithLayout
        path="/settings/products"
        exact={true}
        layout={MainLayout}
        component={ProductListPage}
        pageTitle="Productos"
      />

      <RouteWithLayout
        path="/settings/customers"
        exact={true}
        layout={MainLayout}
        component={CustomersPage}
        pageTitle="Clientes"
      />

      <RouteWithLayout
        path="/settings/coupons"
        exact={true}
        layout={MainLayout}
        component={CouponsPage}
        pageTitle="Cupones"
      />

      <RouteWithLayout
        path="/settings/security/apps"
        exact={true}
        layout={MainLayout}
        component={AllowedClientPage}
        pageTitle="Aplicaciones Permitidas"
      />

      <RouteWithLayout
        path="/settings/security/users"
        exact={true}
        layout={MainLayout}
        component={UsersPage}
        pageTitle="Usuarios"
      />

      <RouteWithLayout
        path="/orders"
        exact={true}
        layout={MainLayout}
        component={OrdersPage}
        pageTitle="Pedidos"
      />

      <RouteWithLayout
        path="/orders/:orderId/detail"
        exact={true}
        layout={MainLayout}
        component={OrderDetailPage}
        pageTitle="Detalle de Pedido"
      />

      <RouteWithLayout
        path="/404"
        exact={true}
        layout={MainLayout}
        component={NotFoundPage}
        pageTitle="Página no Encontrada"
      />

      <Redirect to="/404" />
    </Switch>
  );
};

export default Routes;
