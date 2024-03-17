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
import { StudentModel } from '../HistoryClasses'

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
  data: StudentModel
  handleCheckAttendance: (studentId: string) => void
}) => {
  return (
    <StyledTableRow key={data.studentId}>
      <StyledTableCell align='left'>{data.studentName}</StyledTableCell>
      <StyledTableCell align='center'>{data.className}</StyledTableCell>
      <StyledTableCell align='center'>
        <Button
          sx={{
            width: '100px',
            backgroundColor: data.attendanceStatus === 1 ? 'green' : '#FF8066',
            color: '#E0F4FD !important',
            ':hover': { backgroundColor: data.attendanceStatus === 1 ? 'green' : '#FF8066', color: '#E0F4FD' }
          }}
          onClick={() => {
            handleCheckAttendance(data.studentId)
          }}
        >
          {data.attendanceStatus === 1 ? 'Present' : 'Absent'}
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default function AttendanceTableStudent({
  students,
  handleCheckAttendance
}: {
  students: StudentModel[]
  handleCheckAttendance: (studentId: string) => void
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='left'>Student Name</StyledTableCell>
            <StyledTableCell align='center'>Class</StyledTableCell>
            <StyledTableCell align='center'>Attendance</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(row => (
            <RowData key={row.studentId} data={row} handleCheckAttendance={handleCheckAttendance} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
