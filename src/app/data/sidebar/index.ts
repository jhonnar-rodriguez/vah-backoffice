import { v4 as uuid } from 'uuid';
import GroupAddIcon from '@material-ui/icons/GroupAddOutlined';
import NewReleasesIcon from '@material-ui/icons/NewReleasesOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import AppsIcon from '@material-ui/icons/AppsOutlined';
import MenuOption from '../../contracts/menuOption/IMenuOption';
import AssessmentIcon from '@material-ui/icons/AssessmentOutlined';
import LocalMallIcon from '@material-ui/icons/LocalMallOutlined';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUserOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutline';
import ExtensionIcon from '@material-ui/icons/ExtensionOutlined';
import RedeemIcon from '@material-ui/icons/RedeemOutlined';

export const generalMenuOptions: MenuOption[] = [
  {
    id: uuid(),
    route: "/dashboard",
    icon: AssessmentIcon,
    label: "Tablero",
  },
  {
    id: uuid(),
    route: "/orders",
    icon: LocalMallIcon,
    label: "Pedidos",
  },
];

export const reportMenuOptions: MenuOption[] = [
  {
    id: uuid(),
    route: "/reports/sales-by-product",
    icon: ExtensionIcon,
    label: "Ventas por producto",
    forRoles: ['admin'],
  },
  {
    id: uuid(),
    route: "/reports/sales-by-customer",
    icon: PeopleIcon,
    label: "Ventas por cliente",
    forRoles: ['admin'],
  },
];

export const storeMenuOptions: MenuOption[] = [
  {
    id: uuid(),
    route: "/settings/customers",
    icon: GroupAddIcon,
    label: "Clientes",
  },
  {
    id: uuid(),
    route: "/settings/coupons",
    icon: ReceiptIcon,
    label: "Cupones",
  },
  {
    id: uuid(),
    route: "/settings/products",
    icon: NewReleasesIcon,
    label: "Productos",
  },
  {
    id: uuid(),
    route: "/settings/promotions",
    icon: RedeemIcon,
    label: "Promociones",
  },
];

export const securityMenuOptions: MenuOption[] = [
  {
    id: uuid(),
    route: "/settings/security/apps",
    icon: AppsIcon,
    label: "Aplicaciones",
    forRoles: ['admin'],
  },
  {
    id: uuid(),
    route: "/settings/security/users",
    icon: VerifiedUserIcon,
    label: "Usuarios",
    forRoles: ['admin'],
  },
];
