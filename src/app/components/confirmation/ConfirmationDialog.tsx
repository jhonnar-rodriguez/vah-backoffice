import { useState, FC } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';
import { RemoveCircleOutline as RemoveCircleIcon } from "@material-ui/icons";

export type ConfirmationDialogProps = {
  title: string,
  content: string,
  handleOnConfirm?: Function,
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({ title, content, handleOnConfirm }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <label htmlFor="delete-product">
        <Tooltip title="Eliminar">
          <IconButton
            color="secondary"
            component="span"
            aria-label={title}
            onClick={handleOpen}
          >
            <RemoveCircleIcon />
          </IconButton>
        </Tooltip>
      </label>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="confirmation-dialog-title"
      >
        <DialogTitle id="confirmation-dialog-title">Confirmación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            color="primary"
          >
            No
          </Button>

          <Button
            onClick={() => {
              handleClose();
              typeof handleOnConfirm === "function" && handleOnConfirm();
            }}
            color="primary"
            autoFocus
          >
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmationDialog;
