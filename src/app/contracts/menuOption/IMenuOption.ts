import { SvgIconComponent } from "@material-ui/icons";

interface MenuOption {
  id: string,
  icon: SvgIconComponent,
  label: string,
  route: string,
  forRoles?: string[],
}

export default MenuOption;
