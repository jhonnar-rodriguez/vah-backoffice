import { FC, useState } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MainListItems, SecondaryListItems } from './ListItems';
import IHeader from '../../../../contracts/layouts/IHeader';
import { makeStyles } from '@material-ui/core';
import logo from '../../../../../assets/logo.png';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  toolbarIcon: {
    display: 'flex',
    height: '5vh',
    alignItems: 'center',
    // justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  background: {
    color: theme.palette.common.white,
    height: 'calc(100vh - 5vh)',
    backgroundColor: theme.palette.primary.main,
  },
}));

const Sidebar: FC<IHeader> = ({ open, handleDrawerClose = Function }) => {
  const classes = useStyles();
  const [openNestedStore, setOpenNestedStore] = useState(false);
  const [openNestedSecurity, setOpenNestedSecurity] = useState(false);

  const handleNestedStoreClick = () => {
    setOpenNestedStore(!openNestedStore)
  }

  const handleNestedSecurityClick = () => {
    setOpenNestedSecurity(!openNestedSecurity)
  }

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end' }}>
          <img src={logo} alt="Application Logo" style={{ width: '50px', height: '50px' }} />
        </div>
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <IconButton
            onClick={() => handleDrawerClose()}
            style={{ justifyContent: 'end', flexGrow: 1 }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
      </div>
      <Divider />

      <div className={classes.background}>
        <List>{MainListItems}</List>
        <Divider />
        <List>
          {
            SecondaryListItems({
              hideIcons: !open,
              openNestedStore,
              openNestedSecurity,
              handleNestedStoreClick,
              handleNestedSecurityClick,
            })
          }
        </List>
      </div>
    </Drawer>
  )
}

export default Sidebar;
