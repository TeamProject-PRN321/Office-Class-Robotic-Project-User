import * as React from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

import { Typography } from '@mui/material'

// ** MUI Imports
import DialogForm from './DialogForm'
import useAuth from 'src/@core/hooks/useAuth'
import { useEffect } from 'react'
import useAxios from 'src/@core/hooks/useAxios'
import { ClassForAdminModel, ClassModel, ObjectFilterClass } from './NewClassFormLiveClass'
import HistoryClasses from '../HistoryClasses'
import HistoryClassesReport from '../HistoryClassesReport'
import FilterClass from '../Filter/FilterClass'
import moment from 'moment'
import ClassForAdmin from '../ClassForAdmin'

const GET_CLASS_URL = '/api/v1/teacher/get-schedule-of-teacher'
const API_GET_ALL_CLASS_NOT_FINISHED = '/api/v1/classes/get-all-classes-are-not-finshed'

export default function NewClassFormHistoryClass() {
  const [startDate, setStartDate] = React.useState<string>(moment().startOf('week').toISOString())
  const [endDate, setEndDate] = React.useState<string>(moment().endOf('week').toISOString())

  const [classes, setClasses] = React.useState<ClassModel[]>([])
  const [classForAdmin, setClassForAdmin] = React.useState<ClassForAdminModel[]>([])
  const axiosClient = useAxios()

  const authen = useAuth()
  const id = authen.Id
  const role = authen.role

  const isAdmin = () => role === 'Admin'

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
        console.log('Not found table time' + error)
      }
    }

    const fetchAllClassNotFinished = async () => {
      try {
        const response = await axiosClient.call('get', API_GET_ALL_CLASS_NOT_FINISHED, null, true)

        setClassForAdmin(response as ClassForAdminModel[])
      } catch (error) {
        console.log('Not found table time' + error)
      }
    }

    if (isAdmin()) {
      fetchAllClassNotFinished()
    } else {
      fetchClasses()
    }
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
        <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}> Classes</Typography>
        {role === 'Admin' && <DialogForm></DialogForm>}
      </Grid>
      {classes.map((item, index) => {
        return (
          <Grid item xl={3} lg={3} md={3} xs={6} sm={6} key={index}>
            {item.classWasCheckedAttendant ? <HistoryClassesReport data={item} /> : <HistoryClasses data={item} />}
          </Grid>
        )
      })}
      {classForAdmin.map((item, index) => (
        <Grid item xl={3} lg={3} md={3} xs={6} sm={6} key={index}>
          <ClassForAdmin data={item}></ClassForAdmin>
        </Grid>
      ))}
    </Grid>
  )
}
