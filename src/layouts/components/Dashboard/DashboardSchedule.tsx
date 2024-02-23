import { Box, Button, Card, Typography } from '@mui/material'
import { BookmarkCheckOutline, SchoolOutline } from 'mdi-material-ui'
import * as React from 'react'

export default function ScheduleDashboard() {
  return (
    <Card sx={{ padding: '15px', display: 'flex', gap: 3, flexDirection: 'column' }}>
      <Typography sx={{ color: 'black', fontWeight: 'bold' }}>RESTful API designing với Spring Boot</Typography>
      <Typography
        sx={{
          border: '1px solid #B0AAAE',
          borderRadius: '10px',
          width: 'fit-content',
          padding: '5px',
          fontSize: '13px',
          fontWeight: 'bold',
          color: '#3B9F4A'
        }}
      >
        Professor: Trần Duy Thanh
      </Typography>
      <Typography
        sx={{
          border: '1px solid #B0AAAE',
          borderRadius: '10px',
          width: 'fit-content',
          padding: '5px',
          fontSize: '13px',
          color: '#3B9F4A'
        }}
      >
        Date: 3 months
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <SchoolOutline sx={{ marginRight: '3px' }}></SchoolOutline>
        <Typography sx={{ marginRight: '15px' }}>3: Class</Typography>
        <BookmarkCheckOutline sx={{ marginRight: '3px' }}></BookmarkCheckOutline>
        <Typography>1: Course</Typography>
      </Box>

      <Button
        sx={{ backgroundColor: '#9155fd', color: 'white', ':hover': { backgroundColor: '#008BC5', color: 'white' } }}
      >
        View details
      </Button>
    </Card>
  )
}
