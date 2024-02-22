import { Box, Button, Card, Grid, Typography } from '@mui/material'
import { Calendar, ClockOutline } from 'mdi-material-ui'
import * as React from 'react'

export default function LiveClasses() {
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
          backgroundColor: '#ffdddd',
          color: '#f55c5c'
        }}
      >
        Status: On going
      </Typography>
      <Button
        sx={{ backgroundColor: '#9155fd', color: 'white', ':hover': { backgroundColor: 'black', color: 'white' } }}
      >
        John now
      </Button>
    </Card>
  )
}
