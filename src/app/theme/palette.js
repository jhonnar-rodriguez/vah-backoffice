import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

const palette = {
  black,
  white,
  primary: {
    contrastText: white,
    dark: '#541381',
    main: '#541381',
    light: '#541381',
  },
  secondary: {
    contrastText: white,
    dark: '#f02580',
    main: '#f02580',
    light: '#f02580',
  },
  tertiary: {
    contrastText: black,
    dark: white,
    main: white,
    light: white,
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600],
  },
  background: {
    default: '#F4F6F8',
    paper: white,
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
};

export default palette;
