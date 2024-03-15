import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses
} from '@mui/material'
import * as React from 'react'
import { Student } from './AttendanceReportDrawer'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

const RowData = ({
  data,
  handleCheckAttendance
}: {
  data: Student
  handleCheckAttendance: (studentId: string) => void
}) => {
  return (
    <StyledTableRow key={data.StudentID}>
      <StyledTableCell component='th' scope='row'>
        {data.StudentID}
      </StyledTableCell>
      <StyledTableCell align='left'>{data.StudentName}</StyledTableCell>
      <StyledTableCell align='center'>{data.Class}</StyledTableCell>
      <StyledTableCell align='center'>
        <Button
          sx={{
            width: '100px',
            backgroundColor: data.isAttendance ? 'green' : '#FF8066',
            color: '#E0F4FD !important',
            ':hover': { backgroundColor: data.isAttendance ? 'green' : '#FF8066', color: '#E0F4FD' }
          }}
          onClick={() => {
            handleCheckAttendance(data.StudentID)
          }}
        >
          {data.isAttendance ? 'Present' : 'Absent'}
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default function AttendanceTableStudent({
  students,
  handleCheckAttendance
}: {
  students: Student[]
  handleCheckAttendance: (studentId: string) => void
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Student ID</StyledTableCell>
            <StyledTableCell align='left'>Student Name</StyledTableCell>
            <StyledTableCell align='center'>Class</StyledTableCell>
            <StyledTableCell align='center'>Attendance</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(row => (
            <RowData key={row.StudentID} data={row} handleCheckAttendance={handleCheckAttendance} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
