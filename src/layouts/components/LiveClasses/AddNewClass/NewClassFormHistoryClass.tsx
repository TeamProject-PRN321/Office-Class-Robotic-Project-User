import * as React from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

import { Typography } from '@mui/material'

// ** MUI Imports
import DialogForm from './DialogForm'
import HistoryClasses from '../HistoryClasses'
import HistoryClassesReport from '../HistoryClassesReport'
import useAuth from 'src/@core/hooks/useAuth'

export default function NewClassFormHistoryClass() {
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
        <HistoryClassesReport></HistoryClassesReport>
      </Grid>
      <Grid item>
        <HistoryClasses></HistoryClasses>
      </Grid>
      <Grid item>
        <HistoryClassesReport></HistoryClassesReport>
      </Grid>
      <Grid item>
        <HistoryClasses></HistoryClasses>
      </Grid>
      <Grid item>
        <HistoryClasses></HistoryClasses>
      </Grid>
      <Grid item>
        <HistoryClassesReport></HistoryClassesReport>
      </Grid>
      <Grid item>
        <HistoryClassesReport></HistoryClassesReport>
      </Grid>
    </Grid>
  )
}
