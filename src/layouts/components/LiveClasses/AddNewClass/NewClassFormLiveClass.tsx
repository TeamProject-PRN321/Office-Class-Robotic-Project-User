import * as React from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

import { Typography } from '@mui/material'

import LiveClassItems from 'src/layouts/components/LiveClasses/LiveClassesItem'

// ** MUI Imports
import DialogForm from './DialogForm'
import { StudentListID } from 'src/pages/classes'
import useAuth from 'src/@core/hooks/useAuth'

export interface NewClassModel {
  className: string
  dayStudy: string[]
  startTime: string
  endTime: string
  studentListId: StudentListID[]
  dateStartClass: string
  subjectId: string
  teacherId: string
  classRoomID: string
}

export default function NewClassFormLiveClass() {
  const authencation = useAuth()
  const role = authencation.role

  return (
    <Grid container direction={'row'} spacing={4}>
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
      <Grid item>
        <LiveClassItems></LiveClassItems>
      </Grid>
      <Grid item>
        <LiveClassItems></LiveClassItems>
      </Grid>
      <Grid item>
        <LiveClassItems></LiveClassItems>
      </Grid>
      <Grid item>
        <LiveClassItems></LiveClassItems>
      </Grid>
      <Grid item>
        <LiveClassItems></LiveClassItems>
      </Grid>
      <Grid item>
        <LiveClassItems></LiveClassItems>
      </Grid>
      <Grid item>
        <LiveClassItems></LiveClassItems>
      </Grid>
    </Grid>
  )
}
