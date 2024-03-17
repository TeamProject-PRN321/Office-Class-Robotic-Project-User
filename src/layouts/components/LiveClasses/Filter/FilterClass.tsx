import { Grid } from '@mui/material'
import * as React from 'react'
import InputTime from './InputTime'

export interface IFilterClassProps {
  startDate: string
  endDate: string
  setEndDate: (value: string) => void
  setStartDate: (value: string) => void
}

export default function FilterClass({ startDate, endDate, setEndDate, setStartDate }: IFilterClassProps) {
  return (
    <Grid container spacing={4} mt={3}>
      <Grid item>
        <InputTime
          placeholderText={'Ngày bắt đầu'}
          label={'Ngày bắt đầu'}
          value={startDate}
          handleChangeValue={setStartDate}
        />
      </Grid>
      <Grid item>
        <InputTime
          placeholderText={'Ngày kết thúc'}
          label={'Ngày kết thúc'}
          value={endDate}
          handleChangeValue={setEndDate}
        />
      </Grid>
    </Grid>
  )
}
