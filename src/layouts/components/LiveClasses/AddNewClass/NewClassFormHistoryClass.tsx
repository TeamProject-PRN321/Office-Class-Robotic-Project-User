import * as React from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

import { Typography } from '@mui/material'

// ** MUI Imports
import DialogForm from './DialogForm'
import useAuth from 'src/@core/hooks/useAuth'
import { useEffect } from 'react'
import useAxios from 'src/@core/hooks/useAxios'
import { ClassModel, ObjectFilterClass } from './NewClassFormLiveClass'
import HistoryClasses from '../HistoryClasses'
import HistoryClassesReport from '../HistoryClassesReport'
import FilterClass from '../Filter/FilterClass'
import moment from 'moment'

const GET_CLASS_URL = '/api/v1/teacher/get-schedule-of-teacher'

export default function NewClassFormHistoryClass() {
  const [startDate, setStartDate] = React.useState<string>(moment().startOf('week').toISOString())
  const [endDate, setEndDate] = React.useState<string>(moment().endOf('week').toISOString())
  const authencation = useAuth()
  const role = authencation.role

  const [classes, setClasses] = React.useState<ClassModel[]>([])
  const axiosClient = useAxios()

  const authen = useAuth()
  const id = authen.Id

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        if (!id) return

        const response = await axiosClient.call('get', GET_CLASS_URL, {
          DateEndOfWeek: !!endDate ? moment(endDate).format('YYYY-MM-DD') : moment().endOf('week').format('YYYY-MM-DD'),
          DateStartOfWeek: !!startDate
            ? moment(startDate).format('YYYY-MM-DD')
            : moment().startOf('week').format('YYYY-MM-DD'),
          AppUserId: id
        } as ObjectFilterClass)

        setClasses(response as ClassModel[])
      } catch (error) {
        console.log(error)
      }
    }

    fetchClasses()
  }, [id, endDate, startDate])

  return (
    <Grid container direction={'row'} spacing={4}>
      <FilterClass startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} />
      <Grid
        item
        display={'flex'}
        flexWrap={'wrap'}
        justifyContent={'space-between'}
        width={'100%'}
        alignItems={'center'}
      >
        <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}> Live Classes</Typography>
        {role === 'Admin' && <DialogForm></DialogForm>}
      </Grid>
      {classes.map((item, index) => {
        return (
          <Grid item xl={3} lg={3} md={3} xs={6} sm={6} key={index}>
            {item.classWasCheckedAttendant ? <HistoryClassesReport data={item} /> : <HistoryClasses data={item} />}
          </Grid>
        )
      })}
    </Grid>
  )
}
