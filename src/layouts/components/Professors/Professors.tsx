import { Box, Button, Card, Typography } from '@mui/material'
import { BookmarkCheckOutline } from 'mdi-material-ui'
import moment from 'moment'
import { useRouter } from 'next/router'
import * as React from 'react'
import { TeacherModel } from 'src/pages/teachers'

interface ProfessorItemsProps {
  teacherModel: TeacherModel
}

export default function ProfessorItems({ teacherModel }: ProfessorItemsProps) {
  const route = useRouter()
  const ViewDetailProfessor = () => {
    route.push('/teachers')
  }

  return (
    <Card sx={{ padding: '15px', display: 'flex', gap: 3, flexDirection: 'column', width: '350px', height: '200px' }}>
      <Typography sx={{ color: 'black', fontWeight: 'bold' }}>{teacherModel.name}</Typography>
      <Typography
        sx={{
          border: '1px solid #B0AAAE',
          borderRadius: '10px',
          width: 'fit-content',
          padding: '5px',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#43E45B'
        }}
      >
        Ngày sinh: {moment(teacherModel.birthday).format('DD-MM-YYYY')}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {/* <SchoolOutline sx={{ marginRight: '3px' }}></SchoolOutline>
        <Typography sx={{ marginRight: '15px' }}>3: Class</Typography> */}
        <Typography>{teacherModel.listSubjectOfTeacher.length}Course : </Typography>
        <BookmarkCheckOutline sx={{ marginRight: '3px' }}></BookmarkCheckOutline>
      </Box>

      <Button
        sx={{ backgroundColor: '#9155fd', color: 'white', ':hover': { backgroundColor: '#008BC5', color: 'white' } }}
        onClick={() => ViewDetailProfessor()}
      >
        View details
      </Button>
    </Card>
  )
}
