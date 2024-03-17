import * as React from 'react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TextField, InputAdornment } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export interface IInputTimeProps {
  placeholderText: string
  label: string
  value: string
  minValue?: string
  handleChangeValue: (value: string) => void
}

export default function InputTime({
  placeholderText = 'Chọn thời gian',
  label = 'Chọn thời gian',
  value = '',
  handleChangeValue,
  minValue
}: IInputTimeProps) {
  return (
    <DatePickerWrapper>
      <DatePicker
        autoComplete='false'
        customInput={
          <TextField
            fullWidth
            size='medium'
            label={label}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <CalendarTodayIcon />
                </InputAdornment>
              )
            }}
            inputProps={{
              autoComplete: 'off'
            }}
          />
        }
        onChange={(val: any) => {
          console.log(val)
          handleChangeValue(val || '')
        }}
        minDate={minValue ? moment(minValue).toDate() : null}
        selected={value ? moment(value).toDate() : null}
        placeholderText={placeholderText}
        dateFormat='dd/MM/yyyy'
        isClearable
      />
    </DatePickerWrapper>
  )
}
