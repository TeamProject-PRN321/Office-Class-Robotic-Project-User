// ** MUI Imports
import {
  Avatar,
  Box,
  Collapse,
  Container,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material'
import moment from 'moment'
import React, { useEffect } from 'react'
import { Fragment, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import useAxios from 'src/@core/hooks/useAxios'

interface ColumnModel<T> {
  id: keyof T
  lable: string
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined
  format?: (value: T) => React.ReactNode | string | any
}

// Generated by https://quicktype.io

export interface StudentModel {
  appUserId: string
  studentId: string
  parent: ParentModel
  userName: string
  fullName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  gender: string
  address: string
  photoUrl: string
}

export interface ParentModel {
  parentId: string
  userName: string
  fullName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  gender: string
  address: string
  photoUrl: string
}

const columns: ColumnModel<StudentModel>[] = [
  {
    id: 'fullName',
    lable: 'Full name'
  },
  {
    id: 'userName',
    lable: 'Username'
  },
  {
    id: 'email',
    lable: 'Email'
  },
  {
    id: 'phoneNumber',
    lable: 'Phone number'
  },
  {
    id: 'dateOfBirth',
    lable: 'Date of Birth',
    format: value => {
      return moment(value.dateOfBirth).format('YYYY-MM-DD')
    }
  },
  {
    id: 'gender',
    lable: 'Gender'
  }
]

function Row(props: { row: StudentModel; index: number; page: number; rowsPerPage: number }) {
  const { row } = props
  const { parent, fullName, email, phoneNumber, dateOfBirth, gender, address, photoUrl } = props.row
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{props.page * props.rowsPerPage + props.index + 1}</TableCell>
        {columns.map((column, i) => {
          return (
            <TableCell key={i} align={column.align} component='th' {...(i === 0 && { scope: 'row', component: 'th' })}>
              {column.format ? column.format(row) : row[column.id]}
            </TableCell>
          )
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 2}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} py={3}>
              <Avatar alt={fullName} src={photoUrl} sx={{ width: 100, height: 100 }} />
              <Typography variant='h5'>{fullName}</Typography>
            </Box>
            <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'space-around'}>
              <Grid container spacing={2} py={3} flexDirection={'column'} alignItems={'center'}>
                <Grid item>
                  <Typography variant='h6'>Student Information</Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body2'>Email: {email}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body2'>Phone Number: {phoneNumber}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body2'>Date of Birth: {dateOfBirth}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body2'>Gender: {gender}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body2'>Address: {address}</Typography>
                </Grid>
              </Grid>
              {parent && (
                <Grid
                  container
                  spacing={2}
                  py={3}
                  flexDirection={'column'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Grid item>
                    <Typography variant='h6'>Parent Information</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='body2'>Name: {parent.fullName}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='body2'>Email: {parent.email}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='body2'>Phone Number: {parent.phoneNumber}</Typography>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default function SubjectsPage() {
  const [studentLst, setStudentLst] = useState<StudentModel[]>([])
  const axiosClient = useAxios()

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    const handleFetchStudentList = async () => {
      try {
        const response = await axiosClient.call('get', '/api/v1/student/get-all-students', null, true)
        setStudentLst(response)
      } catch (error) {
        console.log(error)
      }
    }

    handleFetchStudentList()
  }, [])

  return (
    <Container>
      <TableContainer
        sx={{
          border: theme => `1px solid ${theme.palette.divider}`,
          borderRadius: '20px'
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: theme => theme.palette.primary.light,
                color: 'white'
              }}
            >
              <TableCell
                sx={{
                  backgroundColor: theme => theme.palette.primary.light,
                  color: 'white'
                }}
              ></TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme => theme.palette.primary.light,
                  color: 'white'
                }}
              >
                #
              </TableCell>
              {columns.map((column, index) => {
                return (
                  <TableCell
                    align={column.align}
                    key={index}
                    sx={{
                      backgroundColor: theme => theme.palette.primary.light,
                      color: 'white'
                    }}
                  >
                    {column.lable}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {studentLst.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((student, index) => {
              return (
                <Row
                  key={page * rowsPerPage + index}
                  index={index}
                  row={student}
                  page={page}
                  rowsPerPage={rowsPerPage}
                />
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={studentLst.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 20, 30]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  )
}
