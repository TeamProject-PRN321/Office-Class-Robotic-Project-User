import { Box, Button, Card, Drawer, Typography } from '@mui/material'
import { Calendar, ClockOutline } from 'mdi-material-ui'
import * as React from 'react'
import AttendanceReportDrawer from './AttendanceRoport/AttendanceReportDrawer'

export default function HistoryClasses() {
  const [state, setState] = React.useState(false)

  const toggleDrawer = () => {
    setState(!state)
  }

  return (
    <Card sx={{ padding: '15px', display: 'flex', gap: 3, flexDirection: 'column' }}>
      <Typography sx={{ color: 'black', fontWeight: 'bold' }}>How to Make an Array and it's Type in C#</Typography>
      <Typography
        sx={{
          border: '1px solid #B0AAAE',
          borderRadius: '10px',
          width: 'fit-content',
          padding: '5px',
          fontSize: '14px',
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
          fontSize: '14px',
          fontWeight: 'bold',
          backgroundColor: '#C4FCEF',
          color: '#00C9A7'
        }}
      >
        Status: Completed
      </Typography>

      <Button
        sx={{ backgroundColor: '#9155fd', color: 'white', ':hover': { backgroundColor: '#008BC5', color: 'white' } }}
        onClick={() => {
          toggleDrawer()
        }}
      >
        Attendance
      </Button>

      {/* Show drawer attendance */}
      <Drawer anchor={'right'} open={state} onClose={toggleDrawer} sx={{}}>
        <AttendanceReportDrawer></AttendanceReportDrawer>
      </Drawer>
    </Card>
  )
}
