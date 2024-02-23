// ** MUI Imports
import Grid from '@mui/material/Grid'
import { Typography, Button } from '@mui/material'
import * as React from 'react'
import { Plus } from 'mdi-material-ui'
import ScheduleDashboard from 'src/layouts/components/Dashboard/DashboardSchedule'

export default function App() {
  return (
    <Grid container direction={'row'} justifyContent={'space-between'} spacing={2}>
      <Grid
        marginBottom={'20px'}
        item
        display={'flex'}
        justifyContent={'space-between'}
        width={'100%'}
        alignItems={'center'}
      >
        <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>Schedules</Typography>
        <Button
          sx={{
            backgroundColor: '#5681f1',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '13px',
            ':hover': {
              backgroundColor: '#816EA5',
              color: 'white'
            }
          }}

          // onClick={() => {
          //   ViewAllSchedule()
          // }}
        >
          <Plus sx={{ margin: '2px', fontSize: '16px' }}></Plus>
          Add Schedule
        </Button>
      </Grid>

      <Grid
        item
        container
        gap={3}
        xs={12}
        md={3}
        lg={3}
        justifyContent={'start'}
        flexDirection={'column'}
        sx={{
          height: '700px',
          overflowY: 'scroll',
          flexWrap: 'nowrap',
          '&::-webkit-scrollbar': {
            width: '3px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme => theme.palette.grey[300] // Color of the thumb (adjust as needed)
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme => theme.palette.grey[200] // Color of the track (adjust as needed)
          },
          pt: '0px !important'
        }}
      >
        <Grid item>
          <ScheduleDashboard />
        </Grid>
        <Grid item>
          <ScheduleDashboard />
        </Grid>
        <Grid item>
          <ScheduleDashboard />
        </Grid>
        <Grid item>
          <ScheduleDashboard />
        </Grid>
      </Grid>

      <Grid
        item
        container
        gap={3}
        xs={12}
        md={3}
        lg={3}
        justifyContent={'start'}
        flexDirection={'column'}
        sx={{
          height: '700px',
          overflowY: 'scroll',
          flexWrap: 'nowrap',
          '&::-webkit-scrollbar': {
            width: '3px' // Set the width of the scrollbar
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme => theme.palette.grey[200] // Color of the thumb (adjust as needed)
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme => theme.palette.grey[300] // Color of the track (adjust as needed)
          },
          pt: '0px !important'
        }}
      >
        <Grid item>
          <ScheduleDashboard />
        </Grid>
        <Grid item>
          <ScheduleDashboard />
        </Grid>
        <Grid item>
          <ScheduleDashboard />
        </Grid>
      </Grid>

      <Grid
        item
        container
        gap={3}
        xs={12}
        md={3}
        lg={3}
        justifyContent={'start'}
        flexDirection={'column'}
        sx={{
          height: '700px',
          overflowY: 'scroll',
          flexWrap: 'nowrap',
          '&::-webkit-scrollbar': {
            width: '3px' // Set the width of the scrollbar
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme => theme.palette.grey[200] // Color of the thumb (adjust as needed)
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme => theme.palette.grey[300] // Color of the track (adjust as needed)
          },
          pt: '0px !important'
        }}
      >
        <Grid item>
          <ScheduleDashboard />
        </Grid>
        <Grid item>
          <ScheduleDashboard />
        </Grid>
      </Grid>

      <Grid
        item
        container
        gap={3}
        xs={12}
        md={3}
        lg={3}
        justifyContent={'start'}
        flexDirection={'column'}
        sx={{
          height: '700px',
          overflowY: 'scroll',
          flexWrap: 'nowrap',
          '&::-webkit-scrollbar': {
            width: '3px' // Set the width of the scrollbar
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme => theme.palette.grey[200] // Color of the thumb (adjust as needed)
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme => theme.palette.grey[300] // Color of the track (adjust as needed)
          },
          pt: '0px !important'
        }}
      >
        <Grid item>
          <ScheduleDashboard />
        </Grid>
      </Grid>
    </Grid>
  )
}
