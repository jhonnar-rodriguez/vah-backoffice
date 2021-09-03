import { Switch, Redirect, Route } from "react-router-dom";
import RouteWithLayout from "../hoc/routeWithLayout/RouteWithLayout";
import MainLayout from "../components/layout/main/Main";

import {
  LoginPage,
  UsersPage,
  OrdersPage,
  CouponsPage,
  NotFoundPage,
  CustomersPage,
  DashboardPage,
  ProductListPage,
  OrderDetailPage,
  UnauthorizedPage,
  AllowedClientPage,
  SalesByProductPage,
  SalesByCustomerPage,
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
        forRoles={["admin"]}
      />

      <RouteWithLayout
        path="/settings/security/users"
        exact={true}
        layout={MainLayout}
        component={UsersPage}
        pageTitle="Usuarios"
        forRoles={["admin"]}
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
        path="/reports/sales-by-product"
        exact={true}
        layout={MainLayout}
        component={SalesByProductPage}
        pageTitle="Ventas por producto"
        forRoles={["admin"]}
      />

      <RouteWithLayout
        path="/reports/sales-by-customer"
        exact={true}
        layout={MainLayout}
        component={SalesByCustomerPage}
        pageTitle="Ventas por cliente"
        forRoles={["admin"]}
      />

      <RouteWithLayout
        path="/404"
        exact={true}
        layout={MainLayout}
        component={NotFoundPage}
        pageTitle="Página no Encontrada"
      />

      <RouteWithLayout
        path="/unauthorized"
        exact={true}
        layout={MainLayout}
        component={UnauthorizedPage}
        pageTitle="Sin Autorización"
      />

      <Route
        path="/auth/login"
        exact={true}
        component={LoginPage}
      />

      <Redirect to="/404" />
    </Switch>
  );
};

export default Routes;
