import * as React from 'react'
import { ClassForAdminModel } from './AddNewClass/NewClassFormLiveClass'
import { Box, Button, Card, Typography } from '@mui/material'
import { ClockOutline } from 'mdi-material-ui'
import moment from 'moment'

export interface IClassForAdminProps {
  data: ClassForAdminModel
}

export default function ClassForAdmin({ data }: IClassForAdminProps) {
  const ViewDetailLiveClass = () => {
    console.log('click')
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
        Teacher: {data.teacherName}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <ClockOutline></ClockOutline>
        <Typography sx={{ marginRight: '15px' }}>
          {moment(data.startTime, 'HH:mm:ss').format('HH:mm')} - {moment(data.endTime, 'HH:mm:ss').format('HH:mm')}
        </Typography>
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
        Subject: {data.subjectName}
      </Typography>

      {/* <Button
        sx={{ backgroundColor: '#9155fd', color: 'white', ':hover': { backgroundColor: '#008BC5', color: 'white' } }}
        onClick={() => {
          ViewDetailLiveClass()
        }}
      >
        John now
      </Button> */}
    </Card>
  )
}
