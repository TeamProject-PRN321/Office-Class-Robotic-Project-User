// ** MUI Imports
import Grid from '@mui/material/Grid'

import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableCell,
  TableBody
} from '@mui/material'

import * as React from 'react'

import { ArrowTopRight } from 'mdi-material-ui'

import { SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import CardContent from '@mui/material/CardContent'
import ProfessorItems from 'src/layouts/components/Professors/Professors'
import ProfessorReport from 'src/layouts/components/Professors/ProfessorsReport'
import useAxios from 'src/@core/hooks/useAxios'
import MyDialog from 'src/@core/layouts/components/dialog/Dialog'

export interface TeacherModel {
  teacherId: string
  name: string
  birthday: string
  address: string
  gender: string
  phoneNumber: string
  listSubjectOfTeacher: ListSubjectOfTeacher[]
}

export interface ListSubjectOfTeacher {
  subjectId: string
  subjectName: string
}

const URL_GET_TEACHERS = '/api/v1/teacher'

export default function App() {
  // ** State
  const [value, setValue] = useState<string>('1')
  const [teachers, setTeachers] = useState<TeacherModel[]>([] as TeacherModel[])
  const [teacherSelected, setTeacherSelected] = useState<TeacherModel | undefined>()
  const [dialodDetailOpen, setDialodDetailOpen] = React.useState<boolean>(false)
  const axiosClient = useAxios()

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axiosClient.call('get', URL_GET_TEACHERS)
        setTeachers(response as TeacherModel[])
      } catch (error) {
        console.log(error)
      }
    }

    fetchTeachers()
  }, [])

  const handleClose = () => {
    setDialodDetailOpen(false)
  }

  const handleViewDetail = (value: TeacherModel) => {
    setTeacherSelected(value)
    setDialodDetailOpen(true)
  }

  return (
    <React.Fragment>
      <Card>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='card navigation example'>
            <Tab sx={{ fontWeight: 'bold' }} value='1' label='List' />
            <Tab sx={{ fontWeight: 'bold' }} value='2' label='Report' />
          </TabList>
          <CardContent>
            <TabPanel value='1' sx={{ p: 0 }}>
              <Grid container direction={'row'} spacing={4}>
                <Grid
                  item
                  display={'flex'}
                  flexWrap={'wrap'}
                  justifyContent={'space-between'}
                  width={'100%'}
                  alignItems={'center'}
                >
                  <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>List professors</Typography>
                </Grid>
                {teachers.map(item => {
                  return (
                    <Grid item key={item.teacherId}>
                      <ProfessorItems teacherModel={item} onClickViewDetail={handleViewDetail}></ProfessorItems>
                    </Grid>
                  )
                })}
              </Grid>
            </TabPanel>

            <TabPanel value='2' sx={{ p: 0 }}>
              <Grid container direction={'row'} spacing={4}>
                <Grid
                  item
                  display={'flex'}
                  flexWrap={'wrap'}
                  justifyContent={'space-between'}
                  width={'100%'}
                  alignItems={'center'}
                >
                  <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>Report teacher</Typography>
                  <Button
                    sx={{
                      backgroundColor: '#C4FCEF',
                      color: '#50bf62',
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                      fontSize: '13px',
                      ':hover': {
                        color: 'white',
                        backgroundColor: '#0081CF'
                      }
                    }}
                  >
                    <ArrowTopRight sx={{ marginRight: '2px', fontSize: '16px' }}></ArrowTopRight>
                    Contact
                  </Button>
                </Grid>
                {teachers.map(item => {
                  return (
                    <Grid item key={item.teacherId}>
                      <ProfessorItems teacherModel={item} onClickViewDetail={handleViewDetail}></ProfessorItems>
                    </Grid>
                  )
                })}
              </Grid>
            </TabPanel>
          </CardContent>
        </TabContext>
      </Card>
      <MyDialog
        content={
          <Box
            sx={{
              minWidth: '500px',
              pr: '50px'
            }}
          >
            <Typography variant='h5'>{teacherSelected?.name}</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Birthday`}
                  secondary={teacherSelected?.birthday}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
                <ListItemText
                  primary={`Gender`}
                  secondary={teacherSelected?.gender}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Address`}
                  secondary={teacherSelected?.address}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Phone Number`}
                  secondary={teacherSelected?.phoneNumber}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
              </ListItem>
              <Divider variant='inset' component='li' />
              <ListItem>
                <ListItemText
                  primary='Subjects:'
                  secondary={teacherSelected?.listSubjectOfTeacher.length}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
              </ListItem>
              <TableContainer
                sx={{
                  ml: 5
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow hover>
                      <TableCell size='small'>Subject Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teacherSelected?.listSubjectOfTeacher?.map(subject => {
                      return (
                        <TableRow key={subject.subjectId} hover>
                          <TableCell size='small'>{subject.subjectName}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Display listSubjectOfTeacher data here */}
            </List>
          </Box>
        }
        handleClose={handleClose}
        open={dialodDetailOpen}
        title={'Teacher Details'}
        action={
          <Box display={'flex'} justifyContent={'center'}>
            <Button onClick={handleClose}>Close</Button>
          </Box>
        }
      />
    </React.Fragment>
  )
}
