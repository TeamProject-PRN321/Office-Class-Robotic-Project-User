import * as React from 'react'

import DatePicker from 'react-datepicker'

import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  styled
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { Plus } from 'mdi-material-ui'

// ** MUI Imports
import { CloudUpload, SchoolOutlined } from '@mui/icons-material'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import moment from 'moment'
import useAxios from 'src/@core/hooks/useAxios'
import { useEffect } from 'react'
import { NewClassModel } from './NewClassFormLiveClass'
import { StudentListID } from 'src/pages/classes'
import { toast } from 'react-toastify'
import useAuth from 'src/@core/hooks/useAuth'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const classroomFake = [
  {
    value: 'a9770be8-9b13-4d63-a78d-c9d2efaa79ec',
    name: 'P.103'
  },
  {
    value: '29f67cfd-ba37-4b70-852a-4af223b7788a',
    name: 'P.203'
  },
  {
    value: '5f59c98d-50f9-4f5e-911e-d28648ec43b1',
    name: 'P.303'
  },
  {
    value: 'd2e283a6-5bf5-4d27-a2c2-994cb6d781e9',
    name: 'P.403'
  }
]

const dayStudys = [
  {
    value: 'Thứ 2',
    label: 'Thứ 2'
  },
  {
    value: 'Thứ 3',
    label: 'Thứ 3'
  },
  {
    value: 'Thứ 4',
    label: 'Thứ 4'
  },
  {
    value: 'Thứ 5',
    label: 'Thứ 5'
  },
  {
    value: 'Thứ 6',
    label: 'Thứ 6'
  },
  {
    value: 'Thứ 7',
    label: 'Thứ 7'
  },
  {
    value: 'Chủ Nhật',
    label: 'Chủ Nhật'
  }
]

//---Model
export interface StudentListModel {
  studentId: string
  parent: null
  userName: string
  fullName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  gender: string
  address: string
  photoUrl: string
}

export interface TeacherModel {
  teacherId: string
  name: string
  birthday: string
  address: string
  gender: string
  phoneNumber: string
  listSubjectOfTeacher: any[]
}

export interface SubjectModel {
  id: string
  subjectName: string
  totalSlots: number
  giaoTrinhData: GiaoTrinhData
}

export interface GiaoTrinhData {
  id: string
  giaoTrinhName: string
  description: string
  filePDF: string
  created: string
}

export default function DialogForm() {
  // ** State
  const [open, setOpen] = React.useState(false)

  //   const [value, setValue] = React.useState<string>('1')

  const [student, setStudent] = React.useState<StudentListModel[]>([])
  const [className, setClassName] = React.useState<string>('')
  const [dayStudied, setdayStudied] = React.useState<string[]>([])
  const [timeStarted, setTimeStarted] = React.useState<string>(moment().toString())
  const [timeEnded, setTimeEnded] = React.useState<string>(moment().toString())
  const [studentID, setstudentID] = React.useState<string[]>([])
  const [dateStartClass, setdateStartClass] = React.useState<string>(moment().toString())
  const [subjectId, setsubjectId] = React.useState<string>('')
  const [teacherId, setteacherId] = React.useState<string>('')
  const [classRoomID, setclassRoomID] = React.useState<string>('')

  const [teachers, setTeachers] = React.useState<TeacherModel[]>([])
  const [subjects, setSubjects] = React.useState<SubjectModel[]>([])

  //   const [classrooms, setClassrooms] = React.useState<Date>()

  const axios = useAxios()

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleShowListStudent = async () => {
    try {
      const listStudentData = await axios.call('get', '/api/v1/student/get-all-students')
      setStudent(listStudentData)
      console.log(listStudentData)
    } catch (error) {
      console.log(error)
    }
  }

  const submitData = async () => {
    console.log(
      className,
      dayStudied,
      timeStarted,
      studentID,
      timeEnded,
      dateStartClass,
      subjectId,
      teacherId,
      classRoomID
    )

    const data: NewClassModel = {
      className: className,
      dayStudy: dayStudied,
      startTime: moment(timeStarted).format('HH:mm:ss'),
      endTime: moment(timeEnded).format('HH:mm:ss'),
      studentListId: studentID.map(value => {
        return { studentId: value } as StudentListID
      }),
      dateStartClass: moment(dateStartClass).format('YYYY-MM-DD'),
      subjectId: subjectId,
      teacherId: teacherId,
      classRoomID: classRoomID
    }

    try {
      await axios.call('post', '/api/v1/classes/add', data, true)
      toast.success('Add new Class successfully')
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetTeacher = async () => {
    try {
      const teacherData = await axios.call('get', '/api/v1/teacher')
      setTeachers(teacherData)
      console.log(teacherData)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetSubject = async () => {
    try {
      const subjectData = await axios.call('get', '/api/v1/subject/all')
      setSubjects(subjectData)
      console.log(subjectData)
    } catch (error) {
      console.log(error)
    }
  }

  //Effect
  useEffect(() => {
    handleShowListStudent()
    handleGetTeacher()
    handleGetSubject()
  }, [])

  return (
    <React.Fragment>
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
        onClick={handleClickOpen}
      >
        <Plus sx={{ marginRight: '2px', fontSize: '16px' }}></Plus>
        Add Class
      </Button>

      <BootstrapDialog
        sx={{ height: '700px' }}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center', fontWeight: 'bold' }} id='customized-dialog-title'>
          Add New Class
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2' }}>
          <TextField
            label='Class Name'
            id='outlined-start-adornment'
            placeholder='Please enter class name'
            value={className}
            onChange={e => {
              setClassName(e.target.value)
            }}
            sx={{ m: 2, width: '75ch', fontSize: '15px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SchoolOutlined></SchoolOutlined>
                </InputAdornment>
              )
            }}
          />
          {/* <TextField
            id='outlined-select-currency'
            select
            label='Select'
            value={dayStudied}
            onChange={e => {
              setdayStudied(e.target.value)
            }}
            defaultValue='Thứ 2 - Thứ 5'
            helperText='Please select day study'
            sx={{
              m: 2,
              width: '600px'
            }}
          >
            {dayStudys.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField> */}
          <Box
            sx={{
              m: 2,
              width: '600px'
            }}
          >
            <Autocomplete
              options={dayStudys}
              getOptionLabel={value => value.label}
              id='auto-complete'
              onChange={(e, value) => {
                setdayStudied(value.map(x => x.value))
              }}
              multiple={true}
              autoComplete
              includeInputInList
              renderInput={params => <TextField {...params} label='Day study' variant='standard' />}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              gap: 2,
              m: 2,
              justifyContent: 'space-between',
              width: '600px'
            }}
          >
            <DatePickerWrapper>
              <DatePicker
                selected={moment(timeStarted).toDate()}
                showTimeSelectOnly
                showTimeSelect
                timeIntervals={15}
                id='startTime'
                placeholderText='HH:mm'
                dateFormat={'HH:mm'}
                customInput={
                  <TextField
                    fullWidth
                    helperText='Please choose time start'
                    sx={{ justifyContent: 'center', fontSize: '15px' }}
                  />
                }
                onChange={(timeStarted: Date) => setTimeStarted(timeStarted.toString())}
              />
            </DatePickerWrapper>
            <DatePickerWrapper>
              <DatePicker
                selected={moment(timeEnded).toDate()}
                showTimeSelectOnly
                showTimeSelect
                timeIntervals={15}
                id='endTime'
                placeholderText='HH:mm'
                dateFormat={'HH:mm'}
                customInput={<TextField fullWidth helperText='Please choose end time' sx={{ fontSize: '15px' }} />}
                onChange={(timeEnded: Date) => setTimeEnded(timeEnded.toString())}
              />
            </DatePickerWrapper>
          </Box>
          <Box
            sx={{
              m: 2,
              width: '600px'
            }}
          >
            <Autocomplete
              getOptionLabel={value => value.fullName}
              options={student}
              id='auto-complete'
              onChange={(e, value) => {
                setstudentID(value.map(x => x.studentId))
              }}
              multiple={true}
              autoComplete
              includeInputInList
              renderInput={params => <TextField {...params} label='Student Name' variant='standard' />}
            />
          </Box>
          <Button
            component='label'
            role={undefined}
            variant='contained'
            tabIndex={-1}
            startIcon={<CloudUpload />}
            sx={{
              backgroundColor: '#B9C6BB',
              m: 2,
              width: '600px',
              alignItems: 'center',
              textAlign: 'center',
              fontSize: '15px'
            }}
          >
            Upload Class Materials
            <VisuallyHiddenInput type='file' />
          </Button>
          <Box
            sx={{
              m: 2,
              width: '600px'
            }}
          >
            <DatePickerWrapper>
              <DatePicker
                selected={moment(dateStartClass).toDate()}
                timeIntervals={15}
                id='startTime'
                placeholderText='dd:MM:yyyy'
                dateFormat={'dd:MM:yyyy'}
                customInput={
                  <TextField
                    fullWidth
                    helperText='Please choose day start'
                    sx={{ justifyContent: 'center', fontSize: '15px' }}
                  />
                }
                onChange={(dateStartClass: Date) => {
                  setdateStartClass(dateStartClass.toString())
                }}
              />
            </DatePickerWrapper>
          </Box>

          <TextField
            id='outlined-select-currency'
            select
            label='Subject'
            value={subjectId}
            onChange={e => {
              setsubjectId(e.target.value)
            }}
            sx={{
              m: 2,
              width: '600px'
            }}
          >
            {subjects.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.subjectName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id='outlined-select-currency'
            select
            label='Teacher'
            value={teacherId}
            onChange={e => {
              setteacherId(e.target.value)
            }}
            sx={{
              m: 2,
              width: '600px'
            }}
            fullWidth
          >
            {teachers.map(option => (
              <MenuItem key={option.teacherId} value={option.teacherId}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id='outlined-select-currency'
            select
            label='Classroom'
            defaultValue='P.303'
            value={classRoomID}
            onChange={e => {
              setclassRoomID(e.target.value)
            }}
            sx={{
              m: 2,
              width: '600px'
            }}
          >
            {classroomFake.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <DialogActions>
            <Button
              autoFocus
              onClick={submitData}
              sx={{
                justifyContent: 'center',
                m: 2,
                backgroundColor: '#E5F2E7',
                ':hover': {
                  fontWeight: 'bold'
                }
              }}
            >
              Save changes
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </React.Fragment>
  )
}
