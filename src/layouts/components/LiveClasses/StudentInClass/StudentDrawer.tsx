import { Box, Button, Grid, Typography } from '@mui/material'
import { Calendar, ClockOutline } from 'mdi-material-ui'
import * as React from 'react'
import StudentTable from './StudentTable'
import { StudentModel } from '../HistoryClasses'

export default function StudentDrawer({ students }: { students: StudentModel[] }) {
  return (
    <Grid container width='750px' padding={'15px'}>
      <Grid
        item
        display={'flex'}
        justifyContent={'space-between'}
        width={'100%'}
        alignItems={'center'}
        sx={{ paddingBottom: '20px' }}
      >
        <Typography sx={{ color: '#4B4453', fontWeight: 'bold', fontSize: '23px' }}>Student in Class</Typography>
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
          Back to Class
        </Button>
      </Grid>

      <Grid item paddingBottom={'20px'} xl={12} lg={12} md={12} width={'100%'}>
        <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '18px', width: '100%' }}>
          ClassName : SE1506
        </Typography>
      </Grid>

      <Grid item paddingBottom={'20px'} xl={12} lg={12} md={12} width={'100%'}>
        <Typography sx={{ color: '#4B4453', fontSize: '16px' }}>Subject: PRN231</Typography>
      </Grid>

      <Grid item sx={{ display: 'flex', flexDirection: 'row', gap: '20px', width: '100%' }} paddingBottom={'20px'}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <ClockOutline></ClockOutline>
          <Typography sx={{ marginRight: '15px' }}>
            {/* {moment(classData.startTime, 'HH:mm:ss').format('HH:mm')} */}
            12:30 PM
          </Typography>
          <Calendar></Calendar>
          <Typography>
            {/* {classData.dayStudy} */}
            Date study: 25-03-2024
          </Typography>
        </Box>
        {/* <Typography
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
        </Typography> */}
      </Grid>

      <Grid item>
        <StudentTable students={students}></StudentTable>
      </Grid>
    </Grid>
  )
}
