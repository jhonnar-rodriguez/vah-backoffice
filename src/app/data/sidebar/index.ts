import { v4 as uuid } from 'uuid';
import GroupAddIcon from '@material-ui/icons/GroupAddOutlined';
import NewReleasesIcon from '@material-ui/icons/NewReleasesOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import AppsIcon from '@material-ui/icons/AppsOutlined';
import MenuOption from '../../contracts/menuOption/IMenuOption';

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
