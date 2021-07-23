import { v4 as uuid } from 'uuid';
import GroupAddIcon from '@material-ui/icons/GroupAddOutlined';
import NewReleasesIcon from '@material-ui/icons/NewReleasesOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import AppsIcon from '@material-ui/icons/AppsOutlined';
import MenuOption from '../../contracts/menuOption/IMenuOption';
import AssessmentIcon from '@material-ui/icons/AssessmentOutlined';
import LocalMallIcon from '@material-ui/icons/LocalMallOutlined';

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
];

export const securityMenuOptions: MenuOption[] = [
  {
    id: uuid(),
    route: "/settings/security/apps",
    icon: AppsIcon,
    label: "Aplicaciones",
  },
];
