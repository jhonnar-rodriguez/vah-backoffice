import DashboardPage from "./dashboard/Dashboard";
import { ProductListPage } from "./settings/products";
import { CustomersPage } from "./settings/customers";
import { CouponsPage } from "./settings/coupons";
import { AllowedClientPage } from "./settings/security/allowedClients";
import OrdersPage from "./general/orders";
import OrderDetailPage from "./general/orders/OrderDetail";
import NotFoundPage from "./errors/notFound";
import UsersPage from "./settings/security/users";
import LoginPage from "./auth/login/Login";
import UnauthorizedPage from "./errors/unauthorized";
import SalesByProductPage from "./reports/salesByProduct";
import SalesByCustomerPage from "./reports/salesByCustomer";
import ChangePasswordPage from "./profile/changePassword/ChangePassword";

export {
  LoginPage,
  UsersPage,
  OrdersPage,
  CouponsPage,
  NotFoundPage,
  DashboardPage,
  CustomersPage,
  ProductListPage,
  OrderDetailPage,
  UnauthorizedPage,
  AllowedClientPage,
  ChangePasswordPage,
  SalesByProductPage,
  SalesByCustomerPage,
};
