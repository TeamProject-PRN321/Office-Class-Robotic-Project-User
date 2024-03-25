import { Box, Button, Card, Drawer, Typography } from '@mui/material'
import { Calendar, ClockOutline } from 'mdi-material-ui'
import moment from 'moment'
import * as React from 'react'
import useAxios from 'src/@core/hooks/useAxios'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { ClassModel } from './AddNewClass/NewClassFormLiveClass'
import AttendanceReportDrawer from './AttendanceRoport/AttendanceReportDrawer'

interface HistoryClassesProps {
  data: ClassModel
}
export interface StudentModel {
  dateStudy: string
  className: string
  startTime: string
  endTime: string
  studentName: string
  studentId: string
  attendanceStatus: number
  attendanceId: string
}

const URL_GET_STUDENT_OF_CLASSES = '/api/v1/attendances'

export default function HistoryClasses({ data }: HistoryClassesProps) {
  const [state, setState] = React.useState(false)
  const [studentList, setStudentList] = React.useState<StudentModel[]>([])
  const axiosClient = useAxios()

  const isAbletoCheckAttendance: boolean = data.classWasCheckedAttendant

  const toggleDrawer = async () => {
    await fetchDataStudent()
    setState(!state)
  }

  const fetchDataStudent = async () => {
    try {
      const response = await axiosClient.call(
        'get',
        URL_GET_STUDENT_OF_CLASSES +
          '/' +
          data.className +
          '/' +
          moment(data.dayStudy, 'DD-MM-YYYY').format('YYYY-MM-DD'),
        null,
        true
      )

      setStudentList(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCheckAttendance = (studentId: string) => {
    const studentIndex = studentList.findIndex(x => x.studentId === studentId)
    if (studentIndex < 0) {
      console.log('Not found studentId ' + studentId)

      return
    }

    const newLst = [...studentList]
    const newStudent = newLst[studentIndex]
    newStudent.attendanceStatus = newStudent.attendanceStatus === 0 ? 1 : 0
    setStudentList([...newLst])
  }

  return (
    <Card sx={{ padding: '15px', display: 'flex', gap: 3, flexDirection: 'column', width: '100%' }}>
      <Typography sx={{ color: 'black', fontWeight: 'bold' }}>{data.className}</Typography>
      {/* <Typography
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
      </Typography> */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <ClockOutline></ClockOutline>
          <Typography sx={{ marginRight: '15px' }}>
            {moment(data.startTime, 'HH:mm:ss').format('HH:mm')} - {moment(data.endTime, 'HH:mm:ss').format('HH:mm')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Calendar></Calendar>
          <Typography>{data.dayStudy}</Typography>
        </Box>
      </Box>
      <Typography
        sx={{
          border: '1px solid #CECFD7',
          borderRadius: '10px',
          width: 'fit-content',
          padding: '5px',
          fontSize: '14px',
          fontWeight: 'bold',
          backgroundColor: theme =>
            data.classWasCheckedAttendant ? '#C4FCEF' : hexToRGBA(theme.palette.info.light, 0.2),
          color: theme => (data.classWasCheckedAttendant ? '#00C9A7' : theme.palette.info.light)
        }}
      >
        Status: {data.classWasCheckedAttendant ? 'Completed' : 'Waiting'}
      </Typography>

      <Button
        variant='contained'
        sx={{
          ':hover': {
            backgroundColor: '#008BC5',
            color: 'white'
          },
          ':disabled': {
            cursor: 'not-allowed'
          }
        }}
        onClick={() => {
          toggleDrawer()
        }}
        disabled={
          isAbletoCheckAttendance || moment().format('DD-MM-YYYY') !== data.dayStudy

          // moment(data.startTime, 'HH:mm:ss').isBefore(moment()) ||
          // moment(data.endTime, 'HH:mm:ss').isAfter(moment())
        }
      >
        Check Attendance
      </Button>

      {/* Show drawer attendance */}
      <Drawer anchor={'right'} open={state} onClose={toggleDrawer} sx={{}}>
        <AttendanceReportDrawer
          classData={data}
          studentList={studentList}
          handleCheckAttendance={handleCheckAttendance}
        />
      </Drawer>
    </Card>
  )
}
