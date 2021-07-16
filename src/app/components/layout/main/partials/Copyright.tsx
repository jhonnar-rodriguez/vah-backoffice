import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Copyright = () => {
  return (
    <div style={{ marginBottom: 0 }}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="#">
          vah BackOffice
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  );
}

export default Copyright;
