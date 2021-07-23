import { PropTypes } from "@material-ui/core";
import { SvgIconComponent } from "@material-ui/icons";

export interface IBaseActionColumn {
  name: string,
  color: PropTypes.Color,
  icon: SvgIconComponent,
  onClick: any,
}

interface IBaseTableColumns {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: any) => string;
  generateLink?: boolean;
}

export default IBaseTableColumns;
