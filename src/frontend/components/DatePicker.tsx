import * as React from 'react';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';

type DatePickerProps = {
  label: string;
  value: Date | number;
  minDate: Date | number;
  onChange: (value: number | Date | null, keyboardInputValue?: string | undefined) => void;
};

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { label, value, minDate, onChange } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        label={label}
        minDate={minDate}
        inputFormat="DD.MM.YYYY"

        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} style={{ width: 150 }} size="small" />}
      />
    </LocalizationProvider>
  )
}

export default DatePicker;