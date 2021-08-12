import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import SnackBar from "../../../components/snackBar/SnackBar";

const UnAuthorized = () => {
  return <>
    <SnackBar
      message="No tiene los permisos suficientes para acceder a esta página."
      severity="error"
    />

    <Button
      to="/dashboard"
      color="primary"
      variant="contained"
      component={Link}
      style={{ textAlign: "center" }}
    >
      Ir al inicio
    </Button>
  </>;
}

export default UnAuthorized;
