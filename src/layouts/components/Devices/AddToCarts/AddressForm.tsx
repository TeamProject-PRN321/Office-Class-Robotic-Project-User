import * as React from 'react'

import Grid from '@mui/material/Grid'
import { Autocomplete, Box, TextField } from '@mui/material'
import useAuth from 'src/@core/hooks/useAuth'
import useAxios from 'src/@core/hooks/useAxios'

export interface TeacherBorrowModel {
  className: string
  classroomName: string
  dayStudy: string
  startTime: string
  endTime: string
  timeDetail: string
  totalStudentInClass: number
  classWasCheckedAttendant: number
}

// const FormGrid = styled(Grid)(() => ({
//   display: 'flex',
//   flexDirection: 'column'
// }))

export default function AddressForm({ onDataChange }) {
  const [schedularTeacherBorrow, setschedularTeacherBorrow] = React.useState<TeacherBorrowModel[]>([])
  const [teacherID, setTeacherID] = React.useState<TeacherBorrowModel[]>([])

  const [purpose, setPurpose] = React.useState('')

  const authen = useAuth()
  const appUserId = authen.Id
  console.log(appUserId)
  const axiosClient = useAxios()

  React.useEffect(() => {
    const fetchAllSchedularTeacherBorrow = async () => {
      try {
        const response = await axiosClient.call(
          'get',
          `/api/v1/teacher/get-schedule-of-teacher-for-borrow-devices/${appUserId}`
        )
        setschedularTeacherBorrow(response as TeacherBorrowModel[])
      } catch (error) {
        console.log(error)
      }
    }

    fetchAllSchedularTeacherBorrow()
  }, [])

  React.useEffect(() => {
    onDataChange({ purpose, teacherID })
  }, [purpose, teacherID, onDataChange])

  return (
    <Grid container spacing={3}>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 3, width: '60ch' }
        }}
        noValidate
        autoComplete='off'
      >
        <div>
          <TextField
            id='outlined-multiline-static'
            label='Borrow Purpose'
            multiline
            rows={4}
            defaultValue='Borrow Purpose'
            onChange={e => setPurpose(e.target.value)}
          />
        </div>
      </Box>
      {/* <FormGrid item xs={12}>
        <FormLabel htmlFor='classname'>Class Name</FormLabel>
        <OutlinedInput
          id='classname'
          name='classname'
          type='classname'
          placeholder='ClassName, suite, unit, etc. (optional)'
          autoComplete='shipping address-line2'
          required
        />
      </FormGrid> */}
      {/* <FormGrid item xs={12}>
        <FormLabel htmlFor='slot'>Slot</FormLabel>
        <OutlinedInput
          id='slot'
          name='slot'
          type='slot'
          placeholder='Slot, suite, unit, etc. (optional)'
          autoComplete='shipping address-line3'
          required
        />
      </FormGrid> */}
      <Box
        sx={{
          m: 2,
          width: '600px',
          height: '250px'
        }}
      >
        <Autocomplete
          getOptionLabel={(value: TeacherBorrowModel) => {
            return `${value.className} - ${value.classroomName} - ${value.dayStudy} (${value.startTime} - ${value.endTime})`
          }}
          options={schedularTeacherBorrow}
          id='auto-complete'
          onChange={(e, value) => {
            setTeacherID(value)
          }}
          // value.map(x => `${x.className} - ${x.classroomName} - ${x.dayStudy} (${x.startTime} - ${x.endTime})`)

          multiple={true}
          autoComplete
          includeInputInList
          renderInput={params => (
            <TextField
              {...params}
              label='Class Name'
              variant='standard'
              sx={{
                width: '100%',
                '& .MuiInputBase-input': {
                  fontSize: '1.5rem',
                  paddingTop: '16px',
                  paddingBottom: '16px'
                }
              }}
            />
          )}
        />
      </Box>
    </Grid>
  )
}
