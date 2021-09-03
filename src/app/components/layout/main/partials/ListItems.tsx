import { Link } from 'react-router-dom';
import SecurityIcon from '@material-ui/icons/SecurityOutlined';
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined';
import StorefrontIcon from '@material-ui/icons/StorefrontOutlined';
import SubjectIcon from '@material-ui/icons/SubjectOutlined';
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
import { generalMenuOptions, reportMenuOptions, securityMenuOptions, storeMenuOptions } from '../../../../data/sidebar';
import MenuOption from '../../../../contracts/menuOption/IMenuOption';

type MainListItemsProps = {
  hideIcons: boolean,
  openNestedReports: boolean,
  handleNestedReportClick: any,
}
export const MainListItems = ({ hideIcons,
  openNestedReports,
  handleNestedReportClick,
}: MainListItemsProps) => (
  <div>
    {
      generalMenuOptions
        .map((menu: MenuOption) => (
          <ListItem
            key={menu.id}
            to={menu.route}
            button
            component={Link}
          >
            <ListItemIcon>
              <SvgIcon component={menu.icon} style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary={menu.label} />
          </ListItem>
        ))
    }

    <ListItem
      button
      onClick={handleNestedReportClick}
    >
      <ListItemIcon>
        <SubjectIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary="Reportes"
        style={{ marginRight: "0", paddingRight: "0" }}
      />
      {openNestedReports ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </ListItem>

    <Collapse
      in={openNestedReports}
      timeout="auto"
      unmountOnExit
    >
      <Divider />
      <List
        component="div"
        style={{ padding: !hideIcons ? "10px" : "5px" }}
      >
        {
          reportMenuOptions
            .map((menu: MenuOption) => (
              <ListItem
                key={menu.id}
                to={menu.route}
                button
                component={Link}
              >
                <ListItemIcon>
                  <SvgIcon component={menu.icon} style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))
        }
      </List>
    </Collapse>
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
    <ListSubheader inset style={{ color: 'white' }}>Configuración</ListSubheader>
    <ListItem
      button
      onClick={handleNestedStoreClick}
    >
      <ListItemIcon>
        <StorefrontIcon style={{ color: 'white' }} />
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
                  <SvgIcon component={menu.icon} style={{ color: 'white' }} />
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
        <SecurityIcon style={{ color: 'white' }} />
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
                  <SvgIcon component={menu.icon} style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))
        }
      </List>
    </Collapse>
  </div >
);
