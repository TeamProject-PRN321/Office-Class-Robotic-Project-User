import * as React from 'react'

import { Box, Button, Card, Dialog, DialogContent, DialogTitle, Slide, Typography } from '@mui/material'
import { Calendar, ClockOutline } from 'mdi-material-ui'
import { ClassModel } from './AddNewClass/NewClassFormLiveClass'
import { TransitionProps } from '@mui/material/transitions'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import useAxios from 'src/@core/hooks/useAxios'
import { useEffect } from 'react'

interface HistoryClassesReportProps {
  data: ClassModel
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

export interface AttendanceReportModel {
  dateStudy: string
  className: string
  startTime: string
  endTime: string
  studentName: string
  studentId: string
  attendanceStatus: number
  attendanceId: string
}

export default function HistoryClassesReport({ data }: HistoryClassesReportProps) {
  const [open, setOpen] = React.useState(false)
  const [checkAttendance, setCheckAttendance] = React.useState<AttendanceReportModel[]>([])
  const [reportSelected, setReportSelected] = React.useState<AttendanceReportModel>()
  const axios = useAxios()

  const handleCheckAttendance = async (className: string) => {
    try {
      const data = await axios.call(
        'get',
        '/api/v1/attendances/' + className + '/' + '2024-03-25',
        checkAttendance,
        true
      )
      const result = data.find((attendanceItem: AttendanceReportModel) => {
        return attendanceItem.className === className
      })
      setCheckAttendance(data)
      setReportSelected(result)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = (className: string) => {
    // setClassName(className)
    handleCheckAttendance(className)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (reportSelected) {
      setOpen(true)
    }
  }, [reportSelected])

  return (
    <Card sx={{ padding: '15px', display: 'flex', gap: 3, flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: '20px'
          }}
        >
          {data.className}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <ClockOutline></ClockOutline>
          <Typography sx={{ marginRight: '15px' }}>{data.startTime}</Typography>
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
        sx={{ backgroundColor: '#9155fd', color: 'white', ':hover': { backgroundColor: '#008BC5', color: 'white' } }}
        onClick={() => {
          handleClick(data.className)
        }}
      >
        Attendance Report
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogContent>
          <DialogTitle
            id='alert-dialog-slide-description'
            sx={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: '65px',
              textAlign: 'center'
            }}
          >
            Attendance Report Submitted Successfully
          </DialogTitle>

          <DialogContent>
            <Card sx={{ padding: '15px', display: 'flex', gap: 3, flexDirection: 'column' }}>
              <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }}>
                ClassName: {reportSelected?.className}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <ClockOutline></ClockOutline>
                <Typography sx={{ marginRight: '13px' }}>12:40 P:M</Typography>
                <Calendar></Calendar>
                <Typography>{reportSelected?.dateStudy}</Typography>
              </Box>
              <Typography
                sx={{
                  border: '1px solid #CECFD7',
                  borderRadius: '10px',
                  width: 'fit-content',
                  padding: '5px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  backgroundColor: '#1AD957',
                  color: '#FFFFFF'
                }}
              >
                Status: {reportSelected?.attendanceStatus ? 'Absent' : 'Present'}
              </Typography>
              <Typography
                sx={{
                  width: 'fit-content',
                  padding: '5px',
                  fontSize: '17px',
                  fontWeight: 'bold'
                }}
              >
                Total students: {checkAttendance.length}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                <Typography
                  sx={{
                    width: 'fit-content',
                    padding: '5px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#27EA45'
                  }}
                >
                  Present: {checkAttendance.filter(val => val.attendanceStatus == 0).length}
                </Typography>
                <Typography
                  sx={{
                    width: 'fit-content',
                    padding: '5px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'red'
                  }}
                >
                  Absent: {checkAttendance.filter(val => val.attendanceStatus == 1).length}
                </Typography>
              </Box>
              <Button
                sx={{
                  backgroundColor: '#9155fd',
                  color: 'white',
                  ':hover': { backgroundColor: '#008BC5', color: 'white' }
                }}
                onClick={() => {
                  handleClose()
                }}
              >
                Continue
              </Button>
            </Card>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
