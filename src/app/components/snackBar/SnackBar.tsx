import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { FC } from "react";

type SnackBarProps = {
  message: string,
  duration?: number,
  severity?: "error" | "info" | "success" | "warning",
  onDismiss?: Function,
};

const SnackBar: FC<SnackBarProps> = ({ message, onDismiss, severity = "success", duration = 5000, }) => {
  return (
    <Snackbar
      open={true}
      onClose={() => typeof onDismiss === 'function' ? onDismiss() : ''}
      autoHideDuration={duration}
    >
      <Alert
        onClose={() => typeof onDismiss === 'function' ? onDismiss() : ''}
        severity={severity}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackBar;
