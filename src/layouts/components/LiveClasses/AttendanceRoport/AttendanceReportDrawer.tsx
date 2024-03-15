import { Box, Button, Grid, Typography } from '@mui/material'
import { Calendar, ClockOutline } from 'mdi-material-ui'
import * as React from 'react'
import AttendanceTableStudent from './AttendanceTableStudent'
import { table } from 'console'

function createData(StudentID: string, StudentName: string, Class: string, Attendance: string, isAttendance: boolean) {
  return { StudentID, StudentName, Class, Attendance, isAttendance } as Student
}

const rows = [
  createData('SE150627', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150628', 'Nguyễn Thành Nhân', 'C#', 'Absent', false),
  createData('SE150629', 'Nguyễn Ngọc Thái Vĩ', 'C#', 'Absent', false),
  createData('SE150630', 'Nguyễn Thanh Duy', 'C#', 'Absent', false),
  createData('SE150631', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150632', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150633', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150634', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150635', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150636', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150637', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150638', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150639', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150640', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150641', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150642', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150643', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false)
]

export type Student = {
  StudentID: string
  StudentName: string
  Class: string
  Attendance: string
  isAttendance?: boolean
}

export default function AttendanceReportDrawer() {
  const [lst, setLst] = React.useState<Student[]>(rows)

  const handleCheckAttendance = (studentId: string) => {
    const studentIndex = lst.findIndex(x => x.StudentID === studentId)
    if (studentIndex < 0) {
      console.log('Không tìm thấy studentId ' + studentId)

      return
    }

    const newLst = [...lst]
    const newStudent = newLst[studentIndex]
    newStudent.isAttendance = !newStudent.isAttendance
    setLst([...newLst])
  }

  const handleSubmit = () => {
    console.table(lst)
    console.log('Tổng: ' + lst.length)
    console.log('Vắng : ', lst.filter(s => !s.isAttendance).length)
    console.log('Có mặt : ', lst.filter(s => s.isAttendance).length)
  }

  return (
    <Grid container width='750px' padding={'10px'}>
      <Grid
        item
        display={'flex'}
        justifyContent={'space-between'}
        width={'100%'}
        alignItems={'center'}
        sx={{ paddingBottom: '20px' }}
      >
        <Typography sx={{ color: '#4B4453', fontWeight: 'bold', fontSize: '23px' }}>Attendance Report</Typography>
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
          onClick={handleSubmit}
        >
          Submit attendance
        </Button>
      </Grid>
      <Grid item paddingBottom={'20px'}>
        <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }}>
          How to Make an Array and it's Type in C#
        </Typography>
      </Grid>

      <Grid item sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }} paddingBottom={'20px'}>
        <Typography
          sx={{
            border: '1px solid #B0AAAE',
            borderRadius: '10px',
            width: 'fit-content',
            padding: '5px',
            fontSize: '12px',
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
            fontSize: '12px',
            fontWeight: 'bold',
            backgroundColor: '#BCECC4',
            color: '#40C053'
          }}
        >
          Status: Complete
        </Typography>
      </Grid>

      <Grid item>
        <AttendanceTableStudent students={lst} handleCheckAttendance={handleCheckAttendance}></AttendanceTableStudent>
      </Grid>
    </Grid>
  )
}
