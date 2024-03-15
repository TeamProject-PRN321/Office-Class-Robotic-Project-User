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

export interface Subject {
  className: string
  classroomName: string
  dayStudy: string
  startTime: string
  endTime: string
  timeDetail: string
  totalStudentInClass: number
}

// const data: ScheduleModel[] = [
//   {
//     subjectId: 'a3a258b8-ae79-49c2-96d5-05fe51912a0e',
//     subjectName: 'Introduction C# OOP',
//     timeStart: '19:00:00',
//     timeEnd: '22:00:00',
//     teacherId: '53525c34-3437-4b3b-946c-e9be0a60c0c3',
//     teacherName: 'Nguyen Phuong LyLy',
//     dateLearn: '12-03-2024',
//     slotRemaining: 13,
//     slotAttendanceStatus: 'Not yet'
//   },
//   {
//     subjectId: 'a3a258b8-ae79-49c2-96d5-05fe51912a0e',
//     subjectName: 'Introduction C# OOP',
//     timeStart: '19:00:00',
//     timeEnd: '22:00:00',
//     teacherId: '53525c34-3437-4b3b-946c-e9be0a60c0c3',
//     teacherName: 'Nguyen Phuong LyLy',
//     dateLearn: '15-03-2024',
//     slotRemaining: 13,
//     slotAttendanceStatus: 'Not yet'
//   },
//   {
//     subjectId: 'a3a258b8-ae79-49c2-96d5-05fe51912a0e',
//     subjectName: 'Introduction C# OOP',
//     timeStart: '19:00:00',
//     timeEnd: '22:00:00',
//     teacherId: '53525c34-3437-4b3b-946c-e9be0a60c0c3',
//     teacherName: 'Nguyen Phuong LyLy',
//     dateLearn: '19-03-2024',
//     slotRemaining: 13,
//     slotAttendanceStatus: 'Not yet'
//   },
//   {
//     subjectId: 'a3a258b8-ae79-49c2-96d5-05fe51912a0e',
//     subjectName: 'Introduction C# OOP',
//     timeStart: '19:00:00',
//     timeEnd: '22:00:00',
//     teacherId: '53525c34-3437-4b3b-946c-e9be0a60c0c3',
//     teacherName: 'Nguyen Phuong LyLy',
//     dateLearn: '22-03-2024',
//     slotRemaining: 13,
//     slotAttendanceStatus: 'Not yet'
//   },
//   {
//     subjectId: 'a3a258b8-ae79-49c2-96d5-05fe51912a0e',
//     subjectName: 'Introduction C# OOP',
//     timeStart: '19:00:00',
//     timeEnd: '22:00:00',
//     teacherId: '53525c34-3437-4b3b-946c-e9be0a60c0c3',
//     teacherName: 'Nguyen Phuong LyLy',
//     dateLearn: '26-03-2024',
//     slotRemaining: 13,
//     slotAttendanceStatus: 'Not yet'
//   },
//   {
//     subjectId: 'a3a258b8-ae79-49c2-96d5-05fe51912a0e',
//     subjectName: 'Introduction C# OOP',
//     timeStart: '19:00:00',
//     timeEnd: '22:00:00',
//     teacherId: '53525c34-3437-4b3b-946c-e9be0a60c0c3',
//     teacherName: 'Nguyen Phuong LyLy',
//     dateLearn: '29-03-2024',
//     slotRemaining: 13,
//     slotAttendanceStatus: 'Not yet'
//   },
//   {
//     subjectId: 'a3a258b8-ae79-49c2-96d5-05fe51912a0e',
//     subjectName: 'Introduction C# OOP',
//     timeStart: '19:00:00',
//     timeEnd: '22:00:00',
//     teacherId: '53525c34-3437-4b3b-946c-e9be0a60c0c3',
//     teacherName: 'Nguyen Phuong LyLy',
//     dateLearn: '02-04-2024',
//     slotRemaining: 13,
//     slotAttendanceStatus: 'Not yet'
//   },
//   {
//     subjectId: 'a3a258b8-ae79-49c2-96d5-05fe51912a0e',
//     subjectName: 'Introduction C# OOP',
//     timeStart: '19:00:00',
//     timeEnd: '22:00:00',
//     teacherId: '53525c34-3437-4b3b-946c-e9be0a60c0c3',
//     teacherName: 'Nguyen Phuong LyLy',
//     dateLearn: '05-04-2024',
//     slotRemaining: 13,
//     slotAttendanceStatus: 'Not yet'
//   },
//   {
//     subjectId: 'a3a258b8-ae79-49c2-96d5-05fe51912a0e',
//     subjectName: 'Introduction C# OOP',
//     timeStart: '19:00:00',
//     timeEnd: '22:00:00',
//     teacherId: '53525c34-3437-4b3b-946c-e9be0a60c0c3',
//     teacherName: 'Nguyen Phuong LyLy',
//     dateLearn: '09-04-2024',
//     slotRemaining: 13,
//     slotAttendanceStatus: 'Not yet'
//   },
//   {
//     subjectId: 'a3a258b8-ae79-49c2-96d5-05fe51912a0e',
//     subjectName: 'Introduction C# OOP',
//     timeStart: '19:00:00',
//     timeEnd: '22:00:00',
//     teacherId: '53525c34-3437-4b3b-946c-e9be0a60c0c3',
//     teacherName: 'Nguyen Phuong LyLy',
//     dateLearn: '12-04-2024',
//     slotRemaining: 13,
//     slotAttendanceStatus: 'Not yet'
//   },
//   {
//     subjectId: 'a3a258b8-ae79-49c2-96d5-05fe51912a0e',
//     subjectName: 'Introduction C# OOP',
//     timeStart: '19:00:00',
//     timeEnd: '22:00:00',
//     teacherId: '53525c34-3437-4b3b-946c-e9be0a60c0c3',
//     teacherName: 'Nguyen Phuong LyLy',
//     dateLearn: '16-04-2024',
//     slotRemaining: 13,
//     slotAttendanceStatus: 'Not yet'
//   },
//   {
//     subjectId: 'a3a258b8-ae79-49c2-96d5-05fe51912a0e',
//     subjectName: 'Introduction C# OOP',
//     timeStart: '19:00:00',
//     timeEnd: '22:00:00',
//     teacherId: '53525c34-3437-4b3b-946c-e9be0a60c0c3',
//     teacherName: 'Nguyen Phuong LyLy',
//     dateLearn: '19-04-2024',
//     slotRemaining: 13,
//     slotAttendanceStatus: 'Not yet'
//   },
//   {
//     subjectId: 'a3a258b8-ae79-49c2-96d5-05fe51912a0e',
//     subjectName: 'Introduction C# OOP',
//     timeStart: '19:00:00',
//     timeEnd: '22:00:00',
//     teacherId: '53525c34-3437-4b3b-946c-e9be0a60c0c3',
//     teacherName: 'Nguyen Phuong LyLy',
//     dateLearn: '23-04-2024',
//     slotRemaining: 13,
//     slotAttendanceStatus: 'Not yet'
//   }
// ]

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

const list = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const timeLst = range(7, 24, 1)
const heightOfASlot = 50
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

export default function WareHouseTable() {
  const [next, setNext] = useState<number>(0)
  const [mapSchedules, setMapSchedules] = useState<MapDateScheduleModel>({})

  const axios = useAxios()

  //Get Schedule
  useEffect(() => {
    const handleGetSchedule = async () => {
      try {
        const response = await axios.call(
          'get',
          '/api/v1/student/get-schedule-of-student-by-student-id?StudentId=74118244-94b9-466f-9e50-57f3d3733612'
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

  useEffect(() => {
    const parent = document.getElementById('slot_time_14')
    if (parent)
      parent.innerHTML =
        '<div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-tckmah-MuiPaper-root-MuiCard-root"><div class="MuiBox-root css-1129bf7"></div><div class="MuiBox-root css-j7qwjs"><p class="MuiTypography-root MuiTypography-body1 css-1tpsv8u-MuiTypography-root">Tên Môn</p><span class="MuiTypography-root MuiTypography-caption css-1gtrqkn-MuiTypography-root">SL HS bfsbug</span></div><p class="MuiTypography-root MuiTypography-body1 css-2rtyd8-MuiTypography-root">Thời gian</p></div>'
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
                  sx={{ border: '0.2px solid #CCCCCC', width: '80px', height: heightOfASlot, zIndex: 101 }}
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
