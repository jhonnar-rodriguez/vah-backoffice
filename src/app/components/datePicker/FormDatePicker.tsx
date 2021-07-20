import "date-fns";
import { FC } from "react";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

type DatePickerProps = {
  value: string,
  label: string,
  onChange: any,
  format?: string,
  disabled?: boolean,
  disablePast?: boolean,
}

const FormDatePicker: FC<DatePickerProps> = ({ value, onChange, label, format = "dd/MM/yyyy", disabled = false, disablePast = false }) => {
  return (
    <>
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        locale={esLocale}
      >
        <KeyboardDatePicker
          autoOk
          label={label}
          value={value !== null && value.length === 0 ? null : value}
          format={format}
          okLabel={false}
          onChange={onChange}
          fullWidth
          clearable
          placeholder={format}
          cancelLabel={false}
          disabled={disabled}
          disablePast={disablePast}
          disableToolbar
          showTodayButton
          InputLabelProps={{
            shrink: true,
          }}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </>
  );
}

export default FormDatePicker;
