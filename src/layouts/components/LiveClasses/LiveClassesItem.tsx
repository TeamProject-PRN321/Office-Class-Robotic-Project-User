import { Box, Button, Card, Typography } from '@mui/material'
import { Calendar, ClockOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import * as React from 'react'
import { ClassModel } from './AddNewClass/NewClassFormLiveClass'

interface LiveClassItemsProps {
  data: ClassModel
}

export default function LiveClassItems({ data }: LiveClassItemsProps) {
  const route = useRouter()
  const ViewDetailLiveClass = () => {
    route.push('/classes')
  }

  return (
    <Card sx={{ padding: '15px', display: 'flex', gap: 3, flexDirection: 'column', width: '100%' }}>
      <Typography sx={{ color: 'black', fontWeight: 'bold' }}>{data.className}</Typography>
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
          backgroundColor: '#BCECC4',
          color: '#40C053'
        }}
      >
        Status: Starting after 30 minutes
      </Typography>
      <Button
        sx={{ backgroundColor: '#9155fd', color: 'white', ':hover': { backgroundColor: '#008BC5', color: 'white' } }}
        onClick={() => {
          ViewDetailLiveClass()
        }}
      >
        John now
      </Button>
    </Card>
  )
}
