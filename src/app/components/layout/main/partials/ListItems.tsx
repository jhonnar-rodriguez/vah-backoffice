import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import GroupAddIcon from '@material-ui/icons/GroupAddOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';

export const MainListItems = (
  <div>
    <ListItem
      to="/dashboard"
      button
      component={Link}
    >
      <ListItemIcon>
        <AssessmentOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Tablero" />
    </ListItem>
  </div>
);

export const SecondaryListItems = (
  <div>
    <ListSubheader inset>Configuración</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <GroupAddIcon />
      </ListItemIcon>
      <ListItemText primary="Clientes" />
    </ListItem>

    <ListItem
      to="/settings/products"
      button
      component={Link}
    >
      <ListItemIcon>
        <ListAltOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Productos" />
    </ListItem>
  </div>
);
