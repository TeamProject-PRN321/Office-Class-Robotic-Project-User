import { Box, Button, Card, Typography } from '@mui/material'
import { BookmarkCheckOutline, SchoolOutline } from 'mdi-material-ui'
import * as React from 'react'

export default function Teachers() {
  return (
    <Card sx={{ padding: '15px', display: 'flex', gap: 3, flexDirection: 'column' }}>
      <Typography sx={{ color: 'black', fontWeight: 'bold' }}>Trần Duy Thanh</Typography>
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
        Added at: January 1, 2024
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
