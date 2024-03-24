// ** React Imports
import { SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import useAxios from 'src/@core/hooks/useAxios'
import { Box, Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useRouter } from 'next/router'

export interface ReportAttendanceModel {
  studentName: string
  subjectsAttendance: SubjectsAttendance[]
}

export interface SubjectsAttendance {
  className: string
  subjectName: string
  attendanceDetails: AttendanceDetail[]
}

export interface AttendanceDetail {
  dateStudy: string
  attendStatus: number
  description: null
}

interface ReportCardProperties {
  studentId: string
}

const ReportCard = (prop: ReportCardProperties) => {
  // ** State
  const [value, setValue] = useState<string>('1')

  const [attendance, setAttendance] = useState<ReportAttendanceModel[]>([])
  const [changeClassName, setChangeClassName] = useState<string>()

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleCheckStatus = (status: number) => {
    if (status == 0) {
      return <Chip color='warning' label={'NOT YET'}></Chip>
    }
    if (status == 1) {
      return <Chip color='success' label={'PRESENT'}></Chip>
    }
    if (status == 2) {
      return <Chip color='error' label={'ABSENT'}></Chip>
    }
  }

  const route = useRouter()

  const axios = useAxios()

  const handleGetAttendance = async () => {
    try {
      const data = await axios.call(
        'get',
        'https://localhost:7254/api/v1/student/get-all-studentsAttendance/' + prop.studentId
      )

      setAttendance(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetAttendance()
  }, [prop])

  return (
    <Card>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          <Tab value='1' label='Report Attendance' />
          <Tab value='2' label='Report Grade' />
        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0 }}>
            {/* <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Attendance
            </Typography> */}

            <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
              <Table
                sx={{
                  cursor: 'pointer'
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Class</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendance.at(0)?.subjectsAttendance.map((reportAtten, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell
                          sx={{
                            ':hover': {
                              fontWeight: 'bold',
                              fontSize: '15px'
                            }
                          }}
                          onClick={() => {
                            setChangeClassName(reportAtten.className)
                          }}
                        >
                          {reportAtten.className}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              {/* Data Attendance */}
              <Table
                sx={{
                  cursor: 'pointer'
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Date study</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendance
                    .at(0)
                    ?.subjectsAttendance.filter(check => check.className === changeClassName)
                    .at(0)
                    ?.attendanceDetails.map((value, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{value.dateStudy}</TableCell>
                          <TableCell>{handleCheckStatus(value.attendStatus)}</TableCell>
                          <TableCell>{value.description}</TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </Box>

            <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
              <Button
                variant='contained'
                sx={{
                  margin: '15px'
                }}
                onClick={() => {
                  route.back()
                }}
              >
                Continue
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value='2' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Grade
            </Typography>

            <Button
              variant='contained'
              onClick={() => {
                route.back()
              }}
            >
              Continue
            </Button>
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}

export default ReportCard
