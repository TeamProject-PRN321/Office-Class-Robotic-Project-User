import { Autocomplete, Grid, TextField } from '@mui/material'
import * as React from 'react'
import InputTime from './InputTime'
import { ClassModel } from '../AddNewClass/NewClassFormLiveClass'

export interface IFilterClassProps {
  startDate: string
  endDate: string
  setEndDate: (value: string) => void
  setStartDate: (value: string) => void
  classes: string
  listClasses: ClassModel[]
  setClassName: (value: string) => void
}

export default function FilterClass({
  startDate,
  endDate,
  setEndDate,
  setStartDate,
  classes,
  listClasses,
  setClassName
}: IFilterClassProps) {
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
      <Grid item>
        <Autocomplete
          getOptionLabel={value => value.className}
          options={listClasses.filter((obj, index, arr) => {
            // Check if the current object has a duplicate based on strict equality
            return arr.findIndex(currentObj => currentObj.className === obj.className) === index
          })}
          value={listClasses.filter(className => className.className === classes).at(0)}
          onChange={(e, value) => {
            setClassName(value?.className || '')
          }}
          id='auto-complete'
          autoComplete
          includeInputInList
          renderInput={params => <TextField {...params} label='Choose Class name' />}
          sx={{
            width: '300px'
          }}
        />
      </Grid>
    </Grid>
  )
}
