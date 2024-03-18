import {
  Box,
  Button,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material'
import { MenuLeftOutline, MenuRightOutline } from 'mdi-material-ui'
import moment from 'moment'
import { Fragment, useEffect, useState } from 'react'
import ListIcon from '@mui/icons-material/List'
import useAxios from 'src/@core/hooks/useAxios'
import { StudentInfoModel } from '../LiveClasses/AddNewClass/NewClassFormLiveClass'
import useAuth from 'src/@core/hooks/useAuth'

export interface Subject {
  className: string
  classroomName: string
  dayStudy: string
  startTime: string
  endTime: string
  timeDetail: string
  totalStudentInClass: number
}

export interface ScheduleModel {
  subjectId: string
  subjectName: string
  timeStart: string
  timeEnd: string
  teacherId: string
  teacherName: string
  dateLearn: string
  slotRemaining: number
  slotAttendanceStatus: string
}

type MapDateScheduleModel = {
  [key: string]: ScheduleModel[]
}

const range = (start: number, end: number, step: number) => {
  return Array.from(Array.from(Array(Math.ceil((end - start) / step)).keys()), x => start + x * step)
}
const API_GET_STUDENT_BY_ID = '/api/v1/student/get-student-by-appuser-id/'

const list = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const timeLst = range(6, 25, 1)
const heightOfASlot = 60
const widthOfASlot = 150

const Slot = ({ data }: { data: ScheduleModel }) => {
  // const [idToken, setIdToken] = useState<string>('')
  return (
    <Tooltip title={data.subjectName}>
      <Card
        sx={{
          padding: '5px',
          position: 'absolute',

          // top: heightOfASlot * 1 + 1 * 1 - 1 + 2 + 'px',
          // left: widthOfASlot * 1 + 3 * 1 - 70 + 'px',
          top: (moment(data.timeStart, 'HH:mm:ss').get('minute') / 60) * widthOfASlot + 'px',
          left: '0.5px',
          right: '0.5px',
          backgroundColor: '#b39bde',
          zIndex: 1,
          height:
            (moment(data.timeEnd, 'HH:mm:ss').get('hour') -
              moment(data.timeStart, 'HH:mm:ss').get('hour') +
              (moment(data.timeEnd, 'HH:mm:ss').get('minute') - moment(data.timeStart, 'HH:mm:ss').get('minute')) /
                60) *
              heightOfASlot -
            2,
          borderRadius: 0,
          ':hover': {
            cursor: 'pointer'
          }
        }}
      >
        <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} height={'100%'}>
          <Box display={'flex'} flexDirection={'column'}>
            <Typography fontWeight={600} color={'white'}>
              {data.subjectName}
            </Typography>
          </Box>
          <Typography color={'white'} textAlign={'right'} variant='body2'>
            {moment(data.timeStart, 'HH:mm:ss').format('HH:mm')} - {moment(data.timeEnd, 'HH:mm:ss').format('HH:mm')}
          </Typography>
        </Box>
      </Card>
    </Tooltip>
  )
}

export default function SchedulerTable() {
  const [next, setNext] = useState<number>(0)
  const [mapSchedules, setMapSchedules] = useState<MapDateScheduleModel>({})

  const axiosClient = useAxios()
  const authen = useAuth()
  const id = authen.Id

  //Get Schedule
  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const response = await axiosClient.call('get', API_GET_STUDENT_BY_ID + id, null, true)

        return (response as StudentInfoModel).studentId
      } catch (error) {}
    }

    const handleGetSchedule = async () => {
      try {
        const studentId = await fetchStudentInfo()
        const response = await axiosClient.call(
          'get',
          '/api/v1/student/get-schedule-of-student-by-student-id?StudentId=' + studentId,
          null,
          true
        )
        console.log(response)

        const list = response as ScheduleModel[]
        const map: MapDateScheduleModel = {}
        list.map(schedule => {
          if (map[schedule.dateLearn]) {
            map[schedule.dateLearn].push(schedule)
          } else {
            map[schedule.dateLearn] = [schedule]
          }
        })

        setMapSchedules(map)
      } catch (error) {
        console.log(error)
      }
    }

    handleGetSchedule()
  }, [])

  return (
    <Fragment>
      <Card
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '5px',
          mt: 3
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center'
          }}
        >
          <Button>
            <ListIcon />
          </Button>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'center'
            }}
          >
            <Button
              size={'small'}
              variant='outlined'
              onClick={() => {
                setNext(next - 1)
              }}
            >
              <MenuLeftOutline />
            </Button>
            <Typography>
              {moment().add('weeks', next).startOf('week').format('DD/MM/YYYY')} -{' '}
              {moment().add('weeks', next).endOf('week').format('DD/MM/YYYY')}
            </Typography>
            <Button
              size={'small'}
              variant='outlined'
              onClick={() => {
                setNext(next + 1)
              }}
            >
              <MenuRightOutline />
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center'
          }}
        >
          <Button size={'small'} variant='contained'>
            Weekly
          </Button>
          <Button size={'small'}>Monthly</Button>
        </Box>
      </Card>
      <Box
        sx={{
          mt: 1,
          padding: '10px'
        }}
      >
        <TableContainer
          sx={{
            border: '0.2px solid #CCCCCC'
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ height: heightOfASlot, zIndex: 1000, borderBottom: '1px solid grey' }}>
                <TableCell
                  sx={{
                    border: '0.2px solid #CCCCCC',
                    width: '80px',
                    height: heightOfASlot,
                    zIndex: 101,
                    '&.MuiTableCell-root': {
                      zIndex: 0
                    }
                  }}
                ></TableCell>
                {list.map((item, i) => {
                  return (
                    <TableCell
                      key={item}
                      sx={{
                        border: '0.2px solid #CCCCCC',
                        width: '150px !important',
                        height: heightOfASlot,
                        textAlign: 'center'
                      }}
                    >
                      <Typography
                        fontWeight={700}
                        sx={{
                          color: theme => theme.palette.primary[theme.palette.mode]
                        }}
                      >
                        {item}
                      </Typography>
                      <Typography
                        fontWeight={700}
                        sx={{
                          color: theme => theme.palette.primary[theme.palette.mode]
                        }}
                      >
                        {moment()
                          .startOf('week')
                          .add('day', i + next * 7)
                          .format('DD/MM')}
                      </Typography>
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                position: 'relative'
              }}
            >
              {timeLst.map(time => {
                return (
                  <TableRow key={time}>
                    <TableCell
                      sx={{
                        border: '0.2px solid #CCCCCC',
                        width: '80px',
                        height: heightOfASlot,
                        position: 'sticky',
                        left: 0,
                        zIndex: 100,
                        backgroundColor: 'white'
                      }}
                    >
                      <Chip
                        size='small'
                        color='primary'
                        sx={{
                          position: 'absolute',
                          top: -10,
                          left: 10,
                          zIndex: 999999
                        }}
                        label={
                          <Typography variant='caption' fontWeight={600} color={'white'}>
                            {' '}
                            {time} giờ
                          </Typography>
                        }
                      />
                    </TableCell>
                    {list.map((day, index) => {
                      return (
                        <TableCell
                          key={day}
                          sx={{
                            border: '0.2px solid #CCCCCC',
                            width: '150px !important',
                            minWidth: '150px !important',
                            maxWidth: '150px !important',
                            height: heightOfASlot,
                            position: 'relative'
                          }}
                          id={'slot_time_' + time + day}

                          // onClick={e => {
                          //   console.log(e)

                          //   const parent = document.getElementById(e.currentTarget.id)
                          //   if (parent)
                          //     parent.innerHTML =
                          //       '<div class="slot MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-tckmah-MuiPaper-root-MuiCard-root" style="position:absolute !important;top: 0.5px;left:0.8px"><div class="MuiBox-root css-1129bf7" ></div><div class="MuiBox-root css-j7qwjs"><p class="MuiTypography-root MuiTypography-body1 css-1tpsv8u-MuiTypography-root">Tên Môn</p><span class="MuiTypography-root MuiTypography-caption css-1gtrqkn-MuiTypography-root">SL HS bfsbug</span></div><p class="MuiTypography-root MuiTypography-body1 css-2rtyd8-MuiTypography-root">Thời gian</p></div>'
                          // }}
                        >
                          {/* {schedules.map((subject, index) => {
                            if (!subject.dateLearn.includes(day)) return

                            if (moment(subject.timeStart, 'HH:mm:ss').get('hour') !== time) return

                            return <Slot key={index} data={subject} />
                          })} */}
                          {mapSchedules[
                            moment()
                              .startOf('week')
                              .add('day', index + next * 7)
                              .format('DD-MM-YYYY')
                          ]?.map((subject, index) => {
                            if (moment(subject.timeStart, 'HH:mm:ss').get('hour') !== time) return

                            return <Slot key={index} data={subject} />
                          })}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}

              {/* Add more rows as needed */}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Fragment>
  )
}
