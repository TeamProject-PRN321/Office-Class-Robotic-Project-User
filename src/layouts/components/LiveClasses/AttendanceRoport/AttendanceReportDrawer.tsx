import { Box, Button, Grid, Typography } from '@mui/material'
import { Calendar, ClockOutline } from 'mdi-material-ui'
import * as React from 'react'
import AttendanceTableStudent from './AttendanceTableStudent'

export default function AttendanceReportDrawer() {
  return (
    <Grid container width='750px' padding={'10px'}>
      <Grid
        item
        display={'flex'}
        justifyContent={'space-between'}
        width={'100%'}
        alignItems={'center'}
        sx={{ paddingBottom: '20px' }}
      >
        <Typography sx={{ color: '#4B4453', fontWeight: 'bold', fontSize: '23px' }}>Attendance Report</Typography>
        <Button
          sx={{
            backgroundColor: '#C4FCEF',
            color: '#50bf62',
            fontWeight: 'bold',
            fontSize: '13px',
            ':hover': {
              color: 'white',
              backgroundColor: '#0081CF'
            }
          }}
        >
          Submit attendance
        </Button>
      </Grid>
      <Grid item paddingBottom={'20px'}>
        <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }}>
          How to Make an Array and it's Type in C#
        </Typography>
      </Grid>

      <Grid item sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }} paddingBottom={'20px'}>
        <Typography
          sx={{
            border: '1px solid #B0AAAE',
            borderRadius: '10px',
            width: 'fit-content',
            padding: '5px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          Teacher: Ngô Thị Hương
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <ClockOutline></ClockOutline>
          <Typography sx={{ marginRight: '15px' }}>12:40 P:M</Typography>
          <Calendar></Calendar>
          <Typography>05/08/2001</Typography>
        </Box>
        <Typography
          sx={{
            border: '1px solid #CECFD7',
            borderRadius: '10px',
            width: 'fit-content',
            padding: '5px',
            fontSize: '12px',
            fontWeight: 'bold',
            backgroundColor: '#BCECC4',
            color: '#40C053'
          }}
        >
          Status: Complete
        </Typography>
      </Grid>

      <Grid item>
        <AttendanceTableStudent></AttendanceTableStudent>
      </Grid>
    </Grid>
  )
}
