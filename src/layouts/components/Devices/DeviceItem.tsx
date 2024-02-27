import { Box, Button, Card, Typography } from '@mui/material'
import { Calendar, ClockOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import * as React from 'react'

export default function DeviceItems() {
  const route = useRouter()
  const ViewDetailDeviceItems = () => {
    route.push('/devices')
  }

  return (
    <Card sx={{ padding: '15px', display: 'flex', gap: 3, flexDirection: 'column', width: '350px', height: '250px' }}>
      <Typography sx={{ color: 'black', fontWeight: 'bold' }}>Smart TV</Typography>
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
        Device ID: DESKTOP-7VJ313T
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
        Status: Using
      </Typography>
      <Button
        sx={{ backgroundColor: '#9155fd', color: 'white', ':hover': { backgroundColor: '#008BC5', color: 'white' } }}
        onClick={() => {
          ViewDetailDeviceItems()
        }}
      >
        View details
      </Button>
    </Card>
  )
}