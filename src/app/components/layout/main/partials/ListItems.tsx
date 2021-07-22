import { Link } from 'react-router-dom';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import SecurityIcon from '@material-ui/icons/SecurityOutlined';
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined';
import StorefrontIcon from '@material-ui/icons/StorefrontOutlined';

import {
  List,
  SvgIcon,
  Divider,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import { securityMenuOptions, storeMenuOptions } from '../../../../data/sidebar';
import MenuOption from '../../../../contracts/menuOption/IMenuOption';

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


type SecondaryListItemsProps = {
  hideIcons: boolean,
  openNestedStore: boolean,
  openNestedSecurity: boolean,
  handleNestedStoreClick: any,
  handleNestedSecurityClick: any,
}

export const SecondaryListItems = ({
  hideIcons,
  openNestedStore,
  openNestedSecurity,
  handleNestedStoreClick,
  handleNestedSecurityClick,
}: SecondaryListItemsProps) => (
  <div>
    <ListSubheader inset>Configuración</ListSubheader>
    <ListItem
      button
      onClick={handleNestedStoreClick}
    >
      <ListItemIcon>
        <StorefrontIcon />
      </ListItemIcon>
      <ListItemText
        primary="Tienda"
        style={{ marginRight: "0", paddingRight: "0" }}
      />
      {openNestedStore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </ListItem>

    <Collapse
      in={openNestedStore}
      timeout="auto"
      unmountOnExit
    >
      <Divider />
      <List
        component="div"
        style={{ padding: !hideIcons ? "10px" : "5px" }}
      >
        {
          storeMenuOptions
            .map((menu: MenuOption) => (
              <ListItem
                key={menu.id}
                to={menu.route}
                button
                component={Link}
              >
                <ListItemIcon>
                  <SvgIcon component={menu.icon} />
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))
        }
      </List>
    </Collapse>

    <ListItem
      button
      onClick={handleNestedSecurityClick}
    >
      <ListItemIcon>
        <SecurityIcon />
      </ListItemIcon>
      <ListItemText primary="Seguridad" style={{ marginRight: "0", paddingRight: "0" }} />
      {openNestedSecurity ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </ListItem>

    <Collapse
      in={openNestedSecurity}
      timeout="auto"
      unmountOnExit
    >
      <Divider />
      <List
        component="div"
        style={{ padding: !hideIcons ? "10px" : "5px" }}
      >
        {
          securityMenuOptions
            .map((menu: MenuOption) => (
              <ListItem
                key={menu.id}
                to={menu.route}
                button
                component={Link}
              >
                <ListItemIcon>
                  <SvgIcon component={menu.icon} />
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))
        }
      </List>
    </Collapse>
  </div >
);
